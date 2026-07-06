import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import useSession from '@/hooks/useSession';

export default function HomeScreen() {
  const { user } = useSession();

  const name = user?.name ?? 'Usuário';

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        
        <View style={styles.left}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={18} color="#fff" />
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.hello}>
              Olá, {name}
            </Text>
            <Text style={styles.welcome}>
              Bem-vindo ao Sim
            </Text>
          </View>
        </View>

        <View style={styles.right}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="settings" size={22} color={colors.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="menu" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  userInfo: {
    justifyContent: 'center',
  },

  hello: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  welcome: {
    fontSize: 13,
    color: colors.textSecondary,
  },

  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  iconBtn: {
    padding: 6,
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
});