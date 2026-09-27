import React from 'react';
import { useSimulation } from '../context/SimulationContext';

import FSLogixCard from '../components/FSLogixCard';
import AutoscaleTimeline from '../components/AutoscaleTimeline';

export default function FSLogixPage() {
  const { state, updateConfig } = useSimulation();

  return (
    <div>
      <div className='hp-section'>
        <div className='hp-section-header'>
          <div className='hp-section-title'>FSLogix Profile Container Storage & Login Storm Model</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <FSLogixCard />
        <AutoscaleTimeline />
      </div>

      <div className='hp-section'>
        <div className='hp-section-header'>
          <div className='hp-section-title'>FSLogix Storage Capacity & Mitigation Controls</div>
        </div>
        <div className='card'>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <strong style={{ color: 'var(--az-text-primary)' }}>Provisioned Azure Files Premium SSD IOPS Capacity:</strong>
              <span style={{ marginLeft: '8px', color: 'var(--az-blue-light)', fontWeight: '700' }}>{state.storageCapacity} IOPS</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className={state.storageCapacity === 3000 ? 'btn btn-primary' : 'btn btn-secondary'}
                onClick={() => updateConfig({ storageIops: 3000 })}
              >
                3,000 IOPS (Baseline)
              </button>
              <button
                className={state.storageCapacity === 20000 ? 'btn btn-primary' : 'btn btn-secondary'}
                onClick={() => updateConfig({ storageIops: 20000 })}
              >
                20,000 IOPS (Mitigated)
              </button>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--az-text-secondary)', lineHeight: '1.6' }}>
            FSLogix profile containers are mounted over SMB from Azure Files Premium. During a 50-user login storm, attach IOPS demand reaches 5,000 IOPS. If the file share is provisioned at 3,000 IOPS, pressure spikes to 166.7%, causing latency to soar to 34.0ms (CRITICAL). Upgrading provisioned IOPS to 20,000 IOPS drops pressure to 25% and restores latency to 13.5ms (NORMAL).
          </p>
        </div>
      </div>
    </div>
  );
}
