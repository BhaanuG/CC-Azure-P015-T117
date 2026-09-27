import React from 'react';
import { useSimulation } from '../context/SimulationContext';

export default function AutoscaleTimeline() {
  const {
 state } = useSimulation();


  return (
    <div className="card">
      <div className="card-title">
        <span>AUTOSCALE EVENT TIMELINE</span>
        <span className="data-tag tag-telemetry">SIMULATED EVENTS</span>
      </div>
      <div className="timeline-list">
        {state.autoscaleEvents.length === 0 ? (
          <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.85rm' }}>
            No scaling events recorded yet.
          </div>
        ) : (
          state.autoscaleEvents.map((evt, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-timestamp">{evt.timestamp} - {evt.action}</div>
              <div>{evt.reason} (Hosts: {evt.previousHosts ?? evt.prevHosts} → {evt.newHosts})</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
