import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
} from "react-native";

const role = "driver";

export default function Home({ navigation }) {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/menuLogo.png")}
        />

        {/* ---------------JOLAUSHY--------------- */}
        {role === "passenger" ? (
          <>
            <View
              style={{ display: "flex", flexDirection: "row", marginTop: 30 }}
            >
              <Pressable onPress={() => navigation.navigate("CreateBlock")}>
                <Image
                  style={styles.callTaxi}
                  source={require("../../assets/callTaxi.png")}
                />
              </Pressable>
              <Pressable onPress={() => navigation.navigate("SecondBlock")}>
                <Image
                  style={styles.findCar}
                  source={require("../../assets/findCar.png")}
                />
              </Pressable>
            </View>

            <Pressable onPress={() => navigation.navigate("FourthBlock")}>
              <Image
                style={styles.sendDelivery}
                source={require("../../assets/sendDelivery.png")}
              />
            </Pressable>
          </>
        ) : null}

        {/* ---------------JURGIZUSHI--------------- */}
        {role === "driver" ? (
          <>
            <View
              style={{ display: "flex", flexDirection: "row", marginTop: 30 }}
            >
              <Pressable onPress={() => navigation.navigate("CreateBlock")}>
                <Image
                  style={styles.callTaxi}
                  source={require("../../assets/goRide.png")}
                />
              </Pressable>
              <Pressable onPress={() => navigation.navigate("SecondBlock")}>
                <Image
                  style={styles.findCar}
                  source={require("../../assets/findPassengers.png")}
                />
              </Pressable>
            </View>

            <Pressable onPress={() => navigation.navigate("FourthBlock")}>
              <Image
                style={styles.sendDelivery}
                source={require("../../assets/takeDelivery.png")}
              />
            </Pressable>
          </>
        ) : null}

        <Pressable onPress={() => navigation.navigate("MyOrders")}>
          <Image
            style={styles.myOrder}
            source={require("../../assets/myOrder.png")}
          />
        </Pressable>

        {role === "driver" ? (
          <Text
            style={{
              marginBottom: 30,
              color: "#696682",
              textAlign: "center",
            }}
          >
            Жүргізуші ретінде тіркеліп, сәлемдеме жеткізу арқылы ақша табыңыз!
          </Text>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 12,
    marginTop: 24,
  },
  logo: {
    width: 148,
    height: 45,
  },
  callTaxi: {
    width: 140,
    height: 160,
    marginRight: 35,
  },
  findCar: {
    width: 140,
    height: 160,
  },
  sendDelivery: {
    marginTop: 30,
    width: 315,
    height: 125,
  },
  myOrder: {
    marginTop: 30,
    marginBottom: 30,
    width: 315,
    height: 125,
  },
});
