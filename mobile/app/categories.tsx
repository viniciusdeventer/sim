import React, { useMemo, useState, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../constants/colors';
import useCategories from '../hooks/useCategories';
import { Category } from '../types/category';

import SearchInput from '../components/ui/SearchInput';
import CategoryCard from '../components/category/CategoryCard';
import CategoryBottomModal from '../components/category/CategoryModal';

import { BottomSheetRef } from '../components/ui/BottomSheet';

export default function CategoriesScreen() {
  const {
    categories,
    loading,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return categories;

    const value = search.toLowerCase();

    return categories.filter(category =>
      category.name.toLowerCase().includes(value) ||
      category.description.toLowerCase().includes(value)
    );
  }, [categories, search]);

  function handleCreate() {
    setSelectedCategory(null);
    setBottomSheetVisible(true);
    bottomSheetRef.current?.open();
  }

  function handleEdit(category: Category) {
    setSelectedCategory(category);
    setBottomSheetVisible(true);
    bottomSheetRef.current?.open();
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>

        <View style={{ flex: 1 }}>
          <Text style={styles.title}>CATEGORIAS</Text>

          <Text style={styles.subtitle}>
            Gerencie as categorias do seu catálogo
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
        placeholder="Buscar categoria..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredCategories}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            onPress={() => handleEdit(item)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons
              name="folder-open-outline"
              size={60}
              color={colors.textSecondary}
            />

            <Text style={styles.emptyTitle}>
              Nenhuma categoria encontrada
            </Text>

            <Text style={styles.emptySubtitle}>
              Cadastre sua primeira categoria
            </Text>
          </View>
        }
      />

      <CategoryBottomModal
        ref={bottomSheetRef}
        category={selectedCategory}
        onCreate={createCategory}
        onUpdate={updateCategory}
        onDelete={deleteCategory}
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
    marginBottom: 18,
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