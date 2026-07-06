import React, { forwardRef, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import BottomSheet, { BottomSheetRef } from '../ui/BottomSheet';
import Button from '../ui/Button';
import Input from '../ui/Input';

import { Category } from '../../types/category';
import { colors } from '../../constants/colors';

interface Props {
  category: Category | null;
  onCreate: (data: {
    name: string;
    description: string;
  }) => Promise<any>;
  onUpdate: (
    id: string,
    data: {
      name: string;
      description: string;
    }
  ) => Promise<any>;
  onDelete: (id: string) => Promise<any>;
}

const CategoryModal = forwardRef<BottomSheetRef, Props>(
  (
    {
      category,
      onCreate,
      onUpdate,
      onDelete,
    },
    ref
  ) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (category) {
        setName(category.name);
        setDescription(category.description);
      } else {
        setName('');
        setDescription('');
      }
    }, [category]);

    async function handleSave() {
      if (!name.trim()) {
        Alert.alert('Informe o nome da categoria.');
        return;
      }

      setLoading(true);

      try {
        if (category) {
          await onUpdate(category.id, {
            name,
            description,
          });
        } else {
          await onCreate({
            name,
            description,
          });
        }

        (ref as React.RefObject<BottomSheetRef>)?.current?.close();
      } finally {
        setLoading(false);
      }
    }

    async function handleDelete() {
      if (!category) return;

      Alert.alert(
        'Excluir categoria',
        'Deseja realmente excluir esta categoria?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Excluir',
            style: 'destructive',
            onPress: async () => {
              await onDelete(category.id);
              (ref as React.RefObject<BottomSheetRef>)?.current?.close();
            },
          },
        ]
      );
    }

    return (
      <BottomSheet
        ref={ref}
        snapPoints={['55%']}
      >
        <Text style={styles.title}>
          {category ? 'Editar Categoria' : 'Nova Categoria'}
        </Text>

        <Input
          label="Nome"
          placeholder="Nome da categoria"
          value={name}
          onChangeText={setName}
        />

        <Input
          label="Descrição"
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
        />

        <View style={styles.buttons}>
          {category && (
            <Button
              label="Excluir"
              variant="outline"
              onPress={handleDelete}
              style={styles.deleteButton}
            />
          )}

          <Button
            label={category ? 'Salvar' : 'Cadastrar'}
            loading={loading}
            onPress={handleSave}
            style={styles.saveButton}
          />
        </View>
      </BottomSheet>
    );
  }
);

export default CategoryModal;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 24,
  },

  buttons: {
    flexDirection: 'row',
    marginTop: 32,
  },

  deleteButton: {
    flex: 1,
    marginRight: 10,
  },

  saveButton: {
    flex: 1,
  },
});