import React from "react";
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  Pressable,
  Text,
} from "react-native";
import { Divider, Button } from "react-native-paper";

const name = "Болат";
const role = "жүргізуші";
const phone = "+7(777)-777-77-77";
const paid = true;
const expDate = "02.08.2024";

export default function Profile() {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* -------------- USER INFO --------------*/}
        <Text
          style={{
            fontWeight: 700,
            marginBottom: 20,
            fontSize: 18,
            color: "#696682",
          }}
        >
          Жеке ақпарат
        </Text>

        <Text style={{ color: "#5F5BDB", fontSize: 14 }}>Аты</Text>
        <Text style={styles.data}>{name}</Text>

        <Text
          style={{
            color: "#5F5BDB",
            fontSize: 14,
            marginTop: 24,
          }}
        >
          Телефон нөмірі
        </Text>
        <Text style={styles.data}>{phone}</Text>

        <Text
          style={{
            color: "#5F5BDB",
            fontSize: 14,
            marginTop: 24,
          }}
        >
          Нұсқа
        </Text>
        <Text style={styles.data}>{role}</Text>

        {paid === true ? (
          <Text
            style={{
              marginTop: 30,
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            {expDate} дейін төленген
          </Text>
        ) : null}

        {role === "жүргізуші" && paid === false ? (
          <Button
            style={{
              marginTop: 30,
              alignSelf: "center",
            }}
          >
            Мерзім ұзарту
          </Button>
        ) : null}

        <Divider style={{ marginTop: 24 }} />

        {/* -------------- CHANGE ROLE --------------*/}
        <Button
          icon="account"
          mode="text"
          textColor="#5F5BDB"
          style={{ marginTop: 24 }}
          onPress={() => {}}
        >
          <Text style={{ fontSize: 16 }}>
            {role === "жолаушы" ? "Жүргізуші болу" : "Жолаушы болу"}
          </Text>
        </Button>

        {/* -------------- SHARE --------------*/}
        <Button
          textColor="#5F5BDB"
          icon="share-variant"
          mode="text"
          style={{ marginTop: 24 }}
          onPress={() => {}}
        >
          <Text style={{ fontSize: 16 }}>Қосымшамен бөлісу</Text>
        </Button>

        <Divider style={{ marginVertical: 24 }} />

        {/* -------------- SOCIAL MEDIA LINKS --------------*/}
        <Text style={styles.linkHeader}>Біздің сілтемелер</Text>
        <View style={styles.linksContainer}>
          <Pressable>
            <Image
              source={require("../../assets/instagram_ic.png")}
              style={styles.icon}
            />
          </Pressable>

          <Pressable>
            <Image
              source={require("../../assets/facebook_ic.png")}
              style={styles.icon}
            />
          </Pressable>
        </View>

        {/* -------------- LOGOUT --------------*/}
        <Button
          mode="outlined"
          onPress={() => {}}
          style={styles.submitButton}
          labelStyle={styles.submitButtonText}
        >
          Аккаунттан шығу
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginTop: 24,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  linkHeader: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 12,
    color: "#696682",
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 90,
    marginVertical: 12,
  },
  icon: {
    width: 40,
    height: 40,
  },

  data: { fontSize: 16, color: "#696682" },

  submitButton: {
    marginTop: 30,
    borderColor: "#FF7373",
    borderRadius: 8,
    marginBottom: 24,
  },
  submitButtonText: {
    color: "#FF7373",
    fontSize: 16,
  },
});
