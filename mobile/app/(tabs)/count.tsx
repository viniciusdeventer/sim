import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { CountForm } from '../../components/count/CountForm';
import { useCount } from '../../hooks/useCount';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { router } from 'expo-router';

export default function CountScreen() {
  const { registerCount, isLoading } = useCount();

  const handleRegisterCount = async (dados: any) => {
    const success = await registerCount(dados);
    if (success) {
      Alert.alert('Sucesso', 'Movimentação registrada com sucesso!');
      router.push('/kardex');
    }
  };

 return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.titulo}>NOVA CONTAGEM</Text>
            <Text style={styles.subtitulo}>Registre entradas ou saídas de estoque.</Text>
          </View>

          <View style={styles.formContainer}>
            <CountForm 
              onSubmit={handleRegisterCount} 
              isLoading={isLoading} 
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor:'#F5F7FA',
    padding: 24
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: { 
    paddingHorizontal: 24, 
    paddingTop: 32,
    paddingBottom: 24,
  },
  titulo: { 
    fontSize: 16, 
    fontWeight: '900', 
    color: colors.black,
    letterSpacing: 0.5,
  },
  subtitulo: { 
    fontSize: 12, 
    color: colors.gray, 
    marginTop: 4 
  },
  formContainer: { 
    flex: 1, 
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
});