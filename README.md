# Azure AVD Lab Capacity and Bottleneck Simulator
**Problem ID:** 24CC3046-P015 | **Category:** End User Computing
**Teams:** T015, T117, T219 (12 Members) | **Capacity:** 50 Students Target
**Location:** E:\Azure-AVD-Hackathon\

---
## Executive Summary
This application is a **Real Working Interactive Simulation Engine** designed to evaluate session host sizing and FSLogix storage bottlenecks for 50 engineering students accessing lab software from personal BYOD devices.

---
## How the Simulator Works
1. **Centralized Scenario Engine (`dashboard/src/data/demoScenarios.js`):** Structured scenario objects store parameters for 5 distinct presentation presets.
2. **React + Vite Frontend Calculation Engine (`dashboard/src/`):** Interactive sliders and scenario buttons feed directly into active JavaScript calculation engines (`sizingEngine`, `fslogixEngine`, `graphicsEngine`, `autoscaleEngine`).
3. **Dynamic FSLogix Logon Storm Simulator:** Models SMB profile attach IOPS demand against provisioned Azure Files storage limits, dynamically calculating latency and triggering NORMAL or CRITICAL BOTTLENECK states.
4. **Simulated AVD Autoscale Engine:** Real-time event log tracks host expansion and deallocation triggers across a 24-hour lab usage cycle.
5. **Honest Data Transparency:** All metrics are explicitly labeled as SIMULATED PLANNING DATA or CALCULATED PLANNING DATA. Deployment mode is explicitly set to LOCAL DEMO MODE.

---
## What Data is Simulated vs Target Architecture
- **Calculated Planning Data:** Sizing mathematical formulas (expectedUsers, baseHosts, recommendedHosts), seat capacity math, and autoscale host counts.
- **Simulated Workload Telemetry:** CPU pressure, RAM pressure, VRAM utilization, FSLogix SMB profile disk queue latency, and storage IOPS demand.
- **Target Azure IaC Architecture:** Production-ready Bicep templates (`infrastructure/bicep/main.bicep`) provision virtual networks, host pools, desktop application groups, AVD workspaces, session host VM arrays (`hostCount`), native AVD scaling plans, and Log Analytics diagnostic settings.

---
## Quick Start Instructions

### 1. Launch Interactive React Dashboard
```powershell
cd E:\Azure-AVD-Hackathon\dashboard
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

To build for production:
```powershell
npm run build
npm run preview
```

### 2. Run Azure Readiness Check
```powershell
.\scripts\azure-readiness.ps1
```

### 3. Run Component Validation Suite
```powershell
.\scripts\validate.ps1
```

### 4. Validate Bicep IaC Templates
```powershell
az bicep build --file .\infrastructure\bicep\main.bicep
```