import OrdersListScreen from "@/screens/OrderList";
import { I18nManager, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ direction: I18nManager.isRTL ? "rtl" : "ltr" }}>
      <OrdersListScreen />
    </View>
  );
}
