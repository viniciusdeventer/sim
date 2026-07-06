import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 0,
          borderRadius: 20,
          position: 'absolute',
          left: 20,
          right: 20,
          bottom: 20,
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={20}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="products"
        options={{
          title: 'Produtos',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'cube' : 'cube-outline'}
              color={color}
              size={20}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="kardex"
        options={{
          title: 'Kardex',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'clipboard' : 'clipboard-outline'}
              color={color}
              size={20}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="count"
        options={{
          title: 'Contagem',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'barcode' : 'barcode-outline'}
              color={color}
              size={20}
            />
          ),
        }}
      />
    </Tabs>
  );
}