import * as FileSystem from 'expo-file-system';
import { SurveyResponse, Survey, Character, Achievement } from '../../types';

/**
 * Database service for local storage using in-memory fallback
 * We're completely disabling SQLite for now to avoid errors
 */
class StorageService {
  private inMemoryStore: Record<string, any> = {};

  constructor() {
    console.log('StorageService initialized with in-memory storage (SQLite disabled)');
  }

  /**
   * Check if database is available
   */
  isDatabaseAvailable(): boolean {
    return true; // In-memory storage is always available
  }

  /**
   * Save a survey to local storage
   */
  async saveSurvey(survey: Survey): Promise<void> {
    const surveyKey = `survey_${survey.id}`;
    this.inMemoryStore[surveyKey] = {
      ...survey,
      downloadedAt: Date.now()
    };
    return Promise.resolve();
  }

  /**
   * Get all saved surveys from local storage
   */
  async getSurveys(): Promise<Survey[]> {
    const surveys: Survey[] = [];
    
    Object.keys(this.inMemoryStore)
      .filter(key => key.startsWith('survey_'))
      .forEach(key => {
        surveys.push(this.inMemoryStore[key]);
      });
    
    return surveys;
  }

  /**
   * Save a survey response to local storage
   */
  async saveSurveyResponse(response: SurveyResponse): Promise<void> {
    const responseKey = `response_${response.id}`;
    this.inMemoryStore[responseKey] = {
      ...response,
      syncedAt: response.syncedAt ? response.syncedAt.getTime() : null,
      completedAt: response.completedAt.getTime()
    };
    
    // Add to sync queue if not already synced
    if (!response.syncedAt) {
      const queueItemKey = `queue_response_${response.id}`;
      this.inMemoryStore[queueItemKey] = {
        id: `response_${response.id}`,
        operation: 'CREATE',
        entityType: 'survey_response',
        entityId: response.id,
        data: response,
        createdAt: Date.now(),
        attempts: 0
      };
    }
    
    return Promise.resolve();
  }

  /**
   * Get all unsynced survey responses
   */
  async getUnsyncedSurveyResponses(): Promise<SurveyResponse[]> {
    const responses: SurveyResponse[] = [];
    
    Object.keys(this.inMemoryStore)
      .filter(key => key.startsWith('response_'))
      .forEach(key => {
        const response = this.inMemoryStore[key];
        if (!response.syncedAt) {
          responses.push({
            ...response,
            completedAt: new Date(response.completedAt)
          });
        }
      });
    
    return responses;
  }

  /**
   * Mark a survey response as synced
   */
  async markSurveyResponseAsSynced(responseId: string): Promise<void> {
    const responseKey = `response_${responseId}`;
    const response = this.inMemoryStore[responseKey];
    
    if (response) {
      response.syncedAt = Date.now();
      this.inMemoryStore[responseKey] = response;
      
      // Remove from sync queue
      const queueItemKey = `queue_response_${responseId}`;
      delete this.inMemoryStore[queueItemKey];
    }
    
    return Promise.resolve();
  }

  /**
   * Save a character to local storage
   */
  async saveCharacter(character: Character): Promise<void> {
    const characterKey = `character_${character.id}`;
    this.inMemoryStore[characterKey] = {
      ...character,
      updatedAt: Date.now()
    };
    
    // Add to sync queue
    const queueItemKey = `queue_character_${character.id}`;
    this.inMemoryStore[queueItemKey] = {
      id: `character_${character.id}`,
      operation: 'UPDATE',
      entityType: 'character',
      entityId: character.id,
      data: character,
      createdAt: Date.now(),
      attempts: 0
    };
    
    return Promise.resolve();
  }

  /**
   * Get all characters from local storage
   */
  async getCharacters(): Promise<Character[]> {
    const characters: Character[] = [];
    
    Object.keys(this.inMemoryStore)
      .filter(key => key.startsWith('character_'))
      .forEach(key => {
        characters.push(this.inMemoryStore[key]);
      });
    
    return characters;
  }

  /**
   * Get all pending sync queue items
   */
  async getSyncQueue(): Promise<any[]> {
    const queue: any[] = [];
    
    Object.keys(this.inMemoryStore)
      .filter(key => key.startsWith('queue_'))
      .forEach(key => {
        queue.push(this.inMemoryStore[key]);
      });
    
    return queue;
  }

  /**
   * Remove an item from the sync queue
   */
  async removeSyncQueueItem(id: string): Promise<void> {
    const queueItemKey = `queue_${id}`;
    delete this.inMemoryStore[queueItemKey];
    return Promise.resolve();
  }

  /**
   * Update the sync attempts count for a queue item
   */
  async updateSyncAttempts(id: string, attempts: number): Promise<void> {
    const queueItemKey = `queue_${id}`;
    const queueItem = this.inMemoryStore[queueItemKey];
    
    if (queueItem) {
      queueItem.attempts = attempts;
      this.inMemoryStore[queueItemKey] = queueItem;
    }
    
    return Promise.resolve();
  }

  /**
   * Save achievement to local storage
   */
  async saveAchievement(achievement: Achievement): Promise<void> {
    const achievementKey = `achievement_${achievement.id}`;
    this.inMemoryStore[achievementKey] = {
      ...achievement,
      updatedAt: Date.now()
    };
    
    return Promise.resolve();
  }

  /**
   * Get all achievements from local storage
   */
  async getAchievements(): Promise<Achievement[]> {
    const achievements: Achievement[] = [];
    
    Object.keys(this.inMemoryStore)
      .filter(key => key.startsWith('achievement_'))
      .forEach(key => {
        achievements.push(this.inMemoryStore[key]);
      });
    
    return achievements;
  }

  /**
   * Clear all data (for debugging or account reset)
   */
  async clearAllData(): Promise<void> {
    this.inMemoryStore = {};
    return Promise.resolve();
  }
}

// Create a singleton instance
export const storageService = new StorageService(); 