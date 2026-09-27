export function calculateAutoscaleState(activeSessions, maxSessions) {
  const sess = parseInt(activeSessions) || 0;
  const max = parseInt(maxSessions) || 10;

  const requiredHosts = Math.max(1, Math.ceil(sess / max));

  const schedule = [
    { time: '08:00', sessions: 8, trigger: 'Morning Lab Opening (Min Pool)' },
    { time: '09:30', sessions: 18, trigger: 'Class Arrival - Threshold 75% Exceeded' },
    { time: '10:45', sessions: 35, trigger: 'Mid-Morning Peak Concurrency' },
    { time: '11:30', sessions: 45, trigger: 'Exam Hour Concurrency Spike' },
    { time: '13:00', sessions: 25, trigger: 'Lunch Hour Ramp-Down Timeout' },
    { time: '17:00', sessions: 8, trigger: 'Evening End of Lab Closure' }
  ];

  let prevHosts = 1;
  const events = schedule.map(item => {
    const needed = Math.max(1, Math.ceil(item.sessions / max));
    let action = 'STABLE CAPACITY';
    let type = 'info';

    if (needed > prevHosts) {
      action = `SCALE OUT ${prevHosts} → ${needed} HOSTS`;
      type = 'scale-out';
    } else if (needed < prevHosts) {
      action = `SCALE IN ${prevHosts} → ${needed} HOSTS`;
      type = 'scale-in';
    }

    const eventObj = {
      timestamp: item.time,
      sessions: item.sessions,
      sessionDemand: item.sessions,
      previousHosts: prevHosts,
      prevHosts: prevHosts,
      newHosts: needed,
      action,
      type,
      reason: item.trigger
    };

    prevHosts = needed;
    return eventObj;
  });

  const status = 'STABLE (DYNAMIC DEPTH-FIRST)';

  return { requiredHosts, status, events };
}

