import { View } from "react-native";
import DeliveryPass from "./passenger/DeliveryPass";
import DeliveryDriver from "./driver/DeliveryDriver";

export default function FourthBlock() {
  const role = "жолаушы";

  return (
    <View style={{ flex: 1 }}>
      {role === "жолаушы" ? <DeliveryPass /> : null}
      {role === "жүргізуші" ? <DeliveryDriver /> : null}
    </View>
  );
}
