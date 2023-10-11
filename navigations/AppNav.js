import React from "react";
import { Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";

import LoginScreen from "../screens/LoginScreen";
import Branch from "../screens/Branch";
import Transactions from "../screens/Transactions";
import PurchaseOrder from "../screens/PurchaseOrder";
import NewSc from "../screens/NewSc";

import CustomDrawer from "./CustomDrawer";

const Drawer = createDrawerNavigator();

const AppNav = () => {
  return (
    <Drawer.Navigator
      backBehavior="history"
      drawerContent={(props) => <CustomDrawer {...props} />}
      useLegacyImplementation
      initialRouteName="NewSc"
      screenOptions={{
        headerStyle: { backgroundColor: "#822046" },
        headerTintColor: "white",
      }}
    >
      <Drawer.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: "SIVASAKTHI",
          drawerLockMode: "locked-closed",
          drawerLabel: () => null,
          swipeEnabled: false,
          headerLeft: () => null,
          headerShown: true,
          drawerItemStyle: { display: "none" },
          headerTitleAlign: "center",
        }}
      />
      <Drawer.Screen
        name="Branch"
        component={Branch}
        options={{
          title: "SIVASAKTHI",
          drawerItemStyle: { display: "none" },
        }}
      />
       <Drawer.Screen
        name="NewSc"
        component={NewSc}
        options={{
          title: "NewSc",
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="Transactions"
        component={Transactions}
        options={{
          drawerLabel: ({ focused }) => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Entypo
                name="triangle-right"
                size={24}
                color="black"
                style={{ marginRight: 20 }}
              />
              <Text
                style={{
                  fontSize: focused ? 18 : 22,
                  color: "grey",
                }}
              >
                Transactions
              </Text>
            </View>
          ),
          drawerLockMode: "locked-closed",
          swipeEnabled: false,
          headerLeft: () => null,
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="PurchaseOrder"
        component={PurchaseOrder}
        options={{
          title: "Purchase Order",
          drawerItemStyle: { display: "none" },
          drawerLockMode: "locked-closed",
          swipeEnabled: false,
          headerLeft: () => null,
          headerShown: true,
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppNav;
