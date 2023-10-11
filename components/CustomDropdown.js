import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { windowWidth, windowHeight, stylesSet } from "../utils/StyleSet";

const CustomDropdown = ({
  label,
  data,
  placeholder,
  valueLable,
  value,
  setValue,
  codeLable,
  code,
  setCode,
  isLong = false,
  viewDisableProp = false,
  onBlurProp,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const filteredData = data.filter(
    (item) =>
      item &&
      item[valueLable] &&
      item[valueLable].toLowerCase().includes(searchText.toLowerCase())
  );

  const handleModal = () => {
    if (viewDisableProp === true) {
      setModalVisible(false);
    } else if (data.length === 0) {
      alert("No data found!!");
    } else if (data.length !== 0) {
      setModalVisible(true);
    }
  };

  const handleItemSelect = (item) => {
    setValue(item[valueLable]);
    setCode(item[codeLable]);
    setSearchText("");
    setModalVisible(false);
  };

  const lsStyle = isLong ? styles.isLongStyle : styles.isShortStyle;
  const lsFlex = isLong ? styles.isLongFlex : styles.isShortFlex;
  const lsBorder = isLong ? styles.isLongBorder : styles.isShortBorder;

  useEffect(() => {
    const selectedOptionData = data.find((item) => item.label === value);
    if (selectedOptionData) {
      setCode(selectedOptionData[codeLable]);
    }
  }, [value]);

  return (
    <View style={styles.container}>
      <View style={lsStyle}>
        <Text style={lsFlex}>{label}</Text>
        <TouchableOpacity onPress={() => handleModal()} onBlur={onBlurProp}>
          <View style={lsBorder}>
            {/* <TextInput
              style={styles.input}
              value={value}
              placeholder={placeholder}
              placeholderTextColor="black"
              editable={false}
            /> */}
            <Text style={styles.input}>{value}</Text>
            <MaterialIcons
              name={modalVisible ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={24}
              color="#999"
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor={"grey"}
                value={searchText}
                onChangeText={setSearchText}
              />
              <View
                style={{
                  margin: 10,
                  marginTop: 10,
                  marginLeft: 0,
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    marginTop: -15,
                  }}
                >
                  Selected :
                </Text>
                <Text
                  style={{
                    marginBottom: -20,
                  }}
                >
                  {value}
                </Text>
              </View>
              <FlatList
                data={filteredData}
                keyExtractor={(item) => item[valueLable]}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.itemContainer}
                    onPress={() => handleItemSelect(item)}
                  >
                    <Text style={styles.itemText}>{item[valueLable]}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  isLongStyle: {
    flexDirection: "column",
    marginBottom: -10,
    marginRight: 20,
    marginLeft: 0,
    marginTop: 20,
  },
  isLongFlex: {
    fontSize: 15,
    marginRight: 10,
    paddingLeft: 20,
    color: "grey",
  },
  isLongBorder: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginLeft: 20,
  },
  isShortStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: -10,
    marginRight: 20,
  },
  isShortFlex: {
    flex: 1,
    fontSize: 16,
    marginTop: 10,
    marginRight: 10,
    paddingLeft: 20,
    color: "black",
  },
  isShortBorder: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: 0.55 * windowWidth,
    margin: 10,
    marginTop: 10,
    marginRight: 0,
    marginBottom: 0,
  },
  input: {
    flex: 1,
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 0,
    color: "black",
    fontSize: 16,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: "50%",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  searchInput: {
    height: 40,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  itemContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 16,
  },
  icon: {
    marginLeft: 8,
  },
});

export default CustomDropdown;
