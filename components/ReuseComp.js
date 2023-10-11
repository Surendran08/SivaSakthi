import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
} from "react-native";
import DatePicker, { getToday } from "react-native-modern-datepicker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { windowWidth, windowHeight, stylesSet } from "../utils/StyleSet";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 0,
    margin: 20,
  },
  label: {
    flex: 1,
    fontSize: 15,
    marginRight: 10,
    paddingLeft: 20,
  },
  input: {
    width: 0.55 * windowWidth,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: "black",
    color: "black",
    paddingVertical: 5,
    marginRight: 20,
  },
  inputBox: {
    flex: 1.5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 5,
    marginRight: 20,
  },
});

//Used for text field eg: Age in week
export const InputField = ({
  label,
  value,
  setValue,
  editableprop = true,
  keyboardTypeProp = "numeric",
  onBlur,
  onFocus,
  autoCapitalize,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        editable={editableprop}
        keyboardType={keyboardTypeProp}
        onBlur={onBlur}
        onFocus={onFocus}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
};

//Used for text field eg: Age in week
export const InputFieldText = ({ label, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.input}>{value}</Text>
    </View>
  );
};

//Btn design eg: Delete , save ,etc.,.
export const LongButton = ({ buttonLabel, onPressMethod }) => {
  return (
    <TouchableOpacity onPress={onPressMethod}>
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 20,
          backgroundColor: "#822046",
          padding: 3,
          marginLeft: 20,
          marginRight: 20,
          marginTop: 0,
          marginBottom: 20,
        }}
      >
        {buttonLabel}
      </Text>
    </TouchableOpacity>
  );
};

