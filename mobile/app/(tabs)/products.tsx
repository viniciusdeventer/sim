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
            Veja e cadastre produtos em seu catálogo.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleCreate}
          activeOpacity={0.8}
        >
          <Ionicons
            name="add"
            color={colors.white}
            size={24}
          />
        </TouchableOpacity>
      </View>


      <View style={styles.searchWrapper}>
        <SearchInput
          placeholder="Busca por Nome, Código ou SKU"
          value={search}
          onChangeText={setSearch}
        />
      </View>


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
              color={colors.border}
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
    padding: 24
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.black,
    letterSpacing: 0.5,
  },

  subtitle: {
    marginTop: 4,
    color: colors.gray,
    fontSize: 12,
  },

  addButton: {
    width: 44,
    height: 44,
    borderRadius: 12, 
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(40, 84, 178, 0.25)',
  },

  searchWrapper: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },

  filters: {
    marginBottom: 24,
  },

  filtersContent: {
    paddingHorizontal: 24,
    gap: 8,
  },

  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.white,
  },

  filterChipActive: {
    backgroundColor: colors.chipActiveBg,
    borderColor: colors.chipActiveBorder,
  },

  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  filterChipTextActive: {
    color: colors.chipActiveText,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
  },

  statBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.grayLight,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
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
    marginTop: 2,
  },

  list: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },

  empty: {
    marginTop: 80,
    alignItems: 'center',
  },

  emptyTitle: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  emptySubtitle: {
    marginTop: 6,
    fontSize: 13,
    color: colors.gray,
  },
});