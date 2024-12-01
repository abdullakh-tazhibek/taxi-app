import React, { useEffect } from "react";
import {
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  setCountry,
  setPhone,
  setPassword,
  loginUser,
} from "../../redux/auth/login";
import { TextInputMask } from "react-native-masked-text";
import { Card, Modal } from "@ui-kitten/components";
import { setTokens } from "../../redux/auth/tokenSlice";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const { country, phone, password } = useSelector((state) => state.login);
  const { token } = useSelector((state) => state.tokenSlice);

  const [showMenu, setShowMenu] = React.useState(false);
  const [eye, setEye] = React.useState("");

  {
    /* Error states */
  }
  const [errPhone, setErrPhone] = React.useState("");
  const [errPass, setErrPass] = React.useState("");

  {
    /* POPOVER MODULE */
  }
  const [visible, setVisible] = React.useState(false);

  const initializeAuth = async () => {
    try {
      let token;
      // Web environment
      token = localStorage.getItem("token");
      if (typeof window !== "undefined") {
      } else {
        // React Native environment
        token = await SecureStore.getItemAsync("token");
      }
      if (token) {
        dispatch(setTokens(token));
        navigation.navigate("HomeTabs");
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
    }
  };

  useEffect(() => {
    initializeAuth();
  }, [dispatch, navigation]);

  const onPassCheck = (password) => {
    setErrPass("");
    dispatch(setPassword(password));
  };

  const onPressOK = () => {
    dispatch(setPassword(""));
    dispatch(setPhone(""));
    setVisible(false);
  };

  const handleLogin = async ({ phone, password }) => {
    // navigation.navigate("HomeTabs");

    let valid = true;

    if (!phone) {
      setErrPhone("Нөмірді жазған жоқсыз!");
      valid = false;
    }

    if (!password) {
      setErrPass("Құпиясөз жазған жоқсыз!");
      valid = false;
    }

    if (valid) {
      try {
        await dispatch(loginUser({ phone, password })).unwrap();
        console.log("debug token ", token);
        navigation.navigate("HomeTabs");
      } catch (error) {
        setVisible(true);
        setPhone("");
        setPassword("");
      }
    }
  };

  const handleOutsideClick = () => {
    if (showMenu) {
      setShowMenu(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsideClick}>
      <ScrollView>
        <View style={{ marginHorizontal: 12, marginTop: 12 }}>
          <Image
            style={{
              width: 148,
              height: 45,
              marginTop: 60,
              marginBottom: 40,
              alignSelf: "center",
            }}
            source={require("../../assets/menuLogo.png")}
          />
          <Text
            style={{
              fontWeight: 700,
              marginBottom: 20,
              fontSize: 20,
              color: "#696682",
              textAlign: "center",
            }}
          >
            Жүйеге кіру
          </Text>

          {/* phone number with country choice */}
          <View style={{ position: "relative" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#ffffff",
                borderRadius: 8,
                marginBottom: "20px",
                height: "40px",
              }}
            >
              {/* selected country */}
              <View
                onClick={() => setShowMenu((prev) => !prev)}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: "10px",
                  marginRight: "6px",
                }}
              >
                <View>
                  {/* Country Image */}
                  <Image
                    source={
                      country === "KZ"
                        ? require("../../assets/kazakhstan-32.png")
                        : country === "MN"
                        ? require("../../assets/mongolia-32.png")
                        : require("../../assets/russia-32.png")
                    }
                    style={{ width: "32px" }}
                  />
                </View>
                <Image
                  source={require("../../assets/arrow.png")}
                  style={{ width: "20px", height: "20px", marginLeft: "3px" }}
                />
              </View>

              <TextInputMask
                type={"custom"}
                options={{
                  mask:
                    country === "KZ"
                      ? `+7(799)999-99-99`
                      : country === "MN"
                      ? `+976-99-99-99-99`
                      : `+7(999)999-99-99`,
                }}
                value={phone}
                onChangeText={(text) => {
                  setErrPhone("");
                  if (country === "KZ") {
                    const fixedText = "+7(7";
                    if (!text.startsWith(fixedText)) {
                      text = fixedText + text.slice(fixedText.length);
                    }
                  }

                  if (country === "MN") {
                    const fixedText = "+976-9";
                    if (!text.startsWith(fixedText)) {
                      text = fixedText + text.slice(fixedText.length);
                    }
                  }

                  if (country === "RU") {
                    const fixedText = "+7(";
                    if (!text.startsWith(fixedText)) {
                      text = fixedText + text.slice(fixedText.length);
                    }
                  }

                  dispatch(setPhone(text));
                  if (text) {
                    setErrPhone("");
                  }
                }}
                style={{ fontSize: 16 }}
                keyboardType="numeric"
                placeholder={
                  country === "KZ"
                    ? "+7(7__)___-__-__"
                    : country === "MN"
                    ? "+976-9_-__-__-__"
                    : "+7(___)___-__-__"
                }
                placeholderTextColor={"#B7B7B7"}
              />
            </View>
          </View>
          {/* ---------- phone error ---------- */}
          <Text style={styles.error}>{errPhone}</Text>

          {/* Dropdown countries list */}
          {showMenu ? (
            <View
              style={{
                position: "absolute",
                backgroundColor: "#fff",
                paddingVertical: "10px",
                paddingHorizontal: "15px",
                borderRadius: 8,
                top: 230,
                left: 0,
                right: 0,
                zIndex: 1,
              }}
            >
              <Pressable
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
                onPress={() => {
                  dispatch(setCountry("KZ"));
                  setShowMenu(false);
                }}
              >
                <Image
                  source={require("../../assets/kazakhstan-32.png")}
                  style={{ width: "32px" }}
                />
                <Text style={{ marginLeft: "10px" }}>Қазақстан</Text>
              </Pressable>
              <Pressable
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
                onPress={() => {
                  dispatch(setCountry("MN"));
                  setShowMenu(false);
                }}
              >
                <Image
                  source={require("../../assets/mongolia-32.png")}
                  style={{ width: "32px" }}
                />
                <Text style={{ marginLeft: "10px" }}>Моңғолия</Text>
              </Pressable>
              <Pressable
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => {
                  dispatch(setCountry("RU"));
                  setShowMenu(false);
                }}
              >
                <Image
                  source={require("../../assets/russia-32.png")}
                  style={{ width: "32px" }}
                />
                <Text style={{ marginLeft: "10px" }}>Ресей</Text>
              </Pressable>
            </View>
          ) : null}

          {/* ---------- Password Enter ---------- */}
          <View
            style={{
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "row",
              borderRadius: 8,
              marginBottom: "20px",
              height: "40px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              secureTextEntry={!eye}
              placeholder="Құпиясөз"
              placeholderTextColor={"#B7B7B7"}
              style={{ fontSize: 16, marginLeft: "10px" }}
              onChangeText={onPassCheck}
            />
            <View onClick={() => setEye((prev) => !prev)}>
              <Image
                source={
                  eye
                    ? require("../../assets/eye_on.png")
                    : require("../../assets/eye_off.png")
                }
                style={{ width: "24px", height: "24px", marginRight: "10px" }}
              />
            </View>
          </View>
          {/* ---------- password error ---------- */}
          <Text style={styles.error}>{errPass}</Text>

          {/* ---------- Forgot password ---------- */}
          <Pressable style={{ marginBottom: "20px" }}>
            <Text style={{ color: "#5F5BDB", alignSelf: "center" }}>
              Құпиясөзді ұмыттыңыз ба?
            </Text>
          </Pressable>

          {/* ---------- Login Btn ---------- */}
          <Button
            mode="contained"
            onPress={() => handleLogin({ phone, password })}
            style={styles.submitButton}
            labelStyle={styles.submitButtonText}
          >
            Аккаунтқа кіру
          </Button>

          <Pressable onPress={() => navigation.navigate("Roles")}>
            <Text style={{ color: "#5F5BDB", alignSelf: "center" }}>
              Тіркелген жоқсыз ба? Тіркелу
            </Text>
          </Pressable>

          {/* ---------- Popover module ---------- */}
          {/* <Modal
            visible={visible}
            backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onBackdropPress={onPressOK}
          >
            <Card disabled={true}>
              <Text
                style={{
                  color: "red",
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                Қолданушы жүйеде тіркелмеген!
              </Text>
              <Button onPress={onPressOK}>Жақсы</Button>
            </Card>
          </Modal> */}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },

  submitButton: {
    marginBottom: 30,
    backgroundColor: "#5F5BDB",
    borderRadius: 8,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },

  error: {
    color: "#5F5BDB",
    textAlign: "left",
    marginTop: "-15px",
    marginBottom: "10px",
    color: "#FF7373",
    fontSize: "12px",
  },
});
