import React from 'react';
import { useSimulation } from '../context/SimulationContext';

export default function ScenarioControls() {
  const { scenarios, currentScenarioId, loadScenario } = useSimulation();

  return (
    <div className="card" style={{ marginBottom: '20px' }}>
      <div className="card-title">
        <span>SELECT DEMO SCENARIO</span>
        <span className="data-tag tag-planning">CONFIGURABLE WORKLOAD MODEL</span>
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {scenarios.map((sc) => (
          <button
            key={sc.id}
            className={currentScenarioId === sc.id ? 'btn btn-primary' : 'btn btn-secondary'}
            onClick={() => loadScenario(sc.id)}
          >
            {sc.name}
          </button>
        ))}
      </div>
    </div>
  );
}
