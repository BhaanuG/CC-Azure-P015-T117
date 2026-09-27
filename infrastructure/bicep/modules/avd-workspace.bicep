param location string = 'eastus'
param resourcePrefix string = 'avd-lab'

resource workspace 'Microsoft.DesktopVirtualization/workspaces@2023-09-05' = {
  name: '${resourcePrefix}-ws'
  location: location
  tags: {
    prefix: resourcePrefix
  }
  properties: {
    friendlyName: 'Engineering Lab AVD Workspace'
    description: 'AVD Workspace providing engineering applications to 50 students'
  }
}

output workspaceId string = workspace.id
output workspaceName string = workspace.name