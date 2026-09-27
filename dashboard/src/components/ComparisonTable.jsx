import React from 'react';
import { DEMO_SCENARIOS } from '../data/demoScenarios';
import { runSimulationAudit } from '../engine/simulationEngine';
import { formatPercent, formatMs } from '../utils/formatters';

export default function ComparisonTable() {
  const scenarioKeys = ['demo1', 'demo2', 'demo3', 'demo4', 'demo5'];

  const rows = scenarioKeys.map(key => {
    const s = DEMO_SCENARIOS[key];
    const concurrency = s.concurrency ?? 70;
    const audit = runSimulationAudit({
      students: s.students,
      concurrency,
      profile: s.profile,
      maxSessions: s.maxSessions,
      safetyBuffer: s.safetyBuffer,
      gfxIntensity: s.gfxIntensity,
      gpuRequired: s.gpuRequired,
      logins: s.logins,
      storageIops: s.storageIops
    });

    return {
      id: s.id,
      name: s.name,
      students: s.students,
      concurrency: `${concurrency}%`,
      activeUsers: audit.sizing.expectedUsers,
      profile: s.profile.toUpperCase(),
      baseHosts: audit.sizing.baseHosts,
      recommendedHosts: audit.sizing.recommendedHosts,
      storageDemand: `${audit.fslogix.iopsDemand} IOPS`,
      storageCapacity: `${s.storageIops} IOPS`,
      storagePressure: formatPercent(audit.fslogix.storagePressure / 100),
      latency: formatMs(audit.fslogix.latency),
      status: audit.fslogix.status
    };
  });

  return (
    <div className="card">
      <div className="card-title">
        <span>DEMO SCENARIO COMPARISON MATRIX</span>
        <span className="data-tag tag-planning">ENGINEERING BENCHMARKS</span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="hp-detail-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '10px' }}>Scenario</th>
              <th style={{ padding: '10px' }}>Students / Concurrency</th>
              <th style={{ padding: '10px' }}>Active Target</th>
              <th style={{ padding: '10px' }}>SKU Profile</th>
              <th style={{ padding: '10px' }}>Hosts (Base + Buffer)</th>
              <th style={{ padding: '10px' }}>FSLogix Pressure (Demand / Cap)</th>
              <th style={{ padding: '10px' }}>Attach Latency</th>
              <th style={{ padding: '10px' }}>Storage Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} style={{ borderBottom: '1px solid #1f2937' }}>
                <td style={{ padding: '10px', fontWeight: '600' }}>{row.name}</td>
                <td style={{ padding: '10px' }}>{row.students} ({row.concurrency})</td>
                <td style={{ padding: '10px' }}>{row.activeUsers} Users</td>
                <td style={{ padding: '10px' }}>{row.profile}</td>
                <td style={{ padding: '10px' }}><strong>{row.recommendedHosts} Hosts</strong> (Base {row.baseHosts})</td>
                <td style={{ padding: '10px' }}>{row.storagePressure} ({row.storageDemand} / {row.storageCapacity})</td>
                <td style={{ padding: '10px', fontWeight: '600' }}>{row.latency}</td>
                <td style={{ padding: '10px' }}>
                  <span className={'status-indicator ' + (row.status === 'NORMAL' ? 'normal' : 'critical')}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
