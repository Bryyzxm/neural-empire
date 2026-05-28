import { View, Text } from "react-native";

/**
 * Hyphen-prefixed list row.
 * label accepts string OR ReactNode — pass <TooltipWord> for in-context tooltips.
 */
export default function StatRow({ label, value, valueColor = "#111827" }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 4,
      }}
    >
      <Text style={{ color: "#9CA3AF", marginRight: 8, fontSize: 14 }}>-</Text>
      <View style={{ flex: 1 }}>
        {typeof label === "string" ? (
          <Text style={{ color: "#6B7280", fontSize: 14 }}>{label}</Text>
        ) : (
          label
        )}
      </View>
      <Text style={{ color: valueColor, fontSize: 14, fontWeight: "600" }}>
        {value}
      </Text>
    </View>
  );
}
