# Azure Virtual Desktop (AVD) Pooled Host Pool for Engineering Lab
> **Problem ID:** 24CC3046-P015 | **Category:** End User Computing (EUC)  
> **Teams:** T015, T117, T219 | **Capacity Target:** 50 Concurrent Students  
> **Repository:** [https://github.com/BhaanuG/CC-Azure-P015-T117.git](https://github.com/BhaanuG/CC-Azure-P015-T117.git)

---

## 📌 Executive Summary

Maintaining 50 identical physical engineering lab workstations equipped with high-end CPUs, RAM, and dedicated GPUs is costly, time-consuming, and difficult to manage. Students require access to heavy engineering software (CAD, GIS, 3D modeling) from personal **Bring Your Own Device (BYOD)** laptops (Mac, Windows, Chromebooks).

This project delivers a complete **Azure Virtual Desktop (AVD) Pooled Host Pool Solution** featuring:
1. **Interactive Real-Time React + Vite Simulator Dashboard**: Evaluates session host capacity sizing, GPU density pressure, FSLogix logon storms, and autoscale host scaling across 5 interactive demo scenarios.
2. **Production-Ready Bicep Infrastructure-as-Code (IaC)**: Subscription-level modular Bicep templates deploying virtual networks, Azure Files Premium SSD storage, host pools, desktop application groups, AVD workspaces, multi-VM session host arrays (`hostCount`), native AVD scaling plans, and Log Analytics diagnostic telemetry.

---

## 👥 Team & Contributions

| Member Name | Student ID | Role & Responsibilities | Key Deliverables |
| :--- | :--- | :--- | :--- |
| **Gali Bhaanu** | `2400030952` | **Lead Developer & Solution Architect** | React + Vite dashboard architecture, simulation engine integration, Azure architecture design. |
| **Chagamreddy Lakshmi Narayana Reddy** | `2400030862` | **Cloud Infrastructure & Deployment** | Modular Bicep IaC templates, AVD host pool & session host sizing, deployment readiness. |
| **Patibandla Aruna** | `2400030829` | **Storage, FSLogix & Monitoring** | FSLogix profile container IOPS & latency math model, Azure Files storage architecture, Log Analytics. |
| **Ambati Lokesh Reddy** | `2400030826` | **Testing, Documentation & Demonstration** | Automated validation scripts (`validate.ps1`, `azure-readiness.ps1`), scenario benchmarks, deck & demo support. |

---

## 🎯 Key Engineering Challenges & Solutions

### 1. Bottleneck 1: Session Host Sizing & GPU Density Contention
- **Problem:** Over-provisioning CPU/GPU VMs creates massive cloud cost waste, while under-provisioning causes session lag during lab hours.
- **Solution:** Configurable sizing engine comparing **Standard CPU VMs (`Standard_D4ds_v5` @ 10 sessions/host)** against **GPU-Accelerated VMs (`Standard_NV6ads_A10_v5` with 1/6 NVIDIA A10 GPU @ 5 sessions/host)**.

### 2. Bottleneck 2: FSLogix Profile Container Logon Storms
- **Problem:** When 50 students log in simultaneously at the start of a lab class, concurrent SMB profile container mounts saturate storage IOPS, causing disk queue bottlenecks and long login delays.
- **Solution:** Mathematical SMB IOPS demand model (`logins × 100 IOPS/attachment`). Demonstrates how upgrading provisioned Azure Files storage from **3,000 IOPS** to **20,000 IOPS** drops attach latency from **34.0 ms (CRITICAL)** to **13.5 ms (NORMAL)**.

---

## 🧮 Mathematical Engine Formulas

### A. Host Sizing Mathematics
$$\text{Expected Active Users } (U_c) = \lceil \text{Total Enrolled Students} \times \text{Concurrency Ratio} \rceil$$
$$\text{Base Hosts } (H_{\text{base}}) = \lceil \frac{U_c}{\text{Max Sessions Per Host}} \rceil$$
$$\text{Recommended Hosts } (H_{\text{rec}}) = \lceil H_{\text{base}} \times (1 + \text{Safety Buffer}) \rceil$$

### B. FSLogix Attach Latency & Storage Pressure Model
$$\text{IOPS Demand } (D_{\text{iops}}) = \text{Concurrent Logins} \times 100 \text{ IOPS/attachment}$$
$$\text{Storage Pressure Ratio } (P) = \frac{D_{\text{iops}}}{\text{Provisioned IOPS Capacity}}$$

- **Normal State ($P \le 100\%$):**
  $$\text{Latency (ms)} = 12.0 \times (1 + 0.5 \times P)$$
- **Critical Bottleneck State ($P > 100\%$):**
  $$\text{Latency (ms)} = 12.0 \times (1 + 0.5 \times P + 0.05 \times (P \times 100 - 100))$$

---

## 📊 Presentation Demo Scenarios

| Scenario Preset | Target Users | Base Hosts | Rec. Hosts | FSLogix Demand / Cap | Latency | Storage Status |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **DEMO 1: Baseline Capacity** | 35 Users | 4 Hosts | 5 Hosts | 1,000 / 5,000 IOPS (20%) | **13.2 ms** | **NORMAL** |
| **DEMO 2: Concurrency Stress Spike** | 45 Users | 5 Hosts | 6 Hosts | 2,000 / 5,000 IOPS (40%) | **14.4 ms** | **NORMAL** |
| **DEMO 3: Graphics Workload** | 35 Users | 7 Hosts | 9 Hosts | 1,500 / 10,000 IOPS (15%) | **12.9 ms** | **NORMAL** |
| **DEMO 4: 50-User Logon Storm** | 50 Users | 5 Hosts | 6 Hosts | 5,000 / 3,000 IOPS (166.7%) | **34.0 ms** | **CRITICAL** |
| **DEMO 5: Storage Mitigation** | 35 Users | 4 Hosts | 5 Hosts | 5,000 / 20,000 IOPS (25%) | **13.5 ms** | **NORMAL** |

---

## 🏗️ Azure Bicep IaC Architecture

```text
infrastructure/bicep/
├── main.bicep                     # Subscription-scoped orchestration template
├── main.json                      # Compiled ARM template output
├── parameters/
│   ├── demo.bicepparam            # Demo environment parameters (1 Session Host)
│   └── production.bicepparam      # Production environment parameters (9 Session Hosts)
└── modules/
    ├── network.bicep              # VNet (10.0.0.0/16), Host Subnet, Storage Subnet, NSG
    ├── storage-fslogix.bicep      # Azure Files Premium SSD SMB Share for FSLogix
    ├── avd-workspace.bicep        # Microsoft.DesktopVirtualization/workspaces
    ├── host-pool.bicep            # Pooled Host Pool & Registration Token Generation
    ├── app-group.bicep            # Desktop Application Group & Workspace Association
    ├── session-host.bicep         # Session Host VM Array loop [for i in range(0, hostCount)]
    ├── scaling-plan.bicep         # Native AVD Autoscale Scaling Plan schedule
    └── monitoring.bicep           # Log Analytics Workspace & Diagnostic Settings
```

### Highlights of Bicep Quality & Hardening:
- **Multi-VM Provisioning Loop**: `session-host.bicep` uses `[for i in range(0, hostCount): ...]` to provision exact VM and NIC resource arrays.
- **Prefix Naming Convention**: Standardized resource naming using `${resourcePrefix}-...` (`avd-lab-vnet`, `avd-lab-hp`, `avd-lab-vm-01`).
- **AVD Host Pool Registration**: Automated registration token generation and PowerShell AVD Agent DSC extension joining session hosts to the host pool.
- **Security Best Practices**: Zero hardcoded plaintext passwords in parameters; inputs use `@secure()` parameter types.

---

## 🖼️ Presentation Slides

All presentation slide assets are stored in the [`presentation/`](./presentation/) directory:

- [`slide1_title.png`](./presentation/slide1_title.png) — Title: Azure Virtual Desktop Pooled Host Pool for a Lab
- [`slide2_team_contributions.png`](./presentation/slide2_team_contributions.png) — Team & Contributions
- [`slide3_problem_statement.png`](./presentation/slide3_problem_statement.png) — Problem Statement
- [`slide4_proposed_solution.png`](./presentation/slide4_proposed_solution.png) — Proposed Solution — Azure Virtual Desktop (AVD)
- [`slide5_why_pooled_host_pool.png`](./presentation/slide5_why_pooled_host_pool.png) — Why a Pooled Host Pool?
- [`slide6_architecture_flow.png`](./presentation/slide6_architecture_flow.png) — Architecture Flow (Student → Workspace → Host Pool → Session Hosts)
- [`slide7_student_access_workflow.png`](./presentation/slide7_student_access_workflow.png) — Student Access Workflow
- [`slide8_session_host_design.png`](./presentation/slide8_session_host_design.png) — Session Host Design Guidelines
- [`slide9_graphics_workloads_challenge.png`](./presentation/slide9_graphics_workloads_challenge.png) — Graphics Workloads — Major Challenge
- [`slide10_fslogix_profile_containers.png`](./presentation/slide10_fslogix_profile_containers.png) — FSLogix Profile Containers
- [`slide11_storage_bottleneck_fslogix.png`](./presentation/slide11_storage_bottleneck_fslogix.png) — Storage Bottleneck — FSLogix Profile Containers

---

## 💻 Quick Start & How to Run

### 1. Run the Interactive React Dashboard UI

```powershell
cd dashboard
npm install
npm run dev
```
Open **`http://localhost:3000/`** (or `http://localhost:5173/`) in your web browser.

### 2. Run Automated Component Validation

```powershell
.\scripts\validate.ps1
```
Executes automated Bicep compilation checks and React Vite production build validation (`npm run build`).

### 3. Run Azure Environment Readiness Check

```powershell
.\scripts\azure-readiness.ps1
```
Validates Azure CLI version, Bicep compiler engine status, and Azure connection state.

### 4. Validate Bicep Templates via Azure CLI

```powershell
az bicep build --file .\infrastructure\bicep\main.bicep
```

---

## 📜 Disclosure & Data Honesty

- **Local Demo Mode**: The dashboard runs locally in `LOCAL DEMO MODE`. Capacity calculations, graphics telemetry, FSLogix disk latency, and autoscale schedules are generated by JavaScript calculation engines.
- **Azure Deployment State**: Bicep IaC templates compile with 0 errors and represent the target Azure architecture. End-to-end cloud deployment requires deployment-time validation in an active Azure subscription.

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE for details.