import { storageService } from '../storage/storageService';
import { SurveyResponse } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants
const MAX_RETRY_ATTEMPTS = 5;
const SYNC_INTERVAL = 60000; // 1 minute

/**
 * Service for handling data synchronization between local storage and server
 */
class SyncService {
  private isSyncing: boolean = false;
  private syncTimer: NodeJS.Timeout | null = null;
  private networkConnected: boolean = true;
  private netInfoSubscription: any = null;

  constructor() {
    console.log('SyncService initialized');
    // Initialize network monitoring
    this.setupNetworkMonitoring();
  }

  /**
   * Setup network state monitoring
   */
  private async setupNetworkMonitoring() {
    try {
      // Dynamically import NetInfo to prevent startup crashes if not available
      const NetInfo = await import('@react-native-community/netinfo');
      
      // Subscribe to network info updates
      this.netInfoSubscription = NetInfo.default.addEventListener(state => {
        const isConnected = state.isConnected === true;
        
        // If we're newly connected, try to sync
        if (isConnected && !this.networkConnected) {
          this.attemptSync();
        }
        
        this.networkConnected = isConnected;
      });
      
      // Initial network check
      const state = await NetInfo.default.fetch();
      this.networkConnected = state.isConnected === true;
      
    } catch (error) {
      console.log('NetInfo module not available, assuming network is connected');
      this.networkConnected = true;
    }
  }

  /**
   * Start the background sync process
   */
  startBackgroundSync(intervalMs = 60000): void {
    // Check if database is available
    if (!storageService.isDatabaseAvailable()) {
      console.warn('Cannot start background sync: database not available');
      return;
    }

    if (this.syncTimer) {
      clearInterval(this.syncTimer);
    }

    this.syncTimer = setInterval(() => {
      this.sync().catch(err => {
        console.error('Background sync failed:', err);
      });
    }, intervalMs);

    console.log(`Background sync started with ${intervalMs}ms interval`);
  }

  /**
   * Stop the background sync process
   */
  stopBackgroundSync(): void {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
      this.syncTimer = null;
      console.log('Background sync stopped');
    }
    
    // Clean up network listener if it exists
    if (this.netInfoSubscription) {
      this.netInfoSubscription();
      this.netInfoSubscription = null;
    }
  }

  /**
   * Attempt to sync data with the server
   */
  async attemptSync(): Promise<boolean> {
    // Check if we're already syncing
    if (this.isSyncing) {
      console.log('Sync already in progress, skipping...');
      return false;
    }

    // Check if we're connected to the network
    if (!this.networkConnected) {
      console.log('No network connection, skipping sync...');
      return false;
    }

    try {
      this.isSyncing = true;

      // Get all items in the sync queue
      const queueItems = await storageService.getSyncQueue();
      
      if (queueItems.length === 0) {
        console.log('No items to sync');
        this.isSyncing = false;
        return true;
      }

      console.log(`Attempting to sync ${queueItems.length} items`);

      // Process each queue item
      for (const item of queueItems) {
        try {
          // Only process items with less than max retry attempts
          if (item.attempts >= MAX_RETRY_ATTEMPTS) {
            console.log(`Skipping item ${item.id} - max retry attempts reached`);
            continue;
          }

          // Increment attempt counter
          await storageService.updateSyncAttempts(item.id, item.attempts + 1);

          // Handle based on entity type
          switch (item.entityType) {
            case 'survey_response':
              await this.syncSurveyResponse(item.data as SurveyResponse);
              break;
            case 'character':
              await this.syncCharacter(item.data);
              break;
            // Add more entity types as needed
            default:
              console.warn(`Unknown entity type: ${item.entityType}`);
          }

          // If we get here, the sync was successful, so remove from queue
          await storageService.removeSyncQueueItem(item.id);
        } catch (error) {
          console.error(`Error syncing item ${item.id}:`, error);
          // We'll retry this item on the next sync attempt
        }
      }

      console.log('Sync completed');
      return true;
    } catch (error) {
      console.error('Error during sync:', error);
      return false;
    } finally {
      this.isSyncing = false;
    }
  }

  /**
   * Sync a survey response with the server
   */
  private async syncSurveyResponse(response: SurveyResponse): Promise<void> {
    // TODO: Replace with actual API call when backend is implemented
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful sync
        storageService.markSurveyResponseAsSynced(response.id)
          .then(() => resolve())
          .catch(reject);
      }, 500);
    });
  }

  /**
   * Sync a character with the server
   */
  private async syncCharacter(character: any): Promise<void> {
    // TODO: Replace with actual API call when backend is implemented
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate successful sync
        resolve();
      }, 500);
    });
  }

  /**
   * Force an immediate sync
   */
  async forceSync(): Promise<boolean> {
    // Stop any existing sync timer
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
      this.syncTimer = null;
    }

    // Attempt immediate sync
    const result = await this.attemptSync();

    // Restart background sync
    this.startBackgroundSync();

    return result;
  }

  /**
   * Check if there are any unsynced items
   */
  async hasUnsyncedItems(): Promise<boolean> {
    const queue = await storageService.getSyncQueue();
    return queue.length > 0;
  }

  /**
   * Get the count of unsynced items
   */
  async getUnsyncedItemCount(): Promise<number> {
    const queue = await storageService.getSyncQueue();
    return queue.length;
  }

  /**
   * Perform sync operation manually
   */
  async sync(): Promise<void> {
    // Check if database is available
    if (!storageService.isDatabaseAvailable()) {
      console.warn('Cannot sync: database not available');
      return Promise.resolve();
    }

    if (this.isSyncing) {
      console.log('Sync already in progress, skipping');
      return;
    }

    try {
      this.isSyncing = true;
      
      // Get items that need to be synced
      const queue = await storageService.getSyncQueue();
      console.log(`Found ${queue.length} items to sync`);
      
      // Process each item
      for (const item of queue) {
        try {
          // Here we would actually send the data to the backend
          // For now, just simulate success by removing from queue
          console.log(`Syncing item: ${item.entityType} ${item.entityId}`);
          
          // If it's a survey response, mark it as synced
          if (item.entityType === 'survey_response') {
            await storageService.markSurveyResponseAsSynced(item.entityId);
          } else {
            // Otherwise just remove from queue
            await storageService.removeSyncQueueItem(item.id);
          }
        } catch (error) {
          console.error(`Error syncing item ${item.id}:`, error);
          
          // Update attempt count
          const newAttempts = item.attempts + 1;
          await storageService.updateSyncAttempts(item.id, newAttempts);
          
          // If too many attempts, remove from queue
          if (newAttempts > 5) {
            console.warn(`Too many sync attempts for item ${item.id}, removing from queue`);
            await storageService.removeSyncQueueItem(item.id);
          }
        }
      }
    } catch (error) {
      console.error('Sync error:', error);
    } finally {
      this.isSyncing = false;
    }
  }
}

// Create a singleton instance
export const syncService = new SyncService(); 