import React from 'react';
import { useSimulation } from '../context/SimulationContext';

export default function Header() {
  const { isSimulating, lastTickTime, toggleSimulation, resetSimulation } = useSimulation();

  return (
    <div>
      <header className='hp-header-bar'>
        <div className='hp-title-area'>
          <div>
            <div className='hp-breadcrumb'>Microsoft Azure Portal / Virtual Desktop Services</div>
            <h1>AVD EUC Engineering Lab — Capacity & Bottleneck Analytics</h1>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '0.8rem', textAlign: 'right' }}>
            <div style={{ color: isSimulating ? 'var(--az-status-success-text)' : 'var(--az-status-warning-text)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: isSimulating ? 'var(--az-status-success-text)' : 'var(--az-status-warning-text)' }}></span>
              {isSimulating ? 'LIVE STREAM ACTIVE' : 'PAUSED'}
            </div>
            <div style={{ color: 'var(--az-text-muted)', fontSize: '0.75rem', marginTop: '2px' }}>Last Sync: {lastTickTime || 'N/A'}</div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className={isSimulating ? 'btn btn-secondary' : 'btn btn-primary'} onClick={toggleSimulation}>
              {isSimulating ? 'PAUSE STREAM' : 'RESUME STREAM'}
            </button>
            <button className='btn btn-secondary' onClick={resetSimulation}>
              RESET MODEL
            </button>
          </div>
        </div>
      </header>

      <div className='hp-metadata-strip'>
        <div className='hp-metadata-item'>Deployment Mode: <strong>LOCAL DEMO</strong></div>
        <div className='hp-metadata-item'>Azure Subscription: <strong>NOT CONNECTED</strong></div>
        <div className='hp-metadata-item'>Resource Group: <strong>TARGET: rg-avd-hackathon-p015</strong></div>
        <div className='hp-metadata-item'>Region: <strong>TARGET: East US</strong></div>
        <div className='hp-metadata-item'>Telemetry Mode: <strong>SIMULATED / CALCULATED DATA</strong></div>
      </div>
    </div>
  );
}
