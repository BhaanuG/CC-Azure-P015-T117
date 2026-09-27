import React from 'react';
import { useSimulation } from '../context/SimulationContext';

import { formatPercent } from '../utils/formatters';

export default function HostSizingCard() {
  const { state, updateConfig } = useSimulation();

  return (
    <div className='card'>
      <div className='card-title'>
        <span>HOST SIZING CALCULATOR</span>
        <span className='data-tag tag-planning'>PLANNING ENGINE</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Total Enrolled Students</span>
            <strong style={{ color: 'var(--text-main)' }}>{state.students} Students</strong>
          </div>
          <input
            type='range'
            min='10'
            max='200'
            step='10'
            value={state.students}
            onChange={(e) => updateConfig({ students: parseInt(e.target.value) })}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Concurrency Ratio</span>
            <strong style={{ color: 'var(--text-main)' }}>{formatPercent(state.concurrency)}</strong>
          </div>
          <input
            type='range'
            min='10'
            max='100'
            step='5'
            value={Math.round(state.concurrency * 100)}
            onChange={(e) => updateConfig({ concurrency: parseInt(e.target.value) })}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Max Sessions Per Host</span>
            <strong style={{ color: 'var(--text-main)' }}>{state.sessionsPerHost} Sessions/Host</strong>
          </div>
          <input
            type='range'
            min='2'
            max='20'
            step='1'
            value={state.sessionsPerHost}
            onChange={(e) => updateConfig({ sessionsPerHost: parseInt(e.target.value) })}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Safety Buffer</span>
            <strong style={{ color: 'var(--text-main)' }}>{formatPercent(state.safetyBuffer)}</strong>
          </div>
          <input
            type='range'
            min='0'
            max='50'
            step='5'
            value={Math.round(state.safetyBuffer * 100)}
            onChange={(e) => updateConfig({ safetyBuffer: parseInt(e.target.value) })}
          />
        </div>
      </div>
    </div>
  );
}
