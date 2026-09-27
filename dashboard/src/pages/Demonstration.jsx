import React from 'react';
import ScenarioControls from '../components/ScenarioControls';
import ResultsPanel from '../components/ResultsPanel';
import ComparisonTable from '../components/ComparisonTable';

export default function Demonstration() {
  return (
    <div>
      <ScenarioControls />
      <ResultsPanel />
      <ComparisonTable />
    </div>
  );
}
