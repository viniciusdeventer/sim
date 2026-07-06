import React, { useEffect, useState } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors } from '../constants/colors';
import useSession from '@/hooks/useSession';
import useAuth from '@/hooks/useAuth';


interface SidebarProps {
  visible: boolean;
  onClose: () => void;
}

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = Math.min(width * 0.8, 280);

const menuItems = [
  { key: 'home', label: 'Home', icon: 'home-outline', route: '/home' },
  { key: 'categories', label: 'Categorias', icon: 'pricetags-outline', route: '/categories' },
  { key: 'products', label: 'Produtos', icon: 'cube-outline', route: '/products' },
  { key: 'kardex', label: 'Kardex', icon: 'clipboard-outline', route: '/kardex' },
  { key: 'count', label: 'Contagem', icon: 'barcode-outline', route: '/count' },
];

const { logout } = useAuth();

export default function Sidebar({ visible, onClose }: SidebarProps) {
  const translateX = useSharedValue(-SIDEBAR_WIDTH);
  const [active, setActive] = useState('home');

  const { user } = useSession();

  const name = user?.name ?? 'Usuário';
  const email = user?.email;

  useEffect(() => {
    translateX.value = withTiming(
      visible ? 0 : -SIDEBAR_WIDTH,
      {
        duration: 280,
        easing: Easing.out(Easing.cubic),
      }
    );
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const navigate = (item: any) => {
    onClose();
    router.push(item.route as never);
  };

  const isActive = (key: string) => active === key;

  return (
    <Modal visible={visible} animationType="none" transparent statusBarTranslucent>
      <View style={styles.container}>

        <Pressable style={styles.overlay} onPress={onClose} />

        <Animated.View style={[styles.sidebar, animatedStyle]}>

          <View style={styles.appHeader}>
            <Ionicons name="cube" size={25} color={colors.primary} />
            <Text style={styles.appName}>Sim</Text>
          </View>

          <View style={styles.menu}>
            {menuItems.map((item) => {
              const activeItem = isActive(item.key);

              return (
                <TouchableOpacity
                  key={item.key}
                  style={[
                    styles.item,
                    activeItem && styles.itemActive,
                  ]}
                  onPress={() => navigate(item)}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={activeItem ? colors.primary : colors.textSecondary}
                  />

                  <Text
                    style={[
                      styles.itemText,
                      activeItem && styles.itemTextActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.footerItem}
              onPress={() => {
                onClose();
                router.push('/settings');
              }}
            >
              <Ionicons name="settings" size={20} color={colors.textSecondary} />
              <Text style={styles.footerText}>Configurações</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.footerItem}
              onPress={async () => {
                await logout();
                router.replace('/auth');
                onClose();
              }}
            >
              <Ionicons name="log-out" size={20} color={colors.textSecondary}/>
              <Text style={styles.footerText}>Logout</Text>
            </TouchableOpacity>
            <View style={styles.userBox}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={18} color="#fff" />
              </View>

              <View>
                <Text style={styles.userName}>{name}</Text>
                <Text style={styles.userEmail}>{email}</Text>
              </View>
            </View>
          </View>

        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  sidebar: {
    width: SIDEBAR_WIDTH,
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },

  appHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },

  appBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  appName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  userBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  userEmail: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  menu: {
    flex: 1,
    gap: 6,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    borderRadius: 10,
  },

  itemActive: {
    backgroundColor: '#EAF2FF',
  },

  itemText: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  itemTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },

  footer: {
    gap: 10,
    paddingBottom: 20,
  },

  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
  },

  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});