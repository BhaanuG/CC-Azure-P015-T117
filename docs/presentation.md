# Azure AVD Lab Capacity and Bottleneck Simulator - Pitch Deck
**Problem ID:** 24CC3046-P015 | **Category:** End User Computing
**Team:** T015, T117, T219 (12 Members)

---
### SLIDE 1: Title and Problem Statement
- **Topic:** Delivering Engineering Desktop Infrastructure to 50 Students.
- **Speaking Script:** "Good morning judges! Today we present our Azure Virtual Desktop Pooled Host Pool capacity and bottleneck simulator designed specifically for engineering labs. Our objective is to evaluate session host sizing and profile storage bottlenecks for 50 concurrent students accessing software from personal BYOD devices."

### SLIDE 2: Use Cases and Target Audience
- **Use Case 1:** Delivering CAD, GIS, and 3D modeling tools to 50 target students.
- **Use Case 2:** BYOD HTML5 Web Client access across Mac, Windows, and Chromebooks.
- **Speaking Script:** "Students need access to heavy engineering suites from low-powered personal laptops. Our AVD target architecture delivers high-performance virtual desktops streamed over standard web browsers."

### SLIDE 3: Key Engineering Bottlenecks
- **Bottleneck 1:** Session host VM sizing and GPU density allocation.
- **Bottleneck 2:** FSLogix profile container IOPS storage bottlenecks during logon storms.
- **Speaking Script:** "Virtual desktop labs traditionally fail due to two bottlenecks: host sizing under-estimation causing user slowdowns and FSLogix storage bottlenecks when 50 students log in simultaneously during class starts."

### SLIDE 4: Target Azure Architecture
- **Components:** BYOD Clients -> AVD Web Client -> Pooled Host Pool -> FSLogix SMB Shares -> Log Analytics.
- **Speaking Script:** "Our target architecture utilizes a Pooled Host Pool backed by Azure Files SMB Storage and native AVD Autoscale plans decoupling user state from compute hosts."

### SLIDE 5: Module 1 - Session Host Sizing Engine
- **Formula:** expectedUsers = ceil(Students * Concurrency); recommendedHosts = ceil(BaseHosts * 1.20).
- **Speaking Script:** "We built a dynamic sizing model. For 50 students at 70% planning concurrency, our model calculates 5 standard hosts or 9 graphics-intensive hosts with a 20% safety margin."

### SLIDE 6: Module 2 - Graphics Workload Analyzer
- **Profiles:** Standard (4 vCPU) vs Graphics (NV6ads_A10_v5 | 1/6 A10 GPU | 4GB VRAM).
- **Speaking Script:** "Our graphics workload analyzer models CPU, RAM, and VRAM pressure, modeling why 5 sessions per host is a strong planning assumption for GPU workloads."

### SLIDE 7: Module 3 - FSLogix Logon Storm Simulator
- **Simulation:** 0 to 50 concurrent profile attachments against provisioned Azure Files IOPS.
- **Speaking Script:** "To evaluate the storage bottleneck, we simulated 50-user logon storms. Our model demonstrates how provisioning Premium Azure Files storage mitigates queue latency spikes."

### SLIDE 8: Module 4 - Simulated AVD Autoscale Engine
- **Scaling:** Low (1 host) -> Medium (3 hosts) -> High (4-5 hosts).
- **Speaking Script:** "Our autoscale engine dynamically models host scaling during class hours and scaling down off-peak to optimize operational cloud costs."

### SLIDE 9: Module 5 - Live Dashboard and Simulator Demo
- **Control Center:** React web-based control dashboard with scenario presets (DEMO 1 - DEMO 5).
- **Speaking Script:** "Let us move to our live React dashboard simulator to demonstrate preset scenarios 1 through 5."

### SLIDE 10: Module 6 - Target Bicep IaC Templates
- **IaC:** Subscription-level Bicep templates for target Azure deployment.
- **Speaking Script:** "While our demo operates offline in Local Demo Mode, our complete Bicep IaC modules compile cleanly for future Azure subscription deployment."

### SLIDE 11: Security and Cost Guardrails
- **Security:** Entra ID MFA, RBAC policies, TLS 1.2 SMB streams.
- **Speaking Script:** "Security is designed with Entra ID authentication and role-based access control ensuring credentials are secure."

### SLIDE 12: Future Azure Roadmap
- **Roadmap:** Multi-region profile distribution and Intune device management.
- **Speaking Script:** "Thank you for your time. Our architecture model is ready for validation as soon as Azure cloud subscriptions are provisioned."

### SLIDE 13: Summary and Q&A
- **Summary:** BYOD support, storage bottleneck mitigation, autoscale cost control.
- **Speaking Script:** "Thank you! We welcome your questions."
