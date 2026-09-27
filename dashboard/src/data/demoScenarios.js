export const CONSTANTS = {
  IOPS_PER_ATTACHMENT: 100, // Configurable Demo Assumption
  BASE_LATENCY_MS: 12.0,
  THRESHOLDS: {
    NORMAL_MAX: 70,    // < 70% -> NORMAL
    WARNING_MAX: 100   // 70% - 100% -> WARNING, > 100% -> CRITICAL
  }
};

export const DEMO_SCENARIOS = {
  demo1: {
    id: 'demo1',
    name: 'DEMO 1: Baseline Capacity (50 Students / 70% Concurrency)',
    students: 50,
    concurrency: 70,
    profile: 'standard',
    maxSessions: 10,
    safetyBuffer: 20,
    gfxIntensity: 'low',
    gpuRequired: 'no',
    logins: 10,
    storageIops: 5000,
    description: 'Baseline deployment for 50 students at normal 70% planning concurrency with Standard D4s_v5 hosts.'
  },
  demo2: {
    id: 'demo2',
    name: 'DEMO 2: High Concurrency Stress Spike (90% Concurrency)',
    students: 50,
    concurrency: 90,
    profile: 'standard',
    maxSessions: 10,
    safetyBuffer: 20,
    gfxIntensity: 'medium',
    gpuRequired: 'no',
    logins: 20,
    storageIops: 5000,
    description: 'Stress test simulating exam time where concurrency spikes to 90%, triggering scale-out.'
  },
  demo3: {
    id: 'demo3',
    name: 'DEMO 3: Graphics-Intensive Engineering Workload',
    students: 50,
    concurrency: 70,
    profile: 'graphics',
    maxSessions: 5,
    safetyBuffer: 20,
    gfxIntensity: 'high',
    gpuRequired: 'yes',
    logins: 15,
    storageIops: 10000,
    description: 'Engineering lab profile using NVads_A10_v5 GPU hosts with reduced density (5 sessions/host).'
  },
  demo4: {
    id: 'demo4',
    name: 'DEMO 4: 50-User FSLogix Logon Storm (Storage Bottleneck)',
    students: 50,
    concurrency: 100,
    profile: 'standard',
    maxSessions: 10,
    safetyBuffer: 20,
    gfxIntensity: 'medium',
    gpuRequired: 'no',
    logins: 50,
    storageIops: 3000,
    description: 'Class start scenario where 50 users attach FSLogix profiles simultaneously, exceeding modeled IOPS capacity.'
  },
  demo5: {
    id: 'demo5',
    name: 'DEMO 5: Autoscale Response & Storage Mitigation',
    students: 50,
    concurrency: 70,
    profile: 'standard',
    maxSessions: 10,
    safetyBuffer: 20,
    gfxIntensity: 'low',
    gpuRequired: 'no',
    logins: 50,
    storageIops: 20000,
    description: 'Demonstrates storage capacity upgrade to 20,000 IOPS alongside a 24-hour autoscale host cycle.'
  }
};
