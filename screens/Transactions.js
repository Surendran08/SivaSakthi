import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

export default function Transactions({ navigation }) {
  //Shows alert if branch name is empty
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      if (window.branchCode === "") {
        Alert.alert(
          "Confirmation",
          "Please select the Branch!!",
          [
            {
              text: "Ok",
              onPress: () => {
                navigation.goBack();
              },
            },
          ],
          { cancelable: false }
        );
      }
    }
  }, [isFocused]);

  return (
    //Hide if branch is empty else display
    window.branchCode != "" && (
      <>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate("PurchaseOrder")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 80,
              margin: 20,
              borderWidth: 1,
              padding: 10,
              fontSize: 16,
              borderColor: "black",
              backgroundColor: "white",
              borderRadius: 5,
            }}
          >
            <Image
              style={{ width: 70, height: 70 }}
              source={require("../assets/icons8-schedule-96.png")}
            />
            <Text style={styles.buttonText}>Purchase Order</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 25,
    marginLeft: 20,
  },
});
