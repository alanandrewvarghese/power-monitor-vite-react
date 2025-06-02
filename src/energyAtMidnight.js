// src/energyAtMidnight.js
// Fetches and stores energy-at-midnight data on app startup

let energyAtMidnight = {
  date: null,
  energyConsumptionAtMidnight: null,
  energyProductionAtMidnight: null,
  loaded: false
};

export async function loadEnergyAtMidnight() {
  try {
    const res = await fetch('http://192.168.1.94:8001/summary/energy-at-midnight');
    if (!res.ok) throw new Error('Failed to fetch energy-at-midnight');
    const data = await res.json();
    energyAtMidnight = { ...data, loaded: true };
  } catch (e) {
    console.error('Error loading energy-at-midnight:', e);
  }
}

export function getEnergyAtMidnight() {
  return energyAtMidnight;
}
