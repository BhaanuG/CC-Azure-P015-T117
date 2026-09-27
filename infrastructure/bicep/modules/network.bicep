param location string = 'eastus'
param resourcePrefix string = 'avd-lab'

resource vnet 'Microsoft.Network/virtualNetworks@2023-05-01' = {
  name: '${resourcePrefix}-vnet'
  location: location
  tags: {
    prefix: resourcePrefix
  }
  properties: {
    addressSpace: {
      addressPrefixes: [
        '10.0.0.0/16'
      ]
    }
    subnets: [
      {
        name: 'snet-avd-hosts'
        properties: {
          addressPrefix: '10.0.1.0/24'
          networkSecurityGroup: {
            id: nsg.id
          }
        }
      }
      {
        name: 'snet-storage'
        properties: {
          addressPrefix: '10.0.2.0/24'
        }
      }
    ]
  }
}

resource nsg 'Microsoft.Network/networkSecurityGroups@2023-05-01' = {
  name: '${resourcePrefix}-nsg'
  location: location
  properties: {
    securityRules: [
      {
        name: 'AllowAVDInbound'
        properties: {
          priority: 1000
          access: 'Allow'
          direction: 'Inbound'
          protocol: 'Tcp'
          sourcePortRange: '*'
          destinationPortRange: '443'
          sourceAddressPrefix: '*'
          destinationAddressPrefix: '*'
        }
      }
    ]
  }
}

output vnetId string = vnet.id
output subnetHostsId string = vnet.properties.subnets[0].id
output subnetStorageId string = vnet.properties.subnets[1].id