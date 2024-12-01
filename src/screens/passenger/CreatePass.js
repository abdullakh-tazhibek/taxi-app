import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button, Text, Divider } from "react-native-paper";
import { Card, Modal } from "@ui-kitten/components";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import {
  setDate,
  setCount,
  setComment,
  setPrice,
  setLocation1,
  setFilterLocation1,
  setLocation2,
  setFilterLocation2,
  createOrder,
} from "../../../redux/passenger/createPass";
import { places } from "../../../places/places";

export default function CreatePass() {
  const dispatch = useDispatch();
  const option = "такси";
  const {
    date,
    count,
    comment,
    price,
    location1,
    filterLocation1,
    location2,
    filterLocation2,
  } = useSelector((state) => state.createPass);

  {
    /* POPOVER MODULE */
  }
  const [visible, setVisible] = React.useState(false);

  {
    /* ------------ERRORS------------*/
  }
  const [errorLocation, setErrorLocation] = React.useState("");
  const [errorPrice, setErrorPrice] = React.useState("");

  {
    /* FIND CAR */
  }
  const handleSubmit = (passData) => {
    let valid = true;
    if (!location1 && !location2) {
      setErrorLocation("Жер-су аттарын жазған жоқсыз!");
      valid = false;
    } else {
      setErrorLocation("");
    }

    if (!price) {
      setErrorPrice("Бағаны жазған жоқсыз!");
      valid = false;
    } else {
      setErrorPrice("");
    }

    if (valid) {
      dispatch(createOrder({ passData }));
      setVisible(true);
      dispatch(setLocation1(""));
      dispatch(setLocation2(""));
      dispatch(setComment(""));
      dispatch(setCount(1));
      dispatch(setPrice(""));
      setDisplayPrice("");
    }
  };

  {
    /* SET LOCATION-1 */
  }
  const filterData1 = (text1) => {
    if (text1) {
      const filtered1 = places.filter((item1) =>
        item1.toLowerCase().includes(text1.toLowerCase())
      );
      dispatch(setFilterLocation1(filtered1));
      dispatch(setLocation1(text1));
    } else {
      dispatch(setFilterLocation1([]));
      dispatch(setLocation1(""));
    }
  };
  const handleSelect1 = (item1) => {
    dispatch(setLocation1(item1));
    dispatch(setFilterLocation1([]));
  };

  {
    /* SET LOCATION-2*/
  }
  const filterData2 = (text2) => {
    if (text2) {
      const filtered2 = places.filter((item2) =>
        item2.toLowerCase().includes(text2.toLowerCase())
      );
      dispatch(setFilterLocation2(filtered2));
      dispatch(setLocation2(text2));
    } else {
      dispatch(setFilterLocation2([]));
      dispatch(setLocation2(""));
    }
  };
  const handleSelect2 = (item2) => {
    dispatch(setLocation2(item2));
    dispatch(setFilterLocation2([]));
  };

  {
    /* DATE CHANGE */
  }
  const [showDate, setShowDate] = React.useState(false);
  const onDateChange = (event, date) => {
    setShowDate(false);
    const currentDate = date || new Date();
    dispatch(setDate(currentDate.toISOString()));
  };
  const showMode = () => {
    setShowDate(true);
  };

  {
    /* ADDING COMMENT */
  }
  const onCommentChange = (com) => {
    dispatch(setComment(com));
  };

  {
    /* PASSENGERS COUNT */
  }
  const increaseCount = () => {
    dispatch(setCount(count < 30 ? count + 1 : count));
  };
  const decreaseCount = () => {
    dispatch(setCount(count > 1 ? count - 1 : count));
  };

  {
    /* SET PRICE */
  }
  const [displayPrice, setDisplayPrice] = React.useState(price);
  const formatPrice = (price) => {
    const cleaned = price.replace(/\s+/g, "");
    if (cleaned.length === 5) {
      return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
    } else if (cleaned.length === 4) {
      return `${cleaned.slice(0, 1)} ${cleaned.slice(1)}`;
    } else if (cleaned.length === 6) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    } else {
      return cleaned;
    }
  };
  const onPriceChange = (pr) => {
    const formattedPrice = formatPrice(pr);
    const cleanedPrice = pr.replace(/\s+/g, "");
    setDisplayPrice(formattedPrice);
    dispatch(setPrice(cleanedPrice));
  };

  return (
    <ScrollView>
      <View style={{ marginHorizontal: 12, marginTop: 12 }}>
        <Text
          style={{
            fontWeight: 700,
            fontSize: 16,
            color: "#696682",
          }}
        >
          Көлік іздеу
        </Text>

        {/* ---------- Kai jerden, kai jerge ---------- */}
        <View>
          <View style={styles.location}>
            <Image
              source={require("../../../assets/locationsIcon.png")}
              style={styles.locationIcon}
            />
            <View style={{ marginRight: "auto", flex: 1 }}>
              <TextInput
                label="қайдан"
                mode="outlined"
                style={styles.locationInput}
                outlineColor="#fff"
                value={location1}
                onChangeText={filterData1}
              />

              <Divider style={{ marginRight: 10 }} />
              <TextInput
                label="қай жерге"
                mode="outlined"
                outlineColor="#fff"
                style={styles.locationInput}
                value={location2}
                onChangeText={filterData2}
              />
            </View>
          </View>
          <Text style={{ color: "#FF7373" }}>{errorLocation}</Text>
          {filterLocation1.length > 0 && (
            <ScrollView style={styles.placesList1}>
              {filterLocation1.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelect1(item)}
                >
                  <Text style={styles.itemText}>{item}</Text>
                  <Divider />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
          {filterLocation2.length > 0 && (
            <ScrollView style={styles.placesList2}>
              {filterLocation2.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelect2(item)}
                >
                  <Text style={styles.itemText}>{item}</Text>
                  <Divider />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {/* ---------- Adam sany ---------- */}
          <View
            style={{
              flex: 1,
              marginBottom: 30,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.dateTitle}>Жолаушы саны</Text>
            <Pressable onPress={() => decreaseCount()}>
              <Image
                source={
                  count < 2
                    ? require("../../../assets/decreaseIcon-unpress.png")
                    : require("../../../assets/decreaseIcon.png")
                }
                style={{ width: 75, height: 42, marginLeft: 15 }}
              />
            </Pressable>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                paddingHorizontal: 24,
                paddingVertical: 8,
                backgroundColor: "#fff",
                borderRadius: 16,
              }}
            >
              {count}
            </Text>
            <Pressable onPress={() => increaseCount()}>
              <Image
                source={
                  count > 29
                    ? require("../../../assets/increaseIcon-unpress.png")
                    : require("../../../assets/increaseIcon.png")
                }
                style={{ width: 75, height: 42 }}
              />
            </Pressable>
          </View>

          {/* ---------- Data tandau ---------- */}
          <View style={styles.datePicker}>
            <Text style={styles.dateTitle}>Жүру күні →</Text>
            <Pressable onPress={showMode} style={{ marginLeft: "auto" }}>
              <Text style={styles.dateText}>
                {new Date(date).toLocaleDateString("kk-KZ")}
              </Text>
            </Pressable>
            {showDate && (
              <DateTimePicker
                value={new Date(date)}
                minimumDate={new Date()}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
          </View>

          {/* ---------- Salemdeme sipaty ---------- */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flex: 1,
              alignItems: "flex-start",
              justifyContent: "space-evenly",
              backgroundColor: "#fff",
              borderRadius: 8,
            }}
          >
            <Image
              source={require("../../../assets/comment_ic.png")}
              style={styles.deliveryIcon}
            />
            <TextInput
              label="қосымша талап"
              mode="outlined"
              multiline
              outlineColor="#fff"
              maxLength={60}
              rows={2}
              style={styles.delivery}
              value={comment}
              onChangeText={onCommentChange}
            />
          </View>

          {/* ---------- Bagasyn jazu ---------- */}
          <View style={styles.priceBlock}>
            <Image
              source={require("../../../assets/tenge_ic.png")}
              style={styles.priceIcon}
            />
            <TextInput
              label="бір орын бағасы(теңгемен)"
              mode="outlined"
              outlineColor="#fff"
              maxLength={7}
              style={styles.price}
              inputMode="numeric"
              value={displayPrice}
              onChangeText={onPriceChange}
            />
          </View>
          <Text style={{ color: "#FF7373" }}>{errorPrice}</Text>

          {/* ---------- Popover module ---------- */}
          <Modal
            visible={visible}
            backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onBackdropPress={() => setVisible(false)}
          >
            <Card disabled={true}>
              <Text
                style={{
                  fontWeight: "bold",
                  alignSelf: "center",
                  marginBottom: 15,
                }}
              >
                Тапсырыcыңыз жарияланды!
              </Text>
              <Text style={{ color: "#696682" }}>
                Сіздің тапсырысыңыз сәтті жарияланды! Жүргізушілерден хабар
                күтіңіз. Тапсырысты 'Менің тапсырысым' бөлімінен көре аласыз.
              </Text>
              <Button onPress={() => setVisible(false)}>Түсіндім</Button>
            </Card>
          </Modal>

          {/* ---------- Knopka ---------- */}
          <Button
            mode="contained"
            onPress={() =>
              handleSubmit({
                location1,
                location2,
                count,
                date,
                comment,
                price,
                option,
              })
            }
            style={styles.submitButton}
            labelStyle={styles.submitButtonText}
          >
            Көлік іздеу
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  priceBlock: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 30,
  },
  priceIcon: { width: 20, height: 20, marginLeft: 10, marginTop: 20 },
  price: {
    flex: 1,
    fontSize: 16,
    width: 250,
    backgroundColor: "#fff",
    marginRight: "auto",
  },

  deliveryIcon: { width: 20, height: 20, marginLeft: 10, marginTop: 20 },
  delivery: {
    flex: 1,
    fontSize: 16,
    marginRight: "auto",
    paddingTop: 0,
    backgroundColor: "#fff",
  },

  location: {
    flex: 1,
    marginTop: 20,
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  locationIcon: {
    width: 14,
    height: 68,
    marginHorizontal: 10,
  },
  locationInput: {
    flex: 1,
    fontSize: 16,
    backgroundColor: "#fff",
  },

  dateTitle: {
    fontSize: 16,
    color: "#696682",
  },
  datePicker: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#5F5BDB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 8,
  },

  submitButton: {
    marginBottom: 30,
    backgroundColor: "#5F5BDB",
    borderRadius: 8,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
  },

  placesList1: {
    position: "absolute",
    top: 70,
    left: 18,
    backgroundColor: "#fff",
    padding: 12,
    zIndex: 2,
    borderRadius: 4,
  },
  placesList2: {
    position: "absolute",
    top: 130,
    left: 18,
    backgroundColor: "#fff",
    padding: 12,
    zIndex: 2,
    borderRadius: 4,
  },
  placesItem: {
    fontFamily: "Roboto",
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  itemText: {
    padding: 10,
    fontSize: 16,
  },

  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
