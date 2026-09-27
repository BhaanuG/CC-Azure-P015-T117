import React from 'react';
import { useSimulation } from '../context/SimulationContext';

import { formatNumber, formatPercent, formatMs } from '../utils/formatters';

export default function ResultsPanel() {
  const { state } = useSimulation();


  return (
    <div className="card" style={{ marginBottom: '20px' }}>
      <div className="card-title">
        <span>EXECUTIVE CAPACITY & BOTTLENECK REPORT'</span>
        <span className="data-tag tag-planning">ENGINEERING SUMMARY</span>
      </div>

      <div className="grid-2" style={{ gap: '20px' }}>
        <div style={{ backgroundColor: '#1a2234', padding: '16px', borderRadius: '6px' }}>
          <h4 style={{ color: 'var(--accent-blue)', marginBottom: '12px' }}>CALCULATED PLANNING DATA</h4>
          <ul style={{ listStyle: 'none', lineHeight: '1.8', fontSize: '0.9rm' }}>
            <li>Total Enrolled Students: <strong>{formatNumber(state.students)}</strong></li>
            <li>Concurrency Ratio: <strong>{formatPercent(state.concurrency)}</strong></li>
            <li>Active Session Target: <strong>{formatNumber(Math.ceil(state.students * state.concurrency))}</strong></li>
            <li>Base Host Count: <strong>{state.baseHosts} hosts</strong></li>
            <li>Recommended Hosts (+{formatPercent(state.safetyBuffer)} buffer): <strong>{state.recommendedHosts} hosts</strong></li>
          </ul>
        </div>


        <div style={{ backgroundColor: '#1a2234', padding: '16px', borderRadius: '6px' }}>
          <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '12px' }}>SIMULATED TELEMETRY</h4>
          <ul style={{ listStyle: 'none', lineHeight: '1.8', fontSize: '0.9rm' }}>
            <li>Active Simulated Sessions: <strong>{state.activeSessions}</strong></li>
            <li>Running Session Hosts: <strong>{state.runningHosts}</strong></li>
            <li>CPU / RAM Pressure: <strong>{formatPercent(state.cpuPressure / 100)} / {formatPercent(state.ramPressure / 100)}</strong></li>
            <li>FSLogix Attach Latency: <strong>{formatMs(state.latency)}</strong></li>
            <li>FSLogix Bottleneck State: <strong>{state.bottleneckState}</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
