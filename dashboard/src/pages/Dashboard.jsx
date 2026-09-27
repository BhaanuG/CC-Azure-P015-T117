import React from 'react';
import CapacityOverview from '../components/CapacityOverview';
import HostSizingCard from '../components/HostSizingCard';
import GraphicsWorkloadCard from '../components/GraphicsWorkloadCard';
import FSLogixCard from '../components/FSLogixCard';
import AutoscaleTimeline from '../components/AutoscaleTimeline';
import Charts from '../components/Charts';

export default function Dashboard() {
  return (
    <div>
      <CapacityOverview />
      <Charts />
      <div className="grid-2" style={{ marginBottom: '20px' }}>
        <HostSizingCard />
        <GraphicsWorkloadCard />
      </div>
      <div className="grid-2">
        <FSLogixCard />
        <AutoscaleTimeline />
      </div>
    </div>
  );
}
