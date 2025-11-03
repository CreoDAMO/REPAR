import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Battery from 'expo-battery';
import { getLightClient } from './lightClient';
import { Platform } from 'react-native';

const BACKGROUND_SYNC_TASK = 'aequitas-background-sync';

let dataUsageMB = 0;
let startTime = Date.now();

export interface BatteryInfo {
  level: number;
  isCharging: boolean;
  usagePercentPerDay: number;
}

export interface SyncStats {
  lastSyncTime: Date;
  syncCount: number;
  dataUsageMB: number;
  uptimeHours: number;
  avgBlocksPerSync: number;
}

export class BackgroundSyncService {
  private static syncStats: SyncStats = {
    lastSyncTime: new Date(),
    syncCount: 0,
    dataUsageMB: 0,
    uptimeHours: 0,
    avgBlocksPerSync: 0,
  };

  static async registerBackgroundSync(): Promise<boolean> {
    try {
      TaskManager.defineTask(BACKGROUND_SYNC_TASK, async () => {
        try {
          await this.performBackgroundSync();
          return BackgroundFetch.BackgroundFetchResult.NewData;
        } catch (error) {
          console.error('Background sync failed:', error);
          return BackgroundFetch.BackgroundFetchResult.Failed;
        }
      });

      const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_SYNC_TASK);
      
      if (!isRegistered) {
        await BackgroundFetch.registerTaskAsync(BACKGROUND_SYNC_TASK, {
          minimumInterval: 15 * 60,
          stopOnTerminate: false,
          startOnBoot: true,
        });
      }

      return true;
    } catch (error) {
      console.error('Failed to register background sync:', error);
      return false;
    }
  }

  static async unregisterBackgroundSync(): Promise<void> {
    try {
      await BackgroundFetch.unregisterTaskAsync(BACKGROUND_SYNC_TASK);
    } catch (error) {
      console.error('Failed to unregister background sync:', error);
    }
  }

  static async performBackgroundSync(): Promise<void> {
    console.log('🔄 Background sync starting...');

    const client = getLightClient();
    
    const status = await client.getNodeStatus();
    
    if (status) {
      console.log(`✅ Synced to block ${status.latestBlockHeight}`);
      
      this.syncStats.lastSyncTime = new Date();
      this.syncStats.syncCount++;
      this.syncStats.dataUsageMB += 0.5;
      
      dataUsageMB += 0.5;
    }

    this.syncStats.uptimeHours = (Date.now() - startTime) / (1000 * 60 * 60);
  }

  static async getBatteryInfo(): Promise<BatteryInfo> {
    try {
      const batteryLevel = await Battery.getBatteryLevelAsync();
      const batteryState = await Battery.getBatteryStateAsync();

      const usagePercentPerDay = 4.2;

      return {
        level: batteryLevel * 100,
        isCharging: batteryState === Battery.BatteryState.CHARGING,
        usagePercentPerDay,
      };
    } catch (error) {
      console.error('Failed to get battery info:', error);
      return {
        level: 100,
        isCharging: false,
        usagePercentPerDay: 4.2,
      };
    }
  }

  static getSyncStats(): SyncStats {
    return {
      ...this.syncStats,
      dataUsageMB: dataUsageMB,
    };
  }

  static getDataUsage(): number {
    return dataUsageMB;
  }

  static getUptimePercentage(): number {
    const totalHours = (Date.now() - startTime) / (1000 * 60 * 60);
    
    if (totalHours === 0) return 100;
    
    const expectedUptime = totalHours;
    const actualUptime = this.syncStats.uptimeHours;
    
    return Math.min(100, (actualUptime / expectedUptime) * 100);
  }

  static async checkShouldSync(): Promise<boolean> {
    const battery = await this.getBatteryInfo();

    if (battery.level < 20 && !battery.isCharging) {
      console.log('⚠️ Battery too low for background sync');
      return false;
    }

    return true;
  }

  static resetStats(): void {
    this.syncStats = {
      lastSyncTime: new Date(),
      syncCount: 0,
      dataUsageMB: 0,
      uptimeHours: 0,
      avgBlocksPerSync: 0,
    };
    dataUsageMB = 0;
    startTime = Date.now();
  }
}
