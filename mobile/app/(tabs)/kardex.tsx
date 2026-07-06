import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMovements } from '../../hooks/useMovement';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';

export default function KardexScreen() {
  const { movements, isLoading } = useMovements();
  const [filtroAtivo, setFiltroAtivo] = useState('Tudo');
  const [busca, setBusca] = useState('');


  const abas = [
    { id: 'Tudo', icon: null },
    { id: 'Entradas', icon: 'arrow-down' },
    { id: 'Saídas', icon: 'arrow-up' },
    { id: 'Filtrar...', icon: 'calendar-outline' },
  ];

  const movementsFiltrados = useMemo(() => {
    let filtrados = movements;

    if (filtroAtivo === 'Entradas') {
      filtrados = filtrados.filter(m => m.type === 'IN' || m.type === 'ENTRADA');
    } else if (filtroAtivo === 'Saídas') {
      filtrados = filtrados.filter(m => m.type === 'OUT' || m.type === 'SAIDA');
    }

    if (busca.trim() !== '') {
      const termo = busca.toLowerCase();
      filtrados = filtrados.filter(m => 
        m.productId.toLowerCase().includes(termo) || 
        (m.observation && m.observation.toLowerCase().includes(termo))
      );
    }

    return filtrados;
  }, [movements, filtroAtivo, busca]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>KARDEX</Text>
        <Text style={styles.subtitulo}>Acompanhe as suas movimentações.</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Busca por nome do produto" 
          placeholderTextColor={colors.gray}
          value={busca}
          onChangeText={setBusca} 
        />
        <Ionicons name="search" size={20} color={colors.textPrimary} style={styles.searchIcon} />
      </View>

<View style={styles.filtersWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
          {abas.map((aba) => {
            const isAtivo = filtroAtivo === aba.id;
            return (
              <TouchableOpacity 
                key={aba.id}
                style={[styles.chip, isAtivo && styles.chipActive]}
                onPress={() => setFiltroAtivo(aba.id)}
              >
                {aba.icon && (
                  <Ionicons 
                    name={aba.icon as any} 
                    size={14} 
                    color={isAtivo ? colors.chipActiveText : colors.textPrimary} 
                    style={styles.chipIcon}
                  />
                )}
                <Text style={[styles.chipText, isAtivo && styles.chipTextActive]}>
                  {aba.id}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>


      {isLoading && movements.length === 0 ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={movementsFiltrados} 
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', color: colors.gray, marginTop: 20 }}>
              Nenhuma movimentação encontrada.
            </Text>
          }
          renderItem={({ item }) => {
            const isEntrada = item.type === 'IN' || item.type === 'ENTRADA';
            
            const rawDate = item.createdAt || item.date;
            const horaFormatada = rawDate 
              ? new Date(rawDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) 
              : '--:--';

            const valorFormatado = item.unitPrice 
              ? item.unitPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
              : 'R$ 0,00';

            return (
              <View style={styles.card}>
                
                <View style={[styles.badge, isEntrada ? styles.badgeEntrada : styles.badgeSaida]}>
                  <Text style={styles.badgeText}>{isEntrada ? 'ENTRADA' : 'SAÍDA'}</Text>
                </View>

                <View style={styles.cardContent}>
                  <Text style={styles.produtoNome} numberOfLines={1}>
                    Produto {item.productId}
                  </Text>
                  <Text style={styles.skuText}>SKU: {item.productId}</Text>
                  <Text style={styles.priceTimeText}>{valorFormatado} - {horaFormatada}</Text>
                </View>

                <View style={styles.cardRight}>
                  <Ionicons name="chevron-forward" size={18} color={colors.gray} style={styles.chevronIcon} />
                  <Text style={styles.quantidade}>{item.quantity} un.</Text>
                </View>
                
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.white 
  },
  header: { 
    paddingHorizontal: 24, 
    paddingTop: 32,
    paddingBottom: 16,
  },
  titulo: { 
    fontSize: 16, 
    fontWeight: '900', 
    color: colors.black,
    letterSpacing: 0.5,
  },
  subtitulo: { 
    fontSize: 12, 
    color: colors.gray, 
    marginTop: 4 
  },
  searchContainer: {
    marginHorizontal: 24,
    marginBottom: 16,
    position: 'relative',
    justifyContent: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 40,
    fontSize: 14,
    color: colors.textPrimary,
    backgroundColor: colors.white,
  },
  searchIcon: {
    position: 'absolute',
    right: 16,
  },
  filtersWrapper: {
    marginBottom: 24,
  },
  filtersContainer: {
    paddingHorizontal: 24,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  chipActive: {
    backgroundColor: colors.chipActiveBg, 
    borderColor: colors.chipActiveBorder,
  },
  chipIcon: {
    marginRight: 6,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  chipTextActive: {
    color: colors.chipActiveText, 
  },
  listContainer: { 
    paddingHorizontal: 24, 
    paddingBottom: 24 
  },
  card: { 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white, 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 16, 
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
  },
  badge: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 16,
    width: 90,
    alignItems: 'center',
  },
  badgeEntrada: {
    backgroundColor: colors.badgeEntrada, 
  },
  badgeSaida: {
    backgroundColor: colors.badgeSaida, 
  },
  badgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  produtoNome: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  skuText: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 8,
  },
  priceTimeText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
  },
  chevronIcon: {
    marginBottom: 16,
  },
  quantidade: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textPrimary,
  }
});