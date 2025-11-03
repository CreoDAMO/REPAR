import * as SecureStore from 'expo-secure-store';

const WALLET_KEY = 'aequitas_wallet_mnemonic';
const WALLET_PASSWORD_KEY = 'aequitas_wallet_password';

export class SecureStorageService {
  static async saveMnemonic(mnemonic: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(WALLET_KEY, mnemonic, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED,
      });
    } catch (error) {
      console.error('Failed to save mnemonic:', error);
      throw new Error('Failed to securely store wallet. Please try again.');
    }
  }

  static async getMnemonic(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(WALLET_KEY);
    } catch (error) {
      console.error('Failed to retrieve mnemonic:', error);
      return null;
    }
  }

  static async deleteMnemonic(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(WALLET_KEY);
    } catch (error) {
      console.error('Failed to delete mnemonic:', error);
      throw new Error('Failed to delete wallet. Please try again.');
    }
  }

  static async walletExists(): Promise<boolean> {
    const mnemonic = await this.getMnemonic();
    return mnemonic !== null;
  }

  static async savePassword(password: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(WALLET_PASSWORD_KEY, password, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED,
      });
    } catch (error) {
      console.error('Failed to save password:', error);
      throw new Error('Failed to save password.');
    }
  }

  static async getPassword(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(WALLET_PASSWORD_KEY);
    } catch (error) {
      console.error('Failed to retrieve password:', error);
      return null;
    }
  }

  static async deletePassword(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(WALLET_PASSWORD_KEY);
    } catch (error) {
      console.error('Failed to delete password:', error);
    }
  }

  static async clearAll(): Promise<void> {
    await this.deleteMnemonic();
    await this.deletePassword();
  }
}
