# AVD Autoscale Configuration & Scaling Plan

Native AVD scaling plans govern session host power management based on capacity thresholds.
- **Load Balancing:** Breadth-First
- **MaxSessionLimit:** 10 (Configurable workload parameter)
- **Capacity Threshold:** 70% before trigger
- **Off-Peak:** Scale down to 1 minimum running host