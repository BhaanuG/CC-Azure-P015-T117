param location string = 'eastus'
param resourcePrefix string = 'avd-lab'
param hostPoolId string = ''

resource scalingPlan 'Microsoft.DesktopVirtualization/scalingPlans@2023-09-05' = {
  name: '${resourcePrefix}-scaling-plan'
  location: location
  tags: {
    prefix: resourcePrefix
  }
  properties: {
    friendlyName: 'Engineering Lab Autoscale Policy'
    description: 'Autoscale policy for engineering student lab peak and off-peak hours'
    timeZone: 'Eastern Standard Time'
    hostPoolType: 'Pooled'
    exclusionTag: 'ExcludeFromAutoscale'
    schedules: [
      {
        name: 'WeekdayEngineeringLab'
        daysOfWeek: [
          'Monday'
          'Tuesday'
          'Wednesday'
          'Thursday'
          'Friday'
        ]
        rampUpStartTime: {
          hour: 8
          minute: 0
        }
        rampUpLoadBalancingAlgorithm: 'DepthFirst'
        rampUpMinimumHostsPct: 20
        rampUpCapacityThresholdPct: 75
        peakStartTime: {
          hour: 9
          minute: 30
        }
        peakLoadBalancingAlgorithm: 'DepthFirst'
        rampDownStartTime: {
          hour: 17
          minute: 0
        }
        rampDownLoadBalancingAlgorithm: 'DepthFirst'
        rampDownMinimumHostsPct: 10
        rampDownCapacityThresholdPct: 90
        rampDownForceLogoffUsers: false
        rampDownWaitTimeMinutes: 15
        rampDownNotificationMessage: 'Your lab session is scaling down in 15 minutes. Please save your work.'
        offPeakStartTime: {
          hour: 19
          minute: 0
        }
        offPeakLoadBalancingAlgorithm: 'DepthFirst'
      }
    ]
    hostPoolReferences: !empty(hostPoolId) ? [
      {
        hostPoolArmPath: hostPoolId
        scalingPlanEnabled: true
      }
    ] : []
  }
}

output scalingPlanId string = scalingPlan.id
output scalingPlanName string = scalingPlan.name
