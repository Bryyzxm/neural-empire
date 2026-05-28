import { View, Text } from "react-native";

/**
 * Pill component — High-Fidelity SaaS design system
 * Variants:
 *  - outline (default): bg-white border border-gray-200
 *  - soft: bg-blue-50 text-blue-600
 *  - status: outline + colored dot indicator
 */
export default function Pill({
  label,
  variant = "outline",
  dotColor,
  icon,
  style,
}) {
  const baseContainer = {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    gap: 6,
    alignSelf: "flex-start",
  };

  let containerStyle = {};
  let textStyle = { fontSize: 12, fontWeight: "500" };

  if (variant === "outline") {
    containerStyle = {
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderColor: "#E5E7EB",
    };
    textStyle.color = "#374151";
  } else if (variant === "soft") {
    containerStyle = { backgroundColor: "#EFF6FF" };
    textStyle.color = "#2563EB";
    textStyle.fontWeight = "500";
  } else if (variant === "status") {
    containerStyle = {
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderColor: "#E5E7EB",
    };
    textStyle.color = "#374151";
  }

  return (
    <View style={[baseContainer, containerStyle, style]}>
      {dotColor ? (
        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: dotColor,
          }}
        />
      ) : null}
      {icon}
      <Text style={textStyle}>{label}</Text>
    </View>
  );
}
