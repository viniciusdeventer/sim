import React, { useMemo, useRef, useState } from 'react';
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
import BackButtonHeader from '@/components/ui/BackButtonHeader';

export default function CategoriesScreen() {
  const { categories, loading, createCategory, updateCategory, deleteCategory } = useCategories();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

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
    bottomSheetRef.current?.open();
  }

  function handleEdit(category: Category) {
    setSelectedCategory(category);
    bottomSheetRef.current?.open();
  }

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Cabeçalho com botão de voltar */}
      <BackButtonHeader title="CATEGORIAS" />

      {/* Container de Ação */}
      <View style={styles.actionRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.subtitle}>Gerencie as categorias do seu catálogo.</Text>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleCreate} activeOpacity={0.8}>
          <Ionicons name="add" color={colors.white} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchWrapper}>
        <SearchInput
          placeholder="Buscar categoria..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filteredCategories}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CategoryCard category={item} onPress={() => handleEdit(item)} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="folder-open-outline" size={60} color={colors.border} />
            <Text style={styles.emptyTitle}>Nenhuma categoria encontrada</Text>
            <Text style={styles.emptySubtitle}>Cadastre sua primeira categoria</Text>
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
    padding: 24,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  subtitle: {
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
    marginBottom: 8,
  },
  list: {
    paddingHorizontal: 24,
    paddingVertical: 16,
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