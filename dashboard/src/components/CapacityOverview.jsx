import React from 'react';
import { useSimulation } from '../context/SimulationContext';

import { formatNumber, formatPercent } from '../utils/formatters';

export default function CapacityOverview() {
  const { state } = useSimulation();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
      <div className='card'>
        <span className='data-tag tag-planning'>CALCULATED PLANNING</span>
        <div className='card-title' style={{ marginTop: '8px' }}>Target Students</div>
        <div className='stat-value'>{formatNumber(state.students)}</div>
        <div className='stat-label'>Concurrency: {formatPercent(state.concurrency)}</div>
      </div>

      <div className='card'>
        <span className='data-tag tag-planning'>CALCULATED PLANNING</span>
        <div className='card-title' style={{ marginTop: '8px' }}>Recommended Hosts</div>
        <div className='stat-value'>{formatNumber(state.recommendedHosts)}</div>
        <div className='stat-label'>Base: {state.baseHosts} + Buffer: {formatPercent(state.safetyBuffer)}</div>
      </div>

      <div className='card'>
        <span className='data-tag tag-telemetry'>SIMULATED TELEMETRY</span>
        <div className='card-title' style={{ marginTop: '8px' }}>Active Sessions</div>
        <div className='stat-value'>{formatNumber(state.activeSessions)}</div>
        <div className='stat-label'>Workload Profile: {state.workloadProfile}</div>
      </div>

      <div className='card'>
        <span className='data-tag tag-telemetry'>SIMULATED TELEMETRY</span>
        <div className='card-title' style={{ marginTop: '8px' }}>Running Hosts</div>
        <div className='stat-value'>{formatNumber(state.runningHosts)}</div>
        <div className='stat-label'>Autoscale Status: {state.autoscaleState}</div>
      </div>
    </div>
  );
}
