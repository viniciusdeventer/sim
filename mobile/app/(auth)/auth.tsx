import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import HeaderWave from '../../components/ui/HeaderWave';
import { colors } from '../../constants/colors';

import Login from '../../components/auth/Login';
import Register from '../../components/auth/Register';

export default function AuthScreen() {
  const [tab, setTab] = useState<'login' | 'register'>('login');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HeaderWave
          title={tab === 'login' ? 'Seja Bem-Vindo' : 'Crie sua Conta'}
          subtitle={'Crie uma conta ou faça login para acessar o app'}
        />

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tab,
              tab === 'login' && styles.activeTab,
            ]}
            onPress={() => setTab('login')}
          >
            <Text
              style={[
                styles.tabText,
                tab === 'login' && styles.activeTabText,
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              tab === 'register' && styles.activeTab,
            ]}
            onPress={() => setTab('register')}
          >
            <Text
              style={[
                styles.tabText,
                tab === 'register' && styles.activeTabText,
              ]}
            >
              Cadastre-se
            </Text>
          </TouchableOpacity>
        </View>

        {tab === 'login' ? <Login /> : <Register />}
      </ScrollView>
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

  tabs: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 4,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },

  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },

  activeTab: {
    backgroundColor: colors.primary,
  },

  tabText: {
    fontWeight: '600',
    color: colors.textSecondary,
  },

  activeTabText: {
    color: colors.white,
  },
});