import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';
import webStorage from './webStorage';

interface SQLTransaction {
  executeSql: (
    query: string,
    params?: any[],
    success?: (tx: SQLTransaction, result: SQLite.SQLResultSet) => void,
    error?: (tx: SQLTransaction, err: any) => boolean
  ) => void;
}

interface SQLResult {
  rows: {
    _array: any[];
  };
  rowsAffected: number;
}

class SQLiteService {
  private db: SQLite.SQLiteDatabase | null = null;

  async init(): Promise<boolean> {
    if (Platform.OS === 'web') {
      return webStorage.init();
    }

    this.db = SQLite.openDatabase('citypulse.db');
    return new Promise((resolve, reject) => {
      this.db?.transaction(
        (tx: SQLTransaction) => {
          // Create tables if they don't exist
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS users (
              id TEXT PRIMARY KEY,
              email TEXT,
              name TEXT,
              avatar_url TEXT,
              created_at TEXT,
              updated_at TEXT
            )`
          );
          // Add other table creation queries as needed
        },
        (error: any) => {
          console.error('Error initializing database:', error);
          reject(error);
        },
        () => {
          console.log('Database initialized successfully');
          resolve(true);
        }
      );
    });
  }

  async executeSql(query: string, params: any[] = []): Promise<SQLResult> {
    if (Platform.OS === 'web') {
      return webStorage.executeSql(query, params);
    }

    return new Promise((resolve, reject) => {
      this.db?.transaction(
        (tx: SQLTransaction) => {
          tx.executeSql(
            query,
            params,
            (_: SQLTransaction, result: SQLite.SQLResultSet) => resolve(result as SQLResult),
            (_: SQLTransaction, error: any) => {
              console.error('Error executing SQL:', error);
              reject(error);
              return false;
            }
          );
        },
        (error: any) => {
          console.error('Transaction error:', error);
          reject(error);
        }
      );
    });
  }

  async transaction(callback: (tx: SQLTransaction) => void): Promise<boolean> {
    if (Platform.OS === 'web') {
      return webStorage.transaction(callback);
    }

    return new Promise((resolve, reject) => {
      this.db?.transaction(
        (tx: SQLTransaction) => {
          callback({
            executeSql: (
              query: string,
              params: any[] = [],
              success?: (tx: SQLTransaction, result: SQLite.SQLResultSet) => void,
              error?: (tx: SQLTransaction, err: any) => boolean
            ) => {
              tx.executeSql(
                query,
                params,
                success,
                error
              );
            }
          });
        },
        (error: any) => {
          console.error('Transaction error:', error);
          reject(error);
        },
        () => resolve(true)
      );
    });
  }
}

export default new SQLiteService(); 