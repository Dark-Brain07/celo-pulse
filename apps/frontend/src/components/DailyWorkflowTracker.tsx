'use client';
import React from 'react';
import { useDailyWorkflow } from '../hooks/useDailyWorkflow';
import { dispatchTxSuccess } from '../lib/txEvents';

export default function DailyWorkflowTracker() {
  const { data, loaded, checkIn, reset } = useDailyWorkflow();

  const handleCheckIn = () => {
    checkIn();
    dispatchTxSuccess({
      hash: "local-" + Math.random().toString(36).substring(2, 11),
      method: "dailyCheckIn",
      contractAddress: "local-workflow-tracker",
      timestamp: Date.now(),
      pointsEarned: 10
    });
  };

  if (!loaded) {
    return (
      <div style={{ padding: '24px 32px', textAlign: 'center', color: '#94a3b8' }}>
        Loading workflow data...
      </div>
    );
  }

  const today = new Date().toISOString().split('T')[0];
  const hasCheckedIn = data.lastCheckIn === today;

  return (
    <div style={{ 
      padding: '24px 32px', 
      background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.8) 100%)', 
      borderRadius: 16, 
      border: '1px solid rgba(99, 102, 241, 0.3)', 
      marginBottom: 32, 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
      flexWrap: 'wrap',
      gap: 20
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: '#f8fafc', letterSpacing: '-0.02em' }}>Daily Local Workflow</h2>
          {process.env.NODE_ENV === 'development' && (
            <button onClick={reset} style={{ fontSize: 11, padding: '2px 8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.5)', color: '#ef4444', borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s' }}>Reset (Dev)</button>
          )}
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={handleCheckIn} 
            disabled={hasCheckedIn}
            aria-label={hasCheckedIn ? 'Workflow Completed Today' : 'Complete Daily Workflow'}
            title={hasCheckedIn ? 'You have already completed the workflow today' : 'Click to complete your daily workflow'}
            style={{ 
              padding: '10px 20px', 
              background: hasCheckedIn ? '#334155' : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', 
              color: hasCheckedIn ? '#94a3b8' : 'white', 
              borderRadius: 12, 
              fontWeight: 700, 
              border: hasCheckedIn ? '1px solid #475569' : '1px solid #818cf8', 
              cursor: hasCheckedIn ? 'default' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: hasCheckedIn ? 'none' : '0 4px 12px rgba(99, 102, 241, 0.3)'
            }}>
            {hasCheckedIn ? 'Daily Streak Extended! 🎉' : 'Complete Daily Workflow 🚀'}
          </button>
          <div style={{ display: 'flex', gap: 16, padding: '8px 16px', background: 'rgba(0,0,0,0.2)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ color: '#cbd5e1', fontSize: 14 }}>Streak: <strong style={{ color: '#f59e0b', fontSize: 16 }}>{data.currentStreak} 🔥</strong></span>
            <span style={{ color: '#cbd5e1', fontSize: 14 }}>Total: <strong style={{ color: '#38bdf8', fontSize: 16 }}>{data.totalCheckIns} 🗓️</strong></span>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'right', padding: '12px 24px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 16, border: '1px solid rgba(16, 185, 129, 0.2)' }}>
        <div style={{ fontSize: 13, color: '#34d399', marginBottom: 2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Local Points</div>
        <div style={{ fontSize: 36, fontWeight: 900, color: '#10b981', lineHeight: 1 }}>{data.points}</div>
      </div>
    </div>
  );
}
