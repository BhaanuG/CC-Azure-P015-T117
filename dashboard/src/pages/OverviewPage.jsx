import React from 'react';
import { useSimulation } from '../context/SimulationContext';

import CapacityOverview from '../components/CapacityOverview';
import Charts from '../components/Charts';

export default function OverviewPage() {
  const { state } = useSimulation();

  return (
    <div>
      <div className='hp-section'>
        <div className='az-banner-problem'>
          <div className='az-banner-title'>PROBLEM STATEMENT & OBJECTIVES — END USER COMPUTING (EUC) LAB</div>
          <div className='az-banner-body'>
            Deliver high-performance CAD/engineering software to <strong>50 concurrent students</strong> accessing from <strong>personal BYOD devices</strong>.<br />
            <strong>Target Bottlenecks Resolved:</strong> (1) Sizing host pools for heavy graphics workloads without over-provisioning cost. (2) Eliminating FSLogix profile storage bottlenecks during 50-user concurrent login storms.
          </div>
        </div>
      </div>

      <div className='hp-section'>
        <div className='hp-section-header'>
          <div className='hp-section-title'>Real-Time System Health & Capacity Overview</div>
        </div>
        <CapacityOverview />
      </div>

      <div className='hp-section'>
        <div className='hp-section-header'>
          <div className='hp-section-title'>Continuous Session & Scaling Streams</div>
        </div>
        <Charts />
      </div>

      <div className='hp-section'>
        <div className='hp-section-header'>
          <div className='hp-section-title'>Azure Remote Resource Deployment Profile</div>
        </div>
        <div className='card'>
          <table className='hp-detail-table'>
            <thead>
              <tr>
                <th>Resource Name</th>
                <th>Azure Resource Type</th>
                <th>SKU / Configuration</th>
                <th>Deployment Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: '600', color: 'var(--az-text-primary)' }}>vdpool-avd-hackathon-p015</td>
                <td>Microsoft.DesktopVirtualization/hostpools</td>
                <td>Pooled / Depth-First / {state.workloadProfile}</td>
                <td><span className='status-indicator normal'>TARGET CONFIGURATION</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: '600', color: 'var(--az-text-primary)' }}>stavdf12pfs01share</td>
                <td>Microsoft.Storage/storageAccounts/fileServices</td>
                <td>Azure Files Premium SSD ({state.storageCapacity} IOPS)</td>
                <td><span className={'status-indicator ' + (state.bottleneckState === 'NORMAL' ? 'normal' : 'critical')}>{state.bottleneckState} (SIMULATED)</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: '600', color: 'var(--az-text-primary)' }}>avd-scaling-plan-p015</td>
                <td>Microsoft.DesktopVirtualization/scalingPlan</td>
                <td>Depth-First (1 to 10 Hosts, 75% Threshold)</td>
                <td><span className='status-indicator normal'>TARGET CONFIGURATION</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
