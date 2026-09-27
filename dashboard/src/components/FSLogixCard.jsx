import React from 'react';
import { useSimulation } from '../context/SimulationContext';

import { formatNumber, formatPercent, formatMs } from '../utils/formatters';

export default function FSLogixCard() {
  const {
 state, updateConfig } = useSimulation();

  const getStatusClass = (status) => {
    if (status === 'NORMAL') return 'normal';
    if (status === 'WARNING') return 'warning';
    return 'critical';
  };

  return (
    <div className="card">
      <div className="card-title">
        <span>FSLOGIX PROFILE STORAGE TELEMETRY</span>
        <span className="data-tag tag-telemetry">SIMULATED STORAGE</span>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '0.85rm', color: 'var(--text-muted)', marginBottom: '4px' }}>
          Concurrent Logins (Storm Simulation): {state.fslogixLogins}
        </label>
        <input
          type="range"
          min="1"
          max="50"
          step="1"
          value={state.fslogixLogins}
          onChange={(e) => updateConfig({ fslogixLogins: parseInt(e.target.value) })}
          style={{ width: '100%' }}
        />
      </div>

      <div className="grid-2" style={{ gap: '12px' }}>
        <div>
          <div className="stat-label">IOPS Demand</div>
          <div className="stat-value" style={{ fontSize: '1.25rm' }}>{formatNumber(state.iopsDemand)} IOPS</div>
        </div>
        <div>
          <div className="stat-label">Storage Pressure</div>
          <div className="stat-value" style={{ fontSize: '1.25rm' }}>{formatPercent(state.storagePressure / 100)}</div>
        </div>
        <div>
          <div className="stat-label">Attach Latency</div>
          <div className="stat-value" style={{ fontSize: '1.25rm' }}>{formatMs(state.latency)}</div>
        </div>
        <div>
          <div className="stat-label">Bottleneck State</div>
          <span className={'status-indicator ' + getStatusClass(state.bottleneckState)}>
            ‗ {state.bottleneckState}
          </span>
        </div>
      </div>
    </div>
  );
}
