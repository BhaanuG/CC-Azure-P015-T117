using '../main.bicep'

param location = 'eastus'
param environment = 'demo'
param resourceGroupName = 'rg-avd-hackathon-p015'
param resourcePrefix = 'avd-lab'
param maxSessionLimit = 10
param loadBalancerType = 'BreadthFirst'
param vmSize = 'Standard_D2s_v5'
param hostCount = 1