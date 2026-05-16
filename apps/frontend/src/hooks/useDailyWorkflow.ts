import { useState, useEffect } from 'react';
import { WorkflowData } from '../types/workflow';
import { safeGetStorage, safeSetStorage, safeRemoveStorage } from '../lib/storage';
import { getFormattedDate, calculateDaysDifference } from '../lib/dateUtils';
import { WORKFLOW_STORAGE_KEY, WORKFLOW_POINTS_PER_CHECKIN, WORKFLOW_MAX_MISSED_DAYS } from '../constants/workflow';

const defaultData: WorkflowData = { lastCheckIn: null, currentStreak: 0, totalCheckIns: 0, points: 0 };

export function useDailyWorkflow() {
  const [data, setData] = useState<WorkflowData>(defaultData);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = safeGetStorage(WORKFLOW_STORAGE_KEY, defaultData);
    
    if (stored.lastCheckIn) {
      const lastDate = new Date(stored.lastCheckIn);
      const today = new Date();
      const diffDays = calculateDaysDifference(lastDate, today);
      
      if (diffDays > WORKFLOW_MAX_MISSED_DAYS) {
        stored.currentStreak = 0; 
      }
    }
    
    setData(stored);
    setLoaded(true);
  }, []);

  const checkIn = () => {
    const today = getFormattedDate();
    if (data.lastCheckIn === today) return; 
    
    const newData = { ...data, lastCheckIn: today, currentStreak: data.currentStreak + 1, totalCheckIns: data.totalCheckIns + 1, points: data.points + WORKFLOW_POINTS_PER_CHECKIN };
    setData(newData);
    safeSetStorage(WORKFLOW_STORAGE_KEY, newData);
  };

  const reset = () => {
    setData(defaultData);
    safeRemoveStorage(WORKFLOW_STORAGE_KEY);
  };

  return { data, loaded, checkIn, reset };
}
