import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../constants/colors';

interface HeaderWaveProps {
  title: string;
  subtitle: string;
}

const { width } = Dimensions.get('window');

const HeaderWave: React.FC<HeaderWaveProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.waveTop} />
      <View style={styles.waveMid} />
      <View style={styles.waveBottom} />
      
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

export default HeaderWave;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    paddingBottom: 40,
    alignItems: 'center',
  },
  waveTop: {
    width: '110%',
    height: 280,
    marginTop: -200,
    backgroundColor: colors.primaryDark,
    borderRadius: '100%',
    alignItems: 'center',
    zIndex: 5,
  },
  waveMid: {
    width: '110%',
    height: 280,
    backgroundColor: colors.primary,
    marginTop: -230,
    borderRadius: '100%',
    alignItems: 'center',
    zIndex: 4,
  },
  waveBottom: {
    width: '110%',
    height: 290,
    backgroundColor: colors.primaryLight,
    marginTop: -235,
    borderRadius: '90%',
    alignItems: 'center',
  },
  textContainer: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
