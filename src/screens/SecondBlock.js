import { StyleSheet, View } from "react-native";
import DriverList from "./passenger/DriverList";
import PassList from "./driver/PassList";

export default function SecondBlock() {
  const role = "driver";

  return (
    <View style={styles.container}>
      {role === "passenger" ? <DriverList /> : null}
      {role === "driver" ? <PassList /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
