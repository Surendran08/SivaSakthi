import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Platform,
  ToastAndroid,
} from "react-native";
import {
  BoxedInputFieldShort,
  BoxedInputFieldLong,
  BoxedDatePickerLong,
  BoxedHeader,
  RadioButton,
} from "../components/ReuseComp";
import { getToday } from "react-native-modern-datepicker";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import CustomDropdown from "../components/CustomDropdown";
import * as Location from "expo-location"; 
import { useIsFocused } from "@react-navigation/native";

export default function NewSc({ navigation }) {
  //Batch Info
  const [hatch, setHatch] = useState("");
  const [hatchDate, setHatchDate] = useState(ChangeFormateDate(getToday()));
  const [housed, setHoused] = useState("");
  const [age, setAge] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [cumulativeMort, setCumulativeMort] = useState("");
  const [cumulativeMortPer, setCumulativeMortPer] = useState("");
  const [chickLive, setChickLive] = useState("");
  const [cumulativeFeedRec, setCumulativeFeedRec] = useState("");
  const [cumulativeFeedCon, SetcumulativeFeedCon] = useState("");
  const [feedStock, setFeedStock] = useState("");
  const [supervisorEntryDate, SetSupervisorEntryDate] = useState("");
  //Mortality
  const [mortalityOn, setMortalityOn] = useState("");
  const [mortalityNos, setMortalityNos] = useState("");
  const [reason, setReason] = useState("");
  const [reasonCode, setReasonCode] = useState("");
  const [averageWeight, setAverageWeight] = useState("");
  //Feed
  const [feedCategory, setFeedCategory] = useState("");
  const [dailyFeed, setDailyFeed] = useState("");
  const [feedCategoryCode, setFeedCategoryCode] = useState("");
  const [bagCapacity, setBagCapacity] = useState("");
  const [bagCapacityCode, setBagCapacityCode] = useState("");
  const [feedCategorySec, setFeedCategorySec] = useState("");
  const [feedCategorySecCode, setFeedCategorySecCode] = useState("");
  const [DailyFeedSec, setDailyFeedSec] = useState("");
  const [bagCapacitySec, setBagCapacitySec] = useState("");
  const [bagCapacitySecCode, setBagCapacitySecCode] = useState("");
  const [feederStock, setFeederStock] = useState("");
  // const [startTime, setStartTime] = useState("");
  // const [endTime, setEndTime] = useState("");
  // const [standingTime, setStandingTime] = useState("");
  const [VehicleNo, setVehicleNo] = useState("");
  const [openingKm, setOpeningKm] = useState("");
  const [closingKm, setClosingKm] = useState("");
  const [runningKms, setRunningKms] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [latitude, setLatitude] = useState("N/A");
  console.log(latitude);
  const [longitude, setLongitude] = useState("N/A");
  console.log(longitude);
  //Tab Keys
  const [batchInfoTab, setBatchInfoTab] = useState(true);
  const [mortalityTab, setMortalityTab] = useState(true);
  const [feedTab, setFeedTab] = useState(true);

  //tempdata
  const tempdata = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];

  //Current Date for DatePicker
  function ChangeFormateDate(date) {
    return date.toString().split("/").reverse().join("/");
  }
  ChangeFormateDate(getToday());

  //Function using scrollTo method to scroll to the top
  const scrollViewRef = useRef();
  const handleResetScroll = (animation = true) => {
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: animation });
  };

  //Location
  const isFocused = useIsFocused();
  const [reloadGPS, setReloadGPS] = useState(false);

  useEffect(() => {
    if (isFocused) {
      handleResetScroll(false);
      setLatitude("N/A");
      setLongitude("N/A");
      setReloadGPS(!reloadGPS);
    }
  }, [isFocused]);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const showToastOrAlert = () => {
    const message = "GPS location noted. \nTurn Off GPS to save power!!";

    if (Platform.OS === "android") {
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
    } else if (Platform.OS === "ios") {
      alert("GPS location noted. \nTurn Off GPS to save power!!");
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync(location.coords);
      setLocation(location);
      if (address[0]?.city) {
        setCurrentLocation(
          `${address[0]?.district}, ${address[0]?.city}, ${address[0]?.region}, ${address[0]?.postalCode}, ${address[0]?.country}`
        );
      }
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      // alert("GPS location noted. \nTurn Off GPS to save power!!");
      showToastOrAlert();
    })();
  }, [reloadGPS]);

  return (
    <ScrollView ref={scrollViewRef} style={{ backgroundColor: "lightgrey" }}>
      <>
        {errorMsg && <Text>Error: {errorMsg}</Text>}
        <BoxedHeader
          boxedHeaderLabel="Batch Info"
          onPressMethod={() => setBatchInfoTab(!batchInfoTab)}
          tcolor="#3d3d3d"
          bcolor="#b5b5b5"
        />
        {batchInfoTab === true && (
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{ marginBottom: 0, marginLeft: 0, marginRight: -20 }}
              >
                <BoxedDatePickerLong
                  textLabel="Hatch Date"
                  date={hatchDate}
                  setDate={setHatchDate}
                />
              </View>
              <View style={{ marginBottom: 0, marginLeft: 0, marginRight: 20 }}>
                <BoxedInputFieldShort
                  textLabel="Housed"
                  textValue={housed}
                  setTextValue={setHoused}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ marginBottom: 0, marginLeft: 0, marginRight: 0 }}>
                <BoxedInputFieldShort
                  textLabel="Age"
                  textValue={age}
                  setTextValue={setAge}
                />
              </View>
              <View style={{ marginBottom: 0, marginLeft: 0, marginRight: 20 }}>
                <BoxedInputFieldShort
                  textLabel="Batch No"
                  textValue={batchNo}
                  setTextValue={setBatchNo}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ marginBottom: 0, marginLeft: 0, marginRight: 0 }}>
                <BoxedInputFieldShort
                  textLabel="Cumulative Mortality"
                  textValue={cumulativeMort}
                  setTextValue={setCumulativeMort}
                />
              </View>
              <View style={{ marginBottom: 0, marginLeft: 0, marginRight: 20 }}>
                <BoxedInputFieldShort
                  textLabel="Cumulative Mortality %"
                  textValue={cumulativeMortPer}
                  setTextValue={setCumulativeMortPer}
                />
              </View>
            </View>

            <BoxedInputFieldLong
              textLabel="Chick Live Stock"
              textValue={chickLive}
              setTextValue={setChickLive}
              editableprop={true}
              keyboardTypeProp={"default"}
              // maxLength={maxLengthProp}
            />
            <BoxedInputFieldLong
              textLabel="Cumulative Feed Received(Bags)"
              textValue={cumulativeFeedRec}
              setTextValue={setCumulativeFeedRec}
              editableprop={true}
              keyboardTypeProp={"default"}
              // maxLength={maxLengthProp}
            />
            <BoxedInputFieldLong
              textLabel="Cumulative Feed Consumption(Bags)"
              textValue={cumulativeFeedCon}
              setTextValue={SetcumulativeFeedCon}
              editableprop={true}
              keyboardTypeProp={"default"}
              // maxLength={maxLengthProp}
            />
            <BoxedInputFieldLong
              textLabel="Feed Stock"
              textValue={feedStock}
              setTextValue={setFeedStock}
              editableprop={true}
              keyboardTypeProp={"default"}
              // maxLength={maxLengthProp}
            />
            <BoxedInputFieldLong
              textLabel="Supervisor Entry Date"
              textValue={supervisorEntryDate}
              setTextValue={SetSupervisorEntryDate}
              editableprop={true}
              keyboardTypeProp={"default"}
              // maxLength={maxLengthProp}
            />
          </>
        )}

        <BoxedHeader
          boxedHeaderLabel="Mortality"
          onPressMethod={() => setMortalityTab(!mortalityTab)}
          tcolor="#3d3d3d"
          bcolor="#b5b5b5"
        />
        {mortalityTab === true && (
          <>
            <View>
              <BoxedInputFieldLong
                textLabel="Mortality On"
                textValue={mortalityOn}
                setTextValue={setMortalityOn}
                editableprop={true}
              />
            </View>
            <View>
              <BoxedInputFieldLong
                textLabel="Mortality Nos."
                textValue={mortalityNos}
                setTextValue={setMortalityNos}
                editableprop={true}
              />
              <CustomDropdown
                label="Reason"
                data={tempdata}
                value={reason}
                setValue={setReason}
                valueLable="label"
                code={reasonCode}
                setCode={setReasonCode}
                codeLable="code"
                isLong="true"
              />
              <BoxedInputFieldLong
                textLabel="Average Weight"
                textValue={averageWeight}
                setTextValue={setAverageWeight}
                editableprop={true}
              />
            </View>
          </>
        )}

        <BoxedHeader
          boxedHeaderLabel="Feed"
          onPressMethod={() => setFeedTab(!feedTab)}
          tcolor="#3d3d3d"
          bcolor="#b5b5b5"
        />
        {feedTab === true && (
          <>
            <CustomDropdown
              label="Feed Category I"
              data={tempdata}
              value={feedCategory}
              setValue={setFeedCategory}
              valueLable="label"
              code={feedCategoryCode}
              setCode={setFeedCategoryCode}
              codeLable="code"
              isLong="true"
            />
            <BoxedInputFieldLong
              textLabel="Daily Feed cons(Bags)"
              textValue={dailyFeed}
              setTextValue={setDailyFeed}
              editableprop={true}
            />

            <CustomDropdown
              label="Bag Capacity"
              data={tempdata}
              value={bagCapacity}
              setValue={setBagCapacity}
              valueLable="label"
              code={bagCapacityCode}
              setCode={setBagCapacityCode}
              codeLable="code"
              isLong="true"
            />
            <CustomDropdown
              label="Feed Category II"
              data={tempdata}
              value={feedCategorySec}
              setValue={setFeedCategorySec}
              valueLable="label"
              code={feedCategorySecCode}
              setCode={setFeedCategorySecCode}
              codeLable="code"
              isLong="true"
            />
            <BoxedInputFieldLong
              textLabel="DailyFeed cons(Bags)"
              textValue={DailyFeedSec}
              setTextValue={setDailyFeedSec}
              editableprop={true}
            />
            <CustomDropdown
              label="Bag Capacity"
              data={tempdata}
              value={bagCapacitySec}
              setValue={setBagCapacitySec}
              valueLable="label"
              code={bagCapacitySecCode}
              setCode={setBagCapacitySecCode}
              codeLable="code"
              isLong="true"
            />
            <BoxedInputFieldLong
              textLabel="Feeder-Stock(Bags)"
              textValue={feederStock}
              setTextValue={setFeederStock}
              editableprop={true}
            />
            <BoxedInputFieldLong
              textLabel="Vehicle No"
              textValue={VehicleNo}
              setTextValue={setVehicleNo}
              editableprop={true}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ marginBottom: 0, marginLeft: 0, marginRight: 0 }}>
                <BoxedInputFieldShort
                  textLabel="Opening km"
                  textValue={openingKm}
                  setTextValue={setOpeningKm}
                  DatePickerSetAutoCapitalize="characters"
                  // DatePickerSetEditableprop={!viewDisableKey}
                />
              </View>
              <View style={{ marginBottom: 0, marginLeft: 0, marginRight: 20 }}>
                <BoxedInputFieldShort
                  textLabel="Closing km"
                  textValue={closingKm}
                  setTextValue={setClosingKm}
                  DatePickerSetAutoCapitalize="characters"
                  // DatePickerSetEditableprop={!viewDisableKey}
                />
              </View>
            </View>
            <BoxedInputFieldLong
              textLabel="Running km"
              textValue={runningKms}
              setTextValue={setRunningKms}
              editableprop={true}
            />
            <BoxedInputFieldLong
              textLabel="Current Location"
              textValue={currentLocation}
              setTextValue={setCurrentLocation}
              editableprop={true}
              multiline={true}
              numberOfLines={4}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ marginBottom: 0, marginLeft: 0, marginRight: 0 }}>
                <TouchableOpacity
                  onPress={() => {
                    setReloadGPS(!reloadGPS);
                  }}
                >
                  <BoxedInputFieldShort
                    textLabel="Latitude"
                    textValue={latitude}
                    setTextValue={setLatitude}
                    isText={true}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ marginBottom: 0, marginLeft: 0, marginRight: 20 }}>
                <BoxedInputFieldShort
                  textLabel="Longitude"
                  textValue={longitude}
                  setTextValue={setLongitude}
                  isText={true}
                />
              </View>
            </View>
          </>
        )}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 20,
              backgroundColor: "#4d9f57",
              borderRadius: 5,
              padding: 10,
              marginLeft: 20,
              marginRight: 20,
              marginTop: 0,
              marginBottom: 20,
            }}
          >
            Create
          </Text>
        </TouchableOpacity>
      </>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
  },
  imageContainer: {
    marginTop: 20,
  },
  image: {
    width: 220,
    height: 300,
  },
});