//Used for displaying time or date eg: Doc Date
export const DatePickerSet = ({
  datePickerTextLabel,
  datePickerTextValue,
  setDatePickerTextValue,
  editableprop = false,
  keyboardTypeProp,
  maxLengthProp,
}) => {
  return (
    <View
      style={{
        flexDirection: "column",
        marginBottom: 0,
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      <Text
        style={{
          fontSize: 13,
          color: "black",
          paddingVertical: 5,
          marginLeft: 10,
          marginRight: 20,
          marginTop: 20,
          marginBottom: -25,
        }}
      >
        {datePickerTextLabel}
      </Text>
      <TextInput
        style={{
          fontSize: 16,
          borderBottomWidth: 1,
          borderColor: "black",
          color: "black",
          paddingVertical: 5,
          marginLeft: 10,
          marginRight: 20,
          marginTop: 20,
          width: 0.45 * windowWidth,
        }}
        value={datePickerTextValue}
        onChangeText={setDatePickerTextValue}
        editable={editableprop}
        keyboardType={keyboardTypeProp}
        maxLength={maxLengthProp}
      />
    </View>
  );
};

//Date picker
export function DatePickerProp({ datePickerValue, setDatePickerValue }) {
  const [modalVisible, setModalVisible] = useState(false);
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <View style={{ marginBottom: -200 }}>
      <TouchableOpacity style={{ width: 50 }} onPress={handleOpenModal}>
        <Ionicons
          name="calendar-outline"
          size={30}
          color="#a43d64"
          backgroundColor="#d6d7d7"
          borderRadius={4}
          margin={1}
          padding={2}
          paddingLeft={9}
        />
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent>
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <TouchableWithoutFeedback>
              <View>
                <DatePicker
                  options={{
                    backgroundColor: "#090C08",
                    textHeaderColor: "#FFA25B",
                    textDefaultColor: "#F6E7C1",
                    selectedTextColor: "#fff",
                    mainColor: "#F4722B",
                    textSecondaryColor: "#D6C7A1",
                    borderColor: "rgba(122, 146, 165, 0.1)",
                  }}
                  current={getToday()}
                  selected={getToday()}
                  mode="calendar"
                  minuteInterval={30}
                  style={{
                    borderRadius: 10,
                    width: 0.9 * windowWidth,
                    height: 0.55 * windowHeight,
                    position: "absolute",
                    marginLeft: 0.05 * windowWidth,
                    marginRight: 0.05 * windowWidth,
                    marginTop: 0.225 * windowHeight,
                    marginBottom: 0.225 * windowHeight,
                  }}
                  onDateChange={(datePickerValue) => {
                    setDatePickerValue(
                      datePickerValue.toString().split("/").reverse().join("/")
                    );
                    setModalVisible(false);
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

//Time picker
export const TimePickerProp = ({ timePickerValue, setTimePickerValue }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <View>
        <TouchableOpacity
          style={{ width: 50 }}
          onPress={() => {
            setOpen(!open);
          }}
        >
          <Ionicons
            name="time-outline"
            size={30}
            color="#a43d64"
            backgroundColor="#d6d7d7"
            borderRadius={4}
            margin={1}
            padding={2}
            paddingLeft={9}
          />
        </TouchableOpacity>
        <Modal
          visible={open}
          transparent={true}
          supportedOrientations={["portrait", "landscape"]}
        >
          {open && (
            <DatePicker
              current={getToday()}
              selected={getToday()}
              mode="time"
              minuteInterval={3}
              // style={{
              //   borderRadius: 10,
              //   width: 300,
              //   position: "absolute",
              //   marginLeft: 60,
              //   marginTop: 200,
              //   marginBottom: 200,
              // }}
              onTimeChange={(timePickerValue) => {
                setTimePickerValue(timePickerValue);
                setOpen(!open);
              }}
            />
          )}
        </Modal>
      </View>
    </>
  );
};

//Used for text field with placeholder and shorter bottom width eg: Doc No
export const PlaceHolderInputBox = ({
  placeHolderInputBoxLabel,
  placeHolderInputBoxValue,
  setplaceHolderInputBoxValue,
  placeHolderInputBoxAutoCapitalize,
  placeHolderInputBoxOnBlur,
  placeHolderInputBoxEditableprop = true,
  placeHolderInputBoxAutoCorrect = true,
  keyboardTypeProp,
  maxLengthProp,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 0,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: "space-between",
      }}
    >
      <TextInput
        style={{
          fontSize: 16,
          borderBottomWidth: 1,
          borderColor: "black",
          paddingVertical: 5,
          marginLeft: 10,
          marginRight: 20,
          marginTop: 20,
          width: 0.45 * windowWidth,
          color: "black",
        }}
        value={placeHolderInputBoxValue}
        onChangeText={setplaceHolderInputBoxValue}
        placeholder={placeHolderInputBoxLabel}
        placeholderTextColor="grey"
        autoCapitalize={placeHolderInputBoxAutoCapitalize}
        onBlur={placeHolderInputBoxOnBlur}
        editable={placeHolderInputBoxEditableprop}
        autoCorrect={placeHolderInputBoxAutoCorrect}
        keyboardType={keyboardTypeProp}
        maxLength={maxLengthProp}
      />
    </View>
  );
};

//Btn design for tabs eg: item issue ,etc.,.
export const BoxedHeader = ({ boxedHeaderLabel, onPressMethod }) => {
  return (
    <TouchableOpacity onPress={onPressMethod}>
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 20,
          backgroundColor: "#842048",
          padding: 7,
          marginLeft: 20,
          marginRight: 20,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        {boxedHeaderLabel}
      </Text>
    </TouchableOpacity>
  );
};

//Design for vertical line
export const VerticalLine = () => {
  return (
    <View
      style={{
        borderBottomColor: "#822046",
        borderBottomWidth: 2,
        marginLeft: 20,
        marginRight: 20,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
      }}
    />
  );
};

//Btn design for table view (add,  edit , reset)
export const ResetAddCombo = ({ resetNav, editNav, addNav }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 0,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity
        style={{
          fontSize: 22,
          padding: 10,
          marginLeft: 10,
          // marginRight: 10,
          borderColor: "black",
          backgroundColor: "#822046",
          borderRadius: 1,
          width: 0.25 * windowWidth,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={resetNav}
      >
        <Text
          style={{ color: "white", textAlign: "center", fontSize: 18, top: -3 }}
        >
          Reset
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          fontSize: 22,
          padding: 10,
          marginLeft: 5,
          marginRight: 5,
          borderColor: "black",
          backgroundColor: "#822046",
          borderRadius: 1,
          width: 0.25 * windowWidth,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={editNav}
      >
        <Text
          style={{ color: "white", textAlign: "center", fontSize: 18, top: -3 }}
        >
          Edit
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          fontSize: 22,
          padding: 10,
          marginVertical: 8,
          // marginLeft: 10,
          marginRight: 10,
          borderColor: "black",
          backgroundColor: "#822046",
          borderRadius: 1,
          width: 0.25 * windowWidth,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={addNav}
      >
        <Text
          style={{ color: "white", textAlign: "center", fontSize: 18, top: -3 }}
        >
          Add
        </Text>
      </TouchableOpacity>
    </View>
  );
};

//Reusable componet for api calls
export const FetchApiCall = (setData, url, body = "", isJson = true) => {
  return async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });
      let json;
      if (isJson) {
        json = await response.json();
      } else {
        json = await response.text();
      }
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };
};

//Radio button design
export const RadioButton = ({ label, checked, onPress }) => {
  const styles = StyleSheet.create({
    radioButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 0,
    },
    radioButtonOuter: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "gray",
      marginRight: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    radioButtonInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: "#822046",
    },
    radioButtonLabel: {
      fontSize: 15,
    },
  });

  return (
    <TouchableOpacity style={styles.radioButtonContainer} onPress={onPress}>
      <View style={styles.radioButtonOuter}>
        {checked && <View style={styles.radioButtonInner} />}
      </View>
      <Text style={styles.radioButtonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};
