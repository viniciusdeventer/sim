import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';

import Checkbox from '../../components/ui/Checkbox';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import AppModal from '../../components/ui/Modal';

import { colors } from '../../constants/colors';
import { LoginRequest } from '../../types/auth';
import useAuth from '@/hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const [modal, setModal] = useState({
    visible: false,
    title: '',
    message: '',
  });

  const { loading, login } = useAuth();

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

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!password.trim()) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const credentials: LoginRequest = {
        email,
        password,
        rememberMe,
      };

      const response = await login(credentials);

      if (response.success) {
        router.push('/home');
        return;
      }

      showModal('Erro', response.message);
    } catch (error) {
      showModal('Erro', 'Ocorreu um erro ao fazer login');
      console.error('Login error:', error);
    }
  };

  return (
    <View style={styles.form}>
      <Input
        label="E-mail"
        placeholder="Insira aqui um e-mail válido"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        error={errors.email}
      />

      <Input
        label="Senha"
        placeholder="••••••••"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        error={errors.password}
      />

      <View style={styles.optionsContainer}>
        <Checkbox
          label="Manter me Conectado"
          value={rememberMe}
          onChange={setRememberMe}
        />

        <TouchableOpacity onPress={() => router.push('/forgot-password')}>
          <Text style={styles.forgotPasswordLink}>
            Esqueci a Senha?
          </Text>
        </TouchableOpacity>
      </View>

      <Button
        label="Login"
        onPress={handleLogin}
        loading={loading}
        style={styles.loginButton}
      />

      <AppModal
        visible={modal.visible}
        title={modal.title}
        message={modal.message}
        onClose={closeModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 24,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  forgotPasswordLink: {
    fontSize: 14,
    color: colors.linkBlue,
    fontWeight: '500',
    textAlign: 'right',
  },
  loginButton: {
    marginBottom: 20,
  },
});