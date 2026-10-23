import fs from 'fs';
import path from 'path';

const LOG_FILE = path.join(process.cwd(), 'campaign_history.json');

export interface CampaignLog {
  id: string;
  time: string;
  category: string;
  severity: string;
  hash: string;
  status: string;
  prompt: string;
}

export function getStoredCampaigns(): CampaignLog[] {
  try {
    if (fs.existsSync(LOG_FILE)) {
      const data = fs.readFileSync(LOG_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to read campaign logs', err);
  }
  return [];
}

export function saveCampaignLog(log: Omit<CampaignLog, 'id'>) {
  const logs = getStoredCampaigns();
  const newLog = { id: Math.random().toString(36).substring(7), ...log };
  logs.unshift(newLog);
  try {
    fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
  } catch (err) {
    console.error('Failed to save campaign log', err);
  }
  return newLog;
}