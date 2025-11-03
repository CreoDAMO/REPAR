import { Linking } from 'react-native';
import * as Clipboard from 'expo-clipboard';

export interface PaymentRequest {
  recipient: string;
  amount: string;
  memo?: string;
}

export class QRPaymentService {
  static generatePaymentURI(request: PaymentRequest): string {
    const { recipient, amount, memo } = request;
    
    let uri = `aequitas:${recipient}?amount=${amount}`;
    
    if (memo) {
      uri += `&memo=${encodeURIComponent(memo)}`;
    }
    
    return uri;
  }

  static parsePaymentURI(uri: string): PaymentRequest | null {
    try {
      if (!uri.startsWith('aequitas:')) {
        return null;
      }

      const withoutProtocol = uri.replace('aequitas:', '');
      const [recipient, queryString] = withoutProtocol.split('?');
      
      if (!recipient) {
        return null;
      }

      const params = new URLSearchParams(queryString || '');
      const amount = params.get('amount') || '0';
      const memo = params.get('memo') || undefined;

      return {
        recipient,
        amount,
        memo,
      };
    } catch (error) {
      console.error('Failed to parse payment URI:', error);
      return null;
    }
  }

  static async copyToClipboard(text: string): Promise<boolean> {
    try {
      await Clipboard.setStringAsync(text);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  }

  static async getFromClipboard(): Promise<string | null> {
    try {
      const text = await Clipboard.getStringAsync();
      return text || null;
    } catch (error) {
      console.error('Failed to read from clipboard:', error);
      return null;
    }
  }

  static async openPaymentURI(uri: string): Promise<boolean> {
    try {
      const canOpen = await Linking.canOpenURL(uri);
      if (canOpen) {
        await Linking.openURL(uri);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to open payment URI:', error);
      return false;
    }
  }

  static formatAmount(amount: string): string {
    try {
      const num = parseFloat(amount);
      if (isNaN(num)) {
        return '0';
      }
      
      if (num >= 1_000_000_000_000) {
        return `${(num / 1_000_000_000_000).toFixed(2)}T`;
      } else if (num >= 1_000_000_000) {
        return `${(num / 1_000_000_000).toFixed(2)}B`;
      } else if (num >= 1_000_000) {
        return `${(num / 1_000_000).toFixed(2)}M`;
      } else if (num >= 1_000) {
        return `${(num / 1_000).toFixed(2)}K`;
      }
      
      return num.toFixed(2);
    } catch (error) {
      return '0';
    }
  }

  static isValidAddress(address: string): boolean {
    if (!address || address.length < 20) {
      return false;
    }
    
    if (!address.startsWith('aequitas')) {
      return false;
    }
    
    return /^[a-z0-9]+$/.test(address);
  }
}
