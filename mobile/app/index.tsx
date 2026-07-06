import { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { router } from "expo-router";
import { colors } from "@/constants/colors";
import Ionicons from "@expo/vector-icons/build/Ionicons";

export default function HomeScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/auth");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Ionicons
        name="cube"
        size={150}
        color={colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
});