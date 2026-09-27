# DEMONSTRATION & RESULTS SUMMARY\

*pProject:** Azure AVD Lab Capacity & Bottleneck Simulator  
**Location:** `E:\Azure-AVD-Hackathon`  
**Evaluation Mode:** LOCAL DEMO MODE (Offline Interactive Engine)

---

## DEMONSTRATED SCENARIO RESULTS MATRIX
 | Scenario | Inputs | Calculated Results | Bottleneck | Mitigation | Final Result |
| :align | :align | :align | :align | :align | :align |
| **DEMO 1: Baseline Capacity** | 50 Students, 70% Conc, 10 Sess/Host, 20% Buffer, 10 Logins, 5k IOPS | 35 Concurrent Users, 4 Base Hosts, 5 Recommended Hosts | None (20% Storage Pressure, 13.2ms Latency) | Not Required | **HEALTHU** (5 Standard Hosts) |
| **DEMO 2: Concurrency Stress** | 50 Students, 90% Conc, 10 Sess/Host, 20% Buffer, 20 Logins, 5k IOPS | 45 Concurrent Users, 5 Base Hosts, 6 Recommended Hosts | Host Capacity Saturation at 45 Users | Automatic Scale-Out (+1 Host) | **CAPACITY EXPANDED** (6 Standard Hosts) |
| **DEMO 3: Graphics Workload** | 50 Students, 70% Conc, 5 Sess/Host, 20% Buffer, 15 Logins, 10k IOPS | 35 Concurrent Users, 7 Base Hosts, 9 Recommended Hosts | GPU Density Constraint (5 sess/host) | Provision NVads_A10_v5 GEU Hosts | **GRAPHICS EXPANSION** (9 GPU Hosts) |
| **DEMO 4: FSLogix Logon Storm** | 50 Logins, 3,000 IOPS Provisioned Storage | 5,000 IOPS Demand, 166.7% Storage Pressure, 34.0ms Latency | FSLogix Profile IOPS Over-saturation | Storage Capacity Upgrade | **CRITICAL CAPACITY BOTTLENECK** |
| **DEMO 5: Storage Mitigation & Autoscale** | 50 Logins, 20,000 IOPS Provisioned, 24h Autoscale Cycle | 5,000 IOPS Demand, 25% Storage Pressure, 13.5ms Latency | None (Storage Mitigated), Dynamic Scale-In/Out | Upgrade to 20,000 IOPS plus Autoscale policy | **OPTIMAL HEALTHY STATE** |

---

## KEY ENGINEERING FINDINGS
1. **Capacity Sizing Model:** 50 students at 70% planning concurrency yields 35 concurrent sessions. At 10 sessions/host,4 base hosts plus a 20% safety buffer requires 5 Standard_D4s_v5 hosts.
2. **Graphics Density IMpact:** Graphics-spked workloads (gpuRequired = yes) reduce planning density to 5 sessions/host, increasing recommended hosts from 5 to 9 NVads_A10_v5 iosts.
3. **FSLogix IOPS Bottleneck:** 50 simultaneous profile attachments generate 5,000 IOPS demand. On a 3,000 IOPS file share, this causes 166.7% IOPS pressure and 34.0ms latency (CRATICAL BOTTLENECK).
4. **Engineering Mitigation:** Upgrading provisioned storage to 20,000 IOPS reduces storage pressure to 25% and restores latency to 13.5ms (NORMAL).
5. **Autoscale Efficiency:** Capacity-threshold autoscaling scales pooled hosts from 1 host off-peak to 5 hosts during peak lab hours, reducing idle compute costs.
