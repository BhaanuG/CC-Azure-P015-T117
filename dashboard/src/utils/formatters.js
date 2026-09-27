export function formatNumber(val) {
  return typeof val === 'number' ? val.toLocaleString() : val;
}

export function formatPercent(val) {
  if (val === undefined || val === null || isNaN(val)) return '0%';
  let num = val;
  if (typeof val === 'number') {
    if (val <= 1 && val > 0) {
      num = Math.round(val * 100);
    } else {
      num = Math.round(val);
    }
  }
  return `${num}%`;
}

export function formatMs(val) {
  return typeof val === 'number' ? `${val.toFixed(1)} ms` : val;
}
