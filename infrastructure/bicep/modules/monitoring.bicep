param location string = 'eastus'
param resourcePrefix string = 'avd-lab'
param hostPoolId string = ''
param storageAccountId string = ''

resource logAnalytics 'Microsoft.OperationalInsights/workspaces@2022-10-01' = {
  name: '${resourcePrefix}-law'
  location: location
  tags: {
    prefix: resourcePrefix
  }
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 30
  }
}

resource hostPool 'Microsoft.DesktopVirtualization/hostPools@2023-09-05' existing = if (!empty(hostPoolId)) {
  name: last(split(hostPoolId, '/'))
}

resource hostPoolDiag 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = if (!empty(hostPoolId)) {
  name: '${resourcePrefix}-hp-diag'
  scope: hostPool
  properties: {
    workspaceId: logAnalytics.id
    logs: [
      {
        categoryGroup: 'allLogs'
        enabled: true
      }
    ]
  }
}

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' existing = if (!empty(storageAccountId)) {
  name: last(split(storageAccountId, '/'))
}

resource storageDiag 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = if (!empty(storageAccountId)) {
  name: '${resourcePrefix}-stg-diag'
  scope: storageAccount
  properties: {
    workspaceId: logAnalytics.id
    metrics: [
      {
        category: 'Transaction'
        enabled: true
      }
    ]
  }
}

output logAnalyticsId string = logAnalytics.id
output logAnalyticsName string = logAnalytics.name