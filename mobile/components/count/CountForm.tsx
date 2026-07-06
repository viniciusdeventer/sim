import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useForm, Controller, SubmitHandler, Resolver } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { colors } from '../../constants/colors';
import { OperationCount } from '../../types/count';

const countSchema = z.object({
  productId: z.string().min(1, 'Informe o ID do produto'),
  quantidade: z.coerce
    .number({
      error: 'A quantidade deve ser um número',
    })
    .positive('A quantidade deve ser maior que zero'),
    observation: z.string().optional(),
});

type CountFormData = z.infer<typeof countSchema>;

interface CountFormProps {
    onSubmit: (dados: { productId: string; quantidade: number; operacao: OperationCount; observation?: string }) => void;
    isLoading: boolean;
}

export function CountForm({ onSubmit, isLoading }: CountFormProps) {
    const [operacao, setOperacao] = useState<OperationCount>('ENTRADA');
    const { control, handleSubmit, reset, formState: { errors } } = useForm<CountFormData>({
        resolver: zodResolver(countSchema) as Resolver<CountFormData>,
        defaultValues: { productId: '', quantidade: undefined, observation: '' },
    });

    const handleFormSubmit: SubmitHandler<CountFormData> = (dados) => {
    onSubmit({ 
      productId: dados.productId, 
      quantidade: dados.quantidade, 
      operacao,
      observation: dados.observation || '',
    });
        reset();
    };

   return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          style={[styles.toggleButton, operacao === 'ENTRADA' && styles.toggleActiveEntrada]}
          onPress={() => setOperacao('ENTRADA')}
          activeOpacity={0.8}
        >
          <Text style={[styles.toggleText, operacao === 'ENTRADA' && styles.textWhite]}>Entrada</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.toggleButton, operacao === 'SAIDA' && styles.toggleActiveSaida]}
          onPress={() => setOperacao('SAIDA')}
          activeOpacity={0.8}
        >
          <Text style={[styles.toggleText, operacao === 'SAIDA' && styles.textWhite]}>Saída</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Produto (SKU ou ID)</Text>
        <Controller
          control={control}
          name="productId"
          render={({ field: { onChange, value } }) => (
            <TextInput 
              style={styles.input} 
              placeholder="Ex: 7894900011517" 
              placeholderTextColor={colors.gray}
              onChangeText={onChange} 
              value={value} 
              editable={!isLoading}
            />
          )}
        />
        {errors.productId && <Text style={styles.error}>{errors.productId.message}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Quantidade</Text>
        <Controller
          control={control}
          name="quantidade"
          render={({ field: { onChange, value } }) => (
            <TextInput 
              style={styles.input} 
              placeholder="Ex: 10" 
              placeholderTextColor={colors.gray}
              keyboardType="numeric" 
              onChangeText={onChange} 
              value={value ? String(value) : ''} 
              editable={!isLoading}
            />
          )}
        />
        {errors.quantidade && <Text style={styles.error}>{errors.quantidade.message}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Observações (Opcional)</Text>
        <Controller
          control={control}
          name="observation"
          render={({ field: { onChange, value } }) => (
            <TextInput 
              style={[styles.input, styles.textArea]} 
              placeholder="Motivo da saída, nome do fornecedor, etc..." 
              placeholderTextColor={colors.gray}
              onChangeText={onChange} 
              value={value} 
              editable={!isLoading}
              multiline={true}
              numberOfLines={3}
              textAlignVertical="top"
            />
          )}
        />
      </View>

      <TouchableOpacity 
        style={[styles.submitButton, isLoading && { opacity: 0.7 }]} 
        onPress={handleSubmit(handleFormSubmit)} 
        disabled={isLoading}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={styles.submitText}>
            {operacao === 'ENTRADA' ? 'Registrar Entrada' : 'Registrar Saída'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    width: '100%' 
  },
  toggleContainer: { 
    flexDirection: 'row', 
    backgroundColor: colors.grayLight, 
    borderRadius: 12, 
    padding: 6, 
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  toggleButton: { 
    flex: 1, 
    paddingVertical: 12, 
    alignItems: 'center', 
    borderRadius: 8,
  },
  toggleActiveEntrada: { 
    backgroundColor: colors.badgeEntrada,
    boxShadow: '0px 2px 8px rgba(74, 222, 128, 0.4)',
  },
  toggleActiveSaida: { 
    backgroundColor: colors.badgeSaida,
    boxShadow: '0px 2px 8px rgba(92, 106, 221, 0.4)',
  },
  toggleText: { 
    fontWeight: '700', 
    color: colors.gray, 
    fontSize: 14 
  },
  textWhite: { 
    color: colors.white 
  },
  inputGroup: { 
    marginBottom: 20 
  },
  label: { 
    fontSize: 13, 
    fontWeight: '600',
    color: colors.textPrimary, 
    marginBottom: 8,
    marginLeft: 4,
  },
  input: { 
    borderWidth: 1, 
    borderColor: colors.border, 
    borderRadius: 12, 
    paddingHorizontal: 16,
    paddingVertical: 14, 
    backgroundColor: colors.white, 
    fontSize: 15,
    color: colors.textPrimary,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.02)',
  },
  textArea: {
    height: 100, 
    paddingTop: 14, 
  },
  error: { 
    color: colors.danger, 
    fontSize: 11, 
    marginTop: 6,
    marginLeft: 4, 
  },
  submitButton: { 
    backgroundColor: colors.primary, 
    paddingVertical: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 12,
    boxShadow: '0px 4px 12px rgba(40, 84, 178, 0.25)',
  },
  submitText: { 
    color: colors.white, 
    fontWeight: 'bold', 
    fontSize: 16,
    letterSpacing: 0.5,
  }
});