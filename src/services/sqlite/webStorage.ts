import AsyncStorage from '@react-native-async-storage/async-storage';

interface SQLTransaction {
  executeSql: (
    query: string,
    params?: any[],
    success?: (tx: SQLTransaction, result: any) => void,
    error?: (tx: SQLTransaction, err: any) => boolean
  ) => void;
}

interface SQLResult {
  rows: {
    _array: any[];
  };
  rowsAffected: number;
}

class WebStorage {
  async init(): Promise<boolean> {
    // No initialization needed for web
    return true;
  }

  async executeSql(query: string, params: any[] = []): Promise<SQLResult> {
    console.warn('SQLite is not available in web environment. Using AsyncStorage instead.');
    return { rows: { _array: [] }, rowsAffected: 0 };
  }

  async transaction(callback: (tx: SQLTransaction) => void): Promise<boolean> {
    console.warn('Transactions are not available in web environment. Using AsyncStorage instead.');
    callback({
      executeSql: (
        query: string,
        params: any[] = [],
        success?: (tx: SQLTransaction, result: any) => void,
        error?: (tx: SQLTransaction, err: any) => boolean
      ) => {
        if (success) {
          success({ executeSql: () => {} }, { rows: { _array: [] }, rowsAffected: 0 });
        }
      }
    });
    return true;
  }
}

export default new WebStorage(); 