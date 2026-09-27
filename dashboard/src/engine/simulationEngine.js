import { calculateSizing } from './sizingEngine';
import { calculateGraphicsTelemetry } from './graphicsEngine';
import { calculateFSLogixTelemetry } from './fslogixEngine';
import { calculateAutoscaleState } from './autoscaleEngine';

export function runSimulationAudit(state) {
  const sizing = calculateSizing(
   state.students,
   state.concurrency,
   state.maxSessions,
   state.safetyBuffer
  );

  const graphics = calculateGraphicsTelemetry(
   state.profile,
   state.gfxIntensity,
   state.gpuRequired,
   sizing.expectedUsers,
   sizing.maxSessions,
   sizing.recommendedHosts
  );

  // Normalize graphics pressure fields
  graphics.cpuPressure = graphics.cpu;
  graphics.ramPressure = graphics.ram;
  graphics.gpuPressure = graphics.gpu;
  graphics.vramPressure = graphics.vram;

  const fslogix = calculateFSLogixTelemetry(
   state.logins,
   state.storageIops
  );

  const autoscale = calculateAutoscaleState(
   sizing.expectedUsers,
   sizing.maxSessions
  );


  const expectedUsers = Math.ceil(state.students * (state.concurrency / 100));
  const expectedHosts = Math.ceil(Math.ceil(expectedUsers / state.maxSessions) * (1 + (state.safetyBuffer / 100)));
  const isVerified = sizing.expectedUsers === expectedUsers && sizing.recommendedHosts === expectedHosts;

  return {
    sizing,
    graphics,
    fslogix,
    autoscale,
    isVerified,
    timestamp: new Date().toLocaleTimeString()
  };
}
