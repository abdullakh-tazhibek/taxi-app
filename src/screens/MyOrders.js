import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

const date = "08.03.2022";
const price = 30000;
const location1 = "Павлодар қ., Қазақстан";
const location2 = "Баян-Өлгий қ., Моңғолия";
const comment = "5 орын, машина Альфард";

export default function MyOrders() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{
            fontWeight: 700,
            marginBottom: 20,
            fontSize: 18,
            color: "#696682",
          }}
        >
          Менің тапсырыстарым
        </Text>

        <View style={styles.card}>
          <Text style={styles.location1}>{location1}</Text>
          <Text style={styles.location2}>{location2}</Text>

          <View style={styles.datePrice}>
            <Text style={styles.price}>{price}₸</Text>
            <Text style={styles.date}>{date}</Text>
          </View>

          <Text style={{ fontSize: 16, color: "#B7B7B7" }}>{comment}</Text>

          {/* ---------- Knopka ---------- */}
          <Button
            mode="outlined"
            onPress={() => {}}
            style={styles.submitButton}
            labelStyle={styles.submitButtonText}
          >
            Өшіру
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12,
    marginHorizontal: 12,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },

  datePrice: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  date: {
    fontSize: 16,
    color: "#fff",
    paddingHorizontal: 3,
    paddingVertical: 1,
    backgroundColor: "#5F5BDB",
    borderRadius: 4,
  },
  price: {
    color: "#FF7373",
    fontWeight: "600",
    fontSize: 16,
  },

  location1: {
    fontWeight: "500",
    fontSize: 16,
  },
  location2: {
    marginTop: 6,
    fontSize: 16,
    color: "#696682",
    marginBottom: 12,
  },

  driverBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  submitButton: {
    marginTop: 24,
    borderColor: "#FF7373",
    borderRadius: 8,
  },
  submitButtonText: {
    color: "#FF7373",
    fontSize: 16,
  },
});
