import React, { useState, useEffect } from "react";
import { Text, ImageBackground, Alert, BackHandler } from "react-native";
import { FetchApiCall } from "../components/ReuseComp";
import CustomDropdown from "../components/CustomDropdown";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const Branch = ({ navigation }) => {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [branchNameCode, setBranchNameCode] = useState("");

  const [branchNamedata, setBranchNameData] = useState([]);
  const getMenu = FetchApiCall(
    setBranchNameData,
    "http://182.76.43.173:91/SpFeedPurchaseOrder/spFMobileBranch?username=900105"
  );

  //Getting api response for branch menu when the page is focused
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      window.user;
      getMenu();
    }
  }, [isFocused]);

  //Setting branchCode as global variable using window
  window.branchCode = branchNameCode;
  window.branchLabel = selectedBranch;

  //Adding confirmation when going to login from branch
  useFocusEffect(
    React.useCallback(() => {
      const handleBackPress = () => {
        Alert.alert(
          "Confirm Sign Out",
          "Are you sure you want to sign out?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Sign Out",
              onPress: () => {
                navigation.goBack();
                setSelectedBranch("");
                setBranchNameCode("");
              },
            },
          ],
          { cancelable: true }
        );
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    }, [navigation])
  );

  return (
    <>
      <Text style={{ color: "transparent" }}>{window.user}</Text>
      <CustomDropdown
        label="Branch Name"
        placeholder="Select Branch"
        data={branchNamedata}
        value={selectedBranch}
        setValue={setSelectedBranch}
        valueLable="branchName"
        code={branchNameCode}
        setCode={setBranchNameCode}
        codeLable="branchCode"
      />
      <ImageBackground
        source={require("../assets/pg_logo.png")}
        style={{
          marginHorizontal: 20,
          width: 290,
          height: 85,
          resizeMode: "contain",
          top: "20%",
          bottom: "50%",
          flex: 1,
          alignSelf: "center",
          justifyContent: "center",
        }}
      />
    </>
  );
};

export default Branch;
