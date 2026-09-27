param location string = 'eastus'
param resourcePrefix string = 'avd-lab'
param hostPoolId string = ''
param workspaceName string = ''

resource appGroup 'Microsoft.DesktopVirtualization/applicationGroups@2023-09-05' = {
  name: '${resourcePrefix}-dag'
  location: location
  tags: {
    prefix: resourcePrefix
  }
  properties: {
    friendlyName: 'Engineering Desktop Group'
    applicationGroupType: 'Desktop'
    hostPoolArmPath: hostPoolId
  }
}

resource workspaceAssociation 'Microsoft.DesktopVirtualization/workspaces/applicationGroups@2023-09-05' = if (!empty(workspaceName)) {
  name: '${workspaceName}/${appGroup.name}'
}

output appGroupId string = appGroup.id
output appGroupName string = appGroup.name