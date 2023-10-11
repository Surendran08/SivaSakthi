import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Keyboard,
} from "react-native";
import {
  InputField,
  InputFieldText,
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

export default function PurchaseOrder({ navigation }) {
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
  //

  const taxInExData = [
    { label: "EXCLUSIVE", Taxid: "E" },
    { label: "INCLUSIVE", Taxid: "I" },
  ];

  //Common field - Value code pair
  const [poNo, setPoNo] = useState("");
  const [poDate, setPoDate] = useState(ChangeFormateDate(getToday()));
  const [refNo, setRefNo] = useState("");
  const [refDate, setRefDate] = useState(ChangeFormateDate(getToday()));
  const [validUpto, setValidUpto] = useState("");
  const [party, setParty] = useState("");
  const [partyCode, setPartyCode] = useState("");
  const [creditDays, setCreditDays] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemTypeCode, setItemTypeCode] = useState("");
  const [preparedBy, setPreparedBy] = useState("");
  const [preparedByCode, setPreparedByCode] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  const [approvedByCode, setApprovedByCode] = useState("");
  const [freight, setFreight] = useState("");
  const [freightCode, setFreightCode] = useState("");
  const [purThrough, SetPurThrough] = useState("");
  //Tab1 - Value code pair
  const [branchName, setBranchName] = useState(window.branchLabel);
  const [branchNameCode, setBranchNameCode] = useState(window.branchCode);
  const [item, setItem] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [uoM, setUoM] = useState("");
  const [nature, setNature] = useState("");
  const [natureCode, setNatureCode] = useState("");
  const [natureType, setNatureType] = useState("");
  const [natureTypeCode, setNatureTypeCode] = useState("");
  const [deliveryAt, setDelieveryAt] = useState("");
  const [deliveryAtCode, setDelieveryAtCode] = useState("");
  const [poQty, setPoQty] = useState("");
  const [freeQty, setFreeQty] = useState("");
  const [chargeQty, setChargeQty] = useState("");
  const [rate, setRate] = useState("");
  const [basicValue, setBasicValue] = useState("");
  const [discount, setDiscount] = useState("");
  const [netValue, setNetValue] = useState("");
  //Bottom field - Value code pair
  const [tDSValue, setTDSValue] = useState("");
  const [payTerms, setPayTerms] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [roundOff, setRoundOff] = useState("");
  const [netValueBtm, setNetValueBtm] = useState("");

  //Current Date for DatePicker
  function ChangeFormateDate(date) {
    return date.toString().split("/").reverse().join("/");
  }
  ChangeFormateDate(getToday());

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
            setPoNo("");
            setPoDate(ChangeFormateDate(getToday()));
            setRefNo("");
            setRefDate(ChangeFormateDate(getToday()));
            setValidUpto("");
            setParty("");
            setPartyCode("");
            setCreditDays("");
            setItemType("");
            setItemTypeCode("");
            setPreparedBy("");
            setPreparedByCode("");
            setApprovedBy("");
            setApprovedByCode("");
            setFreight("");
            setFreightCode("");

            setListOfItems([]);
            ResetBtnTab1();
            setTableDataTab1([]);

            //Close all tabs
            setTabItemDetails(false);
            setModalVisibleSub1(false);
            ResetBtnSub1();
            setTableDataSub1([]);
            // setModalVisibleSub2(false);
            // ResetBtnSub2();
            // setTableDataSub2([]);
            setModalVisibleSub3(false);
            ResetBtnSub3();
            setTableDataSub3([]);

            // setTDSValue("");
            setPayTerms("");
            setTotalValue("");
            setTotalValueTemp("");
            setRoundOff("");
            setNetValue("");
            setNetValueBtm("");
            setTotalPayAmount("");
            setTotalPer("");

            //isDisabledTab - Table checkbox disabled on edit operation
            setViewDisableKey(false);
            setIsDisabledTab1(false);
            setUpdateKeyTab1(false);

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
    setBranchName(window.branchLabel);
    setBranchNameCode(window.branchCode);
    setItem("");
    setItemCode("");
    setUoM("");
    setNature("");
    setNatureCode("");
    setDelieveryAt("");
    setDelieveryAtCode("");
    setPoQty("");
    setFreeQty("");
    setChargeQty("");
    setRate("");
    setBasicValue("");
    setDiscount("");
    setNetValue("");
  };

  const ResetBtnSub1 = () => {
    setTaxCode("");
    setTaxCodeName("");
    setTaxPer("");
    setAmount("");
    setTaxInEx("EXCLUSIVE");
    setTaxInExCode("E");
    // setTableDataSub1(checkClearedDataArrSub1);
  };

  const ResetBtnSub2 = () => {
    setTaxType("");
    setTaxTypeCode("");
    setTaxPerSub2("");
    setTaxAmount("");
    setInEx("REGULAR");
    setTableDataSub1(checkClearedDataArrSub2);
  };

  const ResetBtnSub3 = () => {
    setPaymentID("");
    setPaymentTerms("");
    setPayPer("");
    setPaymentAmount("");
    setTotalAmount("");
    // setTableDataSub1(checkClearedDataArrSub3);
  };

  //Function using scrollTo method to scroll to the top
  const scrollViewRef = useRef();
  const handleResetScroll = (animation = true) => {
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: animation });
  };

  const [viewData, setViewData] = useState([]);

  //viewDisableKey used to show or hide table fields
  const [viewDisableKey, setViewDisableKey] = useState(false);

  //Changing keys received from view api to variables used in our code

  // let viewDataSub1 = viewData[0]?.viewitem[1]?.viewtax?.map(
  //   ({ itemName, TaxCode, TaxRate, TaxAmount, Taxid }) => ({
  //     taxCode: "",
  //     taxPer: TaxRate,
  //     amount: TaxAmount,
  //     taxInEx: Taxid,
  //     checked: false,
  //     taxCodeName: TaxCode,
  //     taxInExCode: Taxid,
  //     itemSub1: itemName,
  //     itemCodeSub1: "",
  //   })
  // );

  let viewDataArr1 = viewData[0]?.viewitem?.map(
    ({
      branchName,
      itemName,
      uom,
      nature,
      GodownName,
      poqty,
      freeqty,
      chargeqty,
      rate,
      basicvalue,
      discountper,
      netvalue,
      viewtax,
    }) => ({
      branchName: branchName,
      item: itemName,
      uoM: uom,
      natureType: nature,
      deliveryAt: GodownName,
      poQty: poqty,
      freeQty: freeqty,
      chargeQty: chargeqty,
      rate: rate,
      basicValue: basicvalue,
      discount: discountper,
      netValue: netvalue,
      checked: false,
      branchNameCode: "",
      itemCode: "",
      natureTypeCode: "",
      deliveryAtCode: "",
      gsttax: viewtax.map(
        ({ itemName, TaxCode, TaxRate, TaxAmount, Taxid }) => ({
          taxCode: "",
          taxPer: TaxRate,
          amount: TaxAmount,
          taxInEx: Taxid,
          checked: false,
          taxCodeName: TaxCode,
          taxInExCode: Taxid,
          itemSub1: itemName,
          itemCodeSub1: "",
        })
      ),
      TaxAmount: "",
    })
  );

  let viewDataSub3 = viewData[0]?.viewpymterms?.map(
    ({ PayCode, Descn, PayPer, PayAmount }) => ({
      paymentID: PayCode,
      paymentTerms: Descn,
      payPer: PayPer,
      paymentAmount: PayAmount,
      checked: false,
    })
  );

  //ViewBtn runs on view btn onpress, fills all fields using received view data which is already loaded when doc no is filled
  const ViewBtn = () => {
    if (poNo !== "" && viewData[0] && Array.isArray(viewData)) {
      setViewDisableKey(true);
      setTabItemDetails(true);
      setPoNo(viewData[0]?.DocNo);
      setPoDate(viewData[0]?.docdate);
      setRefNo(viewData[0]?.refno);
      setRefDate(viewData[0]?.refdate);
      setValidUpto(viewData[0]?.validupto);
      setParty(viewData[0]?.partyName);
      setCreditDays(viewData[0]?.creditDays);
      setItemType(viewData[0]?.itemTypeName);
      setPreparedBy(viewData[0]?.supervisorName);
      setApprovedBy(viewData[0]?.supName);
      if (viewData[0]?.frtid === "F") {
        setFreight("For");
      }
      if (viewData[0]?.frtid === "E") {
        setFreight("EX-factory");
      }
      setPayTerms(viewData[0].netvalue);
      setTableDataTab1(viewDataArr1);
      setTableDataSub3(viewDataSub3);
      setTotalValue(viewData[0]?.totalvalue);
      setTotalValueTemp(viewData[0]?.netvalue);
      setRoundOff(viewData[0]?.roundoff);
      setNetValueBtm(viewData[0]?.netvalue);
      setTotalPayAmount(viewData[0]?.netvalue);
      setTotalPer("100");
    } else if (poNo === "") {
      alert("Doc. No. Can't be empty");
    } else if (!viewData[0]) {
      alert("No data found!!");
    } else if (!Array.isArray(viewData)) {
      alert(viewData);
    }
  };
  //Save call from save btn
  const [saveResponse, setSaveResponse] = useState("");
  const SaveBtn = () => {
    const emptyKeys = [];
    const tabelKeys = [];

    const tempSave = () => {
      if (
        poDate !== ("" || null) &&
        refNo !== ("" || null) &&
        refDate !== ("" || null) &&
        validUpto !== ("" || null) &&
        party !== ("" || null) &&
        creditDays !== ("" || null) &&
        itemType !== ("" || null) &&
        preparedBy !== ("" || null) &&
        approvedBy !== ("" || null) &&
        freight !== ("" || null) &&
        tableDataTab1.length !== 0 &&
        totalValue !== ("" || null) &&
        roundOff !== ("" || null) &&
        netValue !== ("" || null)
      ) {
        alert("Data being Uploaded. Please wait for popup to appear");
        //Constructing save data
        const saveData = {
          branchCode: branchNameCode,
          logUserId: window.user,
          docdate: poDate,
          refno: refNo,
          refdate: refDate,
          validupto: validUpto,
          partyCode: partyCode,
          creditDays: creditDays,
          itemTypeCode: itemTypeCode,
          supervisorCode: preparedByCode,
          supCode: approvedByCode,
          frtid: freightCode,
          purthrough: "DIR",
          doctax: "0",
          itemtax: tableDataTab1
            .map((item) => item.TaxAmount)
            .reduce((acc, TaxAmount) => acc + parseFloat(TaxAmount), 0)
            .toString(),
          saveitem: saveDataArr1,
          totalvalue: totalValue,
          roundoff: roundOff,
          netvalue: netValueBtm,
          saveterms: saveDataSub3,
        };
        console.log("savedata", JSON.stringify(saveData, null, 0));

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
              if (typeof json === "string") {
                alert(json);
              } else {
                alert(`${json?.success}\n\n${json?.docNo}` ?? json);
              }
              // alert(json);
            } catch (error) {
              console.error(error);
            }
          };
        };

        //api callback function
        const apiSave = saveCall(
          setSaveResponse,
          "http://182.76.43.173:91/SpFeedPurchaseOrder/SPFPOSave",
          JSON.stringify(saveData)
        );
        apiSave();

        // console.log("t", saveResponse);
        //Clearing all fields after save

        setPoNo("");
        setPoDate(ChangeFormateDate(getToday()));
        setRefNo("");
        setRefDate(ChangeFormateDate(getToday()));
        setValidUpto("");
        setParty("");
        setPartyCode("");
        setCreditDays("");
        setItemType("");
        setItemTypeCode("");
        setPreparedBy("");
        setPreparedByCode("");
        setApprovedBy("");
        setApprovedByCode("");
        setFreight("");
        setFreightCode("");

        setListOfItems([]);
        ResetBtnTab1();
        setTableDataTab1([]);

        //Close all tabs
        setTabItemDetails(false);
        setModalVisibleSub1(false);
        ResetBtnSub1();
        setTableDataSub1([]);
        // setModalVisibleSub2(false);
        // ResetBtnSub2();
        // setTableDataSub2([]);
        setModalVisibleSub3(false);
        ResetBtnSub3();
        setTableDataSub3([]);

        // setTDSValue("");
        setPayTerms("");
        setTotalValue("");
        setTotalValueTemp("");
        setRoundOff("");
        setNetValue("");
        setNetValueBtm("");
        setTotalPayAmount("");
        setTotalPer("");

        //isDisabledTab - Table checkbox disabled on edit operation
        setViewDisableKey(false);
        setIsDisabledTab1(false);
        setUpdateKeyTab1(false);

        handleResetScroll();

        setViewData([]);

        alert("Data Cleared!!. Please continue");
      }
    };

    //Displays empty fields in alert
    if (!poDate) {
      emptyKeys.push("PO Date");
    }
    if (!refNo) {
      emptyKeys.push("Ref No");
    }
    if (!refDate) {
      emptyKeys.push("Ref Date");
    }
    if (!validUpto) {
      emptyKeys.push("Valid Upto");
    }
    if (!party) {
      emptyKeys.push("Party");
    }
    if (!creditDays) {
      emptyKeys.push("Credit Days");
    }
    if (!itemType) {
      emptyKeys.push("Item Type");
    }
    if (!preparedBy) {
      emptyKeys.push("Prepared By");
    }
    if (!approvedBy) {
      emptyKeys.push("Approved By");
    }
    if (!freight) {
      emptyKeys.push("Freight");
    }
    if (!tableDataTab1.length) {
      emptyKeys.push("Item Details Table");
    }
    if (!tableDataSub3.length) {
      emptyKeys.push("Terms Table");
    }
    if (!totalValue) {
      emptyKeys.push("Total Value");
    }

    if (emptyKeys.length > 0) {
      const errorMessage = `Fields can't be empty!!\nFill data: \n${emptyKeys.join(
        ",\n"
      )}`;
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

  //RadioBtn
  useEffect(() => {
    if (freight === "F") {
      setFreight("For");
    } else if (freight === "E") {
      setFreight("EX-factory");
    }
  }, [freight, freightCode]);

  const RadioButtons = () => {
    const handleRadioButtonPress = (choice, choiceCode) => {
      if (viewDisableKey === true && updateKeyTab1 === true) {
        return;
      } else if (viewDisableKey === false && updateKeyTab1 === false) {
        setFreight(choice);
        setFreightCode(choiceCode);
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
          Freight
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
            key="For"
            label="For"
            checked={freight === "For"}
            onPress={() => handleRadioButtonPress("For", "F")}
          />
          <RadioButton
            key="EX-factory"
            label="EX-factory"
            checked={freight === "EX-factory"}
            onPress={() => handleRadioButtonPress("EX-factory", "E")}
          />
        </View>
      </View>
    );
  };

  //Hide or show Tabs
  const [tabItemDetails, setTabItemDetails] = useState(false);

  //Tab 1 - Table view
  const widthArrTab1 = [
    80, 110, 110, 110, 140, 110, 110, 110, 140, 110, 110, 110, 100,
  ];

  const [tableHeadTab1, setTableHeadTab1] = useState([
    "Select",
    "Branch",
    "ItemName",
    "UoM",
    "Nature",
    "Delivery At",
    "Po Qty",
    "Free Qty",
    "Charge Qty",
    "Rate",
    "Basic value",
    "Discount %",
    "Net value",
  ]);

  const [tableDataTab1, setTableDataTab1] = useState([]);

  //Used to identify selected row
  const [selectedRowTab1, setSelectedRowTab1] = useState(null);
  //Used to hide or show update btn when edit is used
  const [updateKeyTab1, setUpdateKeyTab1] = useState(false);

  const addDataTab1 = () => {
    if (
      branchName !== "" &&
      item !== "" &&
      uoM !== "" &&
      natureType !== "" &&
      deliveryAt !== "" &&
      poQty !== "" &&
      freeQty !== "" &&
      chargeQty !== "" &&
      rate !== "" &&
      basicValue !== "" &&
      discount !== "" &&
      netValue !== ""
    ) {
      const newData = {
        branchName,
        item,
        uoM,
        natureType,
        deliveryAt,
        poQty,
        freeQty,
        chargeQty,
        rate,
        basicValue,
        discount,
        netValue,
        checked: false,
        branchNameCode,
        itemCode,
        natureTypeCode: natureTypeCode,
        deliveryAtCode,
        gsttax: tableDataSub1 ? tableDataSub1 : [],
        TaxAmount: tableDataSub1
          ? tableDataSub1
              .map((item) => item.amount)
              .reduce((acc, amount) => acc + parseFloat(amount), 0)
              .toFixed(2)
          : "",
      };
      setTableDataTab1([...tableDataTab1, newData]);
      // console.log("tt", [...tableDataTab1, newData]);
      ResetBtnTab1();
      ResetBtnSub1();
      setTableDataSub1([]);
    } else {
      alert("Fields can't be empty");
    }
  };

  const deleteDataTab1 = () => {
    const filteredData = tableDataTab1.filter((item) => !item?.checked);
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
    const filteredData = tableDataTab1.filter((item) => item?.checked);
    if (filteredData.length === 0) {
      alert("No Record Selected!!");
    } else if (filteredData.length !== 1) {
      alert("Multiple Records Selected!!");
    } else if (filteredData.length === 1) {
      if (viewDisableKey === false) {
        alert("To recalculate GST, please open GST and click Back");
      }
      const selectedData = tableDataTab1.find((item) => item?.checked);
      if (selectedData) {
        setBranchName(selectedData.branchName);
        setItem(selectedData.item);
        setUoM(selectedData.uoM);
        setNatureType(selectedData.natureType);
        setDelieveryAt(selectedData.deliveryAt);
        setPoQty(selectedData.poQty);
        setFreeQty(selectedData.freeQty);
        setChargeQty(selectedData.chargeQty);
        setRate(selectedData.rate);
        setBasicValue(selectedData.basicValue);
        setDiscount(selectedData.discount);
        setNetValue(selectedData.netValue);

        setBranchNameCode(selectedData.branchNameCode);
        setItemCode(selectedData.itemCode);
        setNatureTypeCode(selectedData.natureTypeCode);
        setDelieveryAtCode(selectedData.deliveryAtCode);

        setTableDataSub1(
          selectedData.gsttax.map((item) => ({
            ...item,
            checked: false,
          }))
        );

        setSelectedRowTab1(tableDataTab1.indexOf(selectedData));
        setUpdateKeyTab1(true);
        setIsDisabledTab1(true);
      }
    }
  };

  const updateDataTab1 = () => {
    if (
      branchName !== "" &&
      item !== "" &&
      uoM !== "" &&
      natureType !== "" &&
      deliveryAt !== "" &&
      poQty !== "" &&
      freeQty !== "" &&
      chargeQty !== "" &&
      rate !== "" &&
      basicValue !== "" &&
      discount !== "" &&
      netValue !== ""
    ) {
      if (selectedRowTab1 !== null) {
        const updatedData = [...tableDataTab1];
        updatedData[selectedRowTab1].branchName = branchName;
        updatedData[selectedRowTab1].item = item;
        updatedData[selectedRowTab1].uoM = uoM;
        updatedData[selectedRowTab1].natureType = natureType;
        updatedData[selectedRowTab1].deliveryAt = deliveryAt;
        updatedData[selectedRowTab1].poQty = poQty;
        updatedData[selectedRowTab1].freeQty = freeQty;
        updatedData[selectedRowTab1].chargeQty = chargeQty;
        updatedData[selectedRowTab1].rate = rate;
        updatedData[selectedRowTab1].basicValue = basicValue;
        updatedData[selectedRowTab1].discount = discount;
        updatedData[selectedRowTab1].netValue = netValue;

        updatedData[selectedRowTab1].branchNameCode = branchNameCode;
        updatedData[selectedRowTab1].itemCode = itemCode;
        updatedData[selectedRowTab1].natureTypeCode = natureTypeCode;
        updatedData[selectedRowTab1].deliveryAtCode = deliveryAtCode;

        updatedData[selectedRowTab1].gsttax = tableDataSub1;
        setTableDataTab1(
          updatedData.map((item) => ({
            ...item,
            checked: false,
          }))
        );
        ResetBtnTab1();
        ResetBtnSub1();
        setTableDataSub1([]);
        updatedData[selectedRowTab1].checked = true;
        setSelectedRowTab1(null);
        setUpdateKeyTab1(false);
        setIsDisabledTab1(false);
      }
    } else {
      alert("Fields can't be empty");
    }
  };
  const handleCheckboxChangeTab1 = (index) => {
    const updatedData = [...tableDataTab1];
    if (updatedData[index]) {
      updatedData[index].checked = !updatedData[index].checked;
      setTableDataTab1(updatedData);
    }
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
          {tableDataTab1?.map((rowData, index) => (
            <Table borderStyle={tabStyles.tableBorder}>
              <Row
                key={index}
                widthArr={widthArrTab1}
                data={[
                  <CheckBox
                    checked={rowData?.checked}
                    onPress={() =>
                      isDisabledTab1 ? null : handleCheckboxChangeTab1(index)
                    }
                    containerStyle={tabStyles.checkboxContainer}
                    checkedColor="rgba(130,32,70,0.5)"
                    uncheckedColor="black"
                  />,
                  rowData.branchName,
                  rowData.item,
                  rowData.uoM,
                  rowData.natureType,
                  rowData.deliveryAt,
                  rowData.poQty,
                  rowData.freeQty,
                  rowData.chargeQty,
                  rowData.rate,
                  rowData.basicValue,
                  rowData.discount,
                  rowData.netValue,
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

  //Used to uncheck all tabs when using clear btn
  const checkClearedDataArr1 = tableDataTab1.map((item) => ({
    ...item,
    checked: false,
  }));

  //Useeffects for calc
  useEffect(() => {
    const difference =
      (poQty ? parseFloat(poQty) : 0) - (freeQty ? parseFloat(freeQty) : 0);
    const roundedDifference = !isNaN(difference) ? difference.toFixed(4) : "";
    setChargeQty(roundedDifference !== "0.0000" ? roundedDifference : "");
  }, [poQty, freeQty]);

  useEffect(() => {
    const multiply = parseFloat(chargeQty) * parseFloat(rate);
    const roundedMultiply = !isNaN(multiply) ? multiply.toFixed(2) : "";
    setBasicValue(roundedMultiply !== "0.00" ? roundedMultiply : "");
  }, [rate, chargeQty]);

  const [netValueTemp, setNetValueTemp] = useState("");
  useEffect(() => {
    const discountValue =
      parseFloat(basicValue) -
      parseFloat(basicValue) * (parseFloat(discount) / 100);
    const roundedDiscountValue = !isNaN(discountValue)
      ? discountValue.toFixed(2)
      : "";
    setNetValue(roundedDiscountValue);
    setNetValueTemp(roundedDiscountValue);
  }, [basicValue, discount]);

  const [totalValueTemp, setTotalValueTemp] = useState("");
  useEffect(() => {
    if (viewDisableKey === false) {
      const tempTotalPrice = tableDataTab1
        .map((item) => item?.netValue)
        .reduce((acc, netValue) => acc + parseFloat(netValue), 0);
      const formattedTotalPrice =
        tempTotalPrice !== 0 ? tempTotalPrice.toFixed(2) : "";
      setTotalValue(formattedTotalPrice);
      setTotalValueTemp(
        tempTotalPrice !== 0 ? Math.round(tempTotalPrice).toString() : ""
      );
      setNetValueBtm(
        tempTotalPrice !== 0 ? Math.round(tempTotalPrice).toString() : ""
      );
      setRoundOff(
        tempTotalPrice !== 0 ? (netValueBtm - tempTotalPrice).toFixed(2) : ""
      );
      if (tableDataTab1.length == 0) {
        setPayTerms("");
      }
    }
  }, [totalValue, updateKeyTab1, tableDataTab1.length]);

  //SubScreens
  const [subTab, setSubTab] = useState(true);
  //GST
  const [modalVisibleSub1, setModalVisibleSub1] = useState(false);

  const [itemSub1, setItemSub1] = useState("");
  const [itemCodeSub1, setItemCodeSub1] = useState("");
  const [taxCodeName, setTaxCodeName] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [taxPer, setTaxPer] = useState("");
  const [amount, setAmount] = useState("");
  const [taxInEx, setTaxInEx] = useState("EXCLUSIVE");
  const [taxInExCode, setTaxInExCode] = useState("E");
  const [totalamount, setTotalAmount] = useState("");

  //Tab 1 - Table view
  const widthArrSub1 = [80, 110, 110, 110, 140];

  const [tableHeadSub1, setTableHeadSub1] = useState([
    "Select",
    "Tax Type",
    "Tax %",
    "Amount",
    "Tax In./Ex.",
  ]);

  const [tableDataSub1, setTableDataSub1] = useState([]);
  const [gstKey, setGstKey] = useState(false);

  useEffect(() => {
    if (gstKey === true) {
      const netGSTValue = parseFloat(netValueTemp) + parseFloat(totalamount);
      const roundedNetGSTValue = !isNaN(netGSTValue)
        ? netGSTValue.toFixed(2)
        : "";
      setNetValue(roundedNetGSTValue);
      setGstKey(false);
    }
  }, [gstKey]);

  //Used to identify selected row
  const [selectedRowSub1, setSelectedRowSub1] = useState(null);
  //Used to hide or show update btn when edit is used
  const [updateKeySub1, setUpdateKeySub1] = useState(false);

  const addDataSub1 = () => {
    if (
      itemSub1 !== "" &&
      itemCodeSub1 !== "" &&
      taxCode !== "" &&
      taxCodeName !== "" &&
      taxPer !== "" &&
      amount !== "" &&
      taxInEx !== ""
    ) {
      const newData = {
        taxCode,
        taxPer,
        amount,
        taxInEx,
        checked: false,
        taxCodeName,
        taxInExCode,
        itemSub1,
        itemCodeSub1,
      };
      setTableDataSub1([...tableDataSub1, newData]);
      setTaxCode("");
      setTaxCodeName("");
      setTaxPer("");
      setAmount("");
      setTaxInEx("EXCLUSIVE");
      setTaxInExCode("E");
    } else {
      alert("Fields can't be empty");
    }
  };

  const deleteDataSub1 = () => {
    const filteredData = tableDataSub1.filter((item) => !item.checked);
    if (filteredData.length === tableDataSub1.length) {
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
              setTableDataSub1(filteredData);
              setSelectedRowSub1(null);
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const editDataSub1 = () => {
    const filteredData = tableDataSub1.filter((item) => item.checked);
    if (filteredData.length === 0) {
      alert("No Record Selected!!");
    } else if (filteredData.length !== 1) {
      alert("Multiple Records Selected!!");
    } else if (filteredData.length === 1) {
      const selectedData = tableDataSub1.find((item) => item.checked);
      if (selectedData) {
        setTaxCode(selectedData.taxCode);
        setTaxPer(selectedData.taxPer);
        setAmount(selectedData.amount);
        setTaxInEx(selectedData.taxInEx);

        setTaxCodeName(selectedData.taxCodeName);
        setTaxInExCode(selectedData.taxInExCode);

        setItemSub1(selectedData.itemSub1);
        setItemCodeSub1(selectedData.itemCodeSub1);

        setSelectedRowSub1(tableDataSub1.indexOf(selectedData));
        setUpdateKeySub1(true);
        setIsDisabledSub1(true);
      }
    }
  };

  const updateDataSub1 = () => {
    if (
      taxCode !== "" &&
      taxCodeName !== "" &&
      taxPer !== "" &&
      amount !== "" &&
      taxInEx !== ""
    ) {
      if (selectedRowSub1 !== null) {
        const updatedData = [...tableDataSub1];
        updatedData[selectedRowSub1].taxCode = taxCode;
        updatedData[selectedRowSub1].taxPer = taxPer;
        updatedData[selectedRowSub1].amount = amount;
        updatedData[selectedRowSub1].taxInEx = taxInEx;
        updatedData[selectedRowSub1].taxCodeName = taxCodeName;
        updatedData[selectedRowSub1].taxInExCode = taxInExCode;
        updatedData[selectedRowSub1].itemSub1 = itemSub1;
        updatedData[selectedRowSub1].itemCodeSub1 = itemCodeSub1;
        setTableDataSub1(
          updatedData.map((item) => ({
            ...item,
            checked: false,
          }))
        );
        ResetBtnSub1();
        setItemSub1(item);
        setItemCodeSub1(itemCode);
        updatedData[selectedRowSub1].checked = true;
        setSelectedRowSub1(null);
        setUpdateKeySub1(false);
        setIsDisabledSub1(false);
      }
    } else {
      alert("Fields can't be empty");
    }
  };
  const handleCheckboxChangeSub1 = (index) => {
    const updatedData = [...tableDataSub1];
    updatedData[index].checked = !updatedData[index].checked;
    setTableDataSub1(updatedData);
  };

  //Changing variable from our code to api's key. this will be send on save api
  const saveGSTTax =
    tableDataTab1.length !== 0
      ? tableDataTab1.map((item) =>
          item.gsttax.map((item) => ({
            TaxCode: item?.taxCodeName,
            TaxRate: item?.taxCode,
            TaxAmount: item?.amount,
            Taxid: item?.taxInExCode,
          }))
        )
      : [
          {
            itemCode: "",
            TaxCode: "",
            TaxRate: "",
            TaxAmount: "",
            Taxid: "",
          },
        ];

  //Changing variable from our code to api's key. this will be send on save api
  const saveDataArr1 =
    tableDataTab1.length !== 0
      ? tableDataTab1
          .map(({ checked, ...rest }) => rest)
          .map((item) => {
            return {
              branchCode: branchNameCode,
              itemCode: item.itemCode,
              uom: item.uoM,
              nature: item.natureTypeCode,
              GodownCode: item.deliveryAtCode,
              poqty: item.poQty,
              freeqty: item.freeQty,
              chargeqty: item.chargeQty,
              rate: item.rate,
              discountper: item.discount,
              gsttax:
                item.gsttax.length !== 0
                  ? item.gsttax
                      .map(({ checked, ...rest }) => rest)
                      .map((item) => {
                        return {
                          itemCode: item?.itemCodeSub1,
                          TaxCode: item?.taxCodeName.substring(0, 4),
                          TaxRate: item?.taxCode,
                          TaxAmount: item?.amount,
                          Taxid: item?.taxInExCode,
                        };
                      })
                  : null,
            };
          })
      : [
          {
            branchCode: "",
            itemCode: "",
            uom: "",
            nature: "",
            GodownCode: "",
            poqty: "",
            freeqty: "",
            chargeqty: "",
            rate: "",
            discountper: "",
            gsttax: [],
          },
        ];

  const [tableDataSub3, setTableDataSub3] = useState([]);

  const saveDataSub3 =
    tableDataSub3?.length !== 0
      ? tableDataSub3
          .map(({ checked, ...rest }) => rest)
          .map((item) => {
            return {
              PayCode: item.paymentID,
              Descn: item.paymentTerms,
              Percentage: item.payPer,
              amount: item.paymentAmount,
            };
          })
      : [
          {
            PayCode: "",
            Descn: "",
            Percentage: "",
            amount: "",
          },
        ];
  //isDisabledTab - Table checkbox disabled on edit operation
  const [isDisabledSub1, setIsDisabledSub1] = useState(false);
  const renderHeaderRowsSub1 = () => {
    return (
      <Table>
        <Row
          data={tableHeadSub1}
          widthArr={widthArrSub1}
          style={{ height: 50, backgroundColor: "rgba(130,32,70,0.5)" }}
          textStyle={tabStyles.headText}
        />
        <ScrollView style={{ marginTop: -1, maxHeight: 500 }}>
          {tableDataSub1.map((rowData, index) => (
            <Table borderStyle={tabStyles.tableBorder}>
              <Row
                key={index}
                widthArr={widthArrSub1}
                data={[
                  <CheckBox
                    checked={rowData.checked}
                    onPress={() =>
                      isDisabledSub1 ? null : handleCheckboxChangeSub1(index)
                    }
                    containerStyle={tabStyles.checkboxContainer}
                    checkedColor="rgba(130,32,70,0.5)"
                    uncheckedColor="black"
                  />,
                  rowData.taxCodeName,
                  rowData.taxPer,
                  rowData.amount,
                  rowData.taxInEx,
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

  //Used to uncheck all tabs when using clear btn
  const checkClearedDataArrSub1 = tableDataSub1.map((item) => ({
    ...item,
    checked: false,
  }));

  //TDS
  const [modalVisibleSub2, setModalVisibleSub2] = useState(false);

  const [taxType, setTaxType] = useState("");
  const [taxTypeCode, setTaxTypeCode] = useState("");
  const [taxPerSub2, setTaxPerSub2] = useState("");
  const [taxAmount, setTaxAmount] = useState("");
  const [inEx, setInEx] = useState("REGULAR");
  const [inExCode, setInExCode] = useState("");

  //SubTab 2 - Table view
  const widthArrSub2 = [80, 110, 110, 110, 140];

  const [tableHeadSub2, setTableHeadSub2] = useState([
    "Select",
    "Tax Type",
    "Tax %",
    "Tax Amount",
    "Incl./Excl.",
  ]);

  const [tableDataSub2, setTableDataSub2] = useState([]);

  //Used to identify selected row
  const [selectedRowSub2, setSelectedRowSub2] = useState(null);
  //Used to hide or show update btn when edit is used
  const [updateKeySub2, setUpdateKeySub2] = useState(false);

  const addDataSub2 = () => {
    if (
      taxType !== "" &&
      taxTypeCode !== "" &&
      taxPerSub2 !== "" &&
      taxAmount !== "" &&
      inEx !== ""
    ) {
      const newData = {
        taxType,
        taxTypeCode,
        taxPerSub2,
        taxAmount,
        inEx,
        checked: false,
      };
      setTableDataSub2([...tableDataSub2, newData]);
      ResetBtnTab1();
    } else {
      alert("Fields can't be empty");
    }
  };

  const deleteDataSub2 = () => {
    const filteredData = tableDataSub2.filter((item) => !item.checked);
    if (filteredData.length === tableDataSub2.length) {
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
              setTableDataSub2(filteredData);
              setSelectedRowSub2(null);
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const editDataSub2 = () => {
    const filteredData = tableDataSub2.filter((item) => item.checked);
    if (filteredData.length === 0) {
      alert("No Record Selected!!");
    } else if (filteredData.length !== 1) {
      alert("Multiple Records Selected!!");
    } else if (filteredData.length === 1) {
      const selectedData = tableDataSub2.find((item) => item.checked);
      if (selectedData) {
        setTaxType(selectedData.taxType);
        setTaxPerSub2(selectedData.taxPerSub2);
        setTaxAmount(selectedData.taxAmount);
        setInEx(selectedData.inEx);
        setTaxTypeCode(selectedData.taxTypeCode);
        setSelectedRowSub2(tableDataSub2.indexOf(selectedData));
        setUpdateKeySub2(true);
        setIsDisabledSub2(true);
      }
    }
  };

  const updateDataSub2 = () => {
    if (
      taxType !== "" &&
      taxTypeCode !== "" &&
      taxPerSub2 !== "" &&
      taxAmount !== "" &&
      inEx !== ""
    ) {
      if (selectedRowSub2 !== null) {
        const updatedData = [...tableDataSub2];
        updatedData[selectedRowSub2].taxType = taxType;
        updatedData[selectedRowSub2].taxPerSub2 = taxPerSub2;
        updatedData[selectedRowSub2].taxAmount = taxAmount;
        updatedData[selectedRowSub2].inEx = inEx;
        updatedData[selectedRowSub2].taxTypeCode = taxTypeCode;
        setTableDataSub2(
          updatedData.map((item) => ({
            ...item,
            checked: false,
          }))
        );
        ResetBtnTab1();
        updatedData[selectedRowSub2].checked = true;
        setSelectedRowSub2(null);
        setUpdateKeySub2(false);
        setIsDisabledSub2(false);
      }
    } else {
      alert("Fields can't be empty");
    }
  };
  const handleCheckboxChangeSub2 = (index) => {
    const updatedData = [...tableDataSub2];
    updatedData[index].checked = !updatedData[index].checked;
    setTableDataSub2(updatedData);
  };

  //isDisabledTab - Table checkbox disabled on edit operation
  const [isDisabledSub2, setIsDisabledSub2] = useState(false);
  const renderHeaderRowsSub2 = () => {
    return (
      <Table>
        <Row
          data={tableHeadSub2}
          widthArr={widthArrSub2}
          style={{ height: 50, backgroundColor: "rgba(130,32,70,0.5)" }}
          textStyle={tabStyles.headText}
        />
        <ScrollView style={{ marginTop: -1, maxHeight: 200 }}>
          {tableDataSub2.map((rowData, index) => (
            <Table borderStyle={tabStyles.tableBorder}>
              <Row
                key={index}
                widthArr={widthArrSub2}
                data={[
                  <CheckBox
                    checked={rowData.checked}
                    onPress={() =>
                      isDisabledSub2 ? null : handleCheckboxChangeSub2(index)
                    }
                    containerStyle={tabStyles.checkboxContainer}
                    checkedColor="rgba(130,32,70,0.5)"
                    uncheckedColor="black"
                  />,
                  rowData.taxType,
                  rowData.taxPerSub2,
                  rowData.taxAmount,
                  rowData.inEx,
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

  //Used to uncheck all tabs when using clear btn
  const checkClearedDataArrSub2 = tableDataSub2.map((item) => ({
    ...item,
    checked: false,
  }));

  //Terms
  const [modalVisibleSub3, setModalVisibleSub3] = useState(false);

  const [paymentID, setPaymentID] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [payPer, setPayPer] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");

  //SubTab 3 - Table view
  const widthArrSub3 = [80, 110, 110, 110, 140];

  const [tableHeadSub3, setTableHeadSub3] = useState([
    "Select",
    "Payment ID",
    "Payment Terms",
    "Payment %",
    "Payment Amount",
  ]);

  //Used to identify selected row
  const [selectedRowSub3, setSelectedRowSub3] = useState(null);
  //Used to hide or show update btn when edit is used
  const [updateKeySub3, setUpdateKeySub3] = useState(false);

  const addDataSub3 = () => {
    if (
      paymentID !== "" &&
      paymentTerms !== "" &&
      payPer !== "" &&
      paymentAmount !== ""
    ) {
      const newData = {
        paymentID,
        paymentTerms,
        payPer,
        paymentAmount,
        checked: false,
      };
      setTableDataSub3([...tableDataSub3, newData]);
      ResetBtnSub3();
    } else {
      alert("Fields can't be empty");
    }
  };

  const deleteDataSub3 = () => {
    const filteredData = tableDataSub3.filter((item) => !item.checked);
    if (filteredData.length === tableDataSub3.length) {
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
              setTableDataSub3(filteredData);
              setSelectedRowSub3(null);
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const editDataSub3 = () => {
    const filteredData = tableDataSub3.filter((item) => item.checked);
    if (filteredData.length === 0) {
      alert("No Record Selected!!");
    } else if (filteredData.length !== 1) {
      alert("Multiple Records Selected!!");
    } else if (filteredData.length === 1) {
      const selectedData = tableDataSub3.find((item) => item.checked);
      if (selectedData) {
        setPaymentID(selectedData.paymentID);
        setPaymentTerms(selectedData.paymentTerms);
        setPayPer(selectedData.payPer);
        setPaymentAmount(selectedData.paymentAmount);
        setSelectedRowSub3(tableDataSub3.indexOf(selectedData));
        setUpdateKeySub3(true);
        setIsDisabledSub3(true);
      }
    }
  };

  const updateDataSub3 = () => {
    if (
      paymentID !== "" &&
      paymentTerms !== "" &&
      payPer !== "" &&
      paymentAmount !== ""
    ) {
      if (selectedRowSub3 !== null) {
        const updatedData = [...tableDataSub3];
        updatedData[selectedRowSub3].paymentID = paymentID;
        updatedData[selectedRowSub3].paymentTerms = paymentTerms;
        updatedData[selectedRowSub3].payPer = payPer;
        updatedData[selectedRowSub3].paymentAmount = paymentAmount;
        setTableDataSub3(
          updatedData.map((item) => ({
            ...item,
            checked: false,
          }))
        );
        ResetBtnSub3();
        updatedData[selectedRowSub3].checked = true;
        setSelectedRowSub3(null);
        setUpdateKeySub3(false);
        setIsDisabledSub3(false);
      }
    } else {
      alert("Fields can't be empty");
    }
  };
  const handleCheckboxChangeSub3 = (index) => {
    const updatedData = [...tableDataSub3];
    updatedData[index].checked = !updatedData[index].checked;
    setTableDataSub3(updatedData);
  };

  //isDisabledTab - Table checkbox disabled on edit operation
  const [isDisabledSub3, setIsDisabledSub3] = useState(false);
  const renderHeaderRowsSub3 = () => {
    return (
      <Table>
        <Row
          data={tableHeadSub3}
          widthArr={widthArrSub3}
          style={{ height: 50, backgroundColor: "rgba(130,32,70,0.5)" }}
          textStyle={tabStyles.headText}
        />
        <ScrollView style={{ marginTop: -1, maxHeight: 200 }}>
          {tableDataSub3.map((rowData, index) => (
            <Table borderStyle={tabStyles.tableBorder}>
              <Row
                key={index}
                widthArr={widthArrSub3}
                data={[
                  <CheckBox
                    checked={rowData.checked}
                    onPress={() =>
                      isDisabledSub3 ? null : handleCheckboxChangeSub3(index)
                    }
                    containerStyle={tabStyles.checkboxContainer}
                    checkedColor="rgba(130,32,70,0.5)"
                    uncheckedColor="black"
                  />,
                  rowData.paymentID,
                  rowData.paymentTerms,
                  rowData.payPer,
                  rowData.paymentAmount,
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

  //Used to uncheck all tabs when using clear btn
  const checkClearedDataArrSub3 = tableDataSub3.map((item) => ({
    ...item,
    checked: false,
  }));

  //api calls
  //Common grid
  const [partyData, setPartyData] = useState([]);
  const [itemTypeData, setItemTypeData] = useState([]);
  const [preparedByData, setPreparedByData] = useState([]);
  const [approvedByData, setApprovedByData] = useState([]);
  //Tab1
  const [itemData, setItemData] = useState([]);
  const [natureTypeData, setNatureTypeData] = useState([]);
  const [deliveryAtData, setDeliveryAtData] = useState([]);
  //SubTab
  const [gSTData, setGSTData] = useState([]);
  const [paymentTermsData, setPaymentTermsData] = useState([]);
  //Common grid
  const [poNoCall, setPoNoCall] = useState(false);
  useEffect(() => {
    apiViewData();
  }, [poNoCall]);
  const apiViewData = FetchApiCall((res) => {
    setViewData(res);
  }, "http://182.76.43.173:91/SpFeedPurchaseOrder/SPFPOView?branch=" + window.branchCode + "&docno=" + poNo.toUpperCase());

  const apiParty = FetchApiCall((res) => {
    setPartyData(res);
  }, "http://182.76.43.173:91/SpFeedPurchaseOrder/mobilePartySPF");
  const apiItemType = FetchApiCall(
    setItemTypeData,
    "http://182.76.43.173:91/SpFeedPurchaseOrder/mobileItemTypeSPF"
  );
  const apiPreparedBy = FetchApiCall(
    setPreparedByData,
    "http://182.76.43.173:91/SpFeedPurchaseOrder/mobilePreparedBySPF?branch=" +
      window.branchCode
  );
  const apiApprovedBy = FetchApiCall(
    setApprovedByData,
    "http://182.76.43.173:91/SpFeedPurchaseOrder/mobileApprovedBySPF?branch=" +
      window.branchCode
  );
  //Tab1
  const apiItem = FetchApiCall((res) => {
    setItemData(res);
  }, "http://182.76.43.173:91/SpFeedPurchaseOrder/mobileItemSPF?itemType=" + itemTypeCode);
  const apiNatureType = FetchApiCall(
    setNatureTypeData,
    "http://182.76.43.173:91/SpFeedPurchaseOrder/mobileNatureSPF?Item=" +
      itemCode
  );
  const apiDeliveryAt = FetchApiCall(
    setDeliveryAtData,
    "http://182.76.43.173:91/SpFeedPurchaseOrder/spFMobDelivryAt?branch=" +
      window.branchCode
  );
  //SubTab1
  const apiGST = FetchApiCall(
    setGSTData,
    "http://182.76.43.173:91/SpFeedPurchaseOrder/spFMobGST?branch=" +
      window.branchCode +
      "&EntryDate=" +
      poDate
  );
  const apiPaymentTerms = FetchApiCall(
    setPaymentTermsData,
    "http://182.76.43.173:91/SpFeedPurchaseOrder/spFMobPayTerms"
  );

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      if (window.branchCode === "") {
        alert("Branch Not Selected. Please Navigate Back to Branch");
      }
      setUpdateKeyTab1(false);
      setIsDisabledTab1(false);
      handleResetScroll(false);
      apiParty();
      apiItemType();
      apiPreparedBy();
      apiApprovedBy();
      apiDeliveryAt();
      apiGST();
      apiPaymentTerms();
      window.branchCode;
      window.branchLabel;
      window.user;
      setViewDisableKey(false);
      setTabItemDetails(false);
      setSubTab(true);

      setParty("");
      setPartyCode("");
      setCreditDays("");
      setItemType("");
      setItemCode("");
      setPreparedBy("");
      setPreparedByCode("");
      setApprovedBy("");
      setApprovedByCode("");
      setFreight("");
      setFreightCode("");

      setListOfItems([]);
      ResetBtnTab1();
      setTableDataTab1([]);
      ResetBtnSub1();
      setTableDataSub1([]);

      setTDSValue("");
      setPayTerms("");
      setTotalValue("");
      setTotalValueTemp("");
      setRoundOff("");
      setNetValue("");
      setNetValueBtm("");
      setTotalPayAmount("");
      setTotalPer("");
    }
  }, [isFocused]);

  useEffect(() => {
    apiItem();
  }, [itemTypeCode]);
  useEffect(() => {
    apiNatureType();
  }, [itemCode]);
  useEffect(() => {
    if (nature === "N") {
      setNatureType("REGULAR");
      setNatureTypeCode("R");
    }
  }, [nature]);
  useEffect(() => {
    apiGST();
  }, [poDate, window.branchCode]);
  useEffect(() => {
    setTaxPer(taxCode);
  }, [taxCode]);

  useEffect(() => {
    setCreditDays(
      partyData.find((item) => item.partyCode === partyCode)
        ? partyData.find((item) => item.partyCode === partyCode).creditDays
        : ""
    );
  }, [partyCode]);

  useEffect(() => {
    apiItem();
    setUoM(
      itemData.find((item) => item.itemCode === itemCode)
        ? itemData.find((item) => item.itemCode === itemCode).uom
        : ""
    );
    setNature(
      itemData.find((item) => item.itemCode === itemCode)
        ? itemData.find((item) => item.itemCode === itemCode).nature
        : ""
    );
  }, [itemTypeCode, itemCode]);

  const [listofItems, setListOfItems] = useState([]);
  useEffect(() => {
    if (tableDataTab1.length != 0) {
      const uniqueItems = [
        ...new Set(tableDataTab1.map((item) => item.itemCode)),
      ];
      setListOfItems(uniqueItems);
      // console.log(uniqueItems);
    }
  }, [tableDataTab1, itemCode]);

  useEffect(() => {
    if (updateKeyTab1 === false) {
      if (listofItems.includes(itemCode)) {
        setItem("");
        setItemCode("");
        alert("Same Item repeated please change the Item!!");
      }
    }
  }, [itemCode]);

  useEffect(() => {
    setItem("");
    setItemCode("");
  }, [itemTypeCode]);

  //SubTab1
  useEffect(() => {
    const taxValue = parseFloat(netValue) * (parseFloat(taxPer) / 100);
    const roundedTaxValue = !isNaN(taxValue) ? taxValue.toFixed(2) : "";
    setAmount(roundedTaxValue);
  }, [taxPer]);

  useEffect(() => {
    if (tableDataSub1.length != 0) {
      const tempTotalTax = tableDataSub1
        .map((item) => item.amount)
        .reduce((acc, amount) => acc + parseFloat(amount), 0);
      const formattedTotalTax =
        tempTotalTax !== 0 ? tempTotalTax.toFixed(2) : "";
      setTotalAmount(formattedTotalTax);
    }
    if (tableDataSub1 == 0) {
      setTotalAmount("");
    }
  }, [tableDataSub1.length, updateKeySub1]);

  //SubTab3
  useEffect(() => {
    if (updateKeySub3 === false) {
      const numValue = parseFloat(payPer);
      const maxValue = 100 - parseFloat(totalPer);
      if (numValue > maxValue) {
        alert(`Payment % can't exceed \n\n ${maxValue}!`);
        setPayPer("");
      } else {
        setPayPer(payPer);
      }
    }
  }, [payPer]);

  useEffect(() => {
    const payValue = parseFloat(netValueBtm) * (parseFloat(payPer) / 100);
    const roundedPayValue = !isNaN(payValue) ? payValue.toFixed(2) : "";
    setPaymentAmount(roundedPayValue);
  }, [payPer]);

  useEffect(() => {
    if (viewDisableKey === false) {
      setTableDataSub3([]);
      setPayTerms("");
    }
  }, [netValue]);

  const [totalPer, setTotalPer] = useState("");
  const [totalPayAmount, setTotalPayAmount] = useState("");
  useEffect(() => {
    if (viewDisableKey === false) {
      if (tableDataSub3.length != 0) {
        const tempTotalPer = tableDataSub3
          .map((item) => item.payPer)
          .reduce((acc, payPer) => acc + parseFloat(payPer), 0);
        const formattedTotalPer =
          tempTotalPer !== 0 ? tempTotalPer.toFixed(2) : "";
        setTotalPer(formattedTotalPer);

        const tempTotalPayAmount = tableDataSub3
          .map((item) => item.paymentAmount)
          .reduce((acc, paymentAmount) => acc + parseFloat(paymentAmount), 0);
        const formattedTotalPayAmount =
          tempTotalPayAmount !== 0 ? tempTotalPayAmount.toFixed(2) : "";
        setTotalPayAmount(tempTotalPayAmount);
      }
      if (tableDataSub3 == 0) {
        setTotalPer("");
        setTotalPayAmount("");
      }
    }
  }, [tableDataSub3.length, updateKeySub3]);

  useEffect(() => {
    if (viewDisableKey === false) {
      if (totalPer == 100) {
        setTotalPayAmount(totalValueTemp);
      }
    }
  }, [totalPer]);

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
            placeHolderInputBoxLabel="PO No."
            placeHolderInputBoxValue={poNo}
            setplaceHolderInputBoxValue={setPoNo}
            placeHolderInputBoxEditableprop={!viewDisableKey}
            placeHolderInputBoxAutoCapitalize="characters"
            placeHolderInputBoxAutoCorrect={false}
            placeHolderInputBoxOnBlur={() => {
              setPoNoCall(!poNoCall);
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
            datePickerTextLabel="PO Date"
            datePickerTextValue={poDate}
            setDatePickerTextValue={setPoDate}
          />
        </View>
        {viewDisableKey === false && updateKeyTab1 === false ? (
          <View style={{ top: 30, marginBottom: 10, marginRight: 90 }}>
            <DatePickerProp
              datePickerValue={poDate}
              setDatePickerValue={setPoDate}
            ></DatePickerProp>
          </View>
        ) : null}
      </View>
      <View style={{ marginBottom: 0, marginLeft: 0, marginRight: -40 }}>
        <PlaceHolderInputBox
          placeHolderInputBoxLabel="Ref No."
          placeHolderInputBoxValue={refNo}
          setplaceHolderInputBoxValue={setRefNo}
          placeHolderInputBoxEditableprop={!viewDisableKey}
          placeHolderInputBoxAutoCapitalize="characters"
          placeHolderInputBoxAutoCorrect={false}
          keyboardTypeProp="numeric"
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <DatePickerSet
            datePickerTextLabel="Ref Date"
            datePickerTextValue={refDate}
            setDatePickerTextValue={setRefDate}
          />
        </View>
        {viewDisableKey === false && updateKeyTab1 === false ? (
          <View style={{ top: 30, marginBottom: 10, marginRight: 90 }}>
            <DatePickerProp
              datePickerValue={refDate}
              setDatePickerValue={setRefDate}
            ></DatePickerProp>
          </View>
        ) : null}
      </View>
      <DatePickerSet
        datePickerTextLabel="Valid Upto"
        datePickerTextValue={validUpto}
        setDatePickerTextValue={setValidUpto}
        editableprop={!viewDisableKey}
        keyboardTypeProp="numeric"
        maxLengthProp={3}
      />
      <CustomDropdown
        label="Party"
        data={partyData}
        value={party}
        setValue={setParty}
        valueLable="partyName"
        code={partyCode}
        setCode={setPartyCode}
        codeLable="partyCode"
        viewDisableProp={
          viewDisableKey === true || updateKeyTab1 === true ? true : false
        }
      />
      <InputFieldText label="Credit days" value={creditDays} />
      <CustomDropdown
        label="Item Type"
        data={itemTypeData}
        value={itemType}
        setValue={setItemType}
        valueLable="itemTypeName"
        code={itemTypeCode}
        setCode={setItemTypeCode}
        codeLable="itemTypeCode"
        viewDisableProp={
          viewDisableKey === true || updateKeyTab1 === true ? true : false
        }
      />
      <CustomDropdown
        label="Prepared By"
        data={preparedByData}
        value={preparedBy}
        setValue={setPreparedBy}
        valueLable="supervisorName"
        code={preparedByCode}
        setCode={setPreparedByCode}
        codeLable="supervisorCode"
        viewDisableProp={
          viewDisableKey === true || updateKeyTab1 === true ? true : false
        }
      />
      <CustomDropdown
        label="Approved By"
        data={approvedByData}
        value={approvedBy}
        setValue={setApprovedBy}
        valueLable="supName"
        code={approvedByCode}
        setCode={setApprovedByCode}
        codeLable="supCode"
        viewDisableProp={
          viewDisableKey === true || updateKeyTab1 === true ? true : false
        }
      />
      <RadioButtons />
      <VerticalLine />
      {/* Tab1 */}
      <BoxedHeader
        boxedHeaderLabel="Item Details"
        onPressMethod={() => setTabItemDetails(!tabItemDetails)}
      />
      {tabItemDetails === true && (
        <>
          {viewDisableKey === false && (
            <>
              <InputField
                label="Branch Name"
                value={branchName}
                setValue={setBranchName}
                editableprop={false}
              />
              <CustomDropdown
                label="Item Name"
                data={itemData}
                value={item}
                setValue={setItem}
                valueLable="itemName"
                code={itemCode}
                setCode={setItemCode}
                codeLable="itemCode"
              />
              <InputFieldText label="UoM" value={uoM} />
              {viewDisableKey === true && (
                <InputFieldText label="Nature" value={nature} />
              )}
              {nature == "N" && (
                <InputFieldText label="Nature" value={natureType} />
              )}
              {nature == "Y" && (
                <CustomDropdown
                  label="Nature"
                  data={natureTypeData}
                  value={natureType}
                  setValue={setNatureType}
                  valueLable="NatureDescn"
                  code={natureTypeCode}
                  setCode={setNatureTypeCode}
                  codeLable="NatureCode"
                />
              )}
              <CustomDropdown
                label="Delivery At"
                data={deliveryAtData}
                value={deliveryAt}
                setValue={setDelieveryAt}
                valueLable="GodownName"
                code={deliveryAtCode}
                setCode={setDelieveryAtCode}
                codeLable="GodownCode"
              />
              <InputField
                label="Po Qty"
                value={poQty}
                setValue={(text) => {
                  const pattern = /^(\d{0,14}(\.\d{0,4})?)?$/;
                  if (pattern.test(text)) {
                    setPoQty(text);
                  }
                }}
              />
              <InputField
                label="Free Qty"
                value={freeQty}
                setValue={(text) => {
                  const pattern = /^(\d{0,14}(\.\d{0,4})?)?$/;
                  if (pattern.test(text)) {
                    setFreeQty(text);
                  }
                }}
              />
              <InputField
                label="Charge Qty"
                value={chargeQty}
                setValue={setChargeQty}
                editableprop={false}
              />
              <InputField
                label="Rate"
                value={rate}
                setValue={(text) => {
                  const pattern = /^(\d{0,14}(\.\d{0,4})?)?$/;
                  if (pattern.test(text)) {
                    setRate(text);
                  }
                }}
              />
              <InputField
                label="Basic value"
                value={basicValue}
                setValue={setBasicValue}
                editableprop={false}
              />
              <InputField
                label="Discount %"
                value={discount}
                setValue={(text) => {
                  const pattern = /^(\d{0,3}(\.\d{0,2})?)?$/;
                  if (pattern.test(text)) {
                    const numValue = parseFloat(text);
                    if (numValue > 100) {
                      setDiscount("100");
                    } else {
                      setDiscount(text);
                    }
                  }
                }}
              />
            </>
          )}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ marginBottom: 0, marginLeft: 0, marginRight: -40 }}>
              {viewDisableKey === false && (
                <PlaceHolderInputBox
                  placeHolderInputBoxLabel="Net value"
                  placeHolderInputBoxValue={netValue}
                  setplaceHolderInputBoxValue={setNetValue}
                  placeHolderInputBoxEditableprop={false}
                />
              )}
              {viewDisableKey === true && (
                <PlaceHolderInputBox
                  placeHolderInputBoxLabel="Net value"
                  placeHolderInputBoxValue={"GST Table"}
                  placeHolderInputBoxEditableprop={false}
                />
              )}
            </View>
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
              onPress={() => {
                if (netValue !== "") {
                  setModalVisibleSub1(true);
                  setItemSub1(item);
                  setItemCodeSub1(itemCode);
                } else {
                  if (viewDisableKey === false) {
                    alert("Net Value can't be empty!!");
                  }
                  if (viewDisableKey === true) {
                    alert("Please Select a row then Click Select Button!!");
                  }
                }
              }}
            >
              <Text
                style={{ color: "white", textAlign: "center", fontSize: 20 }}
              >
                GST
              </Text>
            </TouchableOpacity>
            <Modal
              visible={modalVisibleSub1}
              animationType="fade"
              transparent={true}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <View
                  style={{
                    width: "95%",
                    backgroundColor: "#fff",
                    borderRadius: 8,
                    height: "87%",
                    paddingVertical: 20,
                  }}
                >
                  <ScrollView>
                    <InputFieldText label="Item" value={itemSub1} />
                    <BoxedHeader
                      boxedHeaderLabel="Item Tax Details"
                      onPressMethod={() => setSubTab(!subTab)}
                    />
                    {subTab === true && (
                      <>
                        {viewDisableKey === false && (
                          <>
                            <CustomDropdown
                              label="Tax Code"
                              data={gSTData}
                              value={taxCodeName}
                              setValue={setTaxCodeName}
                              valueLable="TaxCode"
                              code={taxCode}
                              setCode={setTaxCode}
                              codeLable="TaxRate"
                            />
                            <InputField
                              label="Tax %"
                              value={taxPer}
                              setValue={setTaxPer}
                              editableprop={false}
                            />
                            <InputField
                              label="Amount"
                              value={amount}
                              setValue={setAmount}
                              editableprop={false}
                            />
                            <CustomDropdown
                              label="Tax In./Ex."
                              data={taxInExData}
                              value={taxInEx}
                              setValue={setTaxInEx}
                              valueLable="label"
                              code={taxInExCode}
                              setCode={setTaxInExCode}
                              codeLable="Taxid"
                            />
                            {updateKeySub1 === false && (
                              <>
                                <ResetAddCombo
                                  resetNav={() => {
                                    ResetBtnSub1();
                                  }}
                                  editNav={editDataSub1}
                                  addNav={addDataSub1}
                                />
                                <LongButton
                                  buttonLabel="Delete"
                                  onPressMethod={deleteDataSub1}
                                />
                              </>
                            )}
                            {updateKeySub1 === true && (
                              <>
                                <LongButton
                                  buttonLabel="Update"
                                  onPressMethod={updateDataSub1}
                                />
                                <LongButton
                                  buttonLabel="Cancel"
                                  onPressMethod={() => {
                                    setUpdateKeySub1(false);
                                    ResetBtnSub1();
                                    setItemSub1(item);
                                    setItemCodeSub1(itemCode);
                                    setTableDataSub1(checkClearedDataArrSub1);
                                    setIsDisabledSub1(false);
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
                          <ScrollView
                            horizontal={true}
                            style={{ marginTop: -1 }}
                          >
                            <View>{renderHeaderRowsSub1()}</View>
                          </ScrollView>
                        </View>
                      </>
                    )}
                    <PlaceHolderInputBox
                      placeHolderInputBoxLabel="Total value"
                      placeHolderInputBoxValue={netValueTemp}
                      setplaceHolderInputBoxValue={setNetValueTemp}
                      placeHolderInputBoxEditableprop={false}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          marginBottom: 0,
                          marginLeft: 0,
                          marginRight: -40,
                        }}
                      >
                        <PlaceHolderInputBox
                          placeHolderInputBoxLabel="Tax Amount"
                          placeHolderInputBoxValue={totalamount}
                          setplaceHolderInputBoxValue={setTotalAmount}
                          placeHolderInputBoxEditableprop={false}
                        />
                      </View>
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
                        onPress={() => {
                          setModalVisibleSub1(false);
                          setGstKey(true);
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            textAlign: "center",
                            fontSize: 20,
                          }}
                        >
                          Back
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </View>
          {updateKeyTab1 === false && (
            <>
              {viewDisableKey === true && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      fontSize: 22,
                      padding: 10,
                      marginVertical: 8,
                      margin: 10,
                      marginTop: 20,
                      right: -10,
                      borderColor: "black",
                      backgroundColor: "#822046",
                      borderWidth: 1,
                      borderRadius: 1,
                      width: 120,
                    }}
                    onPress={() => {
                      ResetBtnTab1();
                      if (tableDataTab1.length >= 1) {
                        setTableDataTab1(checkClearedDataArr1);
                      }
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: 20,
                      }}
                    >
                      Reset
                    </Text>
                  </TouchableOpacity>
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
                    onPress={editDataTab1}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: 20,
                      }}
                    >
                      Select
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {viewDisableKey === false && (
                <>
                  <ResetAddCombo
                    resetNav={() => {
                      ResetBtnTab1();
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
            </>
          )}
          {updateKeyTab1 === true && (
            <>
              {viewDisableKey === false && (
                <LongButton
                  buttonLabel="Update"
                  onPressMethod={updateDataTab1}
                />
              )}
              <LongButton
                buttonLabel="Cancel"
                onPressMethod={() => {
                  setUpdateKeyTab1(false);
                  ResetBtnTab1();
                  ResetBtnSub1();
                  setTableDataSub1([]);
                  setTableDataTab1(checkClearedDataArr1);
                  setIsDisabledTab1(false);
                }}
              />
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
      {/* Bottom field */}
      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ marginBottom: 0, marginLeft: 0, marginRight: -40 }}>
          <PlaceHolderInputBox
            placeHolderInputBoxLabel="TDS. Value"
            placeHolderInputBoxValue={tDSValue}
            setplaceHolderInputBoxValue={setTDSValue}
            placeHolderInputBoxEditableprop={false}
          />
        </View>
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
          onPress={() => setModalVisibleSub2(true)}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
            TDS
          </Text>
        </TouchableOpacity>
        <Modal
          visible={modalVisibleSub2}
          animationType="fade"
          transparent={true}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                width: "95%",
                backgroundColor: "#fff",
                borderRadius: 8,
                height: "87%",
                paddingVertical: 20,
              }}
            >
              <ScrollView>
                <BoxedHeader
                  boxedHeaderLabel="Document Tax"
                  onPressMethod={() => setSubTab(!subTab)}
                />
                {subTab === true && (
                  <>
                    <CustomDropdown
                      label="Tax Type"
                      data={paymentTermsData}
                      value={taxType}
                      setValue={setTaxType}
                      valueLable="Descn"
                      code={taxTypeCode}
                      setCode={setTaxTypeCode}
                      codeLable="PayCode"
                    />
                    <InputField
                      label="Tax %"
                      value={taxPerSub2}
                      setValue={(text) => {
                        const numValue = parseFloat(text);
                        if (numValue > 100) {
                          setTaxPerSub2("100");
                        } else {
                          setTaxPerSub2(text);
                        }
                      }}
                      editableprop={true}
                    />
                    <InputField
                      label="Amount"
                      value={taxAmount}
                      setValue={setTaxAmount}
                      editableprop={false}
                    />
                    <CustomDropdown
                      label="Incl./Excl."
                      data={tempdata}
                      value={inEx}
                      setValue={setInEx}
                      valueLable="label"
                      code={inExCode}
                      setCode={setInExCode}
                      codeLable="value"
                    />
                  </>
                )}
                {updateKeySub2 === false && (
                  <>
                    <ResetAddCombo
                      resetNav={() => {
                        ResetBtnSub2();
                      }}
                      editNav={editDataSub2}
                      addNav={addDataSub2}
                    />
                    <LongButton
                      buttonLabel="Delete"
                      onPressMethod={deleteDataSub2}
                    />
                  </>
                )}
                {updateKeySub2 === true && (
                  <>
                    <LongButton
                      buttonLabel="Update"
                      onPressMethod={updateDataSub2}
                    />
                    <LongButton
                      buttonLabel="Cancel"
                      onPressMethod={() => {
                        setUpdateKeySub2(false);
                        ResetBtnSub2();
                        setTableDataSub2(checkClearedDataArrSub2);
                        setIsDisabledSub2(false);
                      }}
                    />
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
                    <View>{renderHeaderRowsSub2()}</View>
                  </ScrollView>
                </View>
                <PlaceHolderInputBox
                  placeHolderInputBoxLabel="Document Value"
                  placeHolderInputBoxValue={netValue}
                  setplaceHolderInputBoxValue={setNetValue}
                  placeHolderInputBoxEditableprop={false}
                />
                <PlaceHolderInputBox
                  placeHolderInputBoxLabel="Payment %"
                  placeHolderInputBoxValue={netValue}
                  setplaceHolderInputBoxValue={setNetValue}
                  placeHolderInputBoxEditableprop={false}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      marginBottom: 0,
                      marginLeft: 0,
                      marginRight: -40,
                    }}
                  >
                    <PlaceHolderInputBox
                      placeHolderInputBoxLabel="Total"
                      placeHolderInputBoxValue={netValue}
                      setplaceHolderInputBoxValue={setNetValue}
                      placeHolderInputBoxEditableprop={false}
                    />
                  </View>
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
                    onPress={() => setModalVisibleSub2(false)}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: 20,
                      }}
                    >
                      Back
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View> */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ marginBottom: 0, marginLeft: 0, marginRight: -40 }}>
          <PlaceHolderInputBox
            placeHolderInputBoxLabel="Pay Terms"
            placeHolderInputBoxValue={payTerms}
            setplaceHolderInputBoxValue={setPayTerms}
            placeHolderInputBoxEditableprop={false}
          />
        </View>
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
          onPress={() => {
            if (totalValueTemp !== "" || viewDisableKey === true) {
              setModalVisibleSub3(true);
            } else {
              alert("Total Value is Empty!!");
            }
          }}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
            Terms
          </Text>
        </TouchableOpacity>
        <Modal
          visible={modalVisibleSub3}
          animationType="fade"
          transparent={true}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                width: "95%",
                backgroundColor: "#fff",
                borderRadius: 8,
                height: "90%",
                paddingVertical: 20,
              }}
            >
              <ScrollView>
                <BoxedHeader
                  boxedHeaderLabel="PO Pay Terms & Conditions"
                  onPressMethod={() => setSubTab(!subTab)}
                />
                {subTab === true && (
                  <>
                    {viewDisableKey === false && (
                      <>
                        <CustomDropdown
                          label="Pay. Terms"
                          data={paymentTermsData}
                          value={paymentTerms}
                          setValue={setPaymentTerms}
                          valueLable="Descn"
                          code={paymentID}
                          setCode={setPaymentID}
                          codeLable="PayCode"
                        />
                        <InputField
                          label="Payment %"
                          value={payPer}
                          setValue={(text) => {
                            const numValue = parseFloat(text);
                            if (numValue > 100) {
                              setPayPer("100");
                            } else {
                              setPayPer(text);
                            }
                          }}
                          editableprop={true}
                        />
                        <InputField
                          label="Amount"
                          value={paymentAmount}
                          setValue={setPaymentAmount}
                          editableprop={false}
                        />
                        {updateKeySub3 === false && (
                          <>
                            <ResetAddCombo
                              resetNav={() => {
                                ResetBtnSub3();
                              }}
                              editNav={editDataSub3}
                              addNav={addDataSub3}
                            />
                            <LongButton
                              buttonLabel="Delete"
                              onPressMethod={deleteDataSub3}
                            />
                          </>
                        )}
                        {updateKeySub3 === true && (
                          <>
                            <LongButton
                              buttonLabel="Update"
                              onPressMethod={updateDataSub3}
                            />
                            <LongButton
                              buttonLabel="Cancel"
                              onPressMethod={() => {
                                setUpdateKeySub3(false);
                                ResetBtnSub3();
                                setTableDataSub3(checkClearedDataArrSub3);
                                setIsDisabledSub3(false);
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
                        <View>{renderHeaderRowsSub3()}</View>
                      </ScrollView>
                    </View>
                  </>
                )}
                <PlaceHolderInputBox
                  placeHolderInputBoxLabel="Document Value"
                  placeHolderInputBoxValue={totalValueTemp}
                  setplaceHolderInputBoxValue={setTotalValueTemp}
                  placeHolderInputBoxEditableprop={false}
                />
                <PlaceHolderInputBox
                  placeHolderInputBoxLabel="Payment %"
                  placeHolderInputBoxValue={totalPer}
                  setplaceHolderInputBoxValue={setTotalPer}
                  placeHolderInputBoxEditableprop={false}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      marginBottom: 0,
                      marginLeft: 0,
                      marginRight: -40,
                    }}
                  >
                    <PlaceHolderInputBox
                      placeHolderInputBoxLabel="Total"
                      placeHolderInputBoxValue={totalPayAmount}
                      setplaceHolderInputBoxValue={setTotalPayAmount}
                      placeHolderInputBoxEditableprop={false}
                    />
                  </View>
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
                    onPress={() => {
                      if (totalPer == 100) {
                        setModalVisibleSub3(false);
                        if (viewDisableKey === false) {
                          setPayTerms(totalPayAmount);
                        }
                        // if (viewDisableKey === true) {
                        //   setPayTerms(totalValueTemp);
                        // }
                        ResetBtnSub3();
                      } else {
                        if (totalPer >= 100) {
                          alert("Total Payment % can't be more than 100%");
                        }
                        if (totalPer <= 100) {
                          alert("Total Payment % can't be less than 100%");
                        }
                      }
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: 20,
                      }}
                    >
                      Back
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
      <InputField
        label="Total value"
        value={totalValue}
        setValue={setTotalValue}
        editableprop={false}
      />
      <InputFieldText label="Round Off" value={roundOff} />
      <InputFieldText label="Net value" value={netValueBtm} />
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
