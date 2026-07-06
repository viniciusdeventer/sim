import React, { forwardRef, useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import BottomSheet, { BottomSheetRef } from '../ui/BottomSheet';
import Button from '../ui/Button';
import Input from '../ui/Input';

import { Product } from '../../types/product';
import { Category } from '../../types/category';
import { colors } from '../../constants/colors';

interface Props {
  product: Product | null;
  categories: Category[];
  onCreate: (data: {
    code: string;
    name: string;
    description: string;
    imageUrl: string;
    categoryId: string;
    buyPrice: number;
    sellPrice: number;
  }) => Promise<any>;
  onUpdate: (
    id: string,
    data: {
      code: string;
      name: string;
      description: string;
      imageUrl: string;
      categoryId: string;
      buyPrice: number;
      sellPrice: number;
    }
  ) => Promise<any>;
  onDelete: (id: string) => Promise<any>;
}

const ProductModal = forwardRef<BottomSheetRef, Props>(
  (
    {
      product,
      categories,
      onCreate,
      onUpdate,
      onDelete,
    },
    ref
  ) => {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [buyPrice, setBuyPrice] = useState('');
    const [sellPrice, setSellPrice] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (product) {
        setCode(product.code);
        setName(product.name);
        setDescription(product.description);
        setImageUrl(product.imageUrl);
        setCategoryId(product.categoryId);
        setBuyPrice(String(product.buyPrice));
        setSellPrice(String(product.sellPrice));
      } else {
        setCode('');
        setName('');
        setDescription('');
        setImageUrl('');
        setCategoryId(categories[0]?.id ?? '');
        setBuyPrice('');
        setSellPrice('');
      }
    }, [product, categories]);

    async function handleSave() {
      if (!name.trim()) {
        Alert.alert('Informe o nome do produto.');
        return;
      }

      if (!code.trim()) {
        Alert.alert('Informe o código/SKU do produto.');
        return;
      }

      if (!categoryId) {
        Alert.alert('Selecione uma categoria.');
        return;
      }

      const data = {
        code,
        name,
        description,
        imageUrl,
        categoryId,
        buyPrice: Number(buyPrice.replace(',', '.')) || 0,
        sellPrice: Number(sellPrice.replace(',', '.')) || 0,
      };

      setLoading(true);

      try {
        if (product) {
          await onUpdate(product.id, data);
        } else {
          await onCreate(data);
        }

        (ref as React.RefObject<BottomSheetRef>)?.current?.close();
      } finally {
        setLoading(false);
      }
    }

    async function handleDelete() {
      if (!product) return;

      Alert.alert(
        'Excluir produto',
        'Deseja realmente excluir este produto?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Excluir',
            style: 'destructive',
            onPress: async () => {
              await onDelete(product.id);
              (ref as React.RefObject<BottomSheetRef>)?.current?.close();
            },
          },
        ]
      );
    }

    return (
      <BottomSheet
        ref={ref}
        snapPoints={['85%']}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>
            {product ? 'Editar Produto' : 'Novo Produto'}
          </Text>

          <Input
            label="Nome"
            placeholder="Nome do produto"
            value={name}
            onChangeText={setName}
          />

          <Input
            label="Código / SKU"
            placeholder="Ex: 7894900011517"
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
          />

          <Input
            label="Descrição"
            placeholder="Descrição"
            value={description}
            onChangeText={setDescription}
          />

          <Input
            label="URL da imagem"
            placeholder="https://..."
            value={imageUrl}
            onChangeText={setImageUrl}
          />

          <Text style={styles.label}>Categoria</Text>

          <View style={styles.categories}>
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryChip,
                  categoryId === category.id && styles.categoryChipActive,
                ]}
                onPress={() => setCategoryId(category.id)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    categoryId === category.id && styles.categoryChipTextActive,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.row}>
            <Input
              label="Preço de custo"
              placeholder="0,00"
              value={buyPrice}
              onChangeText={setBuyPrice}
              keyboardType="numeric"
              style={styles.rowInput}
            />

            <Input
              label="Preço de venda"
              placeholder="0,00"
              value={sellPrice}
              onChangeText={setSellPrice}
              keyboardType="numeric"
              style={styles.rowInput}
            />
          </View>

          <View style={styles.buttons}>
            {product && (
              <Button
                label="Excluir"
                variant="outline"
                onPress={handleDelete}
                style={styles.deleteButton}
              />
            )}

            <Button
              label={product ? 'Salvar' : 'Cadastrar'}
              loading={loading}
              onPress={handleSave}
              style={styles.saveButton}
            />
          </View>
        </ScrollView>
      </BottomSheet>
    );
  }
);

export default ProductModal;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 24,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 8,
  },

  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },

  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.white,
  },

  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  categoryChipText: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '500',
  },

  categoryChipTextActive: {
    color: colors.white,
  },

  row: {
    flexDirection: 'row',
    gap: 12,
  },

  rowInput: {
    flex: 1,
  },

  buttons: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 8,
  },

  deleteButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: 'transparent',
    borderColor: colors.danger, 
  },
  saveButton: {
    flex: 1,
  }
});