import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { FetchApiCall } from "../components/ReuseComp";
import { FontAwesome } from "@expo/vector-icons";
import { windowWidth, windowHeight } from "../utils/StyleSet";
import { useIsFocused } from "@react-navigation/native";

export default function LoginScreen({ navigation }) {
  const [userID, onChangeUserID] = useState("");
  const [password, onChangePassword] = useState("");
  const [secureTextStat, setSecureTextStat] = useState(true);
  //Using window from JS as global variable
  window.user = userID;

  const url =
    "http://182.76.43.173:91/SpFeedPurchaseOrder/Login?username=" +
    userID +
    "&password=" +
    password;
  const [loginStatus, setLoginStatus] = useState("");
  //Using FetchApiCall reuseable component to get the response and saving it in loginStatus
  const getStatus = FetchApiCall(setLoginStatus, url);

  const handleLogin = () => {
    window.user = userID;
    if (userID.length === 0) {
      alert("User ID can't be empty");
    } else if (password.length === 0) {
      alert("Password can't be empty");
    } else if (loginStatus === "Success") {
      onChangePassword("");
      navigation.navigate("Branch");
    } else {
      if (loginStatus === "Invalid Password") {
        alert("Invalid Password");
      } else {
        if (loginStatus === "Invalid UserId") {
          alert("Invalid UserId");
        } else {
          alert("Server No Response");
        }
      }
    }
  };

  //Resetting UserId when we navigate from branch to login screen
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      onChangeUserID("");
    }
  }, [isFocused]);

  return (
    <>
      <View style={styles.container}>
        <View>
          <Image
            style={styles.logo}
            source={require("../assets/hk_logo.png")}
            accessible={true}
            accessibilitylabel={"Henkart Logo"}
          />
          <View style={styles.inputContainer}>
            <FontAwesome
              name="user"
              size={24}
              color="black"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              value={userID}
              onChangeText={onChangeUserID}
              clearButtonMode={"always"}
              placeholder={"User ID"}
              placeholderTextColor={"#00000078"}
            ></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome
              name="lock"
              size={24}
              color="black"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={onChangePassword}
              clearButtonMode={"always"}
              secureTextEntry={secureTextStat}
              placeholder={"Password"}
              placeholderTextColor={"#00000078"}
            ></TextInput>
          </View>
          <View style={{ flexDirection: "row" }}>
            <BouncyCheckbox
              size={25}
              fillColor="grey"
              unfillColor="#FFFFFF"
              iconStyle={{ borderColor: "grey", borderRadius: 0 }}
              innerIconStyle={{ borderWidth: 2, borderRadius: 0 }}
              onPress={(isChecked) => {
                setSecureTextStat(!secureTextStat);
              }}
              style={{ paddingLeft: 40, padding: 10 }}
            />
            <Text
              style={{
                paddingLeft: 0,
                padding: 15,
                fontSize: 20,
              }}
            >
              {secureTextStat ? "Show Password" : "Hide Password"}
            </Text>
          </View>
          <TouchableOpacity
            onFocus={getStatus()}
            onPress={handleLogin}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              color: "black",
              textAlign: "center",
              top: windowHeight / 6,
            }}
          >
            Powered by PGConnect, 2023
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 100,
    width: 300,
    resizeMode: "contain",
    marginVertical: 40,
    alignSelf: "center",
  },
  input: {
    flex: 1,
    height: 50,
    margin: 10,
    padding: 10,
    fontSize: 16,
  },
  button: {
    margin: 20,
    padding: 10,
    fontSize: 22,
    borderColor: "black",
    backgroundColor: "#842048",
    borderWidth: 2,
    borderRadius: 10,
    height: 60,
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
    height: 50,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    margin: 20,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "black",
    backgroundColor: "lightgrey",
    borderRadius: 5,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
});
