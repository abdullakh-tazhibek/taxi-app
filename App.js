import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./src/Main";
import GlobalStyles from "./styles/GlobalStyles";
import { SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  {
    /* if isAuthenticated is true, the user will be navigated to 
    the HomeTabs directly, otherwise, they will see the Login or 
    Registration screens. */
  }
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
