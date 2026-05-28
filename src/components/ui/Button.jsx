import { Pressable, Text, View, ActivityIndicator } from "react-native";

/**
 * Button — High-Fidelity SaaS
 * Variants: primary (blue), secondary (white+border), ghost (text only), soft (blue-50)
 */
export default function Button({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  size = "md",
}) {
  const heights = { sm: 36, md: 44, lg: 52 };
  const paddings = { sm: 12, md: 16, lg: 20 };
  const fontSizes = { sm: 13, md: 14, lg: 15 };

  let bg = "#2563EB";
  let textColor = "#FFFFFF";
  let borderColor = "transparent";
  let borderWidth = 0;

  if (variant === "secondary") {
    bg = "#FFFFFF";
    textColor = "#111827";
    borderColor = "#E5E7EB";
    borderWidth = 1;
  } else if (variant === "soft") {
    bg = "#EFF6FF";
    textColor = "#2563EB";
  } else if (variant === "ghost") {
    bg = "transparent";
    textColor = "#6B7280";
  } else if (variant === "danger") {
    bg = "#FFFFFF";
    textColor = "#B91C1C";
    borderColor = "#E5E7EB";
    borderWidth = 1;
  }

  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      style={({ pressed }) => ({
        height: heights[size],
        paddingHorizontal: paddings[size],
        backgroundColor: bg,
        borderColor,
        borderWidth,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        opacity: isDisabled ? 0.5 : pressed ? 0.85 : 1,
        alignSelf: fullWidth ? "stretch" : "flex-start",
      })}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <>
          {icon}
          <Text
            style={{
              color: textColor,
              fontSize: fontSizes[size],
              fontWeight: "600",
            }}
          >
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}
