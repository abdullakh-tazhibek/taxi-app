import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./src/Main";
import GlobalStyles from "./styles/GlobalStyles";
import { SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import * as SecureStore from "expo-secure-store";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        let token;
        if (typeof window !== "undefined") {
          // Web environment
          token = localStorage.getItem("token");
        } else {
          // React Native environment
          token = await SecureStore.getItemAsync("token");
        }
        if (token) {
          setIsAuthenticated(true); // User is authenticated
        } else {
          setIsAuthenticated(false); // User is not authenticated
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    // Add logic to check if the user is authenticated
    // setIsAuthenticated(true or false);
  }, []);

  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={{ ...eva.light }}>
        <NavigationContainer>
          <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <Main isAuthenticated={isAuthenticated} />
          </SafeAreaView>
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
}
