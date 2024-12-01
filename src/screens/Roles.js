import React from "react";
import { useDispatch } from "react-redux";
import { View, ScrollView, Image, Pressable } from "react-native";
import { Text, Appbar } from "react-native-paper";
import { setRole } from "../../redux/auth/register";

export default function Roles({ navigation }) {
  const dispatch = useDispatch();

  const pickRole = (rl) => {
    console.log("debug pick role ", rl);
    {
      /*
      if (rl === "passenger") {
      dispatch(setRole("passenger"));
    } else if (rl === "driver") {
      dispatch(setRole("driver"));
    }
      */
    }

    dispatch(setRole(rl));
    navigation.navigate("Registration");
  };

  return (
    <ScrollView>
      <Appbar.BackAction
        onPress={() => navigation.navigate("Login")}
        style={{ marginTop: 20 }}
      />
      <View style={{ marginHorizontal: 12, marginTop: 12 }}>
        <Image
          style={{
            width: 148,
            height: 45,
            marginTop: 20,
            marginBottom: 40,
            alignSelf: "center",
          }}
          source={require("../../assets/menuLogo.png")}
        />
        <Text
          style={{
            fontWeight: 700,
            marginBottom: 20,
            fontSize: 16,
            color: "#696682",
            textAlign: "center",
          }}
        >
          Нұсқаның бірін таңдаңыз
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          <Pressable onPress={() => pickRole("passenger")}>
            <Image
              source={require("../../assets/passengerCard.png")}
              style={{ height: "160px", width: "140px" }}
            />
          </Pressable>
          <Pressable onPress={() => pickRole("driver")}>
            <Image
              source={require("../../assets/driverCard.png")}
              style={{ height: "160px", width: "140px" }}
            />
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
