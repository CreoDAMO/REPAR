
import { useState, useEffect } from 'react';
import { Activity, AlertCircle } from 'lucide-react';
import { cosmosClient } from '../utils/cosmosClient';

export default function ChainStatus() {
  const [isConnected, setIsConnected] = useState(false);
  const [blockHeight, setBlockHeight] = useState(0);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const client = await cosmosClient.getStargateClient();
        if (client) {
          const height = await client.getHeight();
          setBlockHeight(height);
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        setIsConnected(false);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-2 text-sm">
      {isConnected ? (
        <>
          <Activity className="h-4 w-4 text-green-500 animate-pulse" />
          <span className="text-green-600">Live • Block {blockHeight}</span>
        </>
      ) : (
        <>
          <AlertCircle className="h-4 w-4 text-yellow-500" />
          <span className="text-yellow-600">Mock Data Mode</span>
        </>
      )}
    </div>
  );
}
