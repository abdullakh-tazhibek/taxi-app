import { StyleSheet, View } from "react-native";
import DriverList from "./passenger/DriverList";
import PassList from "./driver/PassList";

export default function SecondBlock() {
  const role = "жүргізуші";

  return (
    <View style={styles.container}>
      {role === "жолаушы" ? <DriverList /> : null}
      {role === "жүргізуші" ? <PassList /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
