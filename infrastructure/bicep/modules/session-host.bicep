param location string = 'eastus'
param resourcePrefix string = 'avd-lab'
param subnetId string
param vmSize string = 'Standard_D2s_v5'
param adminUsername string = 'azureuser'
@secure()
param adminPassword string
param hostCount int = 1
param hostPoolName string = ''
param registrationToken string = ''

resource nic 'Microsoft.Network/networkInterfaces@2023-05-01' = [for i in range(0, hostCount): {
  name: '${resourcePrefix}-nic-${padLeft(i + 1, 2, '0')}'
  location: location
  tags: {
    prefix: resourcePrefix
  }
  properties: {
    ipConfigurations: [
      {
        name: 'ipconfig1'
        properties: {
          subnet: {
            id: subnetId
          }
          privateIPAllocationMethod: 'Dynamic'
        }
      }
    ]
  }
}]

resource vm 'Microsoft.Compute/virtualMachines@2023-07-01' = [for i in range(0, hostCount): {
  name: '${resourcePrefix}-vm-${padLeft(i + 1, 2, '0')}'
  location: location
  tags: {
    prefix: resourcePrefix
  }
  properties: {
    hardwareProfile: {
      vmSize: vmSize
    }
    osProfile: {
      computerName: take('avdhost${padLeft(i + 1, 2, '0')}', 15)
      adminUsername: adminUsername
      adminPassword: adminPassword
    }
    storageProfile: {
      imageReference: {
        publisher: 'MicrosoftWindowsDesktop'
        offer: 'office-365'
        sku: 'win11-23h2-avd-m365'
        version: 'latest'
      }
      osDisk: {
        createOption: 'FromImage'
        managedDisk: {
          storageAccountType: 'StandardSSD_LRS'
        }
      }
    }
    networkProfile: {
      networkInterfaces: [
        {
          id: nic[i].id
        }
      ]
    }
  }
}]

resource avdAgentExtension 'Microsoft.Compute/virtualMachines/extensions@2023-07-01' = [for i in range(0, hostCount): if (!empty(hostPoolName) && !empty(registrationToken)) {
  parent: vm[i]
  name: 'AVDAgentInstaller'
  location: location
  properties: {
    publisher: 'Microsoft.Powershell'
    type: 'DSC'
    typeHandlerVersion: '2.73'
    autoUpgradeMinorVersion: true
    settings: {
      modulesUrl: 'https://wvdportalstorageblob.blob.core.windows.net/galleryartifacts/Configuration_1.0.02507.246.zip'
      configurationFunction: 'Configuration.ps1\\AddSessionHost'
      properties: {
        hostPoolName: hostPoolName
        registrationInfoToken: registrationToken
      }
    }
  }
}]

output vmIds array = [for i in range(0, hostCount): vm[i].id]
output vmNames array = [for i in range(0, hostCount): vm[i].name]