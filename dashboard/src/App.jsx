import React, { useState } from 'react';
import Header from './components/Header';
import OverviewPage from './pages/OverviewPage';
import CapacityPage from './pages/CapacityPage';
import FSLogixPage from './pages/FSLogixPage';
import Demonstration from './pages/Demonstration';
import Architecture from './pages/Architecture';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const getNavClass = (tab) => {
    return activeTab === tab ? 'nav-item active' : 'nav-item';
  };

  return (
    <div className='app-container'>
      <Header />
      <div className='main-layout'>
        <nav className='sidebar'>
          <div className='nav-section-title'>Core Analytics</div>
          <button className={getNavClass('overview')} onClick={() => setActiveTab('overview')}>Overview & Health</button>
          <button className={getNavClass('capacity')} onClick={() => setActiveTab('capacity')}>Capacity & GPU Sizing</button>
          <button className={getNavClass('fslogix')} onClick={() => setActiveTab('fslogix')}>FSLogix Profile Storage</button>

          <div className='nav-section-title' style={{ marginTop: '24px' }}>Evaluation & Design</div>
          <button className={getNavClass('autoscale')} onClick={() => setActiveTab('autoscale')}>Scenarios & Results</button>
          <button className={getNavClass('architecture')} onClick={() => setActiveTab('architecture')}>Azure Architecture</button>
        </nav>

        <main className='content-area'>
          {activeTab === 'overview' && <OverviewPage />}
          {activeTab === 'capacity' && <CapacityPage />}
          {activeTab === 'fslogix' && <FSLogixPage />}
          {activeTab === 'autoscale' && <Demonstration />}
          {activeTab === 'architecture' && <Architecture />}
        </main>
      </div>
    </div>
  );
}
