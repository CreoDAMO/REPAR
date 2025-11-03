import { create } from 'zustand';
import { NodeStatus } from '../services/lightClient';

export interface NodeState {
  status: NodeStatus | null;
  isRunning: boolean;
  uptime: number;
  dataUsageMB: number;
  batteryUsagePercent: number;
  
  setStatus: (status: NodeStatus | null) => void;
  setRunning: (isRunning: boolean) => void;
  updateUptime: (uptime: number) => void;
  updateDataUsage: (mb: number) => void;
  updateBatteryUsage: (percent: number) => void;
  reset: () => void;
}

export const useNodeStore = create<NodeState>((set) => ({
  status: null,
  isRunning: false,
  uptime: 0,
  dataUsageMB: 0,
  batteryUsagePercent: 0,

  setStatus: (status) => set({ status }),
  setRunning: (isRunning) => set({ isRunning }),
  updateUptime: (uptime) => set({ uptime }),
  updateDataUsage: (dataUsageMB) => set({ dataUsageMB }),
  updateBatteryUsage: (batteryUsagePercent) => set({ batteryUsagePercent }),
  
  reset: () => set({
    status: null,
    isRunning: false,
    uptime: 0,
    dataUsageMB: 0,
    batteryUsagePercent: 0,
  }),
}));
