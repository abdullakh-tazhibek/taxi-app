import { StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";
import CreatePass from "./passenger/CreatePass";
import CreateDriver from "./driver/CreateDriver";

export default function CreateBlock({ navigation }) {
  const role = "driver";

  return (
    <View style={styles.container}>
      <Appbar.BackAction
        onPress={() => navigation.navigate("Home")}
        style={{ marginTop: 20 }}
      />
      {role === "passenger" ? <CreatePass /> : null}
      {role === "driver" ? <CreateDriver /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
