import React from 'react';
import ArchitectureDiagram from '../components/ArchitectureDiagram';

export default function Architecture() {
  return (
    <div>
      <ArchitectureDiagram />
      <div className="card" style={{ marginTop: '20px' }}>
        <div className="card-title">
          <span>AZURE INTEGRATION ROADMAP</span>
          <span className="data-tag tag-planning">AZURE READI</span>
        </div>
        <div style={{ lineHeight: '1.8', fontSize: '0.9rm', color: 'var(--text-muted)' }}>
          <p>
            This application is architected with a decoupled <strong>SimulationProvider</strong> layer. When an active Azure subscription is available, the provider layer can be seamlessly replaced with an <strong>AzureProvider</strong> connected to Azure Monitor & Log Analytics REST APIs without modifying any UI components.
          </p>
          <div style={{ marginTop: '16px', display: 'flex', gap: '16px' }}>
            <span className="status-indicator warning">‗ this Azure Connection: Not Connected</span>
            <span className="status-indicator normal">‗ MODE: LOCAL EMO / LIVE SIMULATION</span>
          </div>
        </div>
      </div>
    </div>
  );
}
