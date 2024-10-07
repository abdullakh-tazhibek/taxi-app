import React from "react";
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
  setName,
  setPhone,
  setEmail,
  setPassword,
  setCpass,
  registerUser,
} from "../../redux/auth/register";
import { TextInputMask } from "react-native-masked-text";
import { Card, Modal } from "@ui-kitten/components";

export default function Register({ navigation }) {
  const dispatch = useDispatch();
  const { role, country, name, phone, email, password, cpass, successMessage } =
    useSelector((state) => state.register);

  const [showMenu, setShowMenu] = React.useState(false);
  const [eye, setEye] = React.useState("");

  {
    /* Error states */
  }
  const [errPhone, setErrPhone] = React.useState("");
  const [errName, setErrName] = React.useState("");
  const [errEmail, setErrEmail] = React.useState("");
  const [errPass, setErrPass] = React.useState("");
  const [errCpass, setErrCpass] = React.useState("");

  {
    /* POPOVER MODULE */
  }
  const [visible, setVisible] = React.useState(false);

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}$/;

  const onPassCheck = (password) => {
    dispatch(setPassword(password));
    if (PWD_REGEX.test(password)) {
      setErrPass("");
    } else {
      setErrPass(
        "Құпиясөз 6-24 символ аралығында болуы және кем дегенде бір әріп, сан және үлкен әріп болуы керек."
      );
    }
  };

  const handleRegister = async ({ name, phone, email, password, cpass }) => {
    let valid = true;

    if (!phone) {
      setErrPhone("Нөмерді жазған жоқсыз!");
      valid = false;
    }

    if (!name) {
      setErrName("Есіміңізді жазған жоқсыз!");
      valid = false;
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      setErrEmail("Дұрыс email жазған жоқсыз!");
      valid = false;
    }

    if (!password) {
      setErrPass("Құпиясөз жазған жоқсыз!");
      valid = false;
    }

    if (!cpass || cpass !== password) {
      setErrCpass("Құпиясөздер сәйкес келмейді!");
      valid = false;
    }

    if (valid) {
      try {
        await dispatch(
          registerUser({ role, country, name, phone, email, password })
        ).unwrap();
        navigation.navigate("HomeTabs");
      } catch (error) {
        setVisible(true);
        setCountry("");
        setName("");
        setPhone("");
        setEmail("");
        setPassword("");
        setCpass("");
      }
    }
  };

  const handleOutsideClick = () => {
    if (showMenu) {
      setShowMenu(false);
    }
  };

  return (
    <ScrollView style={{ flex: "1" }}>
      <TouchableWithoutFeedback onPress={handleOutsideClick}>
        <View style={{ marginHorizontal: 12, marginTop: 12 }}>
          <Text
            style={{
              fontWeight: 700,
              marginTop: 20,
              marginBottom: 20,
              fontSize: 20,
              color: "#696682",
              textAlign: "center",
            }}
          >
            Тіркелу
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
                marginBottom: "5px",
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
          <Text
            style={{
              marginBottom: "20px",
              alignContent: "flex-start",
              fontSize: "12px",
            }}
          >
            Whatsapp тіркелген нөмерді жазыңыз
          </Text>
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
                top: 105,
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

          {/* ---------- Name ---------- */}
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 8,
              marginBottom: "20px",
              height: "40px",
              justifyContent: "center",
            }}
          >
            <TextInput
              placeholder="Есіміңіз"
              placeholderTextColor={"#B7B7B7"}
              style={{ fontSize: 16, marginLeft: "10px" }}
              onChangeText={(name) => {
                dispatch(setName(name));
                if (name) {
                  setErrName("");
                }
              }}
            />
          </View>
          {/* ---------- name error ---------- */}
          <Text style={styles.error}>{errName}</Text>

          {/* ---------- Email ---------- */}
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 8,
              marginBottom: "20px",
              height: "40px",
              justifyContent: "center",
            }}
          >
            <TextInput
              placeholder="Email"
              placeholderTextColor={"#B7B7B7"}
              style={{ fontSize: 16, marginLeft: "10px" }}
              onChangeText={(email) => {
                dispatch(setEmail(email));
                if (email) {
                  setErrEmail("");
                }
              }}
            />
          </View>
          {/* ---------- email error ---------- */}
          <Text style={styles.error}>{errEmail}</Text>

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

          {/* ---------- Password Repeat ---------- */}
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
              placeholder="Құпиясөзді қайталаңыз"
              placeholderTextColor={"#B7B7B7"}
              style={{ fontSize: 16, marginLeft: "10px" }}
              onChangeText={(cpass) => {
                dispatch(setCpass(cpass));
                if (cpass) {
                  setErrCpass("");
                }
              }}
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
          {/* ---------- cpass error ---------- */}
          <Text style={styles.error}>{errCpass}</Text>

          {/* ---------- Register Btn ---------- */}
          <Button
            mode="contained"
            onPress={() =>
              handleRegister({ name, phone, email, password, cpass })
            }
            style={styles.submitButton}
            labelStyle={styles.submitButtonText}
          >
            Тіркелу
          </Button>

          {/* Privacy policy */}
          <Pressable style={{ marginBottom: "20px" }}>
            <Text
              style={{
                color: "#5F5BDB",
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              Тіркелу арқылы құпиялық саясатымен келісесіз
            </Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#5F5BDB", alignSelf: "center" }}>
              Аккаунтыңыз бар ма? Кіру
            </Text>
          </Pressable>

          {/* ---------- Popover module ---------- */}
          <Modal
            visible={visible}
            backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onBackdropPress={() => setVisible(false)}
          >
            <Card disabled={true}>
              <Text
                style={{
                  color: "red",
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                Қолданушы жүйеде тіркелген!
              </Text>
              <Button onPress={() => setVisible(false)}>Жақсы</Button>
            </Card>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
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
