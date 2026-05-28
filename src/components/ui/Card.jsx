import { View } from "react-native";

/**
 * Card — ghost-structure container (no shadows, just gray border)
 */
export default function Card({ children, style, padding = 16 }) {
  return (
    <View
      style={[
        {
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#E5E7EB",
          padding,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
