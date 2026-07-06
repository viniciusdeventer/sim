import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../../constants/colors';
import { Category } from '../../types/category';

interface Props {
  category: Category;
  onPress: () => void;
}

export default function CategoryCard({
  category,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.content}>
        <Text style={styles.title}>
          {category.name}
        </Text>

        <Text
          style={styles.description}
          numberOfLines={1}
        >
          {category.description}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={22}
        color={colors.textSecondary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.04)',
  },

  pressed: {
    opacity: 0.7,
  },

  content: {
    flex: 1,
    marginRight: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  description: {
    marginTop: 4,
    fontSize: 13,
    color: colors.textSecondary,
  },
});