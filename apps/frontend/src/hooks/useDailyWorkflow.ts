import { useState, useEffect } from 'react';
import { WorkflowData } from '../types/workflow';
import { safeGetStorage, safeSetStorage, safeRemoveStorage } from '../lib/storage';
import { getFormattedDate, calculateDaysDifference } from '../lib/dateUtils';

const WORKFLOW_KEY = 'celo_pulse_daily_workflow';
const defaultData: WorkflowData = { lastCheckIn: null, currentStreak: 0, totalCheckIns: 0, points: 0 };

export function useDailyWorkflow() {
  const [data, setData] = useState<WorkflowData>(defaultData);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = safeGetStorage(WORKFLOW_KEY, defaultData);
    
    if (stored.lastCheckIn) {
      const lastDate = new Date(stored.lastCheckIn);
      const today = new Date();
      const diffDays = calculateDaysDifference(lastDate, today);
      
      if (diffDays > 2) {
        stored.currentStreak = 0; 
      }
    }
    
    setData(stored);
    setLoaded(true);
  }, []);

  const checkIn = () => {
    const today = getFormattedDate();
    if (data.lastCheckIn === today) return; 
    
    const newData = { ...data, lastCheckIn: today, currentStreak: data.currentStreak + 1, totalCheckIns: data.totalCheckIns + 1, points: data.points + 10 };
    setData(newData);
    safeSetStorage(WORKFLOW_KEY, newData);
  };

  const reset = () => {
    setData(defaultData);
    safeRemoveStorage(WORKFLOW_KEY);
  };

  return { data, loaded, checkIn, reset };
}
