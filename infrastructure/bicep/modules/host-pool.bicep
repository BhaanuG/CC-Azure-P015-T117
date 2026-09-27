param location string = 'eastus'
param resourcePrefix string = 'avd-lab'
param maxSessionLimit int = 10
param loadBalancerType string = 'BreadthFirst'
param tokenExpirationTime string = dateTimeAdd(utcNow(), 'PT2H')

resource hostPool 'Microsoft.DesktopVirtualization/hostPools@2023-09-05' = {
  name: '${resourcePrefix}-hp'
  location: location
  tags: {
    prefix: resourcePrefix
  }
  properties: {
    friendlyName: 'Engineering Lab Pooled Host Pool'
    description: 'Pooled host pool for engineering workloads'
    hostPoolType: 'Pooled'
    loadBalancerType: loadBalancerType
    maxSessionLimit: maxSessionLimit
    preferredAppGroupType: 'Desktop'
    validationEnvironment: false
    startVMOnConnect: true
    registrationInfo: {
      expirationTime: tokenExpirationTime
      registrationTokenOperation: 'Update'
    }
  }
}

// Note: Host Pool registration token path and session-host registration extension are included in Bicep architecture.
// End-to-end host registration requires deployment-time validation in an active Azure subscription.
output hostPoolId string = hostPool.id
output hostPoolName string = hostPool.name
@secure()
output registrationToken string = hostPool.properties.registrationInfo.token