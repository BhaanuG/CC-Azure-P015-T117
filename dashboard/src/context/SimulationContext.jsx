import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DEMO_SCENARIOS } from '../data/demoScenarios';
import { runSimulationAudit } from '../engine/simulationEngine';

const SimulationContext = createContext();

export function SimulationProvider( { children }) {
  const [currentScenarioKey, setCurrentScenarioKey] = useState('demo1');
  const [students, setStudents] = useState(50);
  const [concurrency, setConcurrency] = useState(70);
  const [profile, setProfile] = useState('standard');
  const [maxSessions, setMaxSessions] = useState(10);
  const [safetyBuffer, setSafetyBuffer] = useState(20);
  const [gfxIntensity, setGfxIntensity] = useState('low');
  const [gpuRequired, setGpuRequired] = useState('no');
  const [logins, setLogins] = useState(10);
  const [storageIops, setStorageIops] = useState(5000);

  const [isSimulating, setIsSimulating] = useState(true);
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date().toLocaleTimeString());
  const [tick, setTick] = useState(0);
  const [autoscaleEvents, setAutoscaleEvents] = useState([]);

  const loadScenario = useCallback((skey) => {
    const s = DEMO_SCENARIOS[skey];
    if (!s) return;
    setCurrentScenarioKey(skey);
    setStudents(s.students);
    setConcurrency(s.concurrency ?? 70);
    setProfile(s.profile);
    setMaxSessions(s.maxSessions);
    setSafetyBuffer(s.safetyBuffer);
    setGfxIntensity(s.gfxIntensity);
    setGpuRequired(s.gpuRequired);
    setLogins(s.logins);
    if (s.storageIops !== undefined) {
      setStorageIops(s.storageIops);
    }
  }, []);

  const toggleSimulation = () => isSimulating ? setIsSimulating(false) : setIsSimulating(true);

  const resetSimulation = () => {
    loadScenario('demo1');
    setAutoscaleEvents([]);
  };

  const updateConfig = (updates) => {
    if (updates.students !== undefined) setStudents(updates.students);
    if (updates.concurrency !== undefined) {
      const val = updates.concurrency <= 1 ? Math.round(updates.concurrency * 100) : updates.concurrency;
      setConcurrency(val);
    }
    if (updates.sessionsPerHost !== undefined) setMaxSessions(updates.sessionsPerHost);
    if (updates.safetyBuffer !== undefined) {
      const val = updates.safetyBuffer <= 1 ? Math.round(updates.safetyBuffer * 100) : updates.safetyBuffer;
      setSafetyBuffer(val);
    }
    if (updates.workloadProfile !== undefined) {
      const prof = updates.workloadProfile.toLowerCase();
      setProfile(prof);
      if (prof === 'graphics') {
        setGpuRequired('yes');
        setGfxIntensity('high');
      } else {
        setGpuRequired('no');
        setGfxIntensity('low');
      }
    }
    if (updates.fslogixLogins !== undefined) setLogins(updates.fslogixLogins);
    if (updates.storageIops !== undefined) setStorageIops(updates.storageIops);
    if (updates.gpuRequired !== undefined) setGpuRequired(updates.gpuRequired);
    if (updates.gfxIntensity !== undefined) setGfxIntensity(updates.gfxIntensity);
  };

  // Live Simulation Loop
  useEffect(() => {
    let interval = null;
    if (isSimulating) {
      interval = setInterval(() => {
        setLastUpdateTime(new Date().toLocaleTimeString());
        setTick(prev => prev + 1);
      }, 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isSimulating]);

  const auditResults = runSimulationAudit({
    students,
    concurrency,
    profile,
    maxSessions,
    safetyBuffer,
    gfxIntensity,
    gpuRequired,
    logins,
    storageIops
  });

  // Map auditResults to expected UI state shape
  const state = {
    students,
    concurrency: concurrency / 100,
    activeSessions: auditResults.sizing.expectedUsers,
    workloadProfile: profile.toUpperCase(),
    sessionsPerHost: maxSessions,
    safetyBuffer: safetyBuffer / 100,
    baseHosts: auditResults.sizing.baseHosts,
    recommendedHosts: auditResults.sizing.recommendedHosts,
    cpuPressure: auditResults.graphics.cpuPressure,
    ramPressure: auditResults.graphics.ramPressure,
    gpuPressure: auditResults.graphics.gpuPressure,
    vramPressure: auditResults.graphics.vramPressure,
    fslogixLogins: logins,
    iopsDemand: auditResults.fslogix.iopsDemand,
    storageCapacity: storageIops,
    storagePressure: auditResults.fslogix.storagePressure,
    latency: auditResults.fslogix.latency,
    bottleneckState: auditResults.fslogix.status,
    autoscaleState: auditResults.autoscale.status,
    runningHosts: auditResults.autoscale.requiredHosts,
    autoscaleEvents: autoscaleEvents.length > 0 ? autoscaleEvents : (auditResults.autoscale.events || [])
  };

  const scenarios = Object.values(DEMO_SCENARIOS);
  const value = {
    state,
    scenarios,
    currentScenarioId: currentScenarioKey,
    isSimulating,
    lastTickTime: lastUpdateTime,
    toggleSimulation,
    resetSimulation,
    loadScenario,
    updateConfig
  };

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  return useContext(SimulationContext);
}
