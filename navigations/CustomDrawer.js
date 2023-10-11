import { View, Image } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <Image
          source={require("../assets/hk_logo.png")}
          style={{
            width: 250,
            resizeMode: "contain",
            alignSelf: "center",
            margin: 10,
            marginTop: 20,
            marginBottom: 20,
          }}
        />
        <DrawerItemList {...props}></DrawerItemList>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
