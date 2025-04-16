import * as Device from 'expo-device';
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';

// Key for storing device ID in secure storage
const DEVICE_ID_KEY = 'city_pulse_device_id';

/**
 * Generates a unique device identifier that persists across app launches
 * Instead of using IMEI (which has privacy concerns), we use a UUID approach
 * 
 * @returns Promise<string> A unique identifier for the device
 */
export async function getDeviceId(): Promise<string> {
  try {
    // Try to get existing device ID from secure storage
    const existingId = await SecureStore.getItemAsync(DEVICE_ID_KEY);
    if (existingId) {
      return existingId;
    }

    // Generate a new unique ID based on device information and a random component
    const deviceInfo = {
      brand: Device.brand,
      manufacturer: Device.manufacturer,
      modelName: Device.modelName,
      deviceYearClass: Device.deviceYearClass,
      totalMemory: Device.totalMemory,
      supportedCpuArchitectures: Device.supportedCpuArchitectures,
      osName: Device.osName,
      osVersion: Device.osVersion,
      // Add a random component to ensure uniqueness even on identical devices
      random: Math.random().toString(),
      timestamp: Date.now(),
    };

    const deviceInfoString = JSON.stringify(deviceInfo);
    
    // Generate a UUID using SHA-256 as the hash function
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      deviceInfoString
    );
    
    // Format as a UUID (8-4-4-4-12)
    const uuid = `${hash.substring(0, 8)}-${hash.substring(8, 12)}-${hash.substring(12, 16)}-${hash.substring(16, 20)}-${hash.substring(20, 32)}`;
    
    // Store the generated ID for future use
    await SecureStore.setItemAsync(DEVICE_ID_KEY, uuid);
    
    return uuid;
  } catch (error) {
    console.error('Error generating device ID:', error);
    // Fallback to a random UUID if device info is not available
    const fallbackUuid = crypto.randomUUID ? crypto.randomUUID() : 
      'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    
    // Store the fallback ID
    await SecureStore.setItemAsync(DEVICE_ID_KEY, fallbackUuid);
    
    return fallbackUuid;
  }
} 