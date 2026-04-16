import { useState, useEffect } from 'react';

export const useTokenEconomicsData4 = (resourceId: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setData({ id: resourceId, timestamp: Date.now(), value: Math.random() * 1000 });
      setLoading(false);
    };
    fetchData();
  }, [resourceId]);

  return { data, loading };
};