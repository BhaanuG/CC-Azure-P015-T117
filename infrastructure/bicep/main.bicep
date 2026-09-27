targetScope = 'subscription'

@description('Azure region for all resources')
param location string = 'eastus'

@description('Environment name (demo or production)')
@allowed([
  'demo'
  'production'
])
param environment string = 'demo'

@description('Name of the resource group')
param resourceGroupName string = 'rg-avd-hackathon-p015'

@description('Prefix for resource names')
param resourcePrefix string = 'avd-lab'

@description('Host pool max session limit per host')
param maxSessionLimit int = 10

@description('Host pool load balancer type')
param loadBalancerType string = 'BreadthFirst'

@description('Admin username for session host VM')
param adminUsername string = 'azureuser'

@description('Admin password for session host VM')
@secure()
param adminPassword string

@description('VM SKU size for session host')
param vmSize string = 'Standard_D2s_v5'

@description('Number of session host VMs to deploy')
param hostCount int = 1

resource rg 'Microsoft.Resources/resourceGroups@2023-07-01' = {
  name: resourceGroupName
  location: location
  tags: {
    project: 'avd-lab'
    problemId: '24CC3046-P015'
    environment: environment
    plannedHostCount: string(hostCount)
    managedBy: 'bicep'
  }
}

module network 'modules/network.bicep' = {
  name: 'networkDeployment'
  scope: rg
  params: {
    location: location
    resourcePrefix: resourcePrefix
  }
}

module storage 'modules/storage-fslogix.bicep' = {
  name: 'storageDeployment'
  scope: rg
  params: {
    location: location
    resourcePrefix: resourcePrefix
  }
}

module avdWorkspace 'modules/avd-workspace.bicep' = {
  name: 'avdWorkspaceDeployment'
  scope: rg
  params: {
    location: location
    resourcePrefix: resourcePrefix
  }
}

module hostPool 'modules/host-pool.bicep' = {
  name: 'hostPoolDeployment'
  scope: rg
  params: {
    location: location
    resourcePrefix: resourcePrefix
    maxSessionLimit: maxSessionLimit
    loadBalancerType: loadBalancerType
  }
}

module appGroup 'modules/app-group.bicep' = {
  name: 'appGroupDeployment'
  scope: rg
  params: {
    location: location
    resourcePrefix: resourcePrefix
    hostPoolId: hostPool.outputs.hostPoolId
    workspaceName: avdWorkspace.outputs.workspaceName
  }
}

module sessionHost 'modules/session-host.bicep' = {
  name: 'sessionHostDeployment'
  scope: rg
  params: {
    location: location
    resourcePrefix: resourcePrefix
    subnetId: network.outputs.subnetHostsId
    vmSize: vmSize
    adminUsername: adminUsername
    adminPassword: adminPassword
    hostCount: hostCount
    hostPoolName: hostPool.outputs.hostPoolName
    registrationToken: hostPool.outputs.registrationToken
  }
}

module scalingPlan 'modules/scaling-plan.bicep' = {
  name: 'scalingPlanDeployment'
  scope: rg
  params: {
    location: location
    resourcePrefix: resourcePrefix
    hostPoolId: hostPool.outputs.hostPoolId
  }
}

module monitoring 'modules/monitoring.bicep' = {
  name: 'monitoringDeployment'
  scope: rg
  params: {
    location: location
    resourcePrefix: resourcePrefix
    hostPoolId: hostPool.outputs.hostPoolId
    storageAccountId: storage.outputs.storageAccountId
  }
}

output resourceGroupName string = rg.name
output hostPoolName string = hostPool.outputs.hostPoolName
output workspaceName string = avdWorkspace.outputs.workspaceName
output storageAccountName string = storage.outputs.storageAccountName