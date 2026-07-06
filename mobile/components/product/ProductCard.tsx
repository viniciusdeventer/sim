import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../../constants/colors';
import { Product } from '../../types/product';

interface Props {
  product: Product;
  categoryName?: string;
  onPress: () => void;
}

function formatPrice(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export default function ProductCard({
  product,
  categoryName,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      {product.imageUrl ? (
        <Image
          source={{ uri: product.imageUrl }}
          style={styles.image}
        />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]}>
          <Ionicons
            name="cube-outline"
            size={26}
            color={colors.textSecondary}
          />
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {product.name}
        </Text>

        <Text style={styles.sku}>
          SKU: {product.code}
        </Text>

        {!!categoryName && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{categoryName}</Text>
          </View>
        )}

        <Text style={styles.price}>
          {formatPrice(product.sellPrice)}
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
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.04)',
  },

  image: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginRight: 14,
  },

  imagePlaceholder: {
    backgroundColor: colors.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    marginRight: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  sku: {
    marginTop: 2,
    fontSize: 12,
    color: colors.textSecondary,
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight + '33',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 6,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primary,
  },

  price: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});