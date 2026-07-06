import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';

import Button from '../ui/Button';
import Input from '../ui/Input';
import AppModal from '../ui/Modal';

import { RegisterRequest } from '../../types/auth';
import useAuth from '@/hooks/useAuth';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const [modal, setModal] = useState({
    visible: false,
    title: '',
    message: '',
  });

  const { loading, register } = useAuth();

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

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Nome deve ter no mínimo 3 caracteres';
    }

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

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Senhas não correspondem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const registerData: RegisterRequest = {
        name,
        email,
        password,
      };

      const response = await register(registerData);

      if (response.success) {
        router.push('/home');
        return;
      }

      showModal('Erro', response.message);
    } catch (error) {
      showModal('Erro', 'Ocorreu um erro ao fazer o cadastro');
      console.error('Register error:', error);
    }
  };

  return (
    <View style={styles.form}>
      <Input
        label="Nome Completo"
        placeholder="Seu nome"
        value={name}
        onChangeText={setName}
        error={errors.name}
      />

      <Input
        label="E-mail"
        placeholder="email@example.com"
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

      <Input
        label="Confirmar Senha"
        placeholder="••••••••"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        error={errors.confirmPassword}
      />

      <Button
        label="Cadastrar"
        onPress={handleRegister}
        loading={loading}
        style={styles.registerButton}
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
  registerButton: {
    marginBottom: 20,
    marginTop: 24,
  },
});