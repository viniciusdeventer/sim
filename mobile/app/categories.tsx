import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';

export default function CategoriesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá! 👋</Text>
        <Text style={styles.subtitle}>
          Bem-vindo ao aplicativo.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tudo pronto!</Text>

        <Text style={styles.cardDescription}>
          Seu login foi realizado com sucesso.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 24,
  },

  header: {
    marginBottom: 32,
  },

  greeting: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.primary,
  },

  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: colors.textSecondary,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 10,
  },

  cardDescription: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },

  item: {
    fontSize: 15,
    color: colors.textPrimary,
    marginTop: 8,
  },
});