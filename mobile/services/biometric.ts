import * as LocalAuthentication from 'expo-local-authentication';

export class BiometricService {
  static async isAvailable(): Promise<boolean> {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    return hasHardware && isEnrolled;
  }

  static async getSupportedTypes(): Promise<string[]> {
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    const typeNames: string[] = [];

    if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
      typeNames.push('Fingerprint');
    }
    if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
      typeNames.push('Face ID');
    }
    if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
      typeNames.push('Iris');
    }

    return typeNames;
  }

  static async authenticate(reason: string): Promise<boolean> {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: reason,
        cancelLabel: 'Cancel',
        disableDeviceFallback: false,
      });

      return result.success;
    } catch (error) {
      console.error('Biometric authentication failed:', error);
      return false;
    }
  }

  static async authenticateForWallet(action: 'create' | 'access' | 'send'): Promise<boolean> {
    const reasons = {
      create: 'Authenticate to create your Aequitas wallet',
      access: 'Authenticate to access your wallet',
      send: 'Authenticate to confirm this transaction',
    };

    return this.authenticate(reasons[action]);
  }
}
