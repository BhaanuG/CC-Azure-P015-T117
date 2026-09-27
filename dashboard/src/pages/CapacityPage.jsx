import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { calculateSizing } from '../engine/sizingEngine';
import { formatPercent } from '../utils/formatters';

import HostSizingCard from '../components/HostSizingCard';
import GraphicsWorkloadCard from '../components/GraphicsWorkloadCard';

export default function CapacityPage() {
  const { state } = useSimulation();

  const stdSizing = calculateSizing(
    state.students,
    Math.round(state.concurrency * 100),
    10,
    Math.round(state.safetyBuffer * 100)
  );

  const gfxSizing = calculateSizing(
    state.students,
    Math.round(state.concurrency * 100),
    5,
    Math.round(state.safetyBuffer * 100)
  );

  return (
    <div>
      <div className='hp-section'>
        <div className='hp-section-header'>
          <div className='hp-section-title'>Host Sizing & Graphics Workload Density Model</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <HostSizingCard />
        <GraphicsWorkloadCard />
      </div>

      <div className='hp-section'>
        <div className='hp-section-header'>
          <div className='hp-section-title'>Azure Virtual Machine SKU Comparison Matrix</div>
        </div>
        <div className='card'>
          <table className='hp-detail-table'>
            <thead>
              <tr>
                <th>VM SKU</th>
                <th>vCPU / RAM</th>
                <th>GPU Acceleration</th>
                <th>Max Sessions / Host</th>
                <th>Recommended Hosts (For {state.activeSessions} Target Active Users)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: state.workloadProfile === 'STANDARD' ? 'rgba(2, 132, 199, 0.12)' : 'transparent' }}>
                <td style={{ fontWeight: '600', color: 'var(--az-text-primary)' }}>Standard_D4ds_v5</td>
                <td>4 vCPU / 16 GiB RAM</td>
                <td>None (CPU Rendering)</td>
                <td>10 sessions/host</td>
                <td><strong>{stdSizing.recommendedHosts} Hosts</strong> (Base {stdSizing.baseHosts} + {formatPercent(state.safetyBuffer)} Buffer)</td>
              </tr>
              <tr style={{ backgroundColor: state.workloadProfile === 'GRAPHICS' ? 'rgba(2, 132, 199, 0.12)' : 'transparent' }}>
                <td style={{ fontWeight: '600', color: 'var(--az-text-primary)' }}>Standard_NV6ads_A10_v5</td>
                <td>6 vCPU / 55 GiB RAM</td>
                <td>1/6 NVIDIA A10 (4GB VRAM)</td>
                <td>5 sessions/host</td>
                <td><strong>{gfxSizing.recommendedHosts} Hosts</strong> (Base {gfxSizing.baseHosts} + {formatPercent(state.safetyBuffer)} Buffer)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
