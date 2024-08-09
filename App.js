import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./src/Main";
import GlobalStyles from "./styles/GlobalStyles";
import { SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

export default function App() {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={{ ...eva.light }}>
        <NavigationContainer>
          <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <Main />
          </SafeAreaView>
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
}
