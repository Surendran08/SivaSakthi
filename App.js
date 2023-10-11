import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import AppNav from "./navigations/AppNav";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#842048" style="light" />
      <NavigationContainer>
        <AppNav />
      </NavigationContainer>
    </>
  );
}
