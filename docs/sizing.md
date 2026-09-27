# Session Host Sizing Model & Workload Profiling
**Problem ID:** 24CC3046-P015

## Sizing Mathematical Formula
- **Concurrent Users ($):**  = \text{Total Students} \times \text{Concurrency Ratio}$
- **Base Host Count ({base}$):** {base} = \lceil U_c / \text{Max Sessions Per Host} \rceil$
- **Total Hosts with Buffer ({total}$):** {total} = \lceil H_{base} \times (1 + \text{Safety Buffer}) \rceil$

## Workload Profiles
1. **Profile 1 (Standard CAD/Engineering):** 4 vCPU, 16GB RAM (Standard_D4s_v5), 10 users/host limit.
2. **Profile 2 (Graphics Intensive / 3D Rendering):** 6 vCPU, 55GB RAM, NVIDIA A10 GPU (Standard_NV6ads_A10_v5), 5 users/host limit.
