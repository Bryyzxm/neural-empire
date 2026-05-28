import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

/**
 * Small circular progress ring (orange progress, gray track).
 * Used for quality/risk/progress indicators.
 */
export default function CircularRing({
  value = 0, // 0..1
  size = 48,
  strokeWidth = 3,
  trackColor = "#F3F4F6",
  progressColor = "#EA580C",
  label,
  sublabel,
}) {
  const clamped = Math.max(0, Math.min(1, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped);
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View
        style={{
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {label ? (
          <Text
            style={{
              fontSize: 11,
              fontWeight: "600",
              color: "#111827",
            }}
          >
            {label}
          </Text>
        ) : null}
        {sublabel ? (
          <Text style={{ fontSize: 8, color: "#6B7280" }}>{sublabel}</Text>
        ) : null}
      </View>
    </View>
  );
}
