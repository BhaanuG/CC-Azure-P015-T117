export function calculateGraphicsTelemetry(profile, intensity, hasGpu, activeSessions, maxSessions = 10, recommendedHosts = 5) {
  const isGpu = profile === 'graphics' || profile === 'GRAPHICS' || hasGpu === 'yes' || hasGpu === true;
  const mSessions = parseInt(maxSessions) || 10;
  const rHosts = parseInt(recommendedHosts) || 1;
  const totalCapacity = rHosts * mSessions;
  
  // Occupancy ratio based on active users vs total provisioned host seats
  const occupancy = totalCapacity > 0 ? (activeSessions / totalCapacity) : 0;

  let cpu, ram, gpu, vram;

  if (isGpu) {
    // GPU VM (NV6ads_A10_v5) workload pressure
    cpu = Math.min(100, Math.round(20 + occupancy * 70));
    ram = Math.min(100, Math.round(30 + occupancy * 60));
    gpu = Math.min(100, Math.round(15 + occupancy * 80));
    vram = Math.min(100, Math.round(20 + occupancy * 78));
  } else {
    // Standard CPU VM (D4ds_v5) workload pressure (no GPU acceleration)
    cpu = Math.min(100, Math.round(15 + occupancy * 75));
    ram = Math.min(100, Math.round(25 + occupancy * 65));
    gpu = 0;
    vram = 0;
  }

  // Adjust for intensity override if intensity is explicitly specified
  if (intensity === 'medium') {
    cpu = Math.max(cpu, 65);
    ram = Math.max(ram, 72);
    if (isGpu) { gpu = Math.max(gpu, 60); vram = Math.max(vram, 60); }
  } else if (intensity === 'high') {
    cpu = Math.max(cpu, 88);
    ram = Math.max(ram, 85);
    if (isGpu) { gpu = Math.max(gpu, 92); vram = Math.max(vram, 95); }
  }

  const vramUsed = Number(((vram / 100) * 4.0).toFixed(1));

  return {
    cpu,
    ram,
    gpu,
    vram,
    vramUsed: isGpu ? vramUsed : 0,
    vramTotal: 4.0,
    hasGpu: isGpu
  };
}

