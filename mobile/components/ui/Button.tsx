import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../../constants/colors';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'large',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const isPrimary = variant === 'primary';
  const isDisabled = disabled || loading;
  const sizeStyle =
    size === 'small'
      ? styles.buttonSmall
      : size === 'medium'
      ? styles.buttonMedium
      : styles.buttonLarge;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        sizeStyle,
        isPrimary ? styles.buttonPrimary : styles.buttonOutline,
        isDisabled && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? colors.white : colors.primary} />
      ) : (
        <Text
          style={[
            styles.text,
            isPrimary ? styles.textPrimary : styles.textOutline,
            textStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonSmall: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonMedium: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonLarge: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    minHeight: 48,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    borderWidth: 0,
  },
  buttonOutline: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.inputBorder,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
  textPrimary: {
    color: colors.white,
  },
  textOutline: {
    color: colors.primary,
  },
});
