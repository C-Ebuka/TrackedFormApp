import React, { useState, useEffect, ChangeEvent } from 'react';
import { useVaccine } from '../context/vaccineContext';
import { Picker } from '@react-native-picker/picker'; 
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image, StyleSheet, Text, NativeSyntheticEvent, TextInput, View, Button, TouchableOpacity, Alert } from 'react-native';
import statesData from './states';
import {VaccineState} from '../context/vaccineState'


interface Props {
  itemName: string;
}

const HomeScreen: React.FC<Props> = ({ itemName }) => {
    const { state, dispatch } = useVaccine();
    const {
        batchNumber,
        expiryDate,
        diluentBatchNumber,
        diluentExpiryDate,
        syringe5BatchNumber,
        syringe5ExpiryDate,
        syringe2mlBatchNumber,
        syringe2mlExpiryDate,
        vaccineTempAtPickup,
        bcgTempAtPickup,
        howLongs,
        vaccineStageAtPickup,
        vaccineStageAtIssue,
        openingBalance,
        openingBalanceInAmpoules,
        diluentOpeningBalance,
        diluentOpeningBalanceInAmpoules,
        diluentMismatch,
        diluentMismatchInAmpules,
        syringeOpeningBalance,
        syringe5mismatch,
        mlsyringeOpeningBalance,
        syringe2mismatch,
        averageMonthlyRequirement,
        multiplicationFactor,
        maximumStock,
        dosesToIssueUp,
        vaccineDosesIssued,
        vaccineTotal,
        vaccineTotalInVials,
        diluentRequiredForTotalAvailable,
        diluentRequiredForTotalAvailableInViles,
        diluentIssued,
        diluentTotal,
        diluentTotalInAmples,
        dilAvailableMismatch,
        dilAvailableMismatchInVials,
        syringe5requiredToMatchBcgAvail,
        syringe5QuantityIssued,
        syringe5Total,
        ml5AvailableMismatch,
        syringe2requiredToMatchBcgAvail,
        syringe2QuantityIssued,
        syringe2Total,
        syringe2AvailableMismatch,
          } = state;
          


    // State variables
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [selectedLocalGovt, setSelectedLocalGovt] = useState<string | null>(null);
    const [selectedWard, setSelectedWard] = useState<string | null>(null);
    const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
    const [facilityCceStatus, setFacilityCceStatus] = useState<string>(''); // State variable for facilityCceStatus
    const [cceFunctionalityStatus, setCceFunctionalityStatus] = useState<string>(''); // State variable for cceFunctionalityStatus
    const [pocketExpenses, setPocketExpenses] = useState<string>(''); // State variable for pocketExpenses  
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertBCG, setShowAlertBCG] = useState(false);
    const [isDateValid, setIsDateValid] = useState(false);
    const [showAlert5, setShowAlert5] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);
    const [showDropDownPicker, setShowDropDownPicker] = useState(false);
    const [showHowLongs, setShowHowLongs] = useState(false);
    const [selectedDropDownPickerItem, setSelectedDropDownPickerItem] = useState('');

    const [showDropDownPicker1, setShowDropDownPicker1] = useState(false);
    const [showHowLongs1, setShowHowLongs1] = useState(false);
    const [selectedDropDownPickerItem1, setSelectedDropDownPickerItem1] = useState('');
    
  
    const handleTempSelection = (temp: string) => {
        if (temp === 'below 2°C' || temp === 'above 8°C') {
          setShowDropDownPicker(true);
          setShowHowLongs(true)
          setSelectedDropDownPickerItem(''); 
        } else {
          setShowDropDownPicker(false);
          setShowHowLongs(false)
        }
        dispatch({ type: 'SET_BCG_TEMP_AT_PICKUP', payload: temp });
      };
  
      const handleTempSelectionAtIssue = (temp: string) => {
        if (temp === 'below 2°C' || temp === 'above 8°C') {
          setShowDropDownPicker1(true);
          setShowHowLongs1(true)
          setSelectedDropDownPickerItem1(''); 
        } else {
          setShowDropDownPicker1(false);
          setShowHowLongs1(false)
        }
        dispatch({ type: 'SET_BCG_TEMP_AT_PICKUP', payload: temp });
      };
  

    const handleDropDownPickerSelect = (item: string) => {
      setSelectedDropDownPickerItem(item);
    };
    
    const handleInputChange = (value: any, name: keyof VaccineState) => {
        switch (name) {
          case 'vendorName':
            dispatch({ type: 'SET_VENDOR_NAME', payload: value as string });
            break;
          case 'phoneNumber':
            dispatch({ type: 'SET_VENDOR_PHONE_NUMBER', payload: parseInt(value as string, 10) });
            break;
          case 'conveyorName':
            dispatch({ type: 'SET_CONVEYOR_NAME', payload: value as string });
            break;
          case 'conveyorPhoneNumber':
            dispatch({ type: 'SET_CONVEYOR_PHONE_NUMBER', payload: parseInt(value as string, 10) });
            break;
          case 'distribution':
            dispatch({ type: 'SET_DISTRIBUTION', payload: value as string });
            break;
          case 'reportingPeriod':
            dispatch({ type: 'SET_REPORTING_PERIOD', payload: value as string });
            break;
          case 'issuingColdStore':
            dispatch({ type: 'SET_ISSUING_COLD_STORE', payload: value as string });
            break;
          case 'pickUpDate':
            dispatch({ type: 'SET_PICK_UP_DATE', payload: value as string });
            break;
          case 'pickUpTime':
            dispatch({ type: 'SET_PICK_UP_TIME', payload: value as string });
            break;
          case 'deliveryDate':
            dispatch({ type: 'SET_DELIVERY_DATE', payload: value as string });
            break;
          case 'deliveryTime':
            dispatch({ type: 'SET_DELIVERY_TIME', payload: value as string });
            break;
          case 'facilityCceStatus':
            dispatch({ type: 'SET_FACILITY_CCE_STATUS', payload: value as string });
            break;
          case 'cceFunctionalityStatus':
            dispatch({ type: 'SET_CCE_FUNCTIONALITY_STATUS', payload: value as string });
            break;
          case 'pocketExpenses':
            dispatch({ type: 'SET_OUT_OF_POCKET_EXPENSES', payload: value as string });
            break;
          case 'batchNumber':
            dispatch({ type: 'SET_BATCH_NUMBER', payload: value as string });
            break;
          case 'diluentBatchNumber':
            dispatch({ type: 'SET_DILUENT_BATCH_NUMBER', payload: value as string });
            break;
          case 'syringe5BatchNumber':
            dispatch({ type: 'SET_SYRINGE_5ML_BATCH_NUMBER', payload: value as string });
            break;
          case 'vaccineStageAtPickup':
            dispatch({ type: 'SET_VACCINE_STAGE_AT_PICK_UP', payload: value as string });
            break; 
          case 'vaccineStageAtIssue':
            dispatch({ type: 'SET_VACCINE_STAGE_AT_ISSUE', payload: value as string });
            break; 
        case 'openingBalance':
            const openingBalanceInAmpoules = Math.floor(value / 20);
            dispatch({type: 'SET_BCG_VACCINE_OPENING_BALANCE', payload: value });
            dispatch({type: 'SET_BCG_VACCINE_OPENING_BALANCE_IN_AMPOULES', payload: openingBalanceInAmpoules });
            break;
        case 'diluentOpeningBalance':
            const diluentOpeningBalanceInAmpoules = Math.floor(value / 20);
            const diluentMismatch = Math.floor(openingBalance - diluentOpeningBalance);
            const diluentMismatchInAmpules = Math.floor(diluentMismatch / 20);
            dispatch({ type: 'SET_BCG_DILUENT_OPENING_BALANCE', payload: diluentOpeningBalance });
            dispatch({ type: 'SET_BCG_DILUENT_OPENING_BALANCE_IN_AMPOULES', payload: diluentOpeningBalanceInAmpoules });
            dispatch({ type: 'SET_BCG_DILUENT_MISMATCH', payload: diluentMismatch });            
            dispatch({ type: 'SET_BCG_DILUENT_MISMATCH_IN_AMPOULES', payload: diluentMismatchInAmpules });            
            break;
          case 'syringeOpeningBalance':
            const syringe5mismatch = Math.floor(openingBalance - syringeOpeningBalance);
            dispatch({ type: 'SET_BCG_5ML_SYRINGE_OPENING_BALANCE', payload: syringeOpeningBalance});
            dispatch({ type: 'SET_BCG_5ML_SYRINGE_MISMATCH', payload: syringe5mismatch});
            break;
          case 'mlsyringeOpeningBalance':
            const syringe2mismatch = Math.floor(openingBalance - mlsyringeOpeningBalance);
            dispatch({ type: 'SET_BCG_2ML_SYRINGE_OPENING_BALANCE', payload: mlsyringeOpeningBalance});
            dispatch({ type: 'SET_BCG_2ML_SYRINGE_MISMATCH', payload: syringe2mismatch});
            break;
          case 'averageMonthlyRequirement':
            dispatch({ type: 'SET_AVERAGE_MONTHLY_REQUIREMENT', payload: averageMonthlyRequirement});
            break;  
          case 'multiplicationFactor':
            dispatch({ type: 'SET_MULTIPLICATION_FACTOR', payload: parseInt(value as string, 10) });
            break;     
          case 'maximumStock':
            const maximumStock = Math.floor(averageMonthlyRequirement * multiplicationFactor);
            const dosesToIssueUp = Math.floor(maximumStock - openingBalance);
            dispatch({ type: 'SET_MAXIMUM_STOCK', payload: maximumStock});
            dispatch({ type: 'SET_DOSES_TO_ISSUE_UP_TO_MAX', payload: dosesToIssueUp});
            break;  
          case 'vaccineDosesIssued':
            dispatch({ type: 'SET_ACTUAL_VACCINE_DOSES_ISSUED', payload: vaccineDosesIssued });
            break;  
          case 'vaccineTotal':
            const vaccineTotal =  Math.floor(openingBalance + vaccineDosesIssued);
            dispatch({ type: 'SET_VACCINE_TOTAL', payload: vaccineTotal });
            break; 
          case 'vaccineTotalInVials':
            dispatch({ type: 'SET_VACCINE_TOTAL_IN_VIALS', payload: vaccineTotalInVials});
            break;             
          case 'diluentIssued':
            dispatch({ type: 'SET_BCG_DILUENT_ISSUED', payload: diluentIssued });


            break;                           
            
          default:
            break;
        }
      };
      useEffect(() => {
        if (vaccineTotal !== undefined && diluentOpeningBalance !== undefined || diluentIssued !== undefined && diluentTotal !== undefined) {
          const diluentRequiredForTotalAvailable = vaccineTotal - diluentOpeningBalance;
          const diluentRequiredForTotalAvailableInViles = diluentRequiredForTotalAvailable / 20;
          const diluentTotal = Math.floor(diluentOpeningBalance + diluentIssued)
          const diluentTotalInAmples = Math.floor(diluentTotal / 20)
          const dilAvailableMismatch = Math.floor(vaccineTotal - diluentTotal)
          const dilAvailableMismatchInVials = Math.floor(dilAvailableMismatch / 20)
          dispatch({ type: 'SET_DILUENT_REQUIRED_FOR_AVAILABLE_TOTAL', payload: diluentRequiredForTotalAvailable });
          dispatch({ type: 'SET_DILUENT_REQUIRED_IN_VILES_FOR_AVAILABLE_TOTAL', payload: diluentRequiredForTotalAvailableInViles });
          dispatch({ type: 'SET_DILUENT_REQUIRED_FOR_AVAILABLE_TOTAL', payload: diluentRequiredForTotalAvailable });
          dispatch({ type: 'SET_DILUENT_REQUIRED_FOR_AVAILABLE_TOTAL', payload: diluentRequiredForTotalAvailable });
          dispatch({ type: 'SET_DILUENT_TOTAL', payload: diluentIssued });
          dispatch({ type: 'SET_DILUENT_TOTAL_IN_AMPOULES', payload: diluentTotalInAmples });
          dispatch({ type: 'SET_DILUENT_AVAILABLE_MISMATCH', payload: dilAvailableMismatch });
          dispatch({ type: 'SET_DILUENT_AVAILABLE_MISMATCH_IN_AMPOULES', payload: dilAvailableMismatchInVials });

        }
      }, [vaccineTotal, diluentOpeningBalance, diluentIssued, vaccineTotal,
         diluentTotal, diluentRequiredForTotalAvailable, dilAvailableMismatch]);


      useEffect(() => {
        if (vaccineTotal !== undefined && syringeOpeningBalance !== undefined ) {
          const syringe5requiredToMatchBcgAvail = vaccineTotal - syringeOpeningBalance;
          dispatch({ type: 'SET_SYRINGE5_REQUIRED_FOR_AVAILABLE_TOTAL', payload: syringe5requiredToMatchBcgAvail });
          dispatch({ type: 'SET_ACTUAL_SYRINGE5_ISSUED', payload: syringe5QuantityIssued});
          const syringe5Total = syringeOpeningBalance + syringe5QuantityIssued;
          dispatch({ type: 'SET_SYRINGE5_TOTAL', payload: syringe5Total}); 
          const ml5AvailableMismatch = vaccineTotal - syringe5Total;
          dispatch({ type: 'SET_SYRINGE5_MISMATCH', payload: ml5AvailableMismatch}); 

        }
      }, [vaccineTotal, syringeOpeningBalance, syringe5QuantityIssued, syringe5Total]);

      useEffect(() => {
        if (vaccineTotal !== undefined && syringe2QuantityIssued !== undefined ) {
          const syringe2requiredToMatchBcgAvail = vaccineTotalInVials - mlsyringeOpeningBalance;
          dispatch({ type: 'SET_SYRINGE2_REQUIRED_FOR_AVAILABLE_TOTAL', payload: syringe2requiredToMatchBcgAvail });
          dispatch({ type: 'SET_ACTUAL_SYRINGE2_ISSUED', payload: syringe2QuantityIssued});
          const syringe2Total = mlsyringeOpeningBalance + syringe2QuantityIssued;
          dispatch({ type: 'SET_SYRINGE2_TOTAL', payload: syringe2Total}); 
          const syringe2AvailableMismatch = vaccineTotalInVials - syringe2Total;
          dispatch({ type: 'SET_SYRINGE2_MISMATCH', payload: syringe2AvailableMismatch}); 

        }
      }, [vaccineTotal, syringeOpeningBalance, vaccineTotalInVials, syringe2QuantityIssued, mlsyringeOpeningBalance]);

  const handleDistributionSelect = (type: string) => {
    dispatch({ type: 'SET_DISTRIBUTION', payload: type });
  };

  const handleReportingSelect = (period: string) => {
    dispatch({ type: 'SET_REPORTING_PERIOD', payload: period });
  };

  const handleColdStoreSelect = (coldStoreType: string) => {
    dispatch({ type: 'SET_ISSUING_COLD_STORE', payload: coldStoreType });
  };

    // Handler function for selecting manufacturer
  const handleManufacturerChange = (itemValue: string | null) => {
    dispatch({ type: 'SET_SELECTED_MANUFACTURER', payload: itemValue });
  };

  // Dummy manufacturers data (replace with your actual data)
  const manufacturers = ['Manufacturer A', 'Manufacturer B', 'Manufacturer C'];

  const handleTempTimeChange = (itemValue: string ) => {
    dispatch({ type: 'SET_SELECTED_DURATION', payload: itemValue });
  };  
  const handleTempTimeChange1 = (itemValue: string ) => {
    dispatch({ type: 'SET_SELECTED_DURATION', payload: itemValue });
  };

  
 
   // Handler functions for Picker component changes
   const handleStateChange = (itemValue: string | null) => {
     setSelectedState(itemValue);
     dispatch({ type: 'SET_SELECTED_STATE', payload: itemValue });
   };
 
   const handleLocalGovtChange = (itemValue: string | null) => {
     setSelectedLocalGovt(itemValue);
     dispatch({ type: 'SET_SELECTED_LOCAL_GOVT', payload: itemValue });
   };
 
   const handleWardChange = (itemValue: string | null) => {
     setSelectedWard(itemValue);
     dispatch({ type: 'SET_SELECTED_WARD', payload: itemValue });
   };
 
   const handleFacilityChange = (itemValue: string | null) => {
     setSelectedFacility(itemValue);
     dispatch({ type: 'SET_SELECTED_FACILITY', payload: itemValue });
   };

   const isValidDate = (dateStr: string): string => {
    const parts = dateStr.split('/');
    if (parts.length !== 3) return 'Invalid format'; // Ensure correct format
  
    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
  
    if (isNaN(month) || isNaN(day) || isNaN(year)) return 'Invalid format'; // Validate numbers
  
    const enteredDate = new Date(year, month - 1, day); // Month is 0-based in Date constructor
    const currentDate = new Date();
  
    // Calculate 6 months ahead from current date
    const sixMonthsAhead = new Date();
    sixMonthsAhead.setMonth(sixMonthsAhead.getMonth() + 6);
  
    if (enteredDate < currentDate) {
      return 'This vaccine is expired';
    } else if (enteredDate <= sixMonthsAhead) {
      return 'This product expires within the next six months';
    } else {
      return 'valid'; // Return 'valid' when the date is valid beyond six months
    }
  };

   const handleBCGDateChange = (text: string) => {
    dispatch({ type: 'SET_EXPIRY_DATE', payload: text });
    const validityMessage: string = isValidDate(text);
    setShowAlertBCG(validityMessage !== 'valid' && text.trim().length > 0);
  };

  const handleDateChange = (text: string) => {
    dispatch({ type: 'SET_DILUENT_EXPIRY_DATE', payload: text });
    const validityMessage: string = isValidDate(text);
    setShowAlert(validityMessage !== 'valid' && text.trim().length > 0);
  
  };

  const handle5DateChange = (text: string) => {
    dispatch({ type: 'SET_SYRINGE_5ML_EXPIRY_DATE', payload: text });
    const validityMessage: string = isValidDate(text);
    setShowAlert5(validityMessage !== 'valid' && text.trim().length > 0);
  
  };

  const handle2DateChange = (text: string) => {
    dispatch({ type: 'SET_SYRINGE_2ML_EXPIRY_DATE', payload: text });
    const validityMessage: string = isValidDate(text);
    setShowAlert2(validityMessage !== 'valid' && text.trim().length > 0);
  
  };
  const handleTempChange = (text: string) => {
    dispatch({ type: 'SET_VACCINE_TEMP_AT_PICKUP', payload: text });
  };

  // Handle VVM stage input change
  const handleVVMStageChange = (text: string) => {
    dispatch({ type: 'SET_VVM_STAGE_AT_PICKUP', payload: text });
  };

