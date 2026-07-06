import React, { useMemo, useRef, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../../constants/colors';
import useProducts from '../../hooks/useProducts';
import useCategories from '../../hooks/useCategories';
import { Product } from '../../types/product';

import SearchInput from '../../components/ui/SearchInput';
import ProductCard from '../../components/product/ProductCard';
import ProductModal from '../../components/product/ProductModal';

import { BottomSheetRef } from '../../components/ui/BottomSheet';

export default function ProductsScreen() {
  const {
    products,
    loading,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const { categories } = useCategories();

  const [search, setSearch] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const categoryMap = useMemo(() => {
    const map: Record<string, string> = {};
    categories.forEach(category => {
      map[category.id] = category.name;
    });
    return map;
  }, [categories]);

  const filteredProducts = useMemo(() => {
    let list = products;

    if (selectedCategoryId) {
      list = list.filter(product => product.categoryId === selectedCategoryId);
    }

    if (search.trim()) {
      const value = search.toLowerCase();

      list = list.filter(product =>
        product.name.toLowerCase().includes(value) ||
        product.code.toLowerCase().includes(value)
      );
    }

    return list;
  }, [products, search, selectedCategoryId]);

  function handleCreate() {
    setSelectedProduct(null);
    bottomSheetRef.current?.open();
  }

  function handleEdit(product: Product) {
    setSelectedProduct(product);
    bottomSheetRef.current?.open();
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>PRODUTOS</Text>

          <Text style={styles.subtitle}>
            Veja e cadastre produtos em seu catálogo
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleCreate}
        >
          <Ionicons
            name="add"
            color={colors.white}
            size={24}
          />
        </TouchableOpacity>
      </View>

      <SearchInput
        placeholder="Busca por Nome, Código ou SKU"
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.filters}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          <TouchableOpacity
            style={[
              styles.filterChip,
              !selectedCategoryId && styles.filterChipActive,
            ]}
            onPress={() => setSelectedCategoryId(null)}
          >
            <Text
              style={[
                styles.filterChipText,
                !selectedCategoryId && styles.filterChipTextActive,
              ]}
            >
              Todas
            </Text>
          </TouchableOpacity>

          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.filterChip,
                selectedCategoryId === category.id && styles.filterChipActive,
              ]}
              onPress={() => setSelectedCategoryId(category.id)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedCategoryId === category.id && styles.filterChipTextActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Ionicons name="cube-outline" size={18} color={colors.primary} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.statValue}>{products.length}</Text>
            <Text style={styles.statLabel}>Total de produtos cadastrados</Text>
          </View>
        </View>

        <View style={styles.statBox}>
          <Ionicons name="alert-circle-outline" size={18} color={colors.warning} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.statValue}>{filteredProducts.length}</Text>
            <Text style={styles.statLabel}>Produtos filtrados</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            categoryName={categoryMap[item.categoryId]}
            onPress={() => handleEdit(item)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons
              name="cube-outline"
              size={60}
              color={colors.textSecondary}
            />

            <Text style={styles.emptyTitle}>
              Nenhum produto encontrado
            </Text>

            <Text style={styles.emptySubtitle}>
              Cadastre seu primeiro produto
            </Text>
          </View>
        }
      />

      <ProductModal
        ref={bottomSheetRef}
        product={selectedProduct}
        categories={categories}
        onCreate={createProduct}
        onUpdate={updateProduct}
        onDelete={deleteProduct}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  subtitle: {
    marginTop: 2,
    color: colors.textSecondary,
    fontSize: 12,
  },

  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  filters: {
    height: 40,
    marginTop: 4,
  },

  filtersContent: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 2,
    paddingRight: 4,
  },

  filterChip: {
    height: 36,
    minWidth: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexShrink: 0,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.white,
  },

  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  filterChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textPrimary,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },

  filterChipTextActive: {
    color: colors.white,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },

  statBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 12,
    elevation: 2,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.04)',
  },

  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    maxWidth: 110,
  },

  list: {
    paddingVertical: 16,
    gap: 12,
  },

  empty: {
    marginTop: 80,
    alignItems: 'center',
  },

  emptyTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  emptySubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: colors.textSecondary,
  },
});