import { View, Image, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import SecondBlock from "./screens/SecondBlock";
import CreateBlock from "./screens/CreateBlock";
import FourthBlock from "./screens/FourthBlock";
import Profile from "./screens/Profile";
import MyOrders from "./screens/MyOrders";
import Login from "./screens/Login";
import Registration from "./screens/Registration";
import Roles from "./screens/Roles";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Main() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Roles"
        component={Roles}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        showLabel: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 60 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          headerShadowVisible: false,
          headerTitle: "",
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../assets/home_ic.png")}
                resizeMode="contain"
                style={{
                  width: 22,
                  height: 21,
                  tintColor: focused ? "#5F5BDB" : "",
                }}
              />
              <Text
                style={{
                  color: focused ? "#5F5BDB" : "#B7B7B7",
                  fontSize: 12,
                  marginTop: 2,
                }}
              >
                Негізгі
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SecondBlock"
        component={SecondBlock}
        options={{
          headerShadowVisible: false,
          headerTitle: "",
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../assets/list_ic.png")}
                resizeMode="contain"
                style={{
                  width: 23,
                  height: 23,
                  tintColor: focused ? "#5F5BDB" : "",
                }}
              />
              <Text
                style={{
                  color: focused ? "#5F5BDB" : "#B7B7B7",
                  fontSize: 12,
                  marginTop: 2,
                }}
              >
                Тізім
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CreateBlock"
        component={CreateBlock}
        options={{
          headerShadowVisible: false,
          headerTitle: "",
          tabBarIcon: () => (
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../assets/add_ic.png")}
                resizeMode="contain"
                style={{
                  width: 38,
                  height: 38,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="FourthBlock"
        component={FourthBlock}
        options={{
          headerShadowVisible: false,
          headerTitle: "",
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../assets/box_ic.png")}
                resizeMode="contain"
                style={{
                  width: 23,
                  height: 23,
                  tintColor: focused ? "#5F5BDB" : "",
                }}
              />
              <Text
                style={{
                  color: focused ? "#5F5BDB" : "#B7B7B7",
                  fontSize: 12,
                  paddingTop: 2,
                }}
              >
                Жеткізу
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShadowVisible: false,
          headerTitle: "",
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../assets/profile_ic.png")}
                resizeMode="contain"
                style={{
                  width: 22,
                  height: 22,
                  tintColor: focused ? "#5F5BDB" : "",
                }}
              />
              <Text
                style={{
                  color: focused ? "#5F5BDB" : "#B7B7B7",
                  fontSize: 12,
                  paddingTop: 4,
                }}
              >
                Профиль
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function HomeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Second"
        component={SecondBlock}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Create"
        component={CreateBlock}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Fourth"
        component={FourthBlock}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyOrders"
        component={MyOrders}
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: "#F1F2F7" },
        }}
      />
    </Stack.Navigator>
  );
}