{/*
  useEffect(() => {
    dispatch({ type: 'CALCULATE_TOTAL_OPENING_VACCINE' });
  }, [state.openingStock, state.amountAdded]);

  useEffect(() => {
    dispatch({ type: 'CALCULATE_CLOSING_VACCINE' });
  }, [state.totalOpeningStock, state.amountSold]);

  useEffect(() => {
    dispatch({ type: 'CALCULATE_AMOUNT_SOLD' });
  }, [state.totalOpeningStock, state.closingStock]);

  useEffect(() => {
    dispatch({ type: 'CALCULATE_MISMATCH' });
  }, [state.expectedOpeningStock, state.openingStock]);
  */}

  return (
    <View>

    <View>
      <Text style={styles.label}>VENDOR NAME</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Vendor Name"
        value={state.vendorName}
        onChangeText={(text) => handleInputChange(text, 'vendorName')}
      />
    </View>

    <Text style={styles.label}>PHONE NUMBER</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        value={state.phoneNumber.toString()}
        onChangeText={(text) => handleInputChange(text, 'phoneNumber')}
      />

      <Text style={styles.label}>CONVEYOR NAME</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Conveyor Name"
        value={state.conveyorName}
        onChangeText={(text) => handleInputChange(text, 'conveyorName')}
      />

      <Text style={styles.label}>CONVEYOR PHONE NUMBER</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Conveyor Phone Number"
        value={state.phoneNumber.toString()}
        onChangeText={(text) => handleInputChange(text, 'conveyorPhoneNumber')}
      />
      
   <View style={styles.questionaireContainer}>
      <View>
        <ThemedText style={styles.subHeading}>TYPE OF DISTRIBUTION</ThemedText>
        <View style={styles.ageGradeContainer}>
          <TouchableOpacity
            onPress={() => handleDistributionSelect('Normal distribution')}
            style={state.distribution === 'Normal distribution' ? styles.selectedAgeGrade : styles.ageGradeOption}
          >
            <ThemedText style={styles.ageGradeOptionText}>Normal distribution</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDistributionSelect('Top-up')}
            style={state.distribution === 'Top-up' ? styles.selectedAgeGrade : styles.ageGradeOption}
          >
            <ThemedText style={styles.ageGradeOptionText}>Top-up</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.questionaireContainer}>
        <ThemedText style={styles.subHeading}>REPORTING PERIOD</ThemedText>
        <View style={styles.ageGradeContainer}>
          <TouchableOpacity
            onPress={() => handleReportingSelect('Sep 2024')}
            style={state.reportingPeriod === 'Sep 2024' ? styles.selectedAgeGrade : styles.ageGradeOption}
          >
            <ThemedText style={styles.ageGradeOptionText}>Sep 2024</ThemedText>
          </TouchableOpacity>
          {/* Add more TouchableOpacity components for other reporting periods */}
        </View>
      </View>
    </View>


    <View style={styles.questionaireContainer}>
      <ThemedText style={styles.subHeading}>ISSUING COLD STORE</ThemedText>
      <View style={styles.ageGradeContainer}>
        <TouchableOpacity onPress={() => handleColdStoreSelect('State cold store')} style={state.issuingColdStore === 'State cold store' ? styles.selectedAgeGrade : styles.ageGradeOption}>
          <ThemedText style={styles.ageGradeOptionText}>State cold store</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleColdStoreSelect('LGA cold store')} style={state.issuingColdStore === 'LGA cold store' ? styles.selectedAgeGrade : styles.ageGradeOption}>
          <ThemedText style={styles.ageGradeOptionText}>LGA cold store</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleColdStoreSelect('Equipped health facility')} style={state.issuingColdStore === 'Equipped health facility' ? styles.selectedAgeGrade : styles.ageGradeOption}>
          <ThemedText style={styles.ageGradeOptionText}>Equipped health facility</ThemedText>
        </TouchableOpacity>
      </View>
    </View>



    <View>
    <Text style={styles.label}>PICK-UP DATE</Text>
    <TextInput
        style={styles.input}
        placeholder="Enter Date of pick up. Format: DD/MM/YY 21/07/2019"
        value={state.pickUpDate}
        onChangeText={(text) => handleInputChange(text, 'pickUpDate')}
    />
    </View>

    <View>
  <Text style={styles.label}>PICK-UP TIME</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter Time of pick up. Format: Hour:Minute 15:30"
    value={state.pickUpTime}
    onChangeText={(text) => handleInputChange(text, 'pickUpTime')}         

  />
    </View>

<View>
  <Text style={styles.label}>DELIVERY DATE [MM/DD/YYYY]</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter Date of delivery at the health facility. Format: DD/MM/YY 21/07/2019"
    value={state.deliveryDate}
    onChangeText={(text) => handleInputChange(text, 'deliveryDate')}
  />
</View>

<View>
  <Text style={styles.label}>DELIVERY TIME [MM/DD/YYYY]</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter Date of delivery at the health facility. Format: DD/MM/YY 21/07/2019"
    value={state.deliveryTime}
    onChangeText={(text) => handleInputChange(text, 'deliveryTime')}
  />
</View>


 

    <View style={styles.questionaireContainer}>
          <ThemedText style={styles.subHeading}>HEALTH FACILITY </ThemedText>
      <View style={styles.ageGradeContainer}>
              
      <View style={styles.healthContainer}>
      <Picker
        selectedValue={selectedState}
        onValueChange={(itemValue) => handleStateChange(itemValue)}>
        <Picker.Item label="Select State" value={null} />
        {Object.keys(statesData).map((state) => (
          <Picker.Item key={state} label={state} value={state} />
        ))}
      </Picker>

      <Picker
        selectedValue={selectedLocalGovt}
        onValueChange={(itemValue) => handleLocalGovtChange(itemValue)}>
        <Picker.Item label="Select Local Government" value={null} />
        {selectedState &&
          statesData[selectedState]?.localGovernments.map((localGovt) => (
            <Picker.Item
              key={localGovt.name}
              label={localGovt.name}
              value={localGovt.name}
            />
          ))}
      </Picker>

      <Picker
        selectedValue={selectedWard}
        onValueChange={(itemValue) => handleWardChange(itemValue)}>
        <Picker.Item label="Select Ward" value={null} />
        {selectedState && 
        selectedLocalGovt &&
          statesData[selectedState]?.localGovernments
            .find((lg) => lg.name === selectedLocalGovt)
            ?.wards.map((ward) => (
              <Picker.Item
                key={ward.name}
                label={ward.name}
                value={ward.name}
              />
            ))}
      </Picker>

      <Picker
        selectedValue={selectedFacility}
        onValueChange={(itemValue) => handleFacilityChange(itemValue)}>
        <Picker.Item label="Select Facility" value={null} />
        {selectedState && selectedLocalGovt && selectedWard &&
          statesData[selectedState]?.localGovernments
            .find((lg) => lg.name === selectedLocalGovt)
            ?.wards.find((w) => w.name === selectedWard)
            ?.facilities.map((facility, index) => (
              <Picker.Item
                key={index}
                label={facility.name}
                value={facility.name} 
              />
            ))}
      </Picker>

      <View style={styles.facilitiesContainer}>
        <Text>Facility selected: {selectedFacility} of {selectedWard} of {selectedLocalGovt} of {selectedState}</Text>
      </View>
    </View>
            
    </View>
    </View>


    <View style={styles.questionaireContainer}>
  <ThemedText style={styles.subHeading}>HEALTH FACILITY CCE STATUS</ThemedText>
  <View style={styles.ageGradeContainer}>
    <TouchableOpacity onPress={() => handleInputChange('Equipped', 'facilityCceStatus')} style={facilityCceStatus === 'Equipped' ? styles.selectedAgeGrade : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>Equipped</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleInputChange('Unequipped', 'facilityCceStatus')} style={facilityCceStatus === 'Unequipped' ? styles.selectedAgeGrade : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>Unequipped</ThemedText>
    </TouchableOpacity>
  </View>
</View>

<View style={styles.questionaireContainer}>
  <ThemedText style={styles.subHeading}>CCE FUNCTIONALITY STATUS</ThemedText>
  <View style={styles.ageGradeContainer}>
    <TouchableOpacity onPress={() => handleInputChange('Functional', 'cceFunctionalityStatus')} style={cceFunctionalityStatus === 'Functional' ? styles.selectedAgeGrade : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>Functional</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleInputChange('Non functional - To be repaired.', 'cceFunctionalityStatus')} style={cceFunctionalityStatus === 'Non functional - To be repaired.' ? styles.selectedAgeGrade : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>Non functional - To be repaired.</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleInputChange('Non functional - To be decommisioned', 'cceFunctionalityStatus')} style={cceFunctionalityStatus === 'Non functional - To be decommisioned' ? styles.selectedAgeGrade : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>Non functional - To be decommisioned</ThemedText>
    </TouchableOpacity>
  </View>
</View>

<View style={styles.questionaireContainer}>
  <ThemedText style={styles.subHeading}>DID HEALTH FACILITY MAKE OUT-OF-POCKET EXPENSES FOR RI VACCINES THIS PERIOD?</ThemedText>
  <View style={styles.ageGradeContainer}>
    <TouchableOpacity onPress={() => handleInputChange('Yes', 'pocketExpenses')} style={pocketExpenses === 'Yes' ? styles.selectedAgeGrade : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>Yes</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleInputChange('No', 'pocketExpenses')} style={pocketExpenses === 'No' ? styles.selectedAgeGrade : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>No</ThemedText>
    </TouchableOpacity>
  </View>
</View>

<View style={styles.questionaireContainer}>
        <Text style={styles.subHeading}>SELECT MANUFACTURER</Text>
        <Picker
          selectedValue={state.selectedManufacturer}
          onValueChange={(itemValue) => handleManufacturerChange(itemValue)}
          style={styles.pickerContainer}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Select Manufacturer" value={null} />
          {manufacturers.map((manufacturer, index) => (
            <Picker.Item key={index} label={manufacturer} value={manufacturer} />
          ))}
        </Picker>
</View>

<View>
        <Text style={styles.label}>BCG VACCINE BATCH NUMBER</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter BCG Vaccine batch number"
          value={batchNumber}
          onChangeText={(text) => dispatch({ type: 'SET_BATCH_NUMBER', payload: text })}
        />
</View>

<View>
        <Text style={styles.label}>BCG VACCINE EXPIRY DATE [MM/DD/YYYY]</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter BCG Vaccine expiring date. Format: MM/DD/YYYY"
          value={expiryDate}
          onChangeText={handleBCGDateChange}
        />
        {showAlertBCG && (
            <View style={[styles.alert, isDateValid ? styles.alertValid : null]}>
              <Text style={styles.alertText}>{isValidDate(expiryDate)}</Text>
            </View>
          )}
      </View>

      <View>
        <Text style={styles.label}>BCG DILUENT BATCH NUMBER</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter BCG Diluent batch number"
          value={diluentBatchNumber}
          onChangeText={(text) => dispatch({ type: 'SET_DILUENT_BATCH_NUMBER', payload: text })}
        />
      </View>

      <View>
        <Text style={styles.label}>BCG DILUENT EXPIRY DATE [MM/DD/YYYY]</Text>
        <TextInput
          style={styles.input}
          placeholder="BCG Diluent expiring date. Format: MM/DD/YYYY"
          value={diluentExpiryDate}
          onChangeText={handleDateChange}
        />
        {showAlert && (
            <View style={[styles.alert, isDateValid ? styles.alertValid : null]}>
              <Text style={styles.alertText}>{isValidDate(diluentExpiryDate)}</Text>
            </View>
          )}
      </View>

      <View>
        <Text style={styles.label}>BCG 0.05ML SYRINGE BATCH NUMBER</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter BCG Syringe 0.05ml batch number"
          value={syringe5BatchNumber}
          onChangeText={(text) => dispatch({ type: 'SET_SYRINGE_5ML_BATCH_NUMBER', payload: text })}
        />
      </View>

      <View>
        <Text style={styles.label}>BCG 0.05ML SYRINGE EXPIRY DATE [MM/DD/YYYY]</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter BCG Syringe 0.05ml expiring date. Format: MM/DD/YYYY"
          value={syringe5ExpiryDate}
          onChangeText={handle5DateChange}
        />
        {showAlert5 && (
            <View style={[styles.alert, isDateValid ? styles.alertValid : null]}>
              <Text style={styles.alertText}>{isValidDate(syringe5ExpiryDate)}</Text>
            </View>
          )}
      </View>

      <View>
        <Text style={styles.label}>BCG 2ML SYRINGE BATCH NUMBER</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter BCG 2ml Syringe batch number"
          value={syringe2mlBatchNumber}
          onChangeText={(text) => dispatch({ type: 'SET_SYRINGE_2ML_BATCH_NUMBER', payload: text })}
        />
      </View>

      <View>
        <Text style={styles.label}>BCG 2ML SYRINGE EXPIRY DATE [MM/DD/YYYY]</Text>
        <TextInput
          style={styles.input}
          placeholder="BCG Syringe 2ml expiring date. Format: MM/DD/YYYY"
          value={syringe2mlExpiryDate}
          onChangeText={handle2DateChange}
        />
         {showAlert2 && (
            <View style={[styles.alert, isDateValid ? styles.alertValid : null]}>
              <Text style={styles.alertText}>{isValidDate(syringe2mlExpiryDate)}</Text>
            </View>
          )}
      </View>
      

      <View style={styles.questionaireContainer}>
        <Text style={styles.subHeading}>BCG VACCINE TEMP AT PICK-UP</Text>
        <View style={styles.ageGradeContainer}>
          <TouchableOpacity
            style={vaccineTempAtPickup === 'Below 2°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}
            onPress={() => handleTempSelection('below 2°C')}
          >
            <Text style={styles.ageGradeOptionText}>Below 2°C</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={vaccineTempAtPickup === 'Between 2°C - 8°C' ? styles.selectedAgeGradess : styles.ageGradeOptions}
            onPress={() => handleTempSelection('between 2°C and 8°C')}
          >
            <Text style={styles.ageGradeOptionText}>Between 2°C and 8°C</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={vaccineTempAtPickup === 'Above 8°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}            
            onPress={() => handleTempSelection('above 8°C')}
          >
            <Text style={styles.ageGradeOptionText}>Above 8°C</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showDropDownPicker && (
        <View style={styles.questionaireContainer}>
          <Text style={styles.subHeading}>HOW LONG HAD IT BEEN AT THIS TEMPERATURE?</Text>
        <Picker
        selectedValue={howLongs}
        onValueChange={(itemValue) => handleTempTimeChange(itemValue)}

        style={styles.pickerContainer}
        >
        <Picker.Item label="Less than 1 hrs" value="Less than 1 hrs" />
        <Picker.Item label="1hrs to 2 hrs" value="1hrs to 2 hrs" />
        <Picker.Item label="above 2 hrs" value="above 2 hrs" />
        </Picker>
            </View>
        )}

<View  style={styles.questionaireContainer}>
          <ThemedText style={styles.subHeading}>BCG VACCINE VVM STAGE AT PICKUP </ThemedText>
          <View style={styles.ageGradeContainer}>
            <TouchableOpacity onPress={() => handleInputChange('Stage 1', 'vaccineStageAtPickup')} style={vaccineStageAtPickup === 'Stage 1' ? styles.selectedAgeGradeStage1 : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 1</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleInputChange('Stage 2', 'vaccineStageAtPickup')} style={vaccineStageAtPickup === 'Stage 2' ? styles.selectedAgeGradeStage2 : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 2</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleInputChange('Stage 3', 'vaccineStageAtPickup')} style={vaccineStageAtPickup === 'Stage 3' ? styles.selectedAgeGradeStage3 : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 3</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleInputChange('Stage 4', 'vaccineStageAtPickup')} style={vaccineStageAtPickup === 'Stage 4' ? styles.selectedAgeGradeStage4 : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 4</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View>
        <Text style={styles.label}>BCG VACCINE OPENING BALANCE (PLEASE ENTER ONLY MULTIPLES OF 20)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter BCG Vaccine opening balance"
          value={state.openingBalance.toString()}
          onChangeText={(text) => handleInputChange(text, 'openingBalance')}
        />
      </View>

      <View style={styles.calc}>
        <Text style={styles.subHeading}>BCG VACCINE OPENING BALANCE IN AMPOULES :</Text>
        {openingBalance && (
          <Text style={styles.mismatch}>
            {openingBalanceInAmpoules}
          </Text>
        )}
      </View>
        
        <View>
        <Text style={styles.label}>BCG DILUENT OPENING BALANCE (PLEASE ENTER ONLY MULTIPLES OF 20)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter BCG Diluent opening balance"
          value={state.diluentOpeningBalance.toString()}
          onChangeText={(text) => handleInputChange(text, 'diluentOpeningBalance')}
        />
        </View>

        <View  style={styles.calc}>
          <ThemedText style={styles.subHeading}>BCG DILUENT OPENING BALANCE IN AMPOULES :</ThemedText>
          {diluentOpeningBalance && (
           
              <ThemedText style={styles.mismatch}>
                {diluentOpeningBalanceInAmpoules} 
              </ThemedText>
          )}
        </View>
         
        
        <View style={styles.calc}>
        <Text style={styles.subHeading}>BCG DILUENT MISMATCH :</Text>
        {diluentOpeningBalance && (
          <>
            <Text style={styles.mismatch}>
              {diluentMismatch}
            </Text>
            <Text>
              DILUENT MISMATCH IN AMPOULES:
            </Text>
            <Text style={styles.mismatch}>
              {diluentMismatchInAmpules}
            </Text>
          </>
        )}
      </View>
        

        <View>
        <Text style={styles.label}>BCG 0.05ML SYRINGE OPENING BALANCE (PLEASE ENTER ONLY MULTIPLES OF 20)</Text> 
        <TextInput
              style={styles.input}
              placeholder="Enter BCG 0.05ml syringe opening balance"
              value={state.syringeOpeningBalance.toString()}
              onChangeText={(text) => handleInputChange(text, 'syringeOpeningBalance')}
            />
        </View>

        <View  style={styles.calc}>
          <ThemedText style={styles.subHeading}>BCG SYRINGE 0.05ML MISMATCH :</ThemedText>
          {syringeOpeningBalance && (
            
            <ThemedText style={styles.mismatch}>
              {syringe5mismatch} 
            </ThemedText>
           
            
          )}
        </View>

        <View>
        <Text style={styles.label}>BCG 2ML SYRINGE OPENING BALANCE </Text> 
        <TextInput
              style={styles.input}
              placeholder="Enter BCG 2ml syringe opening balance"
              value={state.mlsyringeOpeningBalance.toString()}
              onChangeText={(text) => handleInputChange(text, 'mlsyringeOpeningBalance')}
            />
        </View>

        <View  style={styles.calc}>
        <ThemedText style={styles.subHeading}>BCG SYRINGE 2ML MISMATCH :</ThemedText>
          {syringe2mismatch && (
              <ThemedText style={styles.mismatch}>
                {syringe2mismatch} pcs
              </ThemedText>            
          )}
        </View> 

        <View>
        <Text style={styles.label}>BCG VACCINE AVERAGE MONTHLY REQUIREMENT  (AMR) (PLEASE ENTER ONLY MULTIPLES OF 20)</Text> 
        <TextInput
            style={styles.input}
            placeholder="Enter BCG Vaccine average monthly requirement"
            value={state.averageMonthlyRequirement.toString()}
            onChangeText={(text) => handleInputChange(text, 'averageMonthlyRequirement')}

          /> 
        </View>

        <ThemedText style={styles.subHeading}>MMSQ MULTIPLICATION FACTOR:</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="MMSQ MULTIPLICATION FACTOR"
            value={state.multiplicationFactor.toString()}
            onChangeText={(text) => handleInputChange(text, 'multiplicationFactor')}

            keyboardType="numeric" // Ensure numeric keyboard for multiplication factor input
          /> 

          
<View style={styles.calc}>       
          <ThemedText style={styles.subHeading}>BCG VACCINE MONTHLY MAXIMUM STOCK QUANTITY:</ThemedText>
          
          
          {averageMonthlyRequirement && (
            <ThemedText style={styles.mismatch}>
              {maximumStock} doses
            </ThemedText>
          )}
        </View>


        <View style={styles.calc}>
          <ThemedText style={styles.subHeading}>
            BCG VACCINE DOSES REQUIRED TO MAKE UP TO MAXIMUM STOCK:
          </ThemedText>
          {maximumStock && (
            <ThemedText style={styles.mismatch}>
              {dosesToIssueUp} doses
            </ThemedText>
          )}
        </View> 
        <View>
        <Text style={styles.label}>ACTUAL BCG VACCINE DOSES ISSUED (PLEASE ENTER ONLY MULTIPLES OF 20)</Text> 
        <TextInput
          style={styles.input}
          placeholder="BCG vaccine doses issued "
          value={state.vaccineDosesIssued.toString()}
          onChangeText={(text) => handleInputChange(text, 'vaccineDosesIssued')}

        /> 
        </View>

        <View style={styles.calc}>
          <ThemedText style={styles.subHeading}>
          Total BCG vaccine available:
          </ThemedText>
          {vaccineTotal && (
            <ThemedText style={styles.mismatch}>
              {vaccineTotal} doses or {vaccineTotalInVials} vials
            </ThemedText>
          )}
        </View>

        
        
        <View style={styles.calc}>
          <ThemedText style={styles.subHeading}>
         QUANTITY (DOSES) OF DILUENT REQUIRED TO MATCH TOTAL AVAILABLE BCG VACCINE (FACTORING IN OPENING BALANCE):
         </ThemedText>
        </View>
        <ThemedText>
          {vaccineTotal && (
            <ThemedText style={styles.mismatch}>
              {diluentRequiredForTotalAvailable} doses or  {diluentRequiredForTotalAvailableInViles} vials/ampoules
            </ThemedText>
          )}
        </ThemedText>

        <View>
        <Text style={styles.label}>ACTUAL QUANTITY (DOSES) OF BCG DILUENT ISSUED (PLEASE ENTER ONLY MULTIPLES OF 20)</Text> 
        <TextInput
          style={styles.input}
          placeholder="BCG diluent issued "
          value={state.diluentIssued.toString()}
          onChangeText={(text) => handleInputChange(text, 'diluentIssued')}

        />
        </View>

        <View style={styles.calc}>
          <ThemedText style={styles.subHeading}>
          Total Diluent available:
          </ThemedText>
          {diluentTotal && (
            <ThemedText style={styles.mismatch}>
              {diluentTotal} doses or {diluentTotalInAmples} vials/ampoules
            </ThemedText>
          )}
        </View>
    

        <View style={styles.calc}>
          <ThemedText style={styles.subHeading}>
          DILUENT AVAILABLE MISMATCH:          
          </ThemedText>
          {vaccineTotal && (
            <ThemedText style={styles.mismatch}>
              {dilAvailableMismatch} doses or {dilAvailableMismatchInVials} vials/ampoules
            </ThemedText>
          )}
        </View>

        <View style={styles.calc}>
          <ThemedText style={styles.subHeading}>
          QUANTITY OF 0.05ML SYRINGE REQUIRED TO MATCH TOTAL BCG VACCINE AVAILABLE (FACTORING IN OPENING BALANCE):
          </ThemedText>
          {vaccineTotal && (
            <ThemedText style={styles.mismatch}>
              {syringe5requiredToMatchBcgAvail} pcs
            </ThemedText>
          )}
        </View>

        <View>
        <Text style={styles.label}>ACTUAL BCG 0.05ML SYRINGE QUANTITY ISSUED (PLEASE ENTER ONLY MULTIPLES OF 20)</Text> 
      <TextInput
          style={styles.input}
          placeholder="BCG 0.05ml syringe Quantity Issued "
          value={state.syringe5QuantityIssued.toString()}
          onChangeText={(text) => handleInputChange(text, 'syringe5QuantityIssued')}
        />
        </View>
        <View style={styles.calc}>
          <ThemedText style={styles.subHeading}>
          Total 0.05ml syringe available:
          </ThemedText>
          {syringeOpeningBalance && syringe5QuantityIssued && (
            <ThemedText style={styles.mismatch}>
              {syringe5Total} pcs
            </ThemedText>
          )}
        </View>


        <View style={styles.calc}>
          <ThemedText style={styles.subHeading}>
          0.05ML SYRINGE AVAILABLE MISMATCH:          
          </ThemedText>
          {ml5AvailableMismatch && (
            <ThemedText style={styles.mismatch}>
              {ml5AvailableMismatch} pcs 
            </ThemedText>
          )}
        </View>

        <View style={styles.calc}>
          <ThemedText style={styles.subHeading}>
          QUANTITY OF 2ML SYRINGE REQUIRED TO MATCH TOTAL BCG VACCINE AVAILABLE (FACTORING IN OPENING BALANCE):
          </ThemedText>
          {vaccineTotal && (
            <ThemedText style={styles.mismatch}>
              {syringe2requiredToMatchBcgAvail} pcs
            </ThemedText>
          )}
        </View>

        <View>
        <Text style={styles.label}>ACTUAL BCG 2ML SYRINGE QUANTITY ISSUED </Text> 
        <TextInput
            style={styles.input}
            placeholder="BCG 2ml syringe Quantity Issued "          
          value={state.syringe2QuantityIssued.toString()}
          onChangeText={(text) => handleInputChange(text, 'syringe2QuantityIssued')}
          />
        </View>
    
      <View style={styles.calc}>
          <ThemedText style={styles.subHeading}>
          Total 2ml syringe available:
          </ThemedText>
          {mlsyringeOpeningBalance && syringe2QuantityIssued && (
            <ThemedText style={styles.mismatch}>
              {syringe2Total} pcs 
            </ThemedText>
          )}
        </View>


        <View style={styles.calc}>
          <ThemedText style={styles.subHeading}>
          2ML SYRINGE AVAILABLE MISMATCH:          
          </ThemedText>
          {   syringe2Total && (
            <ThemedText style={styles.mismatch}>
              {syringe2AvailableMismatch} pcs
            </ThemedText>
          )}
        </View>

        <View style={styles.questionaireContainer}>
        <Text style={styles.subHeading}>BCG VACCINE TEMP AT ISSUE</Text>
        <View style={styles.ageGradeContainer}>
          <TouchableOpacity
            style={vaccineTempAtPickup === 'Below 2°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}
            onPress={() => handleTempSelectionAtIssue('below 2°C')}
          >
            <Text style={styles.ageGradeOptionText}>Below 2°C</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={vaccineTempAtPickup === 'Between 2°C - 8°C' ? styles.selectedAgeGradess : styles.ageGradeOptions}
            onPress={() => handleTempSelectionAtIssue('between 2°C and 8°C')}
          >
            <Text style={styles.ageGradeOptionText}>Between 2°C and 8°C</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={vaccineTempAtPickup === 'Above 8°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}            
            onPress={() => handleTempSelectionAtIssue('above 8°C')}
          >
            <Text style={styles.ageGradeOptionText}>Above 8°C</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showDropDownPicker && (
        <View style={styles.questionaireContainer}>
          <Text style={styles.subHeading}>HOW LONG HAD IT BEEN AT THIS TEMPERATURE?</Text>
        <Picker
        selectedValue={howLongs}
        onValueChange={(itemValue) => handleTempTimeChange1(itemValue)}

        style={styles.pickerContainer}
        >
        <Picker.Item label="Less than 1 hrs" value="Less than 1 hrs" />
        <Picker.Item label="1hrs to 2 hrs" value="1hrs to 2 hrs" />
        <Picker.Item label="above 2 hrs" value="above 2 hrs" />
        </Picker>
            </View>
      )}


<View  style={styles.questionaireContainer}>
          <ThemedText style={styles.subHeading}>BCG VACCINE VVM STAGE AT ISSUE </ThemedText>
          <View style={styles.ageGradeContainer}>
            <TouchableOpacity onPress={() => handleInputChange('Stage 1', 'vaccineStageAtIssue')} style={vaccineStageAtIssue === 'Stage 1' ? styles.selectedAgeGradeStage1 : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 1</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleInputChange('Stage 2', 'vaccineStageAtIssue')} style={vaccineStageAtIssue === 'Stage 2' ? styles.selectedAgeGradeStage2 : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 2</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleInputChange('Stage 3', 'vaccineStageAtIssue')} style={vaccineStageAtIssue === 'Stage 3' ? styles.selectedAgeGradeStage3 : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 3</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleInputChange('Stage 4', 'vaccineStageAtIssue')} style={vaccineStageAtIssue === 'Stage 4' ? styles.selectedAgeGradeStage4 : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 4</ThemedText>
            </TouchableOpacity>
          </View>
        </View>


    </View>


  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    formContainer: {
      paddingHorizontal: 16,
      paddingVertical: 18,
      borderWidth: 1,
      borderColor: 'lightgray',
      borderRadius: 8,
      marginBottom: 56,
    },
  
    buttonContainer1: {
      backgroundColor: 'green',
      marginTop: 20,
      marginHorizontal: 5,
      borderRadius: 10,
      overflow: 'hidden',
      width: 200, 
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    },
  
    buttonContainer2: {
      backgroundColor: 'green',
      marginTop: 20,
      marginHorizontal: 5,
      borderRadius: 10,
      overflow: 'hidden',
      width: 200, 
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
  
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    healthContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 18,
      borderRadius: 4,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
  
    facilitiesContainer: {
      marginTop: 20,
    },
    reactLogo: {
      position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,  
    top: 0,    
    width: '100%',
    resizeMode: 'contain',
    },
    questionContainer: {
      borderWidth: 1,
      borderColor: 'lightgray',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
    },
    sexContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    align: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center', // Align items vertically centered
    },
    closeButton: {
      position: 'absolute',
      top: 10, // Adjust as needed
      right: 10, // Adjust as needed
      backgroundColor: 'transparent',
      padding: 10,
      borderRadius: 20,
    },
    sexOption: {
      backgroundColor: 'lightgray',
      padding: 8,
      borderRadius: 4,
    },
    selectedSex: {
      backgroundColor: 'lightgreen',
      padding: 8,
      borderRadius: 4,
    },
    sexOptionText: {
      fontWeight: 'bold',
    },
    ageGradeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 16,
      
    },
    ageGradeOption: {
      backgroundColor: 'lightgray',
      padding: 8,
      borderRadius: 4,
      paddingHorizontal: 16,
    },
    selectedAgeGrade: {
      backgroundColor: 'lightgreen',
      padding: 8,
      borderRadius: 4,
    },
  
    text: {
      backgroundColor: 'lightgreen',
      textAlign: 'center', // Center text horizontally
      padding: 10, // Example padding
    },
    ageGradeOptions: {
      backgroundColor: 'lightgray',
      padding: 8,
      borderRadius: 4,
      paddingHorizontal: 16,
    },
    selectedAgeGrades: {
      backgroundColor: 'lightgreen',
      padding: 8,
      borderRadius: 4,
    },
    selectedAgeGradess: {
      backgroundColor: 'lightgreen',
      padding: 8,
      borderRadius: 4,
  
    },
    selectedAgeGradeStage1: {
      backgroundColor: '#088F8F',
      padding: 8,
      borderRadius: 4,
  },
  selectedAgeGradeStage2: {
      backgroundColor: 'lightgreen',
      padding: 8,
      borderRadius: 4,
  },
  alert: {
    backgroundColor: '#f8d7da',
    borderWidth: 1,
    borderColor: '#f5c6cb',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  alertValid: {
    backgroundColor: 'green', 
  },
  alertText: {
    color: '#721c24',
    fontSize: 14,
  },
  selectedAgeGradeStage3: {
      backgroundColor: 'lightcoral',
      padding: 8,
      borderRadius: 4,
  },
  selectedAgeGradeStage4: {
    backgroundColor: 'darkred',
    padding: 8,
    borderRadius: 4,
  },
    ageGradeOptionText: {
      fontWeight: 'bold',
    },
    subHeading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    mismatch: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 38,
      color: '#FFFFFF',
      backgroundColor: '#478778',
      paddingHorizontal: 12, 
      alignSelf: 'flex-start', 
      maxWidth: '100%', 
      borderRadius: 10,
    },
    
  
    submitButton: {
      backgroundColor: 'green',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-start', // Horizontally center the button
      width: 'auto',
      marginRight: 10,
    },
    submitButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    
    pickerContainer: {
      height: 40, 
      width: '100%', 
      fontSize: 18, 
      marginBottom: 30, 
      backgroundColor: 'lightgray', 
      borderRadius: 8, 
      paddingHorizontal: 10, 
    },
    pickerItem: {
      fontSize: 18, 
    },
    header: {
      fontSize: 24, 
      fontWeight: 'bold', 
      marginTop: 20, 
      marginBottom: 30, 
      textAlign: 'center',
    },
    questionaireContainer: {
      borderWidth: 1,
      borderColor: 'lightgray',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
    },
    button: {
      backgroundColor: 'green',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10, 
      width: 'auto',
  },
  buttonfill: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginBottom: 10, 
    alignSelf: 'center',
    width: 'auto',
  },
  calc: {
    flexDirection: 'row',
  },
  buttonText: {
      color: 'white',
      fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    backgroundColor: '#ccc', 
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  
  wrapper: {
    flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'center',
      marginTop: 10,
  },
  });