import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import { colors } from '../../constants/colors';

interface CheckboxProps {
  label?: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onChange(!value)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.checkbox,
          value && styles.checkboxChecked,
        ]}
      >
        {value && <Text style={styles.checkmark}>✓</Text>}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: colors.inputBorder,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: colors.white,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: colors.textPrimary,
    flex: 1,
  },
});
