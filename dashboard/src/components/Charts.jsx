import React from 'react';
import { useSimulation } from '../context/SimulationContext';

export default function Charts() {
  const { state } = useSimulation();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '24px' }}>
      <div className='card'>
        <div className='card-title'>
          <span>Live Session Demand Stream</span>
          <span className='data-tag tag-telemetry'>SIMULATED TELEMETRY</span>
        </div>
        <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', gap: '8px', padding: '12px', backgroundColor: 'var(--az-bg-table-header)', borderRadius: '6px', border: '1px solid var(--az-border-subtle)' }}>
          {state.autoscaleEvents.slice(-10).map((evt, idx) => (
            <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: '100%',
                  height: (evt.sessionDemand / 50) * 140 + 'px',
                  backgroundColor: 'var(--az-blue)',
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.3s ease-in-out'
                }}
              />
              <span style={{ fontSize: '0.7rem', color: 'var(--az-text-muted)', marginTop: '6px' }}>{evt.sessionDemand}s</span>
            </div>
          ))}
          {state.autoscaleEvents.length === 0 && (
            <div style={{ margin: 'auto', color: 'var(--az-text-muted)', fontSize: '0.85rem' }}>Awaiting telemetry stream ticks...</div>
          )}
        </div>
      </div>

      <div className='card'>
        <div className='card-title'>
          <span>Host Auto-Scaling Stream</span>
          <span className='data-tag tag-telemetry'>SIMULATED CAPACITY</span>
        </div>
        <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', gap: '8px', padding: '12px', backgroundColor: 'var(--az-bg-table-header)', borderRadius: '6px', border: '1px solid var(--az-border-subtle)' }}>
          {state.autoscaleEvents.slice(-10).map((evt, idx) => (
            <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: '100%',
                  height: (evt.newHosts / 10) * 140 + 'px',
                  backgroundColor: 'var(--az-blue-light)',
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.3s ease-in-out'
                }}
              />
              <span style={{ fontSize: '0.7rem', color: 'var(--az-text-muted)', marginTop: '6px' }}>{evt.newHosts}h</span>
            </div>
          ))}
          {state.autoscaleEvents.length === 0 && (
            <div style={{ margin: 'auto', color: 'var(--az-text-muted)', fontSize: '0.85rem' }}>Awaiting telemetry stream ticks...</div>
          )}
        </div>
      </div>
    </div>
  );
}
