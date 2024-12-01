import { View } from "react-native";
import DeliveryPass from "./passenger/DeliveryPass";
import DeliveryDriver from "./driver/DeliveryDriver";

export default function FourthBlock() {
  const role = "driver";

  return (
    <View style={{ flex: 1 }}>
      {role === "passenger" ? <DeliveryPass /> : null}
      {role === "driver" ? <DeliveryDriver /> : null}
    </View>
  );
}
