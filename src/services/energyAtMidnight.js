// src/energyAtMidnight.js
// Fetches and stores energy-at-midnight data on app startup

import axios from 'axios';

let energyAtMidnight = {
  date: null,
  energyConsumptionAtMidnight: null,
  energyProductionAtMidnight: null,
  loaded: false
};

export async function loadEnergyAtMidnight() {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/summary/energy-at-midnight`);
    const data = res.data;
    energyAtMidnight = { ...data, loaded: true };
  } catch (e) {
    console.error('Error loading energy-at-midnight:', e);
  }
}

export function getEnergyAtMidnight() {
  return energyAtMidnight;
}
