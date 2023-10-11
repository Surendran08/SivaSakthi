import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import {
  InputField,
  LongButton,
  DatePickerSet,
  DatePickerProp,
  PlaceHolderInputBox,
  BoxedHeader,
  VerticalLine,
  ResetAddCombo,
  FetchApiCall,
  RadioButton,
} from "../components/ReuseComp";
import { getToday } from "react-native-modern-datepicker";
import { Table, Row } from "react-native-table-component";
import { CheckBox } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import CustomDropdown from "../components/CustomDropdown";
import { useIsFocused } from "@react-navigation/native";
import { windowWidth, windowHeight } from "../utils/StyleSet";

export default function DailyReport({ navigation }) {
  //Common Tab - Value code pair
  const [docNo, setDocNo] = useState("");
  const [docDate, setDocDate] = useState(ChangeFormateDate(getToday()));
  const [supervisor, setSupervisor] = useState("");
  const [supervisorCode, setSupervisorCode] = useState("");
  const [birdsInStage, setBirdsInStage] = useState("");
  const [birdsInStageCode, setBirdsInStageCode] = useState("");
  const [godown, setGodown] = useState("");
  const [godownCode, setGodownCode] = useState("");
  const [flockNo, setFlockNo] = useState("");
  const [flockNoCode, setFlockNoCode] = useState("");
  const [ageInWeek, setAgeInWeek] = useState("");
  const [opBirds, setOpBirds] = useState("");
  //Hidden data
  const [breedCode, setBreedCode] = useState("");
  const [hatchDate, setHatchDate] = useState("");
  const [fwkstDate, setFwkstDate] = useState("");
  const [malestk, setMalestk] = useState("");
  //Tab1 - Value code pair
  const [itemType, setItemType] = useState("");
  const [itemTypeCode, setItemTypeCode] = useState("");
  const [item, setItem] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [categoryNature, setCategoryNature] = useState("REGULAR");
  //Removed reason from Tab1
  // const [reason, setReason] = useState("");
  // const [reasonCode, setReasonCode] = useState("");
  const [totIssQtyBirds, setTotIssQtBirds] = useState("");
  const [issQtyBirds, setIssQtyBirds] = useState("");
  //Tab2 - Value code pair
  const [reasonTab2, setReasonTab2] = useState("");
  const [reasonTab2Code, setReasonTab2Code] = useState("");
  const [mortalityNosBirds, setMortalityNosBirds] = useState("");
  const [remarks, setRemarks] = useState("");
  //Tab3 - Value code pair
  const [totalNoOfCollections, setTotalNoOfCollections] = useState("");
  const [eggType, setEggType] = useState("");
  const [eggtypeCode, setEggtypeCode] = useState("");
  const [noOfTrays, setNoOfTrays] = useState("");
  const [closingEggStock, setClosingEggStock] = useState("");
  const [birdWeight, setBirdWeight] = useState("");

  //Clear
  const ClearAllBtn = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to clear all fields?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            alert("Data being Cleared. Please wait for popup to appear");
            setDocNo("");
            setViewDisableKey(false);
            setDocDate(ChangeFormateDate(getToday()));
            setSupervisor("");
            setSupervisorCode("");
            setBirdsInStage("");
            setBirdsInStageCode("");
            setGodown("");
            setGodownCode("");
            setFlockNo("");
            setFlockNoCode("");
            setAgeInWeek("");
            setOpBirds("");

            ResetBtnTab1();
            setTableDataTab1([]);
            ResetBtnTab2();
            setTableDataTab2([]);
            ResetBtnTab3();
            setTableDataTab3([]);

            //Close all tabs
            setTabItemIssue(false);
            setTabMortality(false);
            setTabEggCollection(false);

            setBirdWeight("");

            //isDisabledTab - Table checkbox disabled on edit operation
            setIsDisabledTab1(false);
            setIsDisabledTab2(false);
            setIsDisabledTab3(false);

            handleResetScroll();

            setViewData([]);

            alert("Data Cleared!!. Please continue");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const ResetBtnTab1 = () => {
    setItemType("");
    setItemTypeCode("");
    setItem("");
    setItemCode("");
    setAvaStockQty("");
    setStockQty("");
    setCategoryNature("REGULAR");
    // setReason("");
    // setReasonCode("");
    setTotIssQtBirds("");
    setIssQtyBirds("");
  };

  const ResetBtnTab2 = () => {
    setReasonTab2("");
    setReasonTab2Code("");
    setMortalityNosBirds("");
    setRemarks("");
  };

  const ResetBtnTab3 = () => {
    setTotalNoOfCollections("");
    setEggType("");
    setNoOfTrays("");
    setClosingEggStock("");
  };

  //viewDisableKey used to show or hide table fields
  const [viewDisableKey, setViewDisableKey] = useState(false);

  //ViewBtn runs on view btn onpress, fills all fields using received view data which is already loaded when doc no is filled
  const ViewBtn = () => {
    if (docNo !== "" && viewData[0]) {
      setViewDisableKey(true);
      setTabItemIssue(true);
      setTabMortality(true);
      setTabEggCollection(true);
      setDocNo(viewData[0]?.DocNo);
      setDocDate(viewData[0]?.entryDate);
      setSupervisor(viewData[0]?.EmpName);
      setGodown(viewData[0]?.GodownName);
      setBirdsInStageCode(viewData[0]?.GodownType);
      setFlockNo(viewData[0]?.FlockName);
      setAgeInWeek(viewData[0]?.Age);
      setOpBirds(viewData[0]?.Femalestk);
      setCategoryNature("");
      setTableDataTab1(viewDataArr1);
      setTableDataTab2(viewDataArr2);
      setTableDataTab3(viewDataArr3);
      setBirdWeight(viewData[0]?.BirdWeight);
    } else if (docNo === "") {
      alert("Doc. No. Can't be empty");
    } else if (!viewData[0]) {
      alert("No data found!!");
    }
  };

  //Save call from save btn
  const SaveBtn = () => {
    const emptyKeys = [];
    const tabelKeys = [];

    const tempSave = () => {
      if (
        docDate !== ("" || null) &&
        supervisor !== ("" || null) &&
        birdsInStage !== ("" || null) &&
        godown !== ("" || null) &&
        flockNo !== ("" || null) &&
        ageInWeek !== ("" || null) &&
        opBirds !== ("" || null) &&
        (tableDataTab1.length !== 0 ||
          tableDataTab2.length !== 0 ||
          tableDataTab3.length !== 0) &&
        birdWeight !== ("" || null)
      ) {
        alert("Data being Uploaded. Please wait for popup to appear");
        //Constructing save data
        const saveData = {
          BranchCode: branchCode,
          entryDate: docDate,
          GodownCode: godownCode,
          Supervisor: supervisorCode,
          FlockNo: flockNoCode,
          Age: ageInWeek,
          Femalestk: opBirds,
          logUserId: window.user,
          Malestk: malestk,
          Hatchdate: hatchDate,
          Fwkstdate: fwkstDate,
          Breedcode: breedCode,
          saveitem: saveDataArr1,
          savemort: saveDataArr2,
          saveegg: saveDataArr3,
          BirdWeight: birdWeight,
        };
        
        //api call declaration
        const saveCall = (setData, url, body = "", isJson = true) => {
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
              json = await response.json();
              setSaveResponse(json);
              setData(json);
              //Save message alert
              alert(`${json?.success}\n\n${json?.docNo}` ?? json);
            } catch (error) {
              console.error(error);
            }
          };
        };

        //api callback function
        const apiSave = saveCall(
          setSaveResponse,
          "http://182.76.43.164:117/LayerDailyentry/DailyentrySave",
          JSON.stringify(saveData)
        );
        apiSave();

        //Clearing all fields after save
        setDocNo("");
        setViewDisableKey(false);
        setDocDate(ChangeFormateDate(getToday()));
        setSupervisor("");
        setSupervisorCode("");
        setBirdsInStage("");
        setBirdsInStageCode("");
        setGodown("");
        setGodownCode("");
        setFlockNo("");
        setFlockNoCode("");
        setAgeInWeek("");
        setOpBirds("");

        ResetBtnTab1();
        setTableDataTab1([]);
        ResetBtnTab2();
        setTableDataTab2([]);
        ResetBtnTab3();
        setTableDataTab3([]);

        setTabItemIssue(false);
        setTabMortality(false);
        setTabEggCollection(false);

        handleResetScroll();

        setBirdWeight("");
      }
    };

    //Displays empty fields in alert
    if (!docDate) {
      emptyKeys.push("Doc Date");
    }
    if (!supervisor) {
      emptyKeys.push("Supervisor");
    }
    if (!birdsInStage) {
      emptyKeys.push("Birds in stage");
    }
    if (!godown) {
      emptyKeys.push("Godown");
    }
    if (!flockNo) {
      emptyKeys.push("Flock No");
    }
    if (!ageInWeek) {
      emptyKeys.push("Age in week");
    }
    if (!opBirds) {
      emptyKeys.push("Op Birds");
    }
    if (!tableDataTab1.length) {
      tabelKeys.push("Item Issue Table");
    }
    if (!tableDataTab2.length) {
      tabelKeys.push("Mortality/Culling Table");
    }
    if (!tableDataTab3.length) {
      tabelKeys.push("Egg Collection Table");
    }
    if (!birdWeight) {
      emptyKeys.push("Bird Weight");
    }

    if (emptyKeys.length > 0 || tabelKeys.length === 3) {
      const errorMessage = `Fields can't be empty!!\nFill data: \n${emptyKeys.join(
        ",\n"
      )}\n\nAtleast Fill one table: \n${tabelKeys.join(",\n")}`;
      alert(errorMessage);
    } else if (tabelKeys.length >= 1) {
      Alert.alert(
        "Confirmation",
        `Are you sure you want to save without these table entries?\n\n${tabelKeys.join(
          ",\n"
        )}`,
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              tempSave();
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Confirmation",
        "Are you sure you want to save this entry?",
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              tempSave();
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  //Tab1 - All operations and table view setup
  const widthArrTab1 = [80, 100, 170, 130, 120, 120];

  const [tableHeadTab1, setTableHeadTab1] = useState([
    "Select",
    "Item Type",
    "Item",
    // "Stock Qty",
    "Category/Nature",
    "Tot.Iss.Qty Birds",
    "Iss.Qty Birds",
  ]);

  const [tableDataTab1, setTableDataTab1] = useState([
    {
      itemType: "",
      item: "",
      categoryNature: "",
      reason: "",
      // stockQty: "",
      totIssQtyBirds: "",
      issQtyBirds: "",
      checked: false,
      itemTypeCode: "",
      itemCode: "",
      opBirds: "",
    },
  ]);

  //Used to identify selected row
  const [selectedRowTab1, setSelectedRowTab1] = useState(null);
  //Used to hide or show update btn when edit is used
  const [updateKeyTab1, setUpdateKeyTab1] = useState(false);

  const addDataTab1 = () => {
    if (
      itemType !== "" &&
      item !== "" &&
      // stockQty !== "" &&
      categoryNature !== "" &&
      // reason !== "" &&
      totIssQtyBirds !== "" &&
      issQtyBirds !== ""
    ) {
      if (opBirds) {
        const newData = {
          itemType,
          item,
          // stockQty,
          categoryNature,
          // reason,
          totIssQtyBirds,
          issQtyBirds,
          checked: false,
          itemTypeCode,
          itemCode,
          opBirds,
        };
        setTableDataTab1([...tableDataTab1, newData]);
        ResetBtnTab1();
      } else {
        alert("Iss Qty/Birds is not valid!!\nPlease fill Op. Birds!!");
      }
    } else {
      alert("Fields can't be empty");
    }
  };

  const deleteDataTab1 = () => {
    const filteredData = tableDataTab1.filter((item) => !item.checked);
    if (filteredData.length === tableDataTab1.length) {
      alert("No Record Selected!!");
    } else {
      Alert.alert(
        "Confirmation",
        "Are you sure you want to delete?",
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              setTableDataTab1(filteredData);
              setSelectedRowTab1(null);
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const editDataTab1 = () => {
    if (opBirds) {
      const filteredData = tableDataTab1.filter((item) => item.checked);
      if (filteredData.length === 0) {
        alert("No Record Selected!!");
      } else if (filteredData.length > 1) {
        alert("Multiple Records Selected!!");
      } else {
        const selectedData = tableDataTab1.find((item) => item.checked);
        if (selectedData) {
          setItemType(selectedData.itemType);
          setItem(selectedData.item);
          //TempItem used to clear item when itemtype is changed in tab1 under edit operation - rakesh
          setTempItemType(selectedData.itemType);
          setTempItem(selectedData.item);
          setTempOpBird(selectedData.opBirds);
          // setStockQty(selectedData.stockQty);
          setCategoryNature(selectedData.categoryNature);
          // setReason(selectedData.reason);
          setTotIssQtBirds(selectedData.totIssQtyBirds);
          setIssQtyBirds(selectedData.issQtyBirds);
          setItemTypeCode(selectedData.itemTypeCode);
          setItemCode(selectedData.itemCode);
          setSelectedRowTab1(tableDataTab1.indexOf(selectedData));
          setUpdateKeyTab1(true);
          setIsDisabledTab1(true);
        }
      }
    } else {
      alert("Please fill Op. Birds!!");
    }
  };

  const updateDataTab1 = () => {
    if (
      itemType !== "" &&
      item !== "" &&
      categoryNature !== "" &&
      // reason !== "" &&
      totIssQtyBirds !== "" &&
      issQtyBirds !== "Infinity"
    ) {
      if (selectedRowTab1 !== null) {
        if (opBirds) {
          const updatedData = [...tableDataTab1];
          updatedData[selectedRowTab1].itemType = itemType;
          updatedData[selectedRowTab1].item = item;
          // updatedData[selectedRowTab1].stockQty = stockQty;
          updatedData[selectedRowTab1].categoryNature = categoryNature;
          // updatedData[selectedRowTab1].reason = reason;
          updatedData[selectedRowTab1].totIssQtyBirds = totIssQtyBirds;
          updatedData[selectedRowTab1].issQtyBirds = issQtyBirds;
          updatedData[selectedRowTab1].itemTypeCode = itemTypeCode;
          updatedData[selectedRowTab1].itemCode = itemCode;
          updatedData[selectedRowTab1].opBirds = opBirds;
          setTempItemType("");
          setTempItem("");
          setTempOpBird("");
          setTableDataTab1(
            updatedData.map((item) => ({
              ...item,
              checked: false,
            }))
          );
          ResetBtnTab1();
          updatedData[selectedRowTab1].checked = true;
          setSelectedRowTab1(null);
          setUpdateKeyTab1(false);
          setIsDisabledTab1(false);
        } else {
          alert("Please fill Op. Birds!!\nThen Refill Tol.Iss.Qty Birds");
          setTotIssQtBirds("");
          setIssQtyBirds("");
        }
      }
    } else {
      if (issQtyBirds === "Infinity") {
        alert(
          "Iss Qty/Birds is not valid!!\nPlease fill Op. Birds!!\nRefill Tol.Iss.Qty Birds for recalculating Iss Qty/Birds"
        );
      } else alert("Fields can't be empty");
    }
  };
  const handleCheckboxChangeTab1 = (index) => {
    const updatedData = [...tableDataTab1];
    updatedData[index].checked = !updatedData[index].checked;
    setTableDataTab1(updatedData);
  };

  //isDisabledTab - Table checkbox disabled on edit operation
  const [isDisabledTab1, setIsDisabledTab1] = useState(false);
  const renderHeaderRowsTab1 = () => {
    return (
      <Table>
        <Row
          data={tableHeadTab1}
          widthArr={widthArrTab1}
          style={{ height: 50, backgroundColor: "rgba(130,32,70,0.5)" }}
          textStyle={tabStyles.headText}
        />
        <ScrollView style={{ marginTop: -1, maxHeight: 200 }}>
          {tableDataTab1.map((rowData, index) => (
            <Table borderStyle={tabStyles.tableBorder}>
              <Row
                key={index}
                widthArr={widthArrTab1}
                data={[
                  <CheckBox
                    checked={rowData.checked}
                    onPress={() =>
                      isDisabledTab1 ? null : handleCheckboxChangeTab1(index)
                    }
                    containerStyle={tabStyles.checkboxContainer}
                    checkedColor="rgba(130,32,70,0.5)"
                    uncheckedColor="black"
                  />,
                  rowData.itemType,
                  rowData.item,
                  // rowData.stockQty,
                  rowData.categoryNature,
                  // rowData.reason,
                  rowData.totIssQtyBirds,
                  rowData.issQtyBirds,
                ]}
                style={[
                  { height: 70, backgroundColor: "#E7E6E1" },
                  index % 2 && { backgroundColor: "#F7F6E7" },
                ]}
                textStyle={{ textAlign: "center", color: "black" }}
              />
            </Table>
          ))}
        </ScrollView>
      </Table>
    );
  };

  //Tab2 - All operations and table view setup
  //Used to increse width of last coloumn if mobile screen is extra wide
  let lastArrTab2 = 170;
  const widthArrTab2 = [80, 170, 140, lastArrTab2];
  let sum = 0;

  for (let i = 0; i < widthArrTab2.length; i++) {
    sum += widthArrTab2[i];
  }

  if (sum < windowWidth) {
    lastArrTab2 = 200;
  }

  const [tableHeadTab2, setTableHeadTab2] = useState([
    "Select",
    "Reason",
    "Mortality Nos. Birds",
    "Remarks",
  ]);

  const [tableDataTab2, setTableDataTab2] = useState([
    {
      reasonTab2: "",
      mortalityNosBirds: "",
      remarks: "",
      checked: false,
      reasonTab2Code: "",
    },
  ]);

  //Used to identify selected row
  const [selectedRowTab2, setSelectedRowTab2] = useState(null);
  //Used to hide or show update btn when edit is used
  const [updateKeyTab2, setUpdateKeyTab2] = useState(false);

  const addDataTab2 = () => {
    if (reasonTab2 !== "" && mortalityNosBirds !== "" && remarks !== "") {
      const newData = {
        reasonTab2,
        mortalityNosBirds,
        remarks: remarks.toUpperCase(),
        checked: false,
        reasonTab2Code,
      };
      setTableDataTab2([...tableDataTab2, newData]);
      ResetBtnTab2();
    } else {
      alert("Fields can't be empty");
    }
  };

  const deleteDataTab2 = () => {
    const filteredData = tableDataTab2.filter((item) => !item.checked);
    if (filteredData.length === tableDataTab2.length) {
      alert("No Record Selected!!");
    } else {
      Alert.alert(
        "Confirmation",
        "Are you sure you want to delete?",
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              setTableDataTab2(filteredData);
              setSelectedRowTab2(null);
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const editDataTab2 = () => {
    const filteredData = tableDataTab2.filter((item) => item.checked);
    if (filteredData.length === 0) {
      alert("No Record Selected!!");
    } else if (filteredData.length !== 1) {
      alert("Multiple Records Selected!!");
    } else if (filteredData.length === 1) {
      const selectedData = tableDataTab2.find((item) => item.checked);
      if (selectedData) {
        setReasonTab2(selectedData.reasonTab2);
        setMortalityNosBirds(selectedData.mortalityNosBirds);
        setRemarks(selectedData.remarks);
        setReasonTab2Code(selectedData.reasonTab2Code);
        setSelectedRowTab2(tableDataTab2.indexOf(selectedData));
        setUpdateKeyTab2(true);
        setIsDisabledTab2(true);
      }
    }
  };

  const updateDataTab2 = () => {
    if (reasonTab2 !== "" && mortalityNosBirds !== "" && remarks !== "") {
      if (selectedRowTab2 !== null) {
        const updatedData = [...tableDataTab2];
        updatedData[selectedRowTab2].reasonTab2 = reasonTab2;
        updatedData[selectedRowTab2].mortalityNosBirds = mortalityNosBirds;
        updatedData[selectedRowTab2].remarks = remarks;
        updatedData[selectedRowTab2].reasonTab2Code = reasonTab2Code;
        setTableDataTab2(
          updatedData.map((item) => ({
            ...item,
            checked: false,
          }))
        );
        ResetBtnTab2();
        updatedData[selectedRowTab2].checked = true;
        setSelectedRowTab2(null);
        setUpdateKeyTab2(false);
        setIsDisabledTab2(false);
      }
    } else {
      alert("Fields can't be empty");
    }
  };
  const handleCheckboxChangeTab2 = (index) => {
    const updatedData = [...tableDataTab2];
    updatedData[index].checked = !updatedData[index].checked;
    setTableDataTab2(updatedData);
  };

  //isDisabledTab - Table checkbox disabled on edit operation
  const [isDisabledTab2, setIsDisabledTab2] = useState(false);
  const renderHeaderRowsTab2 = () => {
    return (
      <Table>
        <Row
          data={tableHeadTab2}
          widthArr={widthArrTab2}
          style={{ height: 50, backgroundColor: "rgba(130,32,70,0.5)" }}
          textStyle={tabStyles.headText}
        />
        <ScrollView style={{ marginTop: -1, maxHeight: 200 }}>
          {tableDataTab2.map((rowData, index) => (
            <Table borderStyle={tabStyles.tableBorder}>
              <Row
                key={index}
                widthArr={widthArrTab2}
                data={[
                  <CheckBox
                    checked={rowData.checked}
                    onPress={() =>
                      isDisabledTab2 ? null : handleCheckboxChangeTab2(index)
                    }
                    containerStyle={tabStyles.checkboxContainer}
                    checkedColor="rgba(130,32,70,0.5)"
                    uncheckedColor="black"
                  />,
                  rowData.reasonTab2,
                  rowData.mortalityNosBirds,
                  rowData.remarks,
                ]}
                style={[
                  { height: 70, backgroundColor: "#E7E6E1" },
                  index % 2 && { backgroundColor: "#F7F6E7" },
                ]}
                textStyle={{ textAlign: "center", color: "black" }}
              />
            </Table>
          ))}
        </ScrollView>
      </Table>
    );
  };

  //Tab3 - All operations and table view setup

  const widthArrTab3 = [80, 110, 110, 110, 140];

  const [tableHeadTab3, setTableHeadTab3] = useState([
    "Select",
    "Total No. of Collections",
    "Egg Type",
    "No. of Trays",
    "Closing Egg Stocks",
  ]);

  const [tableDataTab3, setTableDataTab3] = useState([
    {
      totalNoOfCollections: "",
      eggType: "",
      noOfTrays: "",
      closingEggStock: "",
      checked: false,
      eggtypeCode: "",
    },
  ]);

  //Used to identify selected row
  const [selectedRowTab3, setSelectedRowTab3] = useState(null);
  //Used to hide or show update btn when edit is used
  const [updateKeyTab3, setUpdateKeyTab3] = useState(false);

  const addDataTab3 = () => {
    if (
      totalNoOfCollections !== "" &&
      eggType !== "" &&
      noOfTrays !== "" &&
      closingEggStock !== ""
    ) {
      const newData = {
        totalNoOfCollections,
        eggType,
        noOfTrays,
        closingEggStock,
        checked: false,
        eggtypeCode,
      };
      setTableDataTab3([...tableDataTab3, newData]);
      ResetBtnTab3();
    } else {
      alert("Fields can't be empty");
    }
  };

  const deleteDataTab3 = () => {
    const filteredData = tableDataTab3.filter((item) => !item.checked);
    if (filteredData.length === tableDataTab3.length) {
      alert("No Record Selected!!");
    } else {
      Alert.alert(
        "Confirmation",
        "Are you sure you want to delete?",
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              setTableDataTab3(filteredData);
              setSelectedRowTab3(null);
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const editDataTab3 = () => {
    const filteredData = tableDataTab3.filter((item) => item.checked);
    if (filteredData.length === 0) {
      alert("No Record Selected!!");
    } else if (filteredData.length !== 1) {
      alert("Multiple Records Selected!!");
    } else if (filteredData.length === 1) {
      const selectedData = tableDataTab3.find((item) => item.checked);
      if (selectedData) {
        setTotalNoOfCollections(selectedData.totalNoOfCollections);
        setEggType(selectedData.eggType);
        setNoOfTrays(selectedData.noOfTrays);
        setClosingEggStock(selectedData.closingEggStock);
        setEggtypeCode(selectedData.eggtypeCode);
        setSelectedRowTab3(tableDataTab3.indexOf(selectedData));
        setUpdateKeyTab3(true);
        setIsDisabledTab3(true);
      }
    }
  };

  const updateDataTab3 = () => {
    if (
      totalNoOfCollections !== "" &&
      eggType !== "" &&
      noOfTrays !== "" &&
      closingEggStock !== ""
    ) {
      if (selectedRowTab3 !== null) {
        const updatedData = [...tableDataTab3];
        updatedData[selectedRowTab3].totalNoOfCollections =
          totalNoOfCollections;
        updatedData[selectedRowTab3].eggType = eggType;
        updatedData[selectedRowTab3].noOfTrays = noOfTrays;
        updatedData[selectedRowTab3].closingEggStock = closingEggStock;
        updatedData[selectedRowTab3].eggtypeCode = eggtypeCode;
        setTableDataTab3(
          updatedData.map((item) => ({
            ...item,
            checked: false,
          }))
        );
        ResetBtnTab3();
        updatedData[selectedRowTab3].checked = true;
        setSelectedRowTab3(null);
        setUpdateKeyTab3(false);
        setIsDisabledTab3(false);
      }
    } else {
      alert("Fields can't be empty");
    }
  };
  const handleCheckboxChangeTab3 = (index) => {
    const updatedData = [...tableDataTab3];
    updatedData[index].checked = !updatedData[index].checked;
    setTableDataTab3(updatedData);
  };

  //isDisabledTab - Table checkbox disabled on edit operation
  const [isDisabledTab3, setIsDisabledTab3] = useState(false);
  const renderHeaderRowsTab3 = () => {
    return (
      <Table>
        <Row
          data={tableHeadTab3}
          widthArr={widthArrTab3}
          style={{ height: 50, backgroundColor: "rgba(130,32,70,0.5)" }}
          textStyle={tabStyles.headText}
        />
        <ScrollView style={{ marginTop: -1, maxHeight: 200 }}>
          {tableDataTab3.map((rowData, index) => (
            <Table borderStyle={tabStyles.tableBorder}>
              <Row
                key={index}
                widthArr={widthArrTab3}
                data={[
                  <CheckBox
                    checked={rowData.checked}
                    onPress={() =>
                      isDisabledTab3 ? null : handleCheckboxChangeTab3(index)
                    }
                    containerStyle={tabStyles.checkboxContainer}
                    checkedColor="rgba(130,32,70,0.5)"
                    uncheckedColor="black"
                  />,
                  rowData.totalNoOfCollections,
                  rowData.eggType,
                  rowData.noOfTrays,
                  rowData.closingEggStock,
                ]}
                style={[
                  { height: 60, backgroundColor: "#E7E6E1" },
                  index % 2 && { backgroundColor: "#F7F6E7" },
                ]}
                textStyle={{ textAlign: "center", color: "black" }}
              />
            </Table>
          ))}
        </ScrollView>
      </Table>
    );
  };

  //Current Date for DatePicker
  function ChangeFormateDate(date) {
    return date.toString().split("/").reverse().join("/");
  }
  ChangeFormateDate(getToday());

  //Hide or show Tabs
  const [tabItemIssue, setTabItemIssue] = useState(false);
  const [tabMortality, setTabMortality] = useState(false);
  const [tabEggCollection, setTabEggCollection] = useState(false);

  //RadioBtn
  useEffect(() => {
    if (birdsInStageCode === "PG") {
      setBirdsInStage("Brooding");
    } else if (birdsInStageCode === "GG") {
      setBirdsInStage("Growing");
    } else if (birdsInStageCode === "RG") {
      setBirdsInStage("Laying");
    }
  }, [birdsInStageCode]);

  const RadioButtons = () => {
    const handleRadioButtonPress = (choice, choiceCode) => {
      if (viewDisableKey === true && updateKeyTab1 === true) {
        return;
      } else if (viewDisableKey === false && updateKeyTab1 === false) {
        setBirdsInStage(choice);
        setBirdsInStageCode(choiceCode);
      }
    };
    return (
      <View>
        <Text
          style={{
            fontSize: 16,
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          Birds in Stage
        </Text>
        <View
          style={{
            top: 20,
            flexDirection: "row",
            marginBottom: 20,
            marginLeft: 20,
            marginRight: 20,
            borderWidth: 2,
            borderColor: "#822046",
            justifyContent: "space-around",
            height: 40,
          }}
        >
          <RadioButton
            key="Brooding"
            label="Brooding"
            checked={birdsInStage === "Brooding"}
            onPress={() => handleRadioButtonPress("Brooding", "PG")}
          />
          <RadioButton
            key="Growing"
            label="Growing"
            checked={birdsInStage === "Growing"}
            onPress={() => handleRadioButtonPress("Growing", "GG")}
          />
          <RadioButton
            key="Laying"
            label="Laying"
            checked={birdsInStage === "Laying"}
            onPress={() => handleRadioButtonPress("Laying", "RG")}
          />
        </View>
      </View>
    );
  };

  //Fetch Calls
  //Common Tab
  const [viewData, setViewData] = useState([]);

  //Changing keys received from view api to variables used in our code
  let viewDataArr1 = viewData[0]?.viewitem?.map(
    ({ ItemTypeName, ItemName, Nature, Qty, Qtyperbird, Reason }) => ({
      itemType: ItemTypeName,
      item: ItemName,
      categoryNature: Nature,
      totIssQtyBirds: Qty,
      issQtyBirds: Qtyperbird,
      reason: Reason,
    })
  );
  let viewDataArr2 = viewData[0]?.viewmort?.map(
    ({ ReasonName, MortalityNo, Remarks }) => ({
      reasonTab2: ReasonName,
      mortalityNosBirds: MortalityNo,
      remarks: Remarks,
    })
  );
  let viewDataArr3 = viewData[0]?.viewegg?.map(
    ({ TotalCollection, EggTypeName, NoOfTrays, Closingstock }) => ({
      totalNoOfCollections: TotalCollection,
      eggType: EggTypeName,
      noOfTrays: NoOfTrays,
      closingEggStock: Closingstock,
    })
  );

  //Changing variable from our code to api's key. this will be send on save api
  const saveDataArr1 =
    tableDataTab1.length !== 0
      ? tableDataTab1
          .map(({ checked, ...rest }) => rest)
          .map((item) => {
            return {
              ItemType: item.itemTypeCode,
              ItemCode: item.itemCode,
              Nature: item.categoryNature,
              Qty: item.totIssQtyBirds,
              Qtyperbird: item.issQtyBirds,
              Reason: "REGULAR",
            };
          })
      : [
          {
            ItemType: "",
            ItemCode: "",
            Nature: "",
            Qty: "",
            Qtyperbird: "",
            Reason: "",
          },
        ];
  const saveDataArr2 =
    tableDataTab2.length !== 0
      ? tableDataTab2
          .map(({ checked, ...rest }) => rest)
          .map((item) => {
            return {
              ReasonCode: item.reasonTab2Code,
              MortalityNo: item.mortalityNosBirds,
              Remarks: item.remarks,
            };
          })
      : [
          {
            ReasonCode: "",
            MortalityNo: "",
            Remarks: "",
          },
        ];
  const saveDataArr3 =
    tableDataTab3.length !== 0
      ? tableDataTab3
          .map(({ checked, ...rest }) => rest)
          .map((item) => {
            return {
              TotalCollection: item.totalNoOfCollections,
              EggType: item.eggtypeCode,
              NoOfTrays: item.noOfTrays,
              Closingstock: item.closingEggStock,
            };
          })
      : [
          {
            TotalCollection: "",
            EggType: "",
            NoOfTrays: "",
            Closingstock: "",
          },
        ];

  //Used to uncheck all tabs when using clear btn
  const checkClearedDataArr1 = tableDataTab1.map((item) => ({
    ...item,
    checked: false,
  }));
  const checkClearedDataArr2 = tableDataTab2.map((item) => ({
    ...item,
    checked: false,
  }));
  const checkClearedDataArr3 = tableDataTab3.map((item) => ({
    ...item,
    checked: false,
  }));

  //Common grid
  const [supervisorData, setSupervisorData] = useState([]);
  const [godownData, setGodownData] = useState([]);
  const [flockNoData, setFlockNoData] = useState([]);
  const [flockDetailData, setFlockDetailData] = useState([]);
  //Tab1
  const [itemTypeData, setItemTypeData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [reasonData, setReasonData] = useState([]);
  //Tab3
  const [eggTypeData, setEggTypeData] = useState([]);
  const [saveResponse, setSaveResponse] = useState("");
  //Common grid
  const apiViewData = FetchApiCall((res) => {
    setViewData(res);
  }, "http://182.76.43.164:117/LayerDailyentry/DailyentryView?Branchcode=4102&DocNo=" + docNo.toUpperCase());

  const apiSupervisor = FetchApiCall(
    setSupervisorData,
    "http://182.76.43.164:117/Layer/LayGetSupervisor?branchcode=" +
      window.branchCode
  );
  const apiGodown = FetchApiCall(
    setGodownData,
    "http://182.76.43.164:117/Layer/GetLayGodown?branchcode=" +
      window.branchCode +
      "&entrydate=" +
      docDate +
      "&godowntype=" +
      birdsInStageCode
  );
  const apiFlock = FetchApiCall(
    setFlockNoData,
    "http://182.76.43.164:117/Layer/GetLayFlock?branchcode=" +
      window.branchCode +
      "&entrydate=" +
      docDate +
      "&godowncode=" +
      godownCode
  );
  const apiFlockDetail = FetchApiCall((res) => {
    setFlockDetailData(res);
    setAgeInWeek(res.Age);
    setOpBirds(res.Femalestk);
    setBreedCode(res.Breedcode);
    setHatchDate(res.Hatchdate);
    setFwkstDate(res.Fwkstdate);
    setMalestk(res.Malestk);
  }, "http://182.76.43.164:117/Layer/GetLayFlkDet?branchcode=" + window.branchCode + "&entrydate=" + docDate + "&godowncode=" + godownCode + "&flockno=" + flockNoCode);
  //Tab1
  const apiItemType = FetchApiCall(
    setItemTypeData,
    "http://182.76.43.164:117/Layer/GetLayItemType?branchcode=" +
      window.branchCode
  );
  const apiItem = FetchApiCall(
    setItemData,
    "http://182.76.43.164:117/Layer/GetLayItem?branchcode=" +
      window.branchCode +
      "&entrydate=" +
      docDate +
      "&godowncode=" +
      window.branchCode +
      "&itemtype=" +
      itemTypeCode
  );
  const apiReason = FetchApiCall(
    setReasonData,
    "http://182.76.43.164:117/LayerDailyentry/GetLayerReason"
  );
  const apiEggType = FetchApiCall(
    setEggTypeData,
    "http://182.76.43.164:117/Layer/GetLayEggType?branchcode=" +
      window.branchCode
  );

  //TempItem used to clear item when itemtype is changed in tab1 under edit operation - rakesh
  const [tempItemType, setTempItemType] = useState("");
  const [tempItem, setTempItem] = useState("");
  const [tempOpBird, setTempOpBird] = useState("");

  //Used to reset page when going from transaction to dailyreports screen
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      if (window.branchCode === "") {
        alert("Branch Not Selected. Please Navigate Back to Branch");
      }
      setUpdateKeyTab1(false);
      setUpdateKeyTab2(false);
      setUpdateKeyTab3(false);
      setIsDisabledTab1(false);
      setIsDisabledTab2(false);
      setIsDisabledTab3(false);
      handleResetScroll(false);
      apiSupervisor();
      apiItemType();
      apiReason();
      apiEggType();
      window.branchCode;
      window.user;

      setDocNo("");
      setViewDisableKey(false);
      setDocDate(ChangeFormateDate(getToday()));
      setSupervisor("");
      setSupervisorCode("");
      setBirdsInStage("");
      setBirdsInStageCode("");
      setGodown("");
      setGodownCode("");
      setFlockNo("");
      setFlockNoCode("");
      setAgeInWeek("");
      setOpBirds("");

      ResetBtnTab1();
      setTableDataTab1([]);
      ResetBtnTab2();
      setTableDataTab2([]);
      ResetBtnTab3();
      setTableDataTab3([]);

      setTabItemIssue(false);
      setTabMortality(false);
      setTabEggCollection(false);

      setBirdWeight("");
    }
  }, [isFocused]);

  //Send view request when doc no is typed after 7 digits
  //Old method
  // useEffect(() => {
  //   if (docNo.length >= 7) {
  //     apiViewData();
  //   } else if (docNo.length <= 7) {
  //     setViewData([]);
  //   }
  // }, [docNo]);
  //New method
  const [docNoCall, setDocNoCall] = useState(false);
  useEffect(() => {
    apiViewData();
  }, [docNoCall]);

  //Below are used for api call when the corresponding fields change and clear fields when parent field changes
  useEffect(() => {
    setGodown("");
    setGodownCode("");
    setFlockNo("");
    setFlockNoCode("");
    setAgeInWeek("");
    setOpBirds("");
  }, [docDate, birdsInStageCode]);

  useEffect(() => {
    apiGodown();
  }, [docDate, birdsInStageCode]);

  useEffect(() => {
    setFlockNo("");
    setFlockNoCode("");
    setAgeInWeek("");
    setOpBirds("");
  }, [docDate, godownCode]);

  useEffect(() => {
    apiFlock();
  }, [docDate, godownCode]);

  useEffect(() => {
    apiFlockDetail();
  }, [docDate, flockNoCode]);

  useEffect(() => {
    apiItem();
  }, [docDate, itemTypeCode]);

  useEffect(() => {
    if (updateKeyTab1 === false) {
      setItem("");
      setItemCode("");
    }
    //TempItem used to clear item when itemtype is changed in tab1 under edit operation - rakesh
    else if (updateKeyTab1 === true && tempItemType != itemType) {
      setItem("");
      setItemCode("");
      setTotIssQtBirds("");
      setIssQtyBirds("");
    }
  }, [docDate, itemTypeCode]);

  useEffect(() => {
    if (updateKeyTab1 === false) {
      setTotIssQtBirds("");
      setIssQtyBirds("");
    }
    if (updateKeyTab1 === true && tempItem != item) {
      setTotIssQtBirds("");
      setIssQtyBirds("");
    }
  }, [itemCode]);

  useEffect(() => {
    if (updateKeyTab1 === false) {
      setTotIssQtBirds("");
      setIssQtyBirds("");
    }
  }, [opBirds]);

  useEffect(() => {
    if (!opBirds) {
      setTotIssQtBirds("");
      setIssQtyBirds("");
    }
  }, [totIssQtyBirds]);

  useEffect(() => {
    if (viewDisableKey === false) {
      if (updateKeyTab1 === true && tempOpBird != opBirds) {
        if (
          parseFloat(totIssQtyBirds) >
          parseFloat(itemData.find((e1) => e1.ItemName === item)?.StockQty)
        ) {
          alert(
            "Entered quantity must be less than or equal to the stock quantity"
          );
          setTotIssQtBirds("");
          setIssQtyBirds("");
        } else {
          if (opBirds) {
            alert(
              `Op. Bird changed!!\n\nPrevious Value ${tempOpBird}\n\nNew Value ${opBirds} \n\nIss.Qty/Birds is recalculated!!`
            );
            e = ((totIssQtyBirds * 1000) / opBirds).toFixed(4);
            setIssQtyBirds(e);
          }
        }
      }
    }
  }, [updateKeyTab1, opBirds]);

  //Function using scrollTo method to scroll to the top
  const scrollViewRef = useRef();
  const handleResetScroll = (animation = true) => {
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: animation });
  };

  //Added new stock qty entry for tab 1
  const [avaStockQty, setAvaStockQty] = useState("");
  //Used to display Closing egg stocks. will display "" when no entry else the value
  const stkValue = noOfTrays === "" ? "" : noOfTrays;

  return (
    <ScrollView ref={scrollViewRef}>
      {/*Common Tab*/}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ marginBottom: 0, marginLeft: 0, marginRight: -40 }}>
          <PlaceHolderInputBox
            placeHolderInputBoxLabel="Doc No."
            placeHolderInputBoxValue={docNo}
            setplaceHolderInputBoxValue={setDocNo}
            placeHolderInputBoxAutoCapitalize="characters"
            placeHolderInputBoxEditableprop={!viewDisableKey}
            placeHolderInputBoxAutoCorrect={false}
            placeHolderInputBoxOnBlur={() => {
              setDocNoCall(!docNoCall);
            }}
          />
        </View>
        {viewDisableKey === false && (
          <TouchableOpacity
            style={{
              fontSize: 22,
              padding: 10,
              marginVertical: 8,
              margin: 10,
              marginTop: 20,
              left: -10,
              borderColor: "black",
              backgroundColor: "#822046",
              borderWidth: 1,
              borderRadius: 1,
              width: 120,
            }}
            onPress={() => ViewBtn()}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
              View
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <DatePickerSet
            datePickerTextLabel="Doc Date"
            datePickerTextValue={docDate}
            setDatePickerTextValue={setDocDate}
          />
        </View>
        {viewDisableKey === false && updateKeyTab1 === false ? (
          <View style={{ top: 30, marginBottom: 10, marginRight: 90 }}>
            <DatePickerProp
              datePickerValue={docDate}
              setDatePickerValue={setDocDate}
            ></DatePickerProp>
          </View>
        ) : null}
      </View>
      {viewDisableKey === false && (
        <CustomDropdown
          label="Supervisor"
          data={supervisorData}
          value={supervisor}
          setValue={setSupervisor}
          valueLable="EmpName"
          code={supervisorCode}
          setCode={setSupervisorCode}
          codeLable="Empcode"
          viewDisableProp={
            viewDisableKey === true || updateKeyTab1 === true ? true : false
          }
        />
      )}
      {viewDisableKey === true && (
        <CustomDropdown
          label="Supervisor"
          data={supervisorData}
          value={viewData[0]?.EmpName || ""}
          setValue={setSupervisor}
          valueLable="EmpName"
          code={supervisorCode}
          setCode={setSupervisorCode}
          codeLable="Empcode"
          viewDisableProp={
            viewDisableKey === true || updateKeyTab1 === true ? true : false
          }
        />
      )}
      <RadioButtons />
      {viewDisableKey === false && (
        <>
          <CustomDropdown
            label="Godown"
            data={godownData}
            value={godown}
            setValue={setGodown}
            valueLable="GodownName"
            code={godownCode}
            setCode={setGodownCode}
            codeLable="GodownCode"
            viewDisableProp={
              viewDisableKey === true || updateKeyTab1 === true ? true : false
            }
          />
          <CustomDropdown
            label="Flock No."
            data={flockNoData}
            value={flockNo}
            setValue={setFlockNo}
            valueLable="FlockName"
            code={flockNoCode}
            setCode={setFlockNoCode}
            codeLable="FlockNo"
            viewDisableProp={
              viewDisableKey === true || updateKeyTab1 === true ? true : false
            }
          />
          <InputField
            label="Age in week"
            value={ageInWeek}
            setValue={setAgeInWeek}
            editableprop={false}
          />
          <InputField
            label="Op. Birds"
            value={opBirds}
            setValue={setOpBirds}
            editableprop={false}
          />
        </>
      )}
      {viewDisableKey === true && (
        <>
          <CustomDropdown
            label="Godown"
            data={godownData}
            value={viewData[0]?.GodownName || ""}
            setValue={setGodown}
            valueLable="GodownName"
            code={godownCode}
            setCode={setGodownCode}
            codeLable="GodownCode"
            viewDisableProp={
              viewDisableKey === true || updateKeyTab1 === true ? true : false
            }
          />
          <CustomDropdown
            label="Flock No."
            data={flockNoData}
            value={viewData[0]?.FlockName || ""}
            setValue={setFlockNo}
            valueLable="FlockName"
            code={flockNoCode}
            setCode={setFlockNoCode}
            codeLable="FlockNo"
            viewDisableProp={
              viewDisableKey === true || updateKeyTab1 === true ? true : false
            }
          />
          <InputField
            label="Age in week"
            value={viewData[0]?.Age || ""}
            editableprop={false}
          />
          <InputField
            label="Op. Birds"
            value={viewData[0]?.Femalestk || ""}
            editableprop={false}
          />
        </>
      )}

      <VerticalLine />
      {/* Tab1 */}
      <BoxedHeader
        boxedHeaderLabel="Item Issue"
        onPressMethod={() => setTabItemIssue(!tabItemIssue)}
      />
      {tabItemIssue === true && (
        <>
          {viewDisableKey === false && (
            <>
              <CustomDropdown
                label="Item Type"
                data={itemTypeData}
                value={itemType}
                setValue={setItemType}
                valueLable="ItemTypeName"
                code={itemTypeCode}
                setCode={setItemTypeCode}
                codeLable="ItemType"
                viewDisableProp={viewDisableKey}
              />
              <CustomDropdown
                label="Item"
                data={itemData}
                value={item}
                setValue={setItem}
                valueLable="ItemName"
                code={itemCode}
                setCode={setItemCode}
                codeLable="ItemCode"
                viewDisableProp={viewDisableKey}
              />
              <InputField
                label="Available Stock Qty"
                value={itemData.find((e1) => e1.ItemName === item)?.StockQty}
                setValue={setAvaStockQty}
                editableprop={false}
              />
              <InputField
                label="Category/Nature"
                value={categoryNature}
                setValue={setCategoryNature}
                editableprop={false}
              />
              {/* <CustomDropdown
                label="Reason"
                data={reasonData}
                value={reason}
                setValue={setReason}
                valueLable="ReasonName"
                code={reasonCode}
                setCode={setReasonCode}
                codeLable="ReasonCode"
                viewDisableProp={viewDisableKey}
              /> */}
              <InputField
                label="Tot.Iss.Qty Birds"
                value={totIssQtyBirds}
                setValue={setTotIssQtBirds}
                editableprop={!viewDisableKey}
                onBlur={() => {
                  if (
                    parseFloat(totIssQtyBirds) >
                    parseFloat(
                      itemData.find((e1) => e1.ItemName === item)?.StockQty
                    )
                  ) {
                    alert(
                      "Entered quantity must be less than or equal to the stock quantity"
                    );
                    setTotIssQtBirds("");
                    setIssQtyBirds("");
                  } else {
                    e = ((totIssQtyBirds * 1000) / opBirds).toFixed(4);
                    setIssQtyBirds(e);
                  }
                }}
                onFocus={() => {
                  if (!opBirds || !item) {
                    if (!opBirds && !item) {
                      alert(
                        "No data for Op. Birds!! \nAfter Filling Op.Birds type again in \nTot.Iss.Qty.Birds"
                      );
                      Keyboard.dismiss();
                    }
                    if (!opBirds) {
                      alert(
                        "No data for Op. Birds!! \nAfter Filling Op.Birds type again in \nTot.Iss.Qty.Birds"
                      );
                      Keyboard.dismiss();
                    }
                    if (!item) {
                      alert("No data for Stock Qty!! \nFill Item field!!");
                      Keyboard.dismiss();
                    }
                  }
                }}
              />
              <InputField
                label="Iss Qty/Birds"
                value={issQtyBirds}
                setValue={setIssQtyBirds}
                editableprop={false}
              />
              {updateKeyTab1 === false && (
                <>
                  <ResetAddCombo
                    resetNav={() => {
                      ResetBtnTab1();
                      setTempItemType("");
                      setTempItem("");
                      setTempOpBird("");
                      if (tableDataTab1.length >= 1) {
                        setTableDataTab1(checkClearedDataArr1);
                      }
                    }}
                    editNav={editDataTab1}
                    addNav={addDataTab1}
                  />
                  <LongButton
                    buttonLabel="Delete"
                    onPressMethod={deleteDataTab1}
                  />
                </>
              )}
              {updateKeyTab1 === true && (
                <>
                  <LongButton
                    buttonLabel="Update"
                    onPressMethod={updateDataTab1}
                  />
                  <LongButton
                    buttonLabel="Cancel"
                    onPressMethod={() => {
                      setUpdateKeyTab1(false);
                      ResetBtnTab1();
                      setTableDataTab1(checkClearedDataArr1);
                      setIsDisabledTab1(false);
                    }}
                  />
                </>
              )}
            </>
          )}
          <View
            style={{
              marginLeft: 20,
              marginRight: 20,
              borderRadius: 50,
              backgroundColor: "transparent",
            }}
          >
            <ScrollView horizontal={true} style={{ marginTop: -1 }}>
              <View>{renderHeaderRowsTab1()}</View>
            </ScrollView>
          </View>
        </>
      )}
      <VerticalLine />
      {/* Tab2 */}
      <BoxedHeader
        boxedHeaderLabel="Mortality/Culling"
        onPressMethod={() => setTabMortality(!tabMortality)}
      />
      {tabMortality === true && (
        <>
          {viewDisableKey === false && (
            <>
              <CustomDropdown
                label="Reason"
                data={reasonData}
                value={reasonTab2}
                setValue={setReasonTab2}
                valueLable="ReasonName"
                code={reasonTab2Code}
                setCode={setReasonTab2Code}
                codeLable="ReasonCode"
                viewDisableProp={viewDisableKey}
              />
              <InputField
                label="Mortality Nos. Birds"
                value={mortalityNosBirds}
                setValue={setMortalityNosBirds}
                editableprop={!viewDisableKey}
              />
              <InputField
                label="Remarks"
                value={remarks}
                setValue={setRemarks}
                keyboardTypeProp="default"
                editableprop={!viewDisableKey}
                autoCapitalize="characters"
              />
              {updateKeyTab2 === false && (
                <>
                  <ResetAddCombo
                    resetNav={() => {
                      ResetBtnTab2();
                      if (tableDataTab2.length >= 1) {
                        setTableDataTab2(checkClearedDataArr2);
                      }
                    }}
                    editNav={editDataTab2}
                    addNav={addDataTab2}
                  />
                  <LongButton
                    buttonLabel="Delete"
                    onPressMethod={deleteDataTab2}
                  />
                </>
              )}
              {updateKeyTab2 === true && (
                <>
                  <LongButton
                    buttonLabel="Update"
                    onPressMethod={updateDataTab2}
                  />
                  <LongButton
                    buttonLabel="Cancel"
                    onPressMethod={() => {
                      setUpdateKeyTab2(false);
                      ResetBtnTab2();
                      setTableDataTab2(checkClearedDataArr2);
                      setIsDisabledTab2(false);
                    }}
                  />
                </>
              )}
            </>
          )}

          <View
            style={{
              marginLeft: 20,
              marginRight: 20,
              borderRadius: 50,
              backgroundColor: "transparent",
            }}
          >
            <ScrollView horizontal={true} style={{ marginTop: -1 }}>
              <View>{renderHeaderRowsTab2()}</View>
            </ScrollView>
          </View>
        </>
      )}
      <VerticalLine />
      {/* Tab3 */}
      <BoxedHeader
        boxedHeaderLabel="Egg Collection"
        onPressMethod={() => setTabEggCollection(!tabEggCollection)}
      />
      {tabEggCollection === true && (
        <>
          {viewDisableKey === false && (
            <>
              <InputField
                label="Total No. of Collections"
                value={totalNoOfCollections}
                setValue={setTotalNoOfCollections}
                editableprop={!viewDisableKey}
              />
              <CustomDropdown
                label="Egg Type"
                data={eggTypeData}
                value={eggType}
                setValue={setEggType}
                valueLable="EggTypeName"
                code={eggtypeCode}
                setCode={setEggtypeCode}
                codeLable="EggType"
                viewDisableProp={viewDisableKey}
              />
              <InputField
                label="No. of Trays"
                value={noOfTrays}
                setValue={setNoOfTrays}
                editableprop={!viewDisableKey}
                onBlur={() => {
                  e = noOfTrays * 30;
                  setClosingEggStock(e);
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                  marginLeft: 0,
                  marginRight: 0,
                  margin: 20,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    fontSize: 15,
                    marginRight: 10,
                    paddingLeft: 20,
                  }}
                >
                  Closing Egg Stocks
                </Text>
                <Text
                  style={{
                    width: 0.55 * windowWidth,
                    fontSize: 16,
                    borderBottomWidth: 1,
                    borderColor: "black",
                    color: "black",
                    paddingVertical: 5,
                    marginRight: 20,
                  }}
                >
                  {noOfTrays ? stkValue * 30 : ""}
                </Text>
              </View>
              {tabEggCollection === false && (
                <InputField
                  label="Closing Egg Stocks"
                  value={closingEggStock}
                  setValue={setClosingEggStock}
                  editableprop={false}
                  onFocus={() => {
                    e = noOfTrays * 30;
                    setClosingEggStock(e);
                  }}
                />
              )}
              {updateKeyTab3 === false && (
                <>
                  <ResetAddCombo
                    resetNav={() => {
                      ResetBtnTab3();
                      if (tableDataTab3.length >= 1) {
                        setTableDataTab3(checkClearedDataArr3);
                      }
                    }}
                    editNav={editDataTab3}
                    addNav={addDataTab3}
                  />
                  <LongButton
                    buttonLabel="Delete"
                    onPressMethod={deleteDataTab3}
                  />
                </>
              )}
              {updateKeyTab3 === true && (
                <>
                  <LongButton
                    buttonLabel="Update"
                    onPressMethod={updateDataTab3}
                  />
                  <LongButton
                    buttonLabel="Cancel"
                    onPressMethod={() => {
                      setUpdateKeyTab3(false);
                      ResetBtnTab3();
                      setTableDataTab3(checkClearedDataArr3);
                      setIsDisabledTab3(false);
                    }}
                  />
                </>
              )}
            </>
          )}
          <View
            style={{
              marginLeft: 20,
              marginRight: 20,
              borderRadius: 50,
              backgroundColor: "transparent",
            }}
          >
            <ScrollView horizontal={true} style={{ marginTop: -1 }}>
              <View>{renderHeaderRowsTab3()}</View>
            </ScrollView>
          </View>
        </>
      )}
      <VerticalLine />
      <>
        <InputField
          label="Bird Weight"
          value={birdWeight}
          setValue={setBirdWeight}
          editableprop={!viewDisableKey}
        />
      </>
      <VerticalLine />
      {viewDisableKey === false && (
        <LongButton buttonLabel="Save" onPressMethod={SaveBtn} />
      )}
      <LongButton buttonLabel="Clear" onPressMethod={ClearAllBtn} />
    </ScrollView>
  );
}

const tabStyles = StyleSheet.create({
  checkboxContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: "#C1C0B9",
  },
  headText: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
