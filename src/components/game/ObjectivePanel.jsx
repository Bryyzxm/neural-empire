import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Target, CheckCircle2 } from "lucide-react-native";
import { useGameStore } from "@/store/gameStore";
import { useT } from "@/i18n/useT";
import Card from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";
import Button from "@/components/ui/Button";

const MAP = {
  choose_first_product: {
    title: "tutorial.obj.choose_title",
    body: "tutorial.obj.choose_body",
    cta: "tutorial.obj.open_products",
    route: "/product-flow",
  },
  buy_first_data: {
    title: "tutorial.obj.data_title",
    body: "tutorial.obj.data_body",
    cta: "tutorial.obj.continue",
    route: "/product-flow",
  },
  train_first_model: {
    title: "tutorial.obj.train_title",
    body: "tutorial.obj.train_body",
    cta: "tutorial.obj.continue",
    route: "/product-flow",
  },
  pass_first_eval: {
    title: "tutorial.obj.eval_title",
    body: "tutorial.obj.eval_body",
    cta: "tutorial.obj.continue",
    route: "/product-flow",
  },
  launch_first_product: {
    title: "tutorial.obj.launch_title",
    body: "tutorial.obj.launch_body",
    cta: "tutorial.obj.continue",
    route: "/product-flow",
  },
};

export default function ObjectivePanel({ compact = false }) {
  const router = useRouter();
  const t = useT();
  const tutorial = useGameStore((s) => s.tutorial);
  const liveProducts = useGameStore((s) => s.liveProducts || []);

  if (!tutorial?.active) {
    if (compact || liveProducts.length === 0) return null;
    return (
      <Card style={{ borderColor: "#BBF7D0", backgroundColor: "#F0FDF4" }}>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <CheckCircle2 size={20} color="#16A34A" />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, fontWeight: "700", color: "#111827" }}>
              {t("tutorial.complete_title")}
            </Text>
            <Text style={{ fontSize: 13, color: "#4B5563", marginTop: 2 }}>
              {t("tutorial.complete_body")}
            </Text>
          </View>
        </View>
      </Card>
    );
  }

  const cfg = MAP[tutorial.step] || MAP.choose_first_product;
  return (
    <Card style={{ borderColor: "#BFDBFE", backgroundColor: "#EFF6FF" }}>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "flex-start" }}>
        <Target size={20} color="#2563EB" />
        <View style={{ flex: 1 }}>
          <Pill label={t("tutorial.objective_pill")} variant="soft" dotColor="#2563EB" />
          <Text style={{ fontSize: 17, fontWeight: "700", color: "#111827", marginTop: 8 }}>
            {t(cfg.title)}
          </Text>
          <Text style={{ fontSize: 13, color: "#4B5563", marginTop: 4, lineHeight: 19 }}>
            {t(cfg.body)}
          </Text>
          {cfg.route ? (
            <View style={{ marginTop: 12 }}>
              <Button label={t(cfg.cta)} onPress={() => router.push(cfg.route)} fullWidth />
            </View>
          ) : null}
        </View>
      </View>
    </Card>
  );
}
