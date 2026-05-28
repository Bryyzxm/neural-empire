import { useState, useEffect } from "react";
import {
  Text,
  View,
  Modal,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import {
  RefreshCw,
  Cpu,
  Star,
  AlertTriangle,
  Scale,
  Database,
  Server,
  UserMinus,
  Rocket,
  MessageCircle,
  Eye,
  Sparkles,
  X,
  BookOpen,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTooltipStore } from "@/store/tooltipStore";
import { TOOLTIPS, TOOLTIP_CATEGORIES } from "@/data/tooltipContent";

const ICON_MAP = {
  RefreshCw,
  Cpu,
  Star,
  AlertTriangle,
  Scale,
  Database,
  Server,
  UserMinus,
  Rocket,
  MessageCircle,
  Eye,
  Sparkles,
  BookOpen,
};

/**
 * TooltipWord — tappable inline text that opens a concept modal.
 *
 * Usage:
 *   <TooltipWord termId="hallucination">Halusinasi</TooltipWord>
 *   <TooltipWord termId="epoch" style={{ fontSize: 14 }}>epoch</TooltipWord>
 *
 * - First time: shows a small blue dot indicator + underline
 * - After seen:  still tappable but no dot
 * - Works as standalone Text node or nested inside a parent Text
 */
export default function TooltipWord({ termId, children, style }) {
  const [visible, setVisible] = useState(false);
  const { hasSeen, markSeen, loaded } = useTooltipStore();
  const tooltip = TOOLTIPS[termId];

  if (!tooltip || !loaded) {
    return <Text style={style}>{children}</Text>;
  }

  const seen = hasSeen(termId);
  const category = TOOLTIP_CATEGORIES[tooltip.category];

  const handlePress = () => {
    setVisible(true);
    if (!seen) markSeen(termId);
  };

  return (
    <>
      <Text
        onPress={handlePress}
        suppressHighlighting
        style={[
          {
            color: "#1D4ED8",
            textDecorationLine: "underline",
            textDecorationStyle: "dotted",
            textDecorationColor: "#93C5FD",
          },
          style,
        ]}
      >
        {children}
        {!seen ? (
          <Text style={{ fontSize: 7, color: "#2563EB" }}> ●</Text>
        ) : null}
      </Text>

      <TooltipModal
        visible={visible}
        tooltip={tooltip}
        category={category}
        onClose={() => setVisible(false)}
      />
    </>
  );
}

// ── Bottom-sheet style Modal ────────────────────────────────────────────────
function TooltipModal({ visible, tooltip, category, onClose }) {
  const insets = useSafeAreaInsets();
  if (!tooltip || !category) return null;

  const IconComp = ICON_MAP[tooltip.icon] || BookOpen;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.35)",
            justifyContent: "flex-end",
          }}
        >
          {/* Sheet — stop propagation so tapping inside doesn't close */}
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderTopWidth: 1,
                borderColor: "#E5E7EB",
                paddingBottom: Math.max(insets.bottom, 16) + 8,
                maxHeight: "80%",
              }}
            >
              {/* Drag handle */}
              <View style={{ alignItems: "center", paddingTop: 12 }}>
                <View
                  style={{
                    width: 36,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: "#E5E7EB",
                  }}
                />
              </View>

              <ScrollView
                contentContainerStyle={{ padding: 20, gap: 14 }}
                showsVerticalScrollIndicator={false}
              >
                {/* Header */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      flex: 1,
                    }}
                  >
                    {/* Icon badge */}
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        backgroundColor: category.bg,
                        borderWidth: 1,
                        borderColor: "#E5E7EB",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconComp size={22} color={category.color} />
                    </View>

                    <View style={{ flex: 1 }}>
                      {/* Category pill */}
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 4,
                          marginBottom: 4,
                          alignSelf: "flex-start",
                          paddingHorizontal: 8,
                          paddingVertical: 2,
                          backgroundColor: category.bg,
                          borderRadius: 999,
                          borderWidth: 1,
                          borderColor: "#E5E7EB",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 11,
                            fontWeight: "500",
                            color: category.color,
                          }}
                        >
                          {category.label}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 22,
                          fontWeight: "600",
                          color: "#111827",
                          letterSpacing: -0.3,
                        }}
                      >
                        {tooltip.term}
                      </Text>
                    </View>
                  </View>

                  {/* Close */}
                  <Pressable
                    onPress={onClose}
                    style={({ pressed }) => ({
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: "#F3F4F6",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: pressed ? 0.6 : 1,
                      marginTop: 4,
                    })}
                  >
                    <X size={16} color="#6B7280" />
                  </Pressable>
                </View>

                {/* Divider */}
                <View style={{ height: 1, backgroundColor: "#F3F4F6" }} />

                {/* Definition */}
                <View style={{ gap: 6 }}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "600",
                      color: "#9CA3AF",
                      textTransform: "uppercase",
                      letterSpacing: 0.6,
                    }}
                  >
                    Definisi
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      lineHeight: 23,
                      color: "#374151",
                    }}
                  >
                    {tooltip.definition}
                  </Text>
                </View>

                {/* Analogy */}
                <View
                  style={{
                    backgroundColor: "#F9FAFB",
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    padding: 14,
                    gap: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "600",
                      color: "#9CA3AF",
                      textTransform: "uppercase",
                      letterSpacing: 0.6,
                    }}
                  >
                    Analogi
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      lineHeight: 21,
                      color: "#6B7280",
                      fontStyle: "italic",
                    }}
                  >
                    "{tooltip.analogy}"
                  </Text>
                </View>

                {/* Related terms hint */}
                {tooltip.relatedTerms?.length > 0 ? (
                  <View style={{ gap: 8 }}>
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "600",
                        color: "#9CA3AF",
                        textTransform: "uppercase",
                        letterSpacing: 0.6,
                      }}
                    >
                      Istilah terkait
                    </Text>
                    <View
                      style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}
                    >
                      {tooltip.relatedTerms.map((rt) => {
                        const rel = TOOLTIPS[rt];
                        if (!rel) return null;
                        const relCat = TOOLTIP_CATEGORIES[rel.category];
                        return (
                          <View
                            key={rt}
                            style={{
                              paddingHorizontal: 10,
                              paddingVertical: 4,
                              borderRadius: 999,
                              backgroundColor: relCat?.bg || "#F3F4F6",
                              borderWidth: 1,
                              borderColor: "#E5E7EB",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 12,
                                color: relCat?.color || "#374151",
                                fontWeight: "500",
                              }}
                            >
                              {rel.term}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                ) : null}

                {/* Close button */}
                <Pressable
                  onPress={onClose}
                  style={({ pressed }) => ({
                    backgroundColor: "#111827",
                    borderRadius: 8,
                    height: 44,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 4,
                    opacity: pressed ? 0.85 : 1,
                  })}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontWeight: "600",
                      fontSize: 14,
                    }}
                  >
                    Mengerti
                  </Text>
                </Pressable>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
