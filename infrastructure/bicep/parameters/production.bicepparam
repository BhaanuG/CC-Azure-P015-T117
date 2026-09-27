using '../main.bicep'

param location = 'eastus'
param environment = 'production'
param resourceGroupName = 'rg-avd-hackathon-p015'
param resourcePrefix = 'avd-lab'
param maxSessionLimit = 5
param loadBalancerType = 'BreadthFirst'
param vmSize = 'Standard_D4s_v5'
param hostCount = 9