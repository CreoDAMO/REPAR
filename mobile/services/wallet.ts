import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english.js';
import { HDKey } from '@scure/bip32';
import { toBech32, fromBech32 } from '@cosmjs/encoding';
import { sha256 } from '@cosmjs/crypto';
import { DirectSecp256k1HdWallet, OfflineDirectSigner } from '@cosmjs/proto-signing';
import { SigningStargateClient, StargateClient } from '@cosmjs/stargate';
import { SecureStorageService } from './secureStorage';
import { BiometricService } from './biometric';

const AEQUITAS_CHAIN_ID = 'aequitas-1';
const AEQUITAS_RPC_ENDPOINT = 'https://rpc.aequitasprotocol.zone';
const COSMOS_BIP44_PATH = "m/44'/118'/0'/0/0";
const AEQUITAS_PREFIX = 'aequitas';

export interface WalletInfo {
  address: string;
  publicKey: Uint8Array;
  mnemonic?: string;
}

export interface TransactionResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
}

export class WalletService {
  private static signer: OfflineDirectSigner | null = null;
  private static client: SigningStargateClient | null = null;

  static async createWallet(requireBiometric: boolean = true): Promise<WalletInfo> {
    if (requireBiometric) {
      const isAvailable = await BiometricService.isAvailable();
      if (!isAvailable) {
        throw new Error('Biometric authentication is not available on this device.');
      }

      const authenticated = await BiometricService.authenticateForWallet('create');
      if (!authenticated) {
        throw new Error('Biometric authentication failed.');
      }
    }

    const existingWallet = await SecureStorageService.walletExists();
    if (existingWallet) {
      throw new Error('A wallet already exists. Please restore or delete the existing wallet first.');
    }

    const mnemonic = generateMnemonic(wordlist, 256);

    await SecureStorageService.saveMnemonic(mnemonic);

    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: AEQUITAS_PREFIX,
    });

    const [account] = await wallet.getAccounts();

    return {
      address: account.address,
      publicKey: account.pubkey,
      mnemonic,
    };
  }

  static async restoreWallet(mnemonic: string, requireBiometric: boolean = true): Promise<WalletInfo> {
    if (!validateMnemonic(mnemonic, wordlist)) {
      throw new Error('Invalid mnemonic phrase. Please check and try again.');
    }

    if (requireBiometric) {
      const authenticated = await BiometricService.authenticateForWallet('create');
      if (!authenticated) {
        throw new Error('Biometric authentication failed.');
      }
    }

    await SecureStorageService.saveMnemonic(mnemonic);

    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: AEQUITAS_PREFIX,
    });

    const [account] = await wallet.getAccounts();

    return {
      address: account.address,
      publicKey: account.pubkey,
    };
  }

  static async unlockWallet(requireBiometric: boolean = true): Promise<WalletInfo | null> {
    if (requireBiometric) {
      const authenticated = await BiometricService.authenticateForWallet('access');
      if (!authenticated) {
        throw new Error('Biometric authentication failed.');
      }
    }

    const mnemonic = await SecureStorageService.getMnemonic();
    if (!mnemonic) {
      return null;
    }

    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: AEQUITAS_PREFIX,
    });

    this.signer = wallet;

    const [account] = await wallet.getAccounts();

    return {
      address: account.address,
      publicKey: account.pubkey,
    };
  }

  static async getAddress(): Promise<string | null> {
    const mnemonic = await SecureStorageService.getMnemonic();
    if (!mnemonic) {
      return null;
    }

    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: AEQUITAS_PREFIX,
    });

    const [account] = await wallet.getAccounts();
    return account.address;
  }

  static async getBalance(address: string): Promise<string> {
    try {
      const client = await StargateClient.connect(AEQUITAS_RPC_ENDPOINT);
      const balance = await client.getBalance(address, 'urepar');
      
      const reparAmount = parseFloat(balance.amount) / 1_000_000;
      return reparAmount.toFixed(2);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      throw new Error('Failed to fetch balance. Please check your connection.');
    }
  }

  static async sendTokens(
    toAddress: string,
    amount: string,
    memo: string = ''
  ): Promise<TransactionResult> {
    const authenticated = await BiometricService.authenticateForWallet('send');
    if (!authenticated) {
      return {
        success: false,
        error: 'Biometric authentication required to send tokens.',
      };
    }

    if (!this.signer) {
      const wallet = await this.unlockWallet(false);
      if (!wallet) {
        return {
          success: false,
          error: 'Wallet not found. Please create or restore a wallet.',
        };
      }
    }

    try {
      const client = await SigningStargateClient.connectWithSigner(
        AEQUITAS_RPC_ENDPOINT,
        this.signer!
      );

      const [account] = await this.signer!.getAccounts();
      const fromAddress = account.address;

      const amountInMicroRepar = Math.floor(parseFloat(amount) * 1_000_000).toString();

      const result = await client.sendTokens(
        fromAddress,
        toAddress,
        [{ denom: 'urepar', amount: amountInMicroRepar }],
        {
          amount: [{ denom: 'urepar', amount: '5000' }],
          gas: '200000',
        },
        memo
      );

      return {
        success: result.code === 0,
        transactionHash: result.transactionHash,
        error: result.code !== 0 ? 'Transaction failed' : undefined,
      };
    } catch (error: any) {
      console.error('Send tokens error:', error);
      return {
        success: false,
        error: error.message || 'Transaction failed. Please try again.',
      };
    }
  }

  static async deleteWallet(requireBiometric: boolean = true): Promise<void> {
    if (requireBiometric) {
      const authenticated = await BiometricService.authenticateForWallet('access');
      if (!authenticated) {
        throw new Error('Biometric authentication failed.');
      }
    }

    await SecureStorageService.clearAll();
    this.signer = null;
    this.client = null;
  }

  static async exportMnemonic(requireBiometric: boolean = true): Promise<string | null> {
    if (requireBiometric) {
      const authenticated = await BiometricService.authenticateForWallet('access');
      if (!authenticated) {
        throw new Error('Biometric authentication required to export wallet.');
      }
    }

    return await SecureStorageService.getMnemonic();
  }

  static isValidAddress(address: string): boolean {
    try {
      const { prefix } = fromBech32(address);
      return prefix === AEQUITAS_PREFIX;
    } catch {
      return false;
    }
  }
}
