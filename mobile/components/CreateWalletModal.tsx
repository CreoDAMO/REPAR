import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { WalletService } from '../services/wallet';
import { useWalletStore } from '../stores/walletStore';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSuccess: (address: string) => void;
}

export function CreateWalletModal({ visible, onClose, onSuccess }: Props) {
  const [mode, setMode] = useState<'choice' | 'create' | 'restore'>('choice');
  const [mnemonic, setMnemonic] = useState('');
  const [generatedMnemonic, setGeneratedMnemonic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mnemonicSaved, setMnemonicSaved] = useState(false);

  const setAddress = useWalletStore((state) => state.setAddress);
  const setConnected = useWalletStore((state) => state.setConnected);

  const handleCreateWallet = async () => {
    setIsLoading(true);
    try {
      const wallet = await WalletService.createWallet();
      setGeneratedMnemonic(wallet.mnemonic || '');
      setMode('create');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmCreate = async () => {
    if (!mnemonicSaved) {
      Alert.alert(
        'Important',
        'Please confirm you have saved your recovery phrase. You cannot recover your wallet without it.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'I Have Saved It',
            onPress: () => {
              setMnemonicSaved(true);
              finishWalletCreation();
            },
          },
        ]
      );
      return;
    }
    finishWalletCreation();
  };

  const finishWalletCreation = async () => {
    const address = await WalletService.getAddress();
    if (address) {
      setAddress(address);
      setConnected(true);
      onSuccess(address);
      resetAndClose();
    }
  };

  const handleRestoreWallet = async () => {
    if (!mnemonic.trim()) {
      Alert.alert('Error', 'Please enter your recovery phrase');
      return;
    }

    setIsLoading(true);
    try {
      const wallet = await WalletService.restoreWallet(mnemonic.trim());
      setAddress(wallet.address);
      setConnected(true);
      onSuccess(wallet.address);
      resetAndClose();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to restore wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const resetAndClose = () => {
    setMode('choice');
    setMnemonic('');
    setGeneratedMnemonic('');
    setMnemonicSaved(false);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {mode === 'choice' && (
          <View style={styles.content}>
            <Text style={styles.title}>⚖️ Aequitas Wallet</Text>
            <Text style={styles.subtitle}>Your sovereign wallet for $REPAR</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleCreateWallet}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.primaryButtonText}>Create New Wallet</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => setMode('restore')}
              >
                <Text style={styles.secondaryButtonText}>Restore Wallet</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {mode === 'create' && (
          <ScrollView style={styles.content}>
            <Text style={styles.title}>🔐 Save Your Recovery Phrase</Text>
            <Text style={styles.warning}>
              Write down these 24 words in order. You will need them to recover your wallet.
            </Text>
            <Text style={styles.warningBold}>
              Do NOT share this with anyone. Anyone with this phrase can access your funds.
            </Text>

            <View style={styles.mnemonicBox}>
              <Text style={styles.mnemonicText}>{generatedMnemonic}</Text>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleConfirmCreate}
            >
              <Text style={styles.primaryButtonText}>
                I Have Saved My Recovery Phrase
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={resetAndClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        {mode === 'restore' && (
          <ScrollView style={styles.content}>
            <Text style={styles.title}>🔄 Restore Wallet</Text>
            <Text style={styles.subtitle}>Enter your 24-word recovery phrase</Text>

            <TextInput
              style={styles.textInput}
              placeholder="Enter recovery phrase..."
              placeholderTextColor="#64748B"
              value={mnemonic}
              onChangeText={setMnemonic}
              multiline
              numberOfLines={4}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleRestoreWallet}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.primaryButtonText}>Restore Wallet</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={resetAndClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 32,
    textAlign: 'center',
  },
  warning: {
    fontSize: 14,
    color: '#CBD5E1',
    marginBottom: 12,
    lineHeight: 20,
  },
  warningBold: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#EF4444',
    marginBottom: 24,
    lineHeight: 20,
  },
  mnemonicBox: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D97706',
    marginBottom: 24,
  },
  mnemonicText: {
    fontSize: 16,
    color: '#F8FAFC',
    lineHeight: 24,
    fontFamily: 'monospace',
  },
  textInput: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    padding: 16,
    color: '#F8FAFC',
    fontSize: 14,
    marginBottom: 24,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#D97706',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#1E293B',
    borderWidth: 2,
    borderColor: '#D97706',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#F59E0B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#64748B',
    fontSize: 14,
  },
});
