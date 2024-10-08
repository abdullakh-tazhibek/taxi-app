import React from "react";
import {
  FlatList,
  Pressable,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { TextInput, Text, Divider } from "react-native-paper";
import { Card, Modal, Button } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import {
  getDeliveryList,
  setDeliveryList,
  setSearchQuery,
  openModal,
  closeModal,
} from "../../../redux/driver/deliveryDriver";
import debounce from "lodash.debounce";
import filter from "lodash.filter";
import { format } from "date-fns";

export default function DeliveryDriver() {
  const dispatch = useDispatch();
  const { fullData, isLoaded, deliveryList, modalVisible, selectedItem } =
    useSelector((state) => state.deliveryDriver);

  {
    /* Data fetch */
  }
  React.useEffect(() => {
    dispatch(getDeliveryList());
  }, [dispatch]);

  const [value1, setValue1] = React.useState("");
  const [value2, setValue2] = React.useState("");

  const filterData = (location1, location2) => {
    if (location1 && location2) {
      return filter(fullData, (item) => {
        return (
          item.location1.toLowerCase().includes(location1) &&
          item.location2.toLowerCase().includes(location2)
        );
      });
    } else if (location1) {
      return filter(fullData, (item) => {
        return item.location1.toLowerCase().includes(location1);
      });
    } else if (location2) {
      return filter(fullData, (item) => {
        return item.location2.toLowerCase().includes(location2);
      });
    }
    return [];
  };

  const updateSearchValues = React.useCallback(
    debounce((location1, location2) => {
      if (!location1 && !location2) {
        dispatch(setDeliveryList(fullData));
      } else {
        dispatch(setSearchQuery({ location1, location2 }));
        const filteredData = filterData(
          location1.toLowerCase(),
          location2.toLowerCase()
        );
        dispatch(setDeliveryList(filteredData));
      }
    }, 150),
    [dispatch, fullData]
  );

  const handleSearch1 = (text1) => {
    setValue1(text1);
    updateSearchValues(text1, value2);
  };

  const handleSearch2 = (text2) => {
    setValue2(text2);
    updateSearchValues(value1, text2);
  };

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  {
    /* POPOVER MODULE */
  }
  const handleItemPress = (item) => {
    dispatch(openModal(item));
  };

  {
    /* PRICE FORMAT */
  }
  const formatPrice = (pr) => {
    pr = String(pr);
    const cleaned = pr.replace(/\s+/g, "");
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

  {
    /* DATE FORMAT */
  }
  const formattedDate = (dt) => {
    return format(new Date(dt), "dd.MM.yyyy");
  };

  return (
    <View style={{ marginTop: 24, flex: 1 }}>
      <Text
        style={{
          fontWeight: 700,
          marginBottom: 12,
          marginLeft: 12,
          fontSize: 16,
          color: "#696682",
        }}
      >
        Сәлемдеме жеткізу
      </Text>

      {/* ---------------FILTER FOR SEARCH--------------- */}
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
            value={value1}
            onChangeText={handleSearch1}
          />
          <Divider style={{ marginRight: 10 }} />
          <TextInput
            label="қай жерге"
            mode="outlined"
            outlineColor="#fff"
            style={styles.locationInput}
            value={value2}
            onChangeText={handleSearch2}
          />
        </View>
      </View>

      <Divider />

      {isLoaded === true ? (
        Array.isArray(deliveryList) && deliveryList.length > 0 ? (
          <View style={{ flex: 1 }}>
            <FlatList
              data={deliveryList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.value}
                  onPress={() => handleItemPress(item)}
                >
                  <Text style={styles.location1}>{item.location1}</Text>
                  <Text style={styles.location2}>{item.location2}</Text>
                  <View style={styles.datePrice}>
                    <Text style={styles.price}>
                      {formatPrice(item.price)} ₸
                    </Text>
                    <Text style={styles.date}>{formattedDate(item.date)}</Text>
                  </View>
                  <Text style={{ fontSize: 12, color: "#B7B7B7" }}>
                    {truncateText(item.comment, 40)}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        ) : (
          <Text
            style={{
              fontWeight: "500",
              textAlign: "center",
              color: "#5F5BDB",
              marginVertical: "auto",
            }}
          >
            Жарияланған тапсырыстар жоқ
          </Text>
        )
      ) : (
        <ActivityIndicator
          size={"large"}
          color={"#5F5BDB"}
          style={{ marginVertical: "auto" }}
        />
      )}

      {/* ---------- Popover module ---------- */}
      {selectedItem ? (
        <Modal
          visible={modalVisible}
          backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onBackdropPress={() => {
            dispatch(closeModal());
          }}
        >
          <Card>
            <Text style={{ marginTop: 12, fontWeight: 700, fontSize: 16 }}>
              {selectedItem.location1}
            </Text>
            <Text
              style={{
                marginTop: 6,
                fontSize: 16,
                color: "#696682",
                fontWeight: 500,
              }}
            >
              {selectedItem.location2}
            </Text>
            <Text
              style={{
                color: "#FF7373",
                fontWeight: "700",
                marginTop: 12,
                fontSize: 16,
              }}
            >
              {selectedItem.price}₸
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#5F5BDB",
                marginTop: 12,
                fontWeight: 500,
              }}
            >
              {formattedDate(selectedItem.date)}
            </Text>
            <Text style={{ fontSize: 16, color: "#B7B7B7", marginTop: 12 }}>
              {selectedItem.comment}
            </Text>
            <Button
              style={{
                fontSize: 16,
                marginTop: 12,
                backgroundColor: "#25D366",
                borderColor: "#25D366",
              }}
            >
              Whatsapp-қа хабарласу
            </Button>
          </Card>
        </Modal>
      ) : null}
    </View>
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
    marginTop: 10,
  },

  datePrice: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: "#fff",
    paddingHorizontal: 3,
    paddingVertical: 1,
    backgroundColor: "#5F5BDB",
    borderRadius: 4,
  },
  price: {
    color: "#FF7373",
    fontWeight: "700",
    fontSize: 12,
  },

  location1: {
    fontWeight: "500",
    fontSize: 16,
  },
  location2: {
    marginTop: 6,
    fontSize: 16,
    color: "#696682",
    marginBottom: 6,
  },

  driverBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  location: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  locationIcon: {
    width: 14,
    height: 68,
    marginHorizontal: 10,
  },
  locationInput: {
    fontSize: 16,
    backgroundColor: "#fff",
  },

  value: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
  },
});
