import React from 'react';
import { useSimulation } from '../context/SimulationContext';

import { formatPercent } from '../utils/formatters';

export default function GraphicsWorkloadCard() {
  const { state, updateConfig } = useSimulation();

  return (
    <div className='card'>
      <div className='card-title'>
        <span>GRAPHICS WORKLOAD MODEL</span>
        <span className='data-tag tag-telemetry'>SIMULATED TELEMETRY</span>
      </div>
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
          Select Workload Profile SKU:
        </label>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            className={state.workloadProfile === 'STANDARD' ? 'btn btn-primary' : 'btn btn-secondary'}
            onClick={() => updateConfig({ workloadProfile: 'STANDARD', sessionsPerHost: 10 })}
          >
            STANDARD (D4ds_v5)
          </button>
          <button
            className={state.workloadProfile === 'GRAPHICS' ? 'btn btn-primary' : 'btn btn-secondary'}
            onClick={() => updateConfig({ workloadProfile: 'GRAPHICS', sessionsPerHost: 5 })}
          >
            GRAPHICS (NV6ads_A10_v5)
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <div className='stat-label'>CPU Pressure</div>
          <div className='stat-value' style={{ fontSize: '1.5rem', marginTop: '4px' }}>{formatPercent(state.cpuPressure / 100)}</div>
        </div>

        <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <div className='stat-label'>RAM Pressure</div>
          <div className='stat-value' style={{ fontSize: '1.5rem', marginTop: '4px' }}>{formatPercent(state.ramPressure / 100)}</div>
        </div>

        <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <div className='stat-label'>GPU Frame Rate Pressure</div>
          <div className='stat-value' style={{ fontSize: '1.5rem', marginTop: '4px' }}>{formatPercent(state.gpuPressure / 100)}</div>
        </div>

        <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <div className='stat-label'>VRAM Framebuffer Pressure</div>
          <div className='stat-value' style={{ fontSize: '1.5rem', marginTop: '4px' }}>{formatPercent(state.vramPressure / 100)}</div>
        </div>
      </div>
    </div>
  );
}
