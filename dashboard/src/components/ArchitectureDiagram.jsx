import React from 'react';

export default function ArchitectureDiagram() {
  return (
    <div className="card">
      <div className="card-title">
        <span>AZURE AVD ARCHITECTURE TOPOLOGY</span>
        <span className="data-tag tag-planning">TARGET AZURE DESIGN</span>
      </div>
      <div style={{ padding: '20px', backgroundColor: '#0d1321', borderRadius: '6px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ border: '1px solid var(--primary)', padding: '12px 20px', borderRadius: '6px', backgroundColor: '#111827' }}>
            <strong>BYOD / End Users</strong>
            <div style={{ fontSize: '0.75rm', color: 'var(--text-muted)' }}>HTML5 / Workspace App</div>
          </div>
          <div style={{ color: 'var(--accent-cyan)' }}>➅</div>
          <div style={{ border: '1px solid var(--primary)', padding: '12px 20px', borderRadius: '6px', backgroundColor: '#111827' }}>
            <strong>AVD Workspace</strong>
            <div style={{ fontSize: '0.75rm', color: 'var(--text-muted)' }}>App Group (Desktop)</div>
          </div>
          <div style={{ color: 'var(--accent-cyan)' }}>❡</div>
          <div style={{ border: '1px solid var(--primary)', padding: '12px 20px', borderRadius: '6px', backgroundColor: '#111827' }}>
            <strong>Pooled Host Pool</strong>
            <div style={{ fontSize: '0.75rm', color: 'var(--text-muted)' }}>Depth-first Autoscale</div>
          </div>
          <div style={{ color: 'var(--accent-cyan)' }}>❡</div>
          <div style={{ border: '1px solid var(--primary)', padding: '12px 20px', borderRadius: '6px', backgroundColor: '#111827' }}>
            <strong>FSLogix Container</strong>
            <div style={{ fontSize: '0.75rm', color: 'var(--text-muted)' }}>Azure Files Premium Share</div>
          </div>
        </div>
      </div>
    </div>
  );
}
