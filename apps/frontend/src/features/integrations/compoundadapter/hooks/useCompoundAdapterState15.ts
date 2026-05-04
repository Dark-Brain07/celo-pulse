import { useState, useEffect } from 'react';

export const useCompoundAdapterState15 = (address: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 100));
      setData({ address, timestamp: Date.now(), state: Math.random() * 1000 });
      setLoading(false);
    };
    fetchData();
  }, [address]);

  return { data, loading };
};