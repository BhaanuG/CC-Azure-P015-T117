param location string = 'eastus'
param resourcePrefix string = 'avd-lab'

var uniqueStorageName = take(replace('${toLower(resourcePrefix)}stg${uniqueString(resourceGroup().id)}', '-', ''), 24)

resource storage 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: uniqueStorageName
  location: location
  tags: {
    prefix: resourcePrefix
  }
  sku: {
    name: 'Premium_LRS'
  }
  kind: 'FileStorage'
  properties: {
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
  }
}

resource fileServices 'Microsoft.Storage/storageAccounts/fileServices@2023-01-01' = {
  parent: storage
  name: 'default'
}

// Simulator assumes 3,000 / 20,000 IOPS scenarios for FSLogix profile container load modeling.
// Actual Azure Files IOPS should be configured according to the selected Azure Files provisioning model
// (e.g. provisioned v1/v2 IOPS limits) and validated against workload requirements.
resource fslogixShare 'Microsoft.Storage/storageAccounts/fileServices/shares@2023-01-01' = {
  parent: fileServices
  name: 'fslogix-profiles'
  properties: {
    shareQuota: 100
    enabledProtocols: 'SMB'
  }
}

output storageAccountId string = storage.id
output storageAccountName string = storage.name
output shareName string = fslogixShare.name