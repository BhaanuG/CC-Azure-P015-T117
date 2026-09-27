import { CONSTANTS } from '../data/demoScenarios.js';

export function calculateFSLogixTelemetry(logins, provisionedIops) {
  const l = parseInt(logins) || 0;
  const cap = parseInt(provisionedIops) || 5000;

  const demandIops = l * CONSTANTS.IOPS_PER_ATTACHMENT;
  const storagePressure = (demandIops / cap) * 100;

  let latency = CONSTANTS.BASE_LATENCY_MS;
  if (storagePressure <= 100) {
    latency = CONSTANTS.BASE_LATENCY_MS * (1 + 0.5 * (storagePressure / 100));
  } else {
    latency = CONSTANTS.BASE_LATENCY_MS * (1 + 0.5 + 2.0 * ((storagePressure - 100) / 100));
  }

  let status = 'NORMAL';
  if (storagePressure > CONSTANTS.THRESHOLDS.WARNING_MAX) {
    status = 'CRITICAL';
  } else if (storagePressure >= CONSTANTS.THRESHOLDS.NORMAL_MAX) {
    status = 'WARNING';
  }

  return {
    logins: l,
    provisionedIops: cap,
    demandIops,
    storagePressure: parseFloat(storagePressure.toFixed(1)),
    latency: parseFloat(latency.toFixed(1)),
    status
  };
}
