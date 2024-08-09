import { StyleSheet, Platform } from "react-native";
export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: "#F1F2F7",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
