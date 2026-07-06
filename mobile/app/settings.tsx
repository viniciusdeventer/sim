import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import BackButtonHeader from '../components/ui/BackButtonHeader';
import useAuth  from '../hooks/useAuth';
import { authStorage } from '../storage/auth.storage';



export default function SettingsScreen() {
  const { logout, updateProfile, loading } = useAuth();

  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function loadUser() {
      const userData = await authStorage.getUser();
      setUser(userData);
      setName(userData?.name || '');
      setEmail(userData?.email || '');
    }
    loadUser();
  }, []);

  async function handleSave(){
    if (!user) return;

    const response = await updateProfile(user.id, { name, email });

    if (response.success) {
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } else {
      Alert.alert('Erro', response.message || 'Ocorreu um erro ao atualizar o perfil.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackButtonHeader title="CONFIGURAÇÕES" />

        <ScrollView contentContainerStyle={styles.content}>
          <Input label="Nome" value={name} onChangeText={setName} />
          <Input label="E-mail" value={email} onChangeText={setEmail} />

          <Button 
          label="Salvar Alterações" 
          loading={loading} 
          onPress={handleSave} 
          style={styles.button} 
          />
        
         <Button 
          label="Sair da conta" 
          variant="outline" 
          onPress={logout} 
          style={{ ...styles.button, borderColor: colors.danger }} 
          />
        </ScrollView>
      </SafeAreaView>
   );
  }


  const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', padding: 24 },
  header: { padding: 24 },
  title: { fontSize: 22, fontWeight: '900', color: colors.black },
  content: { padding: 24 },
  button: { marginTop: 16 }
});