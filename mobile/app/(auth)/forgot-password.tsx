import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';

import HeaderWave from '../../components/ui/HeaderWave';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import AppModal from '../../components/ui/Modal';

import { colors } from '../../constants/colors';
import useForgotPassword from '@/hooks/useForgotPassword';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

  const [modal, setModal] = useState({
    visible: false,
    title: '',
    message: '',
  });

  const { loading, requestPasswordReset } = useForgotPassword();

  const showModal = (title: string, message: string) => {
    setModal({
      visible: true,
      title,
      message,
    });
  };

  const closeModal = () => {
    setModal({
      visible: false,
      title: '',
      message: '',
    });
  };

  const validateEmail = (): boolean => {
    if (!email.trim()) {
      setError('Email é obrigatório');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email inválido');
      return false;
    }
    return true;
  };

  const handleResetPassword = async () => {
    setError('');

    if (!validateEmail()) return;

    try {
      const response = await requestPasswordReset(email);

      if (response.success) {
        setEmailSent(true);
        return;
      }

      showModal('Erro', response.message);
    } catch (error) {
      showModal(
        'Erro',
        'Ocorreu um erro ao processar sua solicitação'
      );
    }
  };

  if (emailSent) {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <HeaderWave
            title="Verificar E-mail"
            subtitle="Enviamos um link de recuperação para seu email"
          />

          <View style={styles.successContainer}>
            <Text style={styles.successTitle}>
              E-mail Enviado com Sucesso!
            </Text>
            <Text style={styles.successMessage}>
              Verifique sua caixa de entrada (ou pasta de spam) para as instruções
              de recuperação de senha.
            </Text>

            <Button
              label="Voltar para Login"
              onPress={() => router.push('/auth')}
              style={styles.button}
            />
          </View>
        </ScrollView>

        <AppModal
          visible={modal.visible}
          title={modal.title}
          message={modal.message}
          onClose={closeModal}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HeaderWave
          title="Recuperar Senha"
          subtitle="Insira seu email para receber instruções de recuperação"
        />

        <View style={styles.form}>
          <Input
            label="E-mail"
            placeholder="email@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            error={error || undefined}
          />

          <Button
            label="Enviar Instruções"
            onPress={handleResetPassword}
            loading={loading}
            style={styles.button}
          />

          <TouchableOpacity
            onPress={() => router.push('/auth')}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>
              Voltar para Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <AppModal
        visible={modal.visible}
        title={modal.title}
        message={modal.message}
        onClose={closeModal}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  form: {
    paddingHorizontal: 24,
  },
  button: {
    marginTop: 24,
  },
  backButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 14,
    color: colors.linkBlue,
    fontWeight: '500',
  },
  successContainer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: 'center',
  },
  successIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
});