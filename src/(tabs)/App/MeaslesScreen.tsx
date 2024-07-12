import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, NativeSyntheticEvent, Platform, TextInput, View, Button, TouchableOpacity, Alert } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/auth'; // import specific Firebase services you need
import 'firebase/database';
import { Picker } from '@react-native-picker/picker'; // Import Picker component
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { getAuth, Auth } from 'firebase/auth';
import statesData from './states';
import { MaterialIcons } from '@expo/vector-icons';
import SupervisorAuthForm from './SupervisorAuthForm';



const firebaseConfig = {
    apiKey: "AIzaSyBDzDo6avxttMvVnUbsuXQG9TBtzkvuFI0",
    authDomain: "track-app-f434c.firebaseapp.com",
    databaseURL: "https://track-app-f434c-default-rtdb.firebaseio.com",
    projectId: "track-app-f434c",
    storageBucket: "track-app-f434c.appspot.com",
    messagingSenderId: "81243804128",
    appId: "1:81243804128:web:ca691436be476656045b85",
    measurementId: "G-PL44NPKGYX"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);


  const manufacturers = ['Manufacturer 1', 'Manufacturer 2', 'Manufacturer 3', 'Manufacturer 4', 'Manufacturer 5'];

type LocationObject = {
  coords: {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
  timestamp: number;
};

interface HomeScreenProps {
  name: string;
}

export default function MeaslesScreen() {
  const [selectedManufacturerMeasles, setSelectedManufacturerMeasles] = useState<string>('');
  const [selectedManufacturerMeaslesa, setSelectedManufacturerMeaslesa] = useState<string>('');
  const [selectedManufacturerMeaslesb, setSelectedManufacturerMeaslesb] = useState<string>('');
  const [openingBalanceInAmples, setOpeningBalanceInAmples] = useState('');
  const [diluentOpeningBalanceInAmples, setDiluentOpeningBalanceInAmples] = useState('');
  const [measlesOpeningBalance, setMeaslesOpeningBalance] = useState('');
  const [openingBalanceamsl, setOpeningBalanceamsl] = useState('');
  const [openingBalancebmsl, setOpeningBalancebmsl] = useState('');
  const [diluentOpeningBalancemsl, setDiluentOpeningBalancemsl] = useState('')
  const [diluentOpeningBalanceamsl, setDiluentOpeningBalanceamsl] = useState('')
  const [diluentOpeningBalancebmsl, setDiluentOpeningBalancebmsl] = useState('')
  const [syringeOpeningBalancemsl, setSyringeOpeningBalancemsl] = useState('');
  const [syringeOpeningBalanceamsl, setSyringeOpeningBalanceamsl] = useState('');
  const [syringeOpeningBalancebmsl, setSyringeOpeningBalancebmsl] = useState('');
  const [mlsyringeOpeningBalancemsl, setMlsyringeOpeningBalancemsl] = useState('');
  const [mlsyringeOpeningBalanceamsl, setMlsyringeOpeningBalanceamsl] = useState('');
  const [mlsyringeOpeningBalancebmsl, setMlsyringeOpeningBalancebmsl] = useState('');
  const [diluentmismatcha, setDiluentmismatcha] = useState('');
  const [syringe5mismatch, setSyringe5mismatch] = useState('');
  const [syringe5mismatcha, setSyringe5mismatcha] = useState('');
  const [syringe5mismatchb, setSyringe5mismatchb] = useState('');
  const [syringe2mismatch, setSyringe2mismatch] = useState('');
  const [mlsyringemismatchmsl, setMlsyringemismatchmsl] = useState('');
  const [mlsyringemismatchamsl, setMlsyringemismatchamsl] = useState('');
  const [mlsyringemismatchbmsl, setMlsyringemismatchbmsl] = useState('');
  const [averageMonthlyRequirementmsl, setAverageMonthlyRequirementmsl] = useState('');
  const [averageMonthlyRequirementamsl, setAverageMonthlyRequirementamsl] = useState('');
  const [averageMonthlyRequirementbmsl, setAverageMonthlyRequirementbmsl] = useState('');
  const [maximumStockmsl, setMaximumStockmsl] = useState('');
  const [maximumStockamsl, setMaximumStockamsl] = useState('');
  const [maximumStockbmsl, setMaximumStockbmsl] = useState('');
  const [dosesToIssueUpmsl, setDosesToIssueUpmsl] = useState('');
  const [dosesToIssueUpmsla, setDosesToIssueUpmsla] = useState('');
  const [dosesToIssueUpmslb, setDosesToIssueUpmslb] = useState('');
  const [vaccineDosesIssuedmsl, setVaccineDosesIssuedmsl] = useState('');
  const [vaccineDosesIssuedmsla, setVaccineDosesIssuedmsla] = useState('');
  const [vaccineDosesIssuedmslb, setVaccineDosesIssuedmslb] = useState('');
  const [diluentIssuedmsl, setDiluentIssuedmsl] = useState('');
  const [diluentIssuedmsla, setDiluentIssuedmsla] = useState('');
  const [diluentIssuedmslb, setDiluentIssuedmslb] = useState('');
  const [syringeQuantityIssuedmsl, setSyringeQuantityIssuedmsl] = useState('');
  const [syringeQuantityIssuedmsla, setSyringeQuantityIssuedmsla] = useState('');
  const [syringeQuantityIssuedmslb, setSyringeQuantityIssuedmslb] = useState('');
  const [mlsyringeQuantityIssuedmsl, setMlsyringeQuantityIssuedmsl] = useState('');
  const [mlsyringeQuantityIssuedmsla, setMlsyringeQuantityIssuedmsla] = useState('');
  const [mlsyringeQuantityIssuedmslb, setMlsyringeQuantityIssuedmslb] = useState('');

  const [vaccineStagemsl, setVaccineStagemsl] = useState('');
  const [vaccineStageAtIssuemsl, setVaccineStageAtIssuemsl] = useState('');
  const [vaccineStageAtPickupmsl, setVaccineStageAtPickupmsl] = useState('');
  const [vaccineTempAtIssuesmsl, setVaccineTempAtIssuesmsl] = useState('');
  const [vaccineTempAtIssuesamsl, setVaccineTempAtIssuesamsl] = useState('');
  const [vaccineTempAtIssuesbmsl, setVaccineTempAtIssuesbmsl] = useState('');
  const [vaccineTempAtPickupmsl, setVaccineTempAtPickupmsl] = useState('');
  const [vaccineTempAtPickupamsl, setVaccineTempAtPickupamsl] = useState('');
  const [vaccineTempAtPickupbmsl, setVaccineTempAtPickupbmsl] = useState('');
  const [batchNumbermsl, setBatchNumbermsl] = useState('');
  const [batchNumbermsla, setBatchNumbermsla] = useState('');
  const [batchNumbermslb, setBatchNumbermslb] = useState('');
  const [expiryDatemsl, setExpiryDatemsl] = useState('');  
  const [expiryDatemsla, setExpiryDatemsla] = useState('');
  const [expiryDatemslb, setExpiryDatemslb] = useState('');
  const [diluentBatchNumbermsl, setDiluentBatchNumbermsl] = useState('');
  const [diluentBatchNumbermsla, setDiluentBatchNumbermsla] = useState('');
  const [diluentBatchNumbermslb, setDiluentBatchNumbermslb] = useState('');
  const [diluentExpiryDatemsl, setDiluentExpiryDatemsl] = useState('');
  const [diluentExpiryDatemsla, setDiluentExpiryDatemsla] = useState('');
  const [diluentExpiryDatemslb, setDiluentExpiryDatemslb] = useState('');
  const [showHowLongmsl, setShowHowLongmsl] = useState(false);
  const [showHowLongmsla, setShowHowLongmsla] = useState(false);
  const [showHowLongmslb, setShowHowLongmslb] = useState(false);

  const [howLongmsl, setHowLongmsl] = useState('');
  const [howLongmsla, setHowLongmsla] = useState('');
  const [howLongmslb, setHowLongmslb] = useState('');

  const [howLongsmsl, setHowLongsmsl] = useState('');
  const [howLongsmsla, setHowLongsmsla] = useState('');
  const [howLongsmslb, setHowLongsmslb] = useState('');

  const [showHowLongsmsl, setShowHowLongsmsl] = useState('');
  const [showHowLongsmsla, setShowHowLongsmsla] = useState('');
  const [showHowLongsmslb, setShowHowLongsmslb] = useState('');

  const [location, setLocation] = useState<LocationObject | "">("");
  const [errorMsg, setErrorMsg] = useState<"" | string>("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [localGovernment, setLocalGovernment] = useState('');
  const [selectedState, setSelectedState] = useState<string | "">("");
  const [selectedLocalGovt, setSelectedLocalGovt] = useState<string | "">("");
  const [selectedWard, setSelectedWard] = useState<string | "">("");
  const [selectedFacility, setSelectedFacility] = useState<string | "">("");
  const [generateFields, setGenerateFields] = useState(false);
  const [generateFields1, setGenerateFields1] = useState(false);
  const [generateFieldsCount, setGenerateFieldsCount] = useState(0);
  const [generateFieldsCount1, setGenerateFieldsCount1] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [locationSent, setLocationSent] = useState(false);
  const [syringe5BatchNumbermsl, setSyringe5BatchNumbermsl] = useState('');
  const [syringe5BatchNumbermsla, setSyringe5BatchNumbermsla] = useState('');
  const [syringe5BatchNumbermslb, setSyringe5BatchNumbermslb] = useState('');
  const [syringe5ExpiryDatemsl, setSyringe5ExpiryDatemsl] = useState('');
  const [syringe5ExpiryDatemsla, setSyringe5ExpiryDatemsla] = useState('');
  const [syringe5ExpiryDatemslb, setSyringe5ExpiryDatemslb] = useState('');
  const [syringe2mlBatchNumbermsl, setSyringe2mlBatchNumbermsl] = useState('');
  const [syringe2mlBatchNumbermsla, setSyringe2mlBatchNumbermsla] = useState('');
  const [syringe2mlBatchNumbermslb, setSyringe2mlBatchNumbermslb] = useState('');
  const [syringe2mlExpiryDatemsl, setSyringe2mlExpiryDatemsl] = useState('');
  const [syringe2mlExpiryDatemsla, setSyringe2mlExpiryDatemsla] = useState('');
  const [syringe2mlExpiryDatemslb, setSyringe2mlExpiryDatemslb] = useState('');
  const [syringeMaxStockQuantity, setSyringeMaxStockQuantity] = useState('');
  const [mlsyringeMaxStockQuantity, setMlsyringeMaxStockQuantity] = useState('');
  const [syringeToIssueUp, setSyringeToIssueUp] = useState('');
  const [mlsyringeToIssueUp, setMlsyringeToIssueUp] = useState(''); 
  const [vaccineTotal, setVaccineTotal] = useState('');  
  const [vaccineTotalInVials, setVaccineTotalInVials] = useState('');  
  const [diluentRequiredForTotalAvailable, setDiluentRequiredForTotalAvailable] = useState('');
  const [DiluentRequiredForTotalAvailableInViles, setDiluentRequiredForTotalAvailableInViles] = useState('');
  const [showSupervisorForm, setShowSupervisorForm] = useState(false); 
  const [mlsyringeReq, setMlsyringeReq] = useState('');
  const [mlsyringeReqFinalCalc, setMlsyringeReqFinalCalc] = useState('');
  const [multiplicationFactormsl, setMultiplicationFactormsl] = useState('');
  const [multiplicationFactoramsl, setMultiplicationFactoramsl] = useState('');
  const [multiplicationFactorbmsl, setMultiplicationFactorbmsl] = useState('');
  const [dilAvailableMismatch, setDilAvailableMismatch] = useState('');
  const [dilAvailableMismatchInVials, setDilAvailableMismatchInVials] = useState('');
  const [ml5AvailableMismatchmsl, setMl5AvailableMismatchmsl] = useState('');
  const [ml5AvailableMismatchamsl, setMl5AvailableMismatchamsl] = useState('');
  const [ml5AvailableMismatchbmsl, setMl5AvailableMismatchbmsl] = useState('');
  const [ml2AvailableMismatch, setMl2AvailableMismatch] = useState('');
  const [diluentVaccineTotal, setDiluentVaccineTotal] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertMSLS, setShowAlertMSLS] = useState(false);
  const [isDateValid, setIsDateValid] = useState(false);
  const [showAlert5, setShowAlert5] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [diluentMismatch, setDiluentMismatch] = useState('');
  const [diluentMismatchInAmpules, setDiluentMismatchInAmpules] = useState('');
  const [diluentTotal, setDiluentTotal] = useState('')
  const [diluentTotalInAmples, setDiluentTotalInAmples] = useState('')
  const [ml5Total, setMl5Total] = useState('')
  const [ml2Total, setMl2Total] = useState('')
  const [totalMslsDiluentAvailable, setTotalMslsDiluentAvailable] = useState('');
  const [vaccine5requiredToMatchMslsAvail, setVaccine5requiredToMatchMslsAvail] = useState('');
      


  
    




  const clearFields = () => {
    setVaccineTempAtIssuesmsl('');
    setVaccineTempAtIssuesamsl('');
    setVaccineTempAtIssuesbmsl('');
      setVaccineStagemsl('');
      setMeaslesOpeningBalance('');
      setOpeningBalanceInAmples('');
      setDiluentOpeningBalanceInAmples('');
      setOpeningBalanceamsl('');
      setOpeningBalancebmsl('');
      setDiluentOpeningBalancemsl('');
      setDiluentOpeningBalanceamsl('');
      setDiluentOpeningBalancebmsl('');
      setSyringeOpeningBalancemsl('');
      setSyringeOpeningBalanceamsl('');
      setSyringeOpeningBalancebmsl('');
      setMlsyringeOpeningBalancemsl('');
      setMlsyringeOpeningBalanceamsl('');
      setMlsyringeOpeningBalancebmsl('');
      setMlsyringemismatchmsl('');
      setMlsyringemismatchamsl('');
      setMlsyringemismatchbmsl('');
      setAverageMonthlyRequirementmsl('');
      setAverageMonthlyRequirementamsl('');
      setAverageMonthlyRequirementbmsl('');
      setMaximumStockmsl('');
      setMaximumStockamsl('');
      setMaximumStockbmsl('');
      setDosesToIssueUpmsl('');
      setDosesToIssueUpmsla('');
      setDosesToIssueUpmslb('');
      setVaccineDosesIssuedmsl('');
      setVaccineDosesIssuedmsla('');
      setVaccineDosesIssuedmslb('');
      setDiluentIssuedmsl('');
      setDiluentIssuedmsla('');
      setDiluentIssuedmslb('');
      setVaccineTempAtPickupmsl('');
      setVaccineTempAtPickupamsl('');
      setVaccineTempAtPickupbmsl('');
      setSyringeQuantityIssuedmsl('');
      setSyringeQuantityIssuedmsla('');
      setSyringeQuantityIssuedmslb('');
      setMlsyringeQuantityIssuedmsl('');
      setMlsyringeQuantityIssuedmsla('');
      setMlsyringeQuantityIssuedmslb('');
      setVaccineStageAtIssuemsl('');
      setVaccineStageAtPickupmsl('');
      setBatchNumbermsl('');
      setBatchNumbermsla('');
      setBatchNumbermslb('');
      setDiluentBatchNumbermsl('');
      setDiluentBatchNumbermsla('');
      setDiluentBatchNumbermslb('');
      setSyringe5BatchNumbermsl('');
      setSyringe5BatchNumbermsla('');
      setSyringe5BatchNumbermslb('');
      setSyringe2mlBatchNumbermsl('');
      setSyringe2mlBatchNumbermsla('');
      setSyringe2mlBatchNumbermslb('');
      setHowLongmsl('');
      setHowLongmsla('');
      setHowLongmslb('');
      setHowLongsmsl('');
      setHowLongsmsla('');
      setHowLongsmslb('');
      setShowHowLongsmsl('');
      setShowHowLongsmsla('');
      setShowHowLongsmslb('');

  };

  

  const handleGenerateFields = () => {
    if (generateFieldsCount < 4) {
      setGenerateFieldsCount(count => count + 1);
    }
    setGenerateFields(true);
  };
  const handleGenerateFields1 = () => {
    if (generateFieldsCount1 < 4) {
      setGenerateFieldsCount1(count => count + 1);
    }
    setGenerateFields1(true);
  };

  const handleStateChange = (state: string | "") => {
    setSelectedState(state);
    setSelectedLocalGovt("");
    setSelectedWard("");
    setSelectedFacility("");

  };

  const handleLocalGovtChange = (localGovt: string | "") => {
    setSelectedLocalGovt(localGovt);
    setSelectedWard("");
    setSelectedFacility("");
  };

  const handleWardChange = (ward: string | "") => {
    setSelectedWard(ward);
    setSelectedFacility("");
  };

  const handleFacilityChange = (facilityValue: string | "") => {
    setSelectedFacility(facilityValue);
  };
  
  const handleVaccineStageSelection = (stage: string) => {
    setVaccineStagemsl(stage);
    setVaccineStageAtIssuemsl(stage);
    
  };

  const handleVaccineStageAtPickupSelection = (stage: string) => {
    setVaccineStagemsl(stage);
    setVaccineStageAtPickupmsl(stage);
    
  };

  


  // Handle location permission and fetch location
  const handleGetLocation = async () => {
    try {
      setLoadingLocation(true); // Set loading indicator
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location); // Set location state
      setLoadingLocation(false); // Clear loading indicator
    } catch (error) {
      console.error('Error getting location: ', error);
      setErrorMsg('Error getting location');
      setLoadingLocation(false); // Clear loading indicator in case of error
    }
};

const noLocation = () => {
  // Check if location is available
  if (!location || Object.keys(location).length === 0) {
      return true; // Location not available
  }
  return false; // Location available
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

const handleMSLSDateChange = (text: string) => {
  setExpiryDatemsl(text);
  setExpiryDatemsla(text);
  setExpiryDatemslb(text);
  const validityMessage: string = isValidDate(text); // Ensure validityMessage is typed as string
  setShowAlertMSLS(validityMessage !== 'valid' && text.trim().length > 0);
};

const handleDateChange = (text: string) => {
  setDiluentExpiryDatemsl(text);
  setDiluentExpiryDatemsla(text);
  setDiluentExpiryDatemslb(text);
  const validityMessage: string = isValidDate(text);
  setShowAlert(validityMessage !== 'valid' && text.trim().length > 0);
};

const handle5DateChange = (text: string) => {
  setSyringe5ExpiryDatemsl(text);
  setSyringe5ExpiryDatemsla(text);
  setSyringe5ExpiryDatemslb(text);
  const validityMessage: string = isValidDate(text);
  setShowAlert5(validityMessage !== 'valid' && text.trim().length > 0);
};

const handle2DateChange = (text: string) => {
  setSyringe2mlExpiryDatemsl(text);
  setSyringe2mlExpiryDatemsla(text);
  setSyringe2mlExpiryDatemslb(text);
  const validityMessage: string = isValidDate(text);
  setShowAlert2(validityMessage !== 'valid' && text.trim().length > 0);
};

const navigateForward = () => {
  navigation.navigate('BOPVScreen');
};

const navigateBackward = () => {
  navigation.navigate('HomeScreen');
};

  
useEffect(() => {

  if (measlesOpeningBalance && diluentOpeningBalancemsl) {
    const mslsOpening = parseInt(measlesOpeningBalance);
    const diluentOpening = parseInt(diluentOpeningBalancemsl);
    const diluentMismatchAdjustment = mslsOpening - diluentOpening;
    const mismatchAmpules = diluentMismatchAdjustment / 20;
    setDiluentMismatchInAmpules(mismatchAmpules.toString());
    setDiluentMismatch(diluentMismatchAdjustment.toString());
  } else {
    setDiluentMismatchInAmpules('');
    setDiluentMismatch('');
  }

  if (measlesOpeningBalance ) {
    const openingBalanceInAmples = (Number(measlesOpeningBalance))/20;
    setOpeningBalanceInAmples(openingBalanceInAmples.toString());
  } else {
    setOpeningBalanceInAmples('');
  }
  
  if (diluentOpeningBalancemsl ) {
    const diluentOpeningBalanceInAmples = (Number(diluentOpeningBalancemsl))/20;
    setDiluentOpeningBalanceInAmples(diluentOpeningBalanceInAmples.toString());
  } else {
    setDiluentOpeningBalanceInAmples('');
  }

  if (measlesOpeningBalance && syringeOpeningBalancemsl) {
      const syringe5MismatchAdjustment = parseInt(measlesOpeningBalance) - parseInt(syringeOpeningBalancemsl);
      setSyringe5mismatch(syringe5MismatchAdjustment.toString());
      }
  if (openingBalanceamsl && syringeOpeningBalanceamsl) {
      const syringe5MismatchAdjustmenta = parseInt(openingBalanceamsl) - parseInt(syringeOpeningBalanceamsl);
      setSyringe5mismatcha(syringe5MismatchAdjustmenta.toString());
      }
  if (openingBalancebmsl && syringeOpeningBalancebmsl) {
      const syringe5MismatchAdjustmentb = parseInt(openingBalancebmsl) - parseInt(syringeOpeningBalancebmsl);
      setSyringe5mismatchb(syringe5MismatchAdjustmentb.toString());
      }


      const mlsyringeOpeningBalanceInDoses = (20 * parseInt(mlsyringeOpeningBalancemsl))
      const mlsyringeOpeningBalanceInDosesa = (20 * parseInt(mlsyringeOpeningBalanceamsl))
      const mlsyringeOpeningBalanceInDosesb = (20 * parseInt(mlsyringeOpeningBalancebmsl))
//
  if (measlesOpeningBalance && mlsyringeOpeningBalancemsl && mlsyringeOpeningBalanceInDoses) {
      const syringe2MismatchAdjustment = parseInt(measlesOpeningBalance) - mlsyringeOpeningBalanceInDoses;
      const syringe2MismatchAdjustmentInPcs = syringe2MismatchAdjustment / 20;
      setSyringe2mismatch(syringe2MismatchAdjustmentInPcs.toString());
    }

  if (openingBalanceamsl && mlsyringeOpeningBalanceamsl && mlsyringeOpeningBalanceInDosesa) {
      const syringe2MismatchAdjustment = parseInt(openingBalanceamsl) - mlsyringeOpeningBalanceInDosesa;
      const syringe2MismatchAdjustmentInPcs = syringe2MismatchAdjustment / 20;
      setSyringe2mismatch(syringe2MismatchAdjustmentInPcs.toString());
    }
//
  if (openingBalancebmsl && mlsyringeOpeningBalancebmsl && mlsyringeOpeningBalanceInDosesb) {
      const syringe2MismatchAdjustment = parseInt(openingBalancebmsl) - mlsyringeOpeningBalanceInDoses;
      const syringe2MismatchAdjustmentInPcs = syringe2MismatchAdjustment / 20;
      setSyringe2mismatch(syringe2MismatchAdjustmentInPcs.toString());
    }
  


    if (measlesOpeningBalance && averageMonthlyRequirementmsl && multiplicationFactormsl) {
      const maximumStockCalc = parseFloat(multiplicationFactormsl) * parseInt(averageMonthlyRequirementmsl);
      setMaximumStockmsl(maximumStockCalc.toString());

  }



  if (openingBalanceamsl && averageMonthlyRequirementamsl && multiplicationFactoramsl) {
    const maximumStockCalc = parseFloat(multiplicationFactoramsl) * parseInt(averageMonthlyRequirementamsl);
    setMaximumStockamsl(maximumStockCalc.toString());
}


  if (openingBalancebmsl && averageMonthlyRequirementbmsl && multiplicationFactorbmsl) {
    const maximumStockCalc = parseFloat(multiplicationFactorbmsl) * parseInt(averageMonthlyRequirementbmsl);
    setMaximumStockbmsl(maximumStockCalc.toString());
}



  if (maximumStockmsl && measlesOpeningBalance) { 
    const quantityReqToMaxCalc = parseInt(maximumStockmsl) - (Number(measlesOpeningBalance));
    setDosesToIssueUpmsl(quantityReqToMaxCalc.toString());
  }
  if (maximumStockamsl && openingBalanceamsl) { 
    const quantityReqToMaxCalca = parseInt(maximumStockamsl) - (Number(openingBalanceamsl));
    setDosesToIssueUpmsla(quantityReqToMaxCalca.toString());
  }
  if (maximumStockbmsl && openingBalancebmsl) { 
    const quantityReqToMaxCalcb = parseInt(maximumStockbmsl) - (Number(openingBalancebmsl));
    setDosesToIssueUpmslb(quantityReqToMaxCalcb.toString());
  }

  if (syringeMaxStockQuantity && syringeOpeningBalancemsl) {
    const syringeToIssueUpCalc = parseInt(syringeMaxStockQuantity) - (Number(syringeOpeningBalancemsl));
    setSyringeToIssueUp(syringeToIssueUpCalc.toString());
    
  }
  if (mlsyringeMaxStockQuantity && mlsyringeOpeningBalancemsl) {
    const mlsyringeToIssueUpCalc = parseInt(mlsyringeMaxStockQuantity) - (Number(mlsyringeOpeningBalancemsl));
    setMlsyringeToIssueUp(mlsyringeToIssueUpCalc.toString());   
  }

  if (mlsyringeMaxStockQuantity && mlsyringeOpeningBalanceamsl) {
    const mlsyringeToIssueUpCalc = parseInt(mlsyringeMaxStockQuantity) - (Number(mlsyringeOpeningBalanceamsl));
    setMlsyringeToIssueUp(mlsyringeToIssueUpCalc.toString());   
  }
  if (mlsyringeMaxStockQuantity && mlsyringeOpeningBalancebmsl) {
    const mlsyringeToIssueUpCalc = parseInt(mlsyringeMaxStockQuantity) - (Number(mlsyringeOpeningBalancebmsl));
    setMlsyringeToIssueUp(mlsyringeToIssueUpCalc.toString());   
  }

  if (vaccineDosesIssuedmsl && measlesOpeningBalance) {
    const vaccineTotalCalc = parseInt(vaccineDosesIssuedmsl) + (Number(measlesOpeningBalance));
    const vaccineTotalInVialsCalc = vaccineTotalCalc / 20 ;
    setVaccineTotal(vaccineTotalCalc.toString()); 
    setVaccineTotalInVials(vaccineTotalInVialsCalc.toString()); 
  }
  if (vaccineDosesIssuedmsla && openingBalanceamsl) {
    const vaccineTotalCalc = parseInt(vaccineDosesIssuedmsla) + (Number(openingBalanceamsl));
    const vaccineTotalInVialsCalc = vaccineTotalCalc / 20 ;
    setVaccineTotal(vaccineTotalCalc.toString()); 
    setVaccineTotalInVials(vaccineTotalInVialsCalc.toString()); 
  }
  if (vaccineDosesIssuedmslb && openingBalancebmsl) {
    const vaccineTotalCalc = parseInt(vaccineDosesIssuedmslb) + (Number(openingBalancebmsl));
    const vaccineTotalInVialsCalc = vaccineTotalCalc / 20 ;
    setVaccineTotal(vaccineTotalCalc.toString()); 
    setVaccineTotalInVials(vaccineTotalInVialsCalc.toString()); 
  }

  if (diluentOpeningBalancemsl && diluentIssuedmsl) {
    const diluentTotalCalc = parseInt(diluentOpeningBalancemsl) + (Number(diluentIssuedmsl));
    const diluentTotalInAmplesCalc = diluentTotalCalc / 20;
    setDiluentTotal(diluentTotalCalc.toString()); 
    setDiluentTotalInAmples(diluentTotalInAmplesCalc.toString()); 

  }
  if (diluentOpeningBalancemsl && diluentIssuedmsla) {
    const diluentTotalCalc = parseInt(diluentOpeningBalancemsl) + (Number(diluentIssuedmsla));
    const diluentTotalInAmplesCalc = diluentTotalCalc / 20;
    setDiluentTotal(diluentTotalCalc.toString()); 
    setDiluentTotalInAmples(diluentTotalInAmplesCalc.toString()); 

  }
  if (diluentOpeningBalancemsl && diluentIssuedmslb) {
    const diluentTotalCalc = parseInt(diluentOpeningBalancemsl) + (Number(diluentIssuedmslb));
    const diluentTotalInAmplesCalc = diluentTotalCalc / 20;
    setDiluentTotal(diluentTotalCalc.toString()); 
    setDiluentTotalInAmples(diluentTotalInAmplesCalc.toString()); 

  }

  if (syringeOpeningBalancemsl && syringeQuantityIssuedmsl && vaccineTotal) {
    const ml5TotalCalc = parseInt(syringeOpeningBalancemsl) + (Number(syringeQuantityIssuedmsl));
    const ml5AvailableMismatchCalc = parseInt(vaccineTotal) - (ml5TotalCalc);
    setMl5AvailableMismatchmsl(ml5AvailableMismatchCalc.toString());
    setMl5Total(ml5TotalCalc.toString()); 
  }
  if (syringeOpeningBalanceamsl && syringeQuantityIssuedmsla && vaccineTotal) {
    const ml5TotalCalc = parseInt(syringeOpeningBalanceamsl) + (Number(syringeQuantityIssuedmsla));
    const ml5AvailableMismatchCalc = parseInt(vaccineTotal) - (ml5TotalCalc);
    setMl5AvailableMismatchamsl(ml5AvailableMismatchCalc.toString());
    setMl5Total(ml5TotalCalc.toString()); 
  }
  if (syringeOpeningBalancebmsl && syringeQuantityIssuedmslb && vaccineTotal) {
    const ml5TotalCalc = parseInt(syringeOpeningBalancebmsl) + (Number(syringeQuantityIssuedmslb));
    const ml5AvailableMismatchCalc = parseInt(vaccineTotal) - (ml5TotalCalc);
    setMl5AvailableMismatchbmsl(ml5AvailableMismatchCalc.toString());
    setMl5Total(ml5TotalCalc.toString()); 
  }

  if (mlsyringeOpeningBalancemsl && mlsyringeQuantityIssuedmsl && vaccineTotalInVials) {
    const ml2TotalCalc = parseInt(mlsyringeOpeningBalancemsl) + (Number(mlsyringeQuantityIssuedmsl));
    setMl2Total(ml2TotalCalc.toString()); 
  }
  if (mlsyringeOpeningBalanceamsl && mlsyringeQuantityIssuedmsla && vaccineTotalInVials) {
    const ml2TotalCalc = parseInt(mlsyringeOpeningBalanceamsl) + (Number(mlsyringeQuantityIssuedmsla));
    setMl2Total(ml2TotalCalc.toString()); 
  }
  if (mlsyringeOpeningBalancebmsl && mlsyringeQuantityIssuedmslb && vaccineTotalInVials) {
    const ml2TotalCalc = parseInt(mlsyringeOpeningBalancebmsl) + (Number(mlsyringeQuantityIssuedmslb));
    setMl2Total(ml2TotalCalc.toString()); 
  }

  if (vaccineTotal && syringeOpeningBalancemsl) {
    const vaccine5requiredToMatchMslsAvailCalc = parseInt(vaccineTotal) - (Number(syringeOpeningBalancemsl));
    setVaccine5requiredToMatchMslsAvail(vaccine5requiredToMatchMslsAvailCalc.toString()); 
  }
 
  if (diluentOpeningBalancemsl && diluentIssuedmsl ) {
    const totalMslsDiluentAvailableCalc =  (parseInt(diluentOpeningBalancemsl) + parseInt(diluentIssuedmsl));
    setTotalMslsDiluentAvailable(totalMslsDiluentAvailableCalc.toString());
  }
  if (diluentOpeningBalancemsl && diluentIssuedmsla ) {
    const totalMslsDiluentAvailableCalc =  (parseInt(diluentOpeningBalancemsl) + parseInt(diluentIssuedmsla));
    setTotalMslsDiluentAvailable(totalMslsDiluentAvailableCalc.toString());
  }
  if (diluentOpeningBalancemsl && diluentIssuedmslb ) {
    const totalMslsDiluentAvailableCalc =  (parseInt(diluentOpeningBalancemsl) + parseInt(diluentIssuedmslb));
    setTotalMslsDiluentAvailable(totalMslsDiluentAvailableCalc.toString());
  }
  
  if (diluentOpeningBalancemsl && vaccineTotal && diluentIssuedmsl && totalMslsDiluentAvailable) {
    const dilAvailableMismatchCalc = parseInt(vaccineTotal) - (parseInt(totalMslsDiluentAvailable));
    const dilAvailableMismatchInVialsCalc = dilAvailableMismatchCalc / 20 ;
    setDilAvailableMismatch(dilAvailableMismatchCalc.toString());
    setDilAvailableMismatchInVials(dilAvailableMismatchInVialsCalc.toString());
  }
  if (diluentOpeningBalancemsl && vaccineTotal && diluentIssuedmsla && totalMslsDiluentAvailable) {
    const dilAvailableMismatchCalc = parseInt(vaccineTotal) - (parseInt(totalMslsDiluentAvailable));
    const dilAvailableMismatchInVialsCalc = dilAvailableMismatchCalc / 20 ;
    setDilAvailableMismatch(dilAvailableMismatchCalc.toString());
    setDilAvailableMismatchInVials(dilAvailableMismatchInVialsCalc.toString());
  }
  if (diluentOpeningBalancemsl && vaccineTotal && diluentIssuedmslb && totalMslsDiluentAvailable) {
    const dilAvailableMismatchCalc = parseInt(vaccineTotal) - (parseInt(totalMslsDiluentAvailable));
    const dilAvailableMismatchInVialsCalc = dilAvailableMismatchCalc / 20 ;
    setDilAvailableMismatch(dilAvailableMismatchCalc.toString());
    setDilAvailableMismatchInVials(dilAvailableMismatchInVialsCalc.toString());
  }
  

  if (diluentOpeningBalancemsl && diluentIssuedmsl ) {
    const totalMslsDiluentAvailableCalc =  (parseInt(diluentOpeningBalancemsl) + parseInt(diluentIssuedmsl));
    setTotalMslsDiluentAvailable(totalMslsDiluentAvailableCalc.toString());
  }
  if (diluentOpeningBalancemsl && diluentIssuedmsla ) {
    const totalMslsDiluentAvailableCalc =  (parseInt(diluentOpeningBalancemsl) + parseInt(diluentIssuedmsla));
    setTotalMslsDiluentAvailable(totalMslsDiluentAvailableCalc.toString());
  }
  if (diluentOpeningBalancemsl && diluentIssuedmslb ) {
    const totalMslsDiluentAvailableCalc =  (parseInt(diluentOpeningBalancemsl) + parseInt(diluentIssuedmslb));
    setTotalMslsDiluentAvailable(totalMslsDiluentAvailableCalc.toString());
  }


  if (vaccineTotal && diluentOpeningBalancemsl) {
    const DiluentRequiredForTotalAvailablCalc = parseInt(vaccineTotal) - (Number(diluentOpeningBalancemsl));
    const DiluentRequiredForTotalAvailablInVilesCalc = DiluentRequiredForTotalAvailablCalc / 20;
    setDiluentRequiredForTotalAvailable(DiluentRequiredForTotalAvailablCalc.toString());
    setDiluentRequiredForTotalAvailableInViles(DiluentRequiredForTotalAvailablInVilesCalc.toString());
  }

  if (vaccineTotal && diluentOpeningBalancemsl) {
    const DiluentVaccineTotalCalc = parseInt(vaccineTotal) - (Number(diluentOpeningBalancemsl));
    setDiluentVaccineTotal(DiluentVaccineTotalCalc.toString());
  }
  

  if (vaccineTotal && mlsyringeOpeningBalancemsl && vaccineTotalInVials ) {
    const MlsyringeReqCalc = parseInt(vaccineTotal) / 20;
    const mlsyringeReqFinalCalc = parseInt(vaccineTotalInVials) - (Number(mlsyringeOpeningBalancemsl));
    setMlsyringeReqFinalCalc(mlsyringeReqFinalCalc.toString()); 
  }
  if (vaccineTotal && mlsyringeOpeningBalanceamsl && vaccineTotalInVials ) {
    const MlsyringeReqCalc = parseInt(vaccineTotal) / 20;
    const mlsyringeReqFinalCalc = parseInt(vaccineTotalInVials) - (Number(mlsyringeOpeningBalanceamsl));
    setMlsyringeReqFinalCalc(mlsyringeReqFinalCalc.toString()); 
  }
  if (vaccineTotal && mlsyringeOpeningBalancebmsl && vaccineTotalInVials ) {
    const MlsyringeReqCalc = parseInt(vaccineTotal) / 20;
    const mlsyringeReqFinalCalc = parseInt(vaccineTotalInVials) - (Number(mlsyringeOpeningBalancebmsl));
    setMlsyringeReqFinalCalc(mlsyringeReqFinalCalc.toString()); 
  }

  
  if ( vaccineTotalInVials && ml2Total ) {
    const ml2AvailableMismatchCalc = (Number(vaccineTotalInVials)) - (Number(ml2Total));
    setMl2AvailableMismatch(ml2AvailableMismatchCalc.toString());
  }
}, [measlesOpeningBalance, openingBalanceamsl, openingBalancebmsl, diluentOpeningBalancemsl, syringeOpeningBalancemsl, mlsyringeMaxStockQuantity, 
mlsyringeOpeningBalancemsl, mlsyringeOpeningBalanceamsl, mlsyringeOpeningBalancebmsl, averageMonthlyRequirementmsl,  averageMonthlyRequirementamsl,
averageMonthlyRequirementbmsl,  maximumStockmsl, maximumStockamsl, maximumStockbmsl, 
syringeMaxStockQuantity, syringeOpeningBalancemsl,     vaccineDosesIssuedmsl, vaccineDosesIssuedmsla, vaccineDosesIssuedmslb, vaccineTotal, 
diluentOpeningBalancemsl, multiplicationFactormsl, multiplicationFactoramsl, multiplicationFactorbmsl, dilAvailableMismatch, diluentIssuedmsl, diluentIssuedmsla, diluentIssuedmslb, 
diluentTotal, diluentTotalInAmples, syringe5mismatch, syringe5mismatcha, syringe5mismatchb, syringeQuantityIssuedmsl, syringeQuantityIssuedmsla, 
syringeQuantityIssuedmslb, mlsyringeQuantityIssuedmsl, mlsyringeQuantityIssuedmsla, mlsyringeQuantityIssuedmslb, vaccineTotalInVials, ml2Total
]);

const handleOpenForm = () => {
  setShowSupervisorForm(true);
};

const handleOpeningBalanceChange = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
  if (value === '' || (parseInt(value) % 20 === 0)) {
    setter(value);
  }
};


  const handleSubmit = async () => {
    try {
      // Fetch the current user login details (you need to implement this part)
      const currentUser = getCurrentUser(); // Example function, replace with your actual implementation
  
      // Handle permissions and get the current location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
       
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location); 

      if (!location || Object.keys(location).length === 0) {
        Alert.alert('Error', 'Please click on the button at the top to send your current location.');
        return;
      }
  
      setSubmitted(true);

        if (!noLocation() && !loadingLocation) {
        
        // Create data object including user login details and location
        const data = {
            selectedManufacturerMeasles,
            selectedManufacturerMeaslesa,
            selectedManufacturerMeaslesb,
            vaccineTempAtIssuesmsl,
            vaccineTempAtIssuesamsl,
            vaccineTempAtIssuesbmsl,
            vaccineStageAtIssuemsl,
            vaccineStageAtPickupmsl,
            vaccineTempAtPickupmsl,
            vaccineTempAtPickupamsl,
            vaccineTempAtPickupbmsl,
            measlesOpeningBalance,
            openingBalanceamsl,
            openingBalancebmsl,
            diluentOpeningBalancemsl,
            diluentOpeningBalanceamsl,
            diluentOpeningBalancebmsl,
            syringeOpeningBalancemsl,
            syringeOpeningBalanceamsl,
            syringeOpeningBalancebmsl,
            mlsyringeOpeningBalancemsl,
            mlsyringeOpeningBalanceamsl,
            mlsyringeOpeningBalancebmsl,
            ml5AvailableMismatchmsl,
            ml5AvailableMismatchamsl,
            ml5AvailableMismatchbmsl,
            mlsyringemismatchmsl,
            mlsyringemismatchamsl,
            mlsyringemismatchbmsl,
            averageMonthlyRequirementmsl,
            averageMonthlyRequirementamsl,
            averageMonthlyRequirementbmsl,
            maximumStockmsl,
            maximumStockamsl,
            maximumStockbmsl,
            dosesToIssueUpmsl,
            dosesToIssueUpmsla,
            dosesToIssueUpmslb,
            vaccineDosesIssuedmsl,
            vaccineDosesIssuedmsla,
            vaccineDosesIssuedmslb,
            diluentIssuedmsl,
            diluentIssuedmsla,
            diluentIssuedmslb,
            syringeQuantityIssuedmsl,
            syringeQuantityIssuedmsla,
            syringeQuantityIssuedmslb,
            mlsyringeQuantityIssuedmsl,
            mlsyringeQuantityIssuedmsla,
            mlsyringeQuantityIssuedmslb,
            batchNumbermsl,
            batchNumbermsla,
            batchNumbermslb,
            diluentBatchNumbermsl,
            diluentBatchNumbermsla,
            diluentBatchNumbermslb,
            syringe5BatchNumbermsl,
            syringe5BatchNumbermsla,
            syringe5BatchNumbermslb,     
            syringe2mlBatchNumbermsl,
            syringe2mlBatchNumbermsla,
            syringe2mlBatchNumbermslb,
            expiryDatemsl, expiryDatemsla, expiryDatemslb, 
            diluentExpiryDatemsl, diluentExpiryDatemsla, diluentExpiryDatemslb, 
            syringe5ExpiryDatemsla, syringe5ExpiryDatemsl, syringe5ExpiryDatemslb,
            syringe2mlExpiryDatemsl, syringe2mlExpiryDatemsla, syringe2mlExpiryDatemslb, 
            howLongmsl, howLongmsla, howLongmslb,
            howLongsmsl, howLongsmsla, howLongsmslb,
            showHowLongsmsl, showHowLongsmsla, showHowLongsmslb,
            showHowLongmsl, showHowLongmsla, showHowLongmslb,
            generateFields,
            generateFieldsCount,
            submitted,
            
        };
        // Write form data to Firestore
        const docRef = await addDoc(collection(db, 'Tracking-Form'), data);
        console.log('Document written with ID: ', docRef.id);

        // Add a new document in collection "cities"
       
        const cityRef = doc(db, 'Tracking-Form', 'LA');
        await setDoc(cityRef, data, { merge: true });

      
      }
      setLocationSent(true);
      setShowSupervisorForm(true);

        // Optionally, you can perform additional operations here after successful data write.
  } catch (error) {
        console.error('Error adding document: ', error);
        // Handle error: Display an error message to the user or perform any necessary actions
        // For example:
        Alert.alert('Error', 'Failed to submit the form. Please try again later.');
      }
};

// Function to get the current user
const getCurrentUser = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
      // User is signed in.
      return {
          uid: user.uid,
          email: user.email,
          // Add any other user details you want to include
      };
  } else {
      // No user is signed in.
      return null;
  }
};

  // Initialize Realtime Database and get a reference to the service
  
  
  const navigation = useNavigation();

  const handleTempSelection = (temp: string) => {
     // Set vaccineTemp state
    setVaccineTempAtIssuesmsl(temp);
    setVaccineTempAtIssuesamsl(temp);
    setVaccineTempAtIssuesbmsl(temp);
    setShowHowLongmsl(temp === 'Below 2°C' || temp === 'Above 8°C');
    setShowHowLongmsla(temp === 'Below 2°C' || temp === 'Above 8°C');
    setShowHowLongmslb(temp === 'Below 2°C' || temp === 'Above 8°C');
  };

  

  const handleTempSelections = (temp: string) => {
    console.log(typeof temp);
    
    setVaccineTempAtPickupmsl(temp) // Set vaccineTempAtIssue state
    setVaccineTempAtPickupamsl(temp)
    setVaccineTempAtPickupbmsl(temp)
    setShowHowLongsmsl(temp === 'Below 2°C' || temp === 'Above 8°C');
    setShowHowLongsmsla(temp === 'Below 2°C' || temp === 'Above 8°C');
    setShowHowLongsmslb(temp === 'Below 2°C' || temp === 'Above 8°C');
  };

  
  

  const handleNavigation = () => {
    // Navigate to the other page
    navigation.navigate('MyComponent'); 
};
useEffect(() => {
  // Check for location permissions when component mounts
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }
  })();
}, []);

let text = 'Waiting..';
if (errorMsg) {
  text = errorMsg;
} else if (loadingLocation) {
  text = 'Fetching Location...';
} else if (location) {
  text = JSON.stringify(location);
}



  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.formContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome!</ThemedText>
          <HelloWave />
          
        </ThemedView>

        <ThemedText style={styles.header}>MEASLES VACCINE LOGISTICS DATA</ThemedText>

<Picker
  selectedValue={selectedManufacturerMeasles || ''}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedManufacturerMeasles(itemValue)
  }
  style={styles.pickerContainer}
  itemStyle={styles.pickerItem}
>
  <Picker.Item label="Select Manufacturer" value={null} /> {/* Default value for null */}
  {manufacturers.map((manufacturer, index) => (
    <Picker.Item key={index} label={manufacturer} value={manufacturer} />
  ))}
</Picker>

<View>
<Text style={styles.label}>MEASLES VACCINE BATCH NUMBER</Text>
<TextInput
      style={styles.input}
      placeholder="Enter MEASLES Vaccine batch number"
      value={batchNumbermsl}
      onChangeText={setBatchNumbermsl}
      
    />
</View>


<View>
  <Text style={styles.label}>MEASLES VACCINE EXPIRY DATE [MM/DD/YYYY]</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter MEASLES Vaccine expiring date. Format: MM/DD/YYYY"
    value={expiryDatemsl}
    onChangeText={handleMSLSDateChange}
  />
  {showAlertMSLS && (
    <View style={[styles.alert, isDateValid ? styles.alertValid : null]}>
      <Text style={styles.alertText}>{isValidDate(expiryDatemsl)}</Text>
    </View>
  )}
</View>


<View>
<Text style={styles.label}>MEASLES DILUENT BATCH NUMBER</Text>
<TextInput
      style={styles.input}
      placeholder="Enter MEASLES Diluent batch number"
      value={diluentBatchNumbermsl}
      onChangeText={setDiluentBatchNumbermsl}
    />
</View>


<View>
  <Text style={styles.label}>MEASLES DILUENT EXPIRY DATE [MM/DD/YYYY]</Text>
  <TextInput
    style={styles.input}
    placeholder="MEASLES Diluent expiring date. Format: MM/DD/YYYY"
    value={diluentExpiryDatemsl}
    onChangeText={handleDateChange}
  />
  {showAlert && (
    <View style={[styles.alert, isDateValid ? styles.alertValid : null]}>
      <Text style={styles.alertText}>{isValidDate(diluentExpiryDatemsl)}</Text>
    </View>
  )}
</View>



<View>
<Text style={styles.label}>MEASLES 0.05ML SYRINGE BATCH NUMBER</Text>
<TextInput
      style={styles.input}
      placeholder="Enter MEASLES Syringe 0.05ml batch number"
      value={syringe5BatchNumbermsl} 
      onChangeText={setSyringe5BatchNumbermsl}
    />
</View>


<View>
  <Text style={styles.label}>MEASLES 0.05ML SYRINGE EXPIRY DATE [MM/DD/YYYY]</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter MEASLES Syringe 0.05ml expiring date. Format: MM/DD/YYYY"
    value={syringe5ExpiryDatemsl}
    onChangeText={handle5DateChange}
  />
  {showAlert5 && (
    <View style={[styles.alert, isDateValid ? styles.alertValid : null]}>
      <Text style={styles.alertText}>{isValidDate(syringe5ExpiryDatemsl)}</Text>
    </View>
  )}
</View>


<View>
<Text style={styles.label}>MEASLES 2ML SYRINGE BATCH NUMBER</Text>
<TextInput
      style={styles.input}
      placeholder="Enter MEASLES 2ml Syringe batch number"
      value={syringe2mlBatchNumbermsl}
      onChangeText={setSyringe2mlBatchNumbermsl}
    />
</View>


<View>
  <Text style={styles.label}>MEASLES 2ML SYRINGE EXPIRY DATE [MM/DD/YYYY]</Text>
  <TextInput
    style={styles.input}
    placeholder="MEASLES Syringe 2ml expiring date. Format: MM/DD/YYYY"
    value={syringe2mlExpiryDatemsl}
    onChangeText={handle2DateChange}
  />
  {showAlert2 && (
    <View style={[styles.alert, isDateValid ? styles.alertValid : null]}>
      <Text style={styles.alertText}>{isValidDate(syringe2mlExpiryDatemsl)}</Text>
    </View>
  )}
</View>


<View style={styles.questionaireContainer}>
  <ThemedText style={styles.subHeading}>MEASLES VACCINE TEMP AT PICK-UP</ThemedText>
  <View style={styles.ageGradeContainer}>
    <TouchableOpacity onPress={() => handleTempSelections('Below 2°C')} style={vaccineTempAtPickupmsl === 'Below 2°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}>
      <ThemedText style={styles.ageGradeOptionText}>Below 2°C</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleTempSelections('Between 2°C - 8°C')} style={vaccineTempAtPickupmsl === 'Between 2°C - 8°C' ? styles.selectedAgeGradess : styles.ageGradeOptions}>
      <ThemedText style={styles.ageGradeOptionText}>Between 2°C - 8°C</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleTempSelections('Above 8°C')} style={vaccineTempAtPickupmsl === 'Above 8°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}>
      <ThemedText style={styles.ageGradeOptionText}>Above 8°C</ThemedText>
    </TouchableOpacity>
  </View>
</View>

{showHowLongsmsl && (
<View style={styles.questionaireContainer}>
<ThemedText style={styles.subHeading}>HOW LONG HAD IT BEEN AT THIS TEMPERATURE?</ThemedText>
<Picker
selectedValue={howLongsmsl}
onValueChange={(itemValue) => setHowLongsmsl(itemValue)}
style={styles.pickerContainer}
>
<Picker.Item label="Less than 1 hrs" value="Less than 1 hrs" />
<Picker.Item label="1hrs to 2 hrs" value="1hrs to 2 hrs" />
<Picker.Item label="above 2 hrs" value="above 2 hrs" />
</Picker>
</View>
)}




<View  style={styles.questionaireContainer}>
  <ThemedText style={styles.subHeading}>MEASLES VACCINE VVM STAGE AT PICKUP </ThemedText>
  <View style={styles.ageGradeContainer}>
    <TouchableOpacity onPress={() => setVaccineStageAtPickupmsl('Stage 1')} style={vaccineStageAtPickupmsl === 'Stage 1' ? styles.selectedAgeGradeStage1 : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>VVM Stage 1</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setVaccineStageAtPickupmsl('Stage 2')} style={vaccineStageAtPickupmsl === 'Stage 2' ? styles.selectedAgeGradeStage2 : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>VVM Stage 2</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setVaccineStageAtPickupmsl('Stage 3')} style={vaccineStageAtPickupmsl === 'Stage 3' ? styles.selectedAgeGradeStage3 : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>VVM Stage 3</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setVaccineStageAtPickupmsl('Stage 4')} style={vaccineStageAtPickupmsl === 'Stage 4' ? styles.selectedAgeGradeStage4 : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>VVM Stage 4</ThemedText>
    </TouchableOpacity>
  </View>
</View>


<View>
<Text style={styles.label}>MEASLES VACCINE OPENING BALANCE (PLEASE ENTER ONLY MULTIPLES OF 20)</Text>
<TextInput
      style={styles.input}
      placeholder="Enter MEASLES Vaccine opening balance"
      value={measlesOpeningBalance}
      onChangeText={setMeaslesOpeningBalance}
    />
</View>

<View  style={styles.calc}>
  <ThemedText style={styles.subHeading}>MEASLES VACCINE OPENING BALANCE IN AMPOULES :</ThemedText>
  {measlesOpeningBalance && (
   
      <ThemedText style={styles.mismatch}>
        {openingBalanceInAmples} 
      </ThemedText>
  )}
</View>

<View>
<Text style={styles.label}>MEASLES DILUENT OPENING BALANCE (PLEASE ENTER ONLY MULTIPLES OF 20)</Text>
<TextInput
      style={styles.input}
      placeholder="Enter MEASLES Diluent opening balance"
      value={diluentOpeningBalancemsl}
      onChangeText={setDiluentOpeningBalancemsl}
    />
</View>

<View  style={styles.calc}>
  <ThemedText style={styles.subHeading}>MEASLES DILUENT OPENING BALANCE IN AMPOULES :</ThemedText>
  {diluentOpeningBalancemsl && (
   
      <ThemedText style={styles.mismatch}>
        {diluentOpeningBalanceInAmples} 
      </ThemedText>
  )}
</View>
 

<View  style={styles.calc}>
  <ThemedText style={styles.subHeading}>MEASLES DILUENT MISMATCH :</ThemedText>
  {diluentMismatch && (
    <>
      <ThemedText style={styles.mismatch}>
        {diluentMismatch} 
      </ThemedText>
      <ThemedText>
        DILUENT MISMATCH IN AMPOULES:
      </ThemedText>
      <ThemedText style={styles.mismatch}>            
        {diluentMismatchInAmpules}
      </ThemedText>
    </>
  )}
</View>


<View>
<Text style={styles.label}>MEASLES 0.05ML SYRINGE OPENING BALANCE (PLEASE ENTER ONLY MULTIPLES OF 20)</Text> 
<TextInput
      style={styles.input}
      placeholder="Enter MEASLES 0.05ml syringe opening balance"
      value={syringeOpeningBalancemsl}
      onChangeText={setSyringeOpeningBalancemsl}
    />
</View>

<View  style={styles.calc}>
  <ThemedText style={styles.subHeading}>MEASLES SYRINGE 0.05ML MISMATCH :</ThemedText>
  {syringe5mismatch && (
    
    <ThemedText style={styles.mismatch}>
      {syringe5mismatch} 
    </ThemedText>
   
    
  )}
</View>

<View>
<Text style={styles.label}>MEASLES 2ML SYRINGE OPENING BALANCE </Text> 
<TextInput
      style={styles.input}
      placeholder="Enter MEASLES 2ml syringe opening balance"
      value={mlsyringeOpeningBalancemsl}
      onChangeText={setMlsyringeOpeningBalancemsl}
    />
</View>

<View  style={styles.calc}>
<ThemedText style={styles.subHeading}>MEASLES SYRINGE 2ML MISMATCH :</ThemedText>
  {syringe2mismatch && (
      <ThemedText style={styles.mismatch}>
        {syringe2mismatch} pcs
      </ThemedText>            
  )}
</View> 

<View>
<Text style={styles.label}>MEASLES VACCINE AVERAGE MONTHLY REQUIREMENT  (AMR) (PLEASE ENTER ONLY MULTIPLES OF 20)</Text> 
<TextInput
    style={styles.input}
    placeholder="Enter MEASLES Vaccine average monthly requirement"
    value={averageMonthlyRequirementmsl}
    onChangeText={setAverageMonthlyRequirementmsl}
  /> 
</View>

<ThemedText style={styles.subHeading}>MMSQ MULTIPLICATION FACTOR:</ThemedText>
  <TextInput
    style={styles.input}
    placeholder="MMSQ MULTIPLICATION FACTOR"
    value={multiplicationFactormsl}
    onChangeText={setMultiplicationFactormsl}
    keyboardType="numeric" // Ensure numeric keyboard for multiplication factor input
  /> 


  <View style={styles.calc}>

    
  <ThemedText style={styles.subHeading}>MEASLES VACCINE MONTHLY MAXIMUM STOCK QUANTITY:</ThemedText>
  
  
  {maximumStockmsl && (
    <ThemedText style={styles.mismatch}>
      {maximumStockmsl} doses
    </ThemedText>
  )}
</View>


<View style={styles.calc}>
  <ThemedText style={styles.subHeading}>
    MEASLES VACCINE DOSES REQUIRED TO MAKE UP TO MAXIMUM STOCK:
  </ThemedText>
  {dosesToIssueUpmsl && (
    <ThemedText style={styles.mismatch}>
      {dosesToIssueUpmsl} doses
    </ThemedText>
  )}
</View> 
  


<View>
<Text style={styles.label}>ACTUAL MEASLES VACCINE DOSES ISSUED (PLEASE ENTER ONLY MULTIPLES OF 20)</Text> 
<TextInput
  style={styles.input}
  placeholder="MEASLES vaccine doses issued "
  value={vaccineDosesIssuedmsl}
  onChangeText={setVaccineDosesIssuedmsl}
/> 
</View>

<View style={styles.calc}>
  <ThemedText style={styles.subHeading}>
  Total MEASLES vaccine available:
  </ThemedText>
  {vaccineTotal && (
    <ThemedText style={styles.mismatch}>
      {vaccineTotal} doses or {vaccineTotalInVials} vials
    </ThemedText>
  )}
</View>



<View style={styles.calc}>
  <ThemedText style={styles.subHeading}>
 QUANTITY (DOSES) OF DILUENT REQUIRED TO MATCH TOTAL AVAILABLE MEASLES VACCINE (FACTORING IN OPENING BALANCE):
 </ThemedText>
</View>
<ThemedText>
  {vaccineTotal && (
    <ThemedText style={styles.mismatch}>
      {diluentRequiredForTotalAvailable} doses or  {DiluentRequiredForTotalAvailableInViles} vials/ampoules
    </ThemedText>
  )}
</ThemedText>

<View>
<Text style={styles.label}>ACTUAL QUANTITY (DOSES) OF MEASLES DILUENT ISSUED (PLEASE ENTER ONLY MULTIPLES OF 20)</Text> 
<TextInput
  style={styles.input}
  placeholder="MEASLES diluent issued "
  value={diluentIssuedmsl}
  onChangeText={setDiluentIssuedmsl}
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
  QUANTITY OF 0.05ML SYRINGE REQUIRED TO MATCH TOTAL MEASLES VACCINE AVAILABLE (FACTORING IN OPENING BALANCE):
  </ThemedText>
  {vaccineTotal && (
    <ThemedText style={styles.mismatch}>
      {vaccine5requiredToMatchMslsAvail} pcs
    </ThemedText>
  )}
</View>

<View>
<Text style={styles.label}>ACTUAL MEASLES 0.05ML SYRINGE QUANTITY ISSUED (PLEASE ENTER ONLY MULTIPLES OF 20)</Text> 
<TextInput
  style={styles.input}
  placeholder="MEASLES 0.05ml syringe Quantity Issued "
  value={syringeQuantityIssuedmsl}
  onChangeText={setSyringeQuantityIssuedmsl}
/>
</View>
<View style={styles.calc}>
  <ThemedText style={styles.subHeading}>
  Total 0.05ml syringe available:
  </ThemedText>
  {syringeOpeningBalancemsl && syringeQuantityIssuedmsl && (
    <ThemedText style={styles.mismatch}>
      {ml5Total} pcs
    </ThemedText>
  )}
</View>


<View style={styles.calc}>
  <ThemedText style={styles.subHeading}>
  0.05ML SYRINGE AVAILABLE MISMATCH:          
  </ThemedText>
  {ml5AvailableMismatchmsl && (
    <ThemedText style={styles.mismatch}>
      {ml5AvailableMismatchmsl} pcs 
    </ThemedText>
  )}
</View>

<View style={styles.calc}>
  <ThemedText style={styles.subHeading}>
  QUANTITY OF 2ML SYRINGE REQUIRED TO MATCH TOTAL MEASLES VACCINE AVAILABLE (FACTORING IN OPENING BALANCE):
  </ThemedText>
  {vaccineTotal && (
    <ThemedText style={styles.mismatch}>
      {mlsyringeReqFinalCalc} pcs
    </ThemedText>
  )}
</View>


<View>
<Text style={styles.label}>ACTUAL MEASLES 2ML SYRINGE QUANTITY ISSUED </Text> 
<TextInput
    style={styles.input}
    placeholder="MEASLES 2ml syringe Quantity Issued "
    value={mlsyringeQuantityIssuedmsl}
    onChangeText={setMlsyringeQuantityIssuedmsl}
  />
</View>

<View style={styles.calc}>
  <ThemedText style={styles.subHeading}>
  Total 2ml syringe available:
  </ThemedText>
  {mlsyringeOpeningBalancemsl && mlsyringeQuantityIssuedmsl && (
    <ThemedText style={styles.mismatch}>
      {ml2Total} pcs 
    </ThemedText>
  )}
</View>


<View style={styles.calc}>
  <ThemedText style={styles.subHeading}>
  2ML SYRINGE AVAILABLE MISMATCH:          
  </ThemedText>
  {   ml2Total && (
    <ThemedText style={styles.mismatch}>
      {ml2AvailableMismatch} pcs
    </ThemedText>
  )}
</View>


<View style={styles.questionaireContainer}>
  <ThemedText style={styles.subHeading}>MEASLES VACCINE TEMP AT ISSUE</ThemedText>
  <View style={styles.ageGradeContainer}>
    <TouchableOpacity onPress={() => handleTempSelection('Below 2°C')} style={vaccineTempAtIssuesmsl === 'Below 2°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}>
      <ThemedText style={styles.ageGradeOptionText}>Below 2°C</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleTempSelection('Between 2°C - 8°C')} style={vaccineTempAtIssuesmsl === 'Between 2°C - 8°C' ? styles.selectedAgeGradess : styles.ageGradeOptions}>
      <ThemedText style={styles.ageGradeOptionText}>Between 2°C - 8°C</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleTempSelection('Above 8°C')} style={vaccineTempAtIssuesmsl === 'Above 8°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}>
      <ThemedText style={styles.ageGradeOptionText}>Above 8°C</ThemedText>
    </TouchableOpacity>
  </View>
</View>

{/* How Long Dropdown */}
{showHowLongmsl && (
  <View style={styles.questionaireContainer}>
    <ThemedText style={styles.subHeading}>HOW LONG HAD IT BEEN AT THIS TEMPERATURE?</ThemedText>
    <Picker
      selectedValue={howLongmsl}
      onValueChange={(itemValue) => setHowLongmsl(itemValue)}
      style={styles.pickerContainer}
    >
      <Picker.Item label="Less than 1 hrs" value="Less than 1 hrs" />
      <Picker.Item label="1hrs to 2 hrs" value="1hrs to 2 hrs" />
      <Picker.Item label="above 2 hrs" value="above 2 hrs" />
    </Picker>
  </View>
)}

<View  style={styles.questionaireContainer}>
 
<ThemedText style={styles.subHeading}>MEASLES VACCINE VVM STAGE AT ISSUE</ThemedText>
  <View style={styles.ageGradeContainer}>
    <TouchableOpacity onPress={() => setVaccineStageAtIssuemsl('Stage 1')} style={vaccineStageAtIssuemsl === 'Stage 1' ? styles.selectedAgeGradeStage1 : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}> VVM Stage 1</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setVaccineStageAtIssuemsl('Stage 2')} style={vaccineStageAtIssuemsl === 'Stage 2' ? styles.selectedAgeGradeStage2 : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>VVM Stage 2</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setVaccineStageAtIssuemsl('Stage 3')} style={vaccineStageAtIssuemsl === 'Stage 3' ? styles.selectedAgeGradeStage3 : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>VVM Stage 3</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setVaccineStageAtIssuemsl('Stage 4')} style={vaccineStageAtIssuemsl === 'Stage 4' ? styles.selectedAgeGradeStage4 : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>VVM Stage 4</ThemedText>
    </TouchableOpacity>

</View>
</View>


<TouchableOpacity onPress={handleGenerateFields} style={styles.buttonfill}>
<Text style={styles.buttonText}>
  Fill another MEASLES Logistics form for a different manufacturer
</Text>
</TouchableOpacity>

{/* Fields to be generated */}
{generateFields && (
  
  <>
    
    <Text style={styles.header}>
      MEASLES LOGISTICS DATA
      <TouchableOpacity onPress={() => setGenerateFields(false)} style={styles.closeButton}>
      <MaterialIcons name="close" size={24} color="black" />
    </TouchableOpacity>S
      
    </Text>
    

    <Picker
  selectedValue={selectedManufacturerMeaslesa || ''}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedManufacturerMeaslesa(itemValue)
  }
  style={styles.pickerContainer}
  itemStyle={styles.pickerItem}
>
  <Picker.Item label="Select Manufacturer" value={null} /> {/* Default value for null */}
  {manufacturers.map((manufacturer, index) => (
    <Picker.Item key={index} label={manufacturer} value={manufacturer} />
  ))}
</Picker>

<View>
<Text style={styles.label}>MEASLES VACCINE BATCH NUMBER</Text>
<TextInput
      style={styles.input}
      placeholder="Enter MEASLES Vaccine batch number"
      value={batchNumbermsla}
      onChangeText={setBatchNumbermsla}
      
    />
</View>


<View>
  <Text style={styles.label}>MEASLES VACCINE EXPIRY DATE [MM/DD/YYYY]</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter MEASLES Vaccine expiring date. Format: MM/DD/YYYY"
    value={expiryDatemsla}
    onChangeText={handleMSLSDateChange}
  />
  {showAlertMSLS && (
    <View style={[styles.alert, isDateValid ? styles.alertValid : null]}>
      <Text style={styles.alertText}>{isValidDate(expiryDatemsla)}</Text>
    </View>
  )}
</View>


<View>
<Text style={styles.label}>MEASLES DILUENT BATCH NUMBER</Text>
<TextInput
      style={styles.input}
      placeholder="Enter MEASLES Diluent batch number"
      value={diluentBatchNumbermsla}
      onChangeText={setDiluentBatchNumbermsla}
    />
</View>


<View>
  <Text style={styles.label}>MEASLES DILUENT EXPIRY DATE [MM/DD/YYYY]</Text>
  <TextInput
    style={styles.input}
    placeholder="MEASLES Diluent expiring date. Format: MM/DD/YYYY"
    value={diluentExpiryDatemsla}
    onChangeText={handleDateChange}
  />
  {showAlert && (
    <View style={[styles.alert, isDateValid ? styles.alertValid : null]}>
      <Text style={styles.alertText}>{isValidDate(diluentExpiryDatemsla)}</Text>
    </View>
  )}
</View>



<View>
<Text style={styles.label}>MEASLES 0.05ML SYRINGE BATCH NUMBER</Text>
<TextInput
      style={styles.input}
      placeholder="Enter MEASLES Syringe 0.05ml batch number"
      value={syringe5BatchNumbermsla}
      onChangeText={setSyringe5BatchNumbermsla}
    />
</View>


<View>
  <Text style={styles.label}>MEASLES 0.05ML SYRINGE EXPIRY DATE [MM/DD/YYYY]</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter MEASLES Syringe 0.05ml expiring date. Format: MM/DD/YYYY"
    value={syringe5ExpiryDatemsla}
    onChangeText={handle5DateChange}
  />
  {showAlert5 && (
    <View style={[styles.alert, isDateValid ? styles.alertValid : null]}>
      <Text style={styles.alertText}>{isValidDate(syringe5ExpiryDatemsla)}</Text>
    </View>
  )}
</View>


<View>
<Text style={styles.label}>MEASLES 2ML SYRINGE BATCH NUMBER</Text>
<TextInput
      style={styles.input}
      placeholder="Enter MEASLES 2ml Syringe batch number"
      value={syringe2mlBatchNumbermsla}
      onChangeText={setSyringe2mlBatchNumbermsla}
    />
</View>


<View>
  <Text style={styles.label}>MEASLES 2ML SYRINGE EXPIRY DATE [MM/DD/YYYY]</Text>
  <TextInput
    style={styles.input}
    placeholder="MEASLES Syringe 2ml expiring date. Format: MM/DD/YYYY"
    value={syringe2mlExpiryDatemsla}
    onChangeText={handle2DateChange}
  />
  {showAlert2 && (
    <View style={[styles.alert, isDateValid ? styles.alertValid : null]}>
      <Text style={styles.alertText}>{isValidDate(syringe2mlExpiryDatemsla)}</Text>
    </View>
  )}
</View>


<View style={styles.questionaireContainer}>
  <ThemedText style={styles.subHeading}>MEASLES VACCINE TEMP AT PICK-UP</ThemedText>
  <View style={styles.ageGradeContainer}>
    <TouchableOpacity onPress={() => handleTempSelections('Below 2°C')} style={vaccineTempAtPickupamsl === 'Below 2°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}>
      <ThemedText style={styles.ageGradeOptionText}>Below 2°C</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleTempSelections('Between 2°C - 8°C')} style={vaccineTempAtPickupamsl === 'Between 2°C - 8°C' ? styles.selectedAgeGradess : styles.ageGradeOptions}>
      <ThemedText style={styles.ageGradeOptionText}>Between 2°C - 8°C</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleTempSelections('Above 8°C')} style={vaccineTempAtPickupamsl === 'Above 8°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}>
      <ThemedText style={styles.ageGradeOptionText}>Above 8°C</ThemedText>
    </TouchableOpacity>
  </View>
</View>

{showHowLongsmsla && (
<View style={styles.questionaireContainer}>
<ThemedText style={styles.subHeading}>HOW LONG HAD IT BEEN AT THIS TEMPERATURE?</ThemedText>
<Picker
selectedValue={howLongsmsla}
onValueChange={(itemValue) => setHowLongsmsla(itemValue)}
style={styles.pickerContainer}
>
<Picker.Item label="Less than 1 hrs" value="Less than 1 hrs" />
<Picker.Item label="1hrs to 2 hrs" value="1hrs to 2 hrs" />
<Picker.Item label="above 2 hrs" value="above 2 hrs" />
</Picker>
</View>
)}




<View  style={styles.questionaireContainer}>
  <ThemedText style={styles.subHeading}>MEASLES VACCINE VVM STAGE AT PICKUP </ThemedText>
  <View style={styles.ageGradeContainer}>
    <TouchableOpacity onPress={() => setVaccineStageAtPickupmsl('Stage 1')} style={vaccineStageAtPickupmsl === 'Stage 1' ? styles.selectedAgeGradeStage1 : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>VVM Stage 1</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setVaccineStageAtPickupmsl('Stage 2')} style={vaccineStageAtPickupmsl === 'Stage 2' ? styles.selectedAgeGradeStage2 : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>VVM Stage 2</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setVaccineStageAtPickupmsl('Stage 3')} style={vaccineStageAtPickupmsl === 'Stage 3' ? styles.selectedAgeGradeStage3 : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>VVM Stage 3</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setVaccineStageAtPickupmsl('Stage 4')} style={vaccineStageAtPickupmsl === 'Stage 4' ? styles.selectedAgeGradeStage4 : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>VVM Stage 4</ThemedText>
    </TouchableOpacity>
  </View>
</View>


<View>
<Text style={styles.label}>MEASLES VACCINE OPENING BALANCE (PLEASE ENTER ONLY MULTIPLES OF 20)</Text>
<TextInput
      style={styles.input}
      placeholder="Enter MEASLES Vaccine opening balance"
      value={openingBalanceamsl}
      onChangeText={setOpeningBalanceamsl}
    />
</View>

<View  style={styles.calc}>
  <ThemedText style={styles.subHeading}>MEASLES VACCINE OPENING BALANCE IN AMPOULES :</ThemedText>
  {openingBalanceamsl && (
   
      <ThemedText style={styles.mismatch}>
        {openingBalanceInAmples} 
      </ThemedText>
  )}
</View>

<View>
<Text style={styles.label}>MEASLES DILUENT OPENING BALANCE (PLEASE ENTER ONLY MULTIPLES OF 20)</Text>
<TextInput
      style={styles.input}
      placeholder="Enter MEASLES Diluent opening balance"
      value={diluentOpeningBalanceamsl}
      onChangeText={setDiluentOpeningBalanceamsl}
    />
</View>

<View  style={styles.calc}>
  <ThemedText style={styles.subHeading}>MEASLES DILUENT OPENING BALANCE IN AMPOULES :</ThemedText>
  {diluentOpeningBalanceamsl && (
   
      <ThemedText style={styles.mismatch}>
        {diluentOpeningBalanceInAmples} 
      </ThemedText>
  )}
</View>
 

<View  style={styles.calc}>
  <ThemedText style={styles.subHeading}>MEASLES DILUENT MISMATCH :</ThemedText>
  {diluentMismatch && (
    <>
      <ThemedText style={styles.mismatch}>
        {diluentMismatch} 
      </ThemedText>
      <ThemedText>
        DILUENT MISMATCH IN AMPOULES:
      </ThemedText>
      <ThemedText style={styles.mismatch}>            
        {diluentMismatchInAmpules}
      </ThemedText>
    </>
  )}
</View>


<View>
<Text style={styles.label}>MEASLES 0.05ML SYRINGE OPENING BALANCE (PLEASE ENTER ONLY MULTIPLES OF 20)</Text> 
<TextInput
      style={styles.input}
      placeholder="Enter MEASLES 0.05ml syringe opening balance"
      value={syringeOpeningBalanceamsl}
      onChangeText={setSyringeOpeningBalanceamsl}
    />
</View>

<View  style={styles.calc}>
  <ThemedText style={styles.subHeading}>MEASLES SYRINGE 0.05ML MISMATCH :</ThemedText>
  {syringe5mismatcha && (
    
    <ThemedText style={styles.mismatch}>
      {syringe5mismatcha} 
    </ThemedText>
   
    
  )}
</View>

<View>
<Text style={styles.label}>MEASLES 2ML SYRINGE OPENING BALANCE </Text> 
<TextInput
      style={styles.input}
      placeholder="Enter MEASLES 2ml syringe opening balance"
      value={mlsyringeOpeningBalanceamsl}
      onChangeText={setMlsyringeOpeningBalanceamsl}
    />
</View>

<View  style={styles.calc}>
<ThemedText style={styles.subHeading}>MEASLES SYRINGE 2ML MISMATCH :</ThemedText>
  {syringe2mismatch && (
      <ThemedText style={styles.mismatch}>
        {syringe2mismatch} pcs
      </ThemedText>            
  )}
</View> 

<View>
<Text style={styles.label}>MEASLES VACCINE AVERAGE MONTHLY REQUIREMENT  (AMR) (PLEASE ENTER ONLY MULTIPLES OF 20)</Text> 
<TextInput
    style={styles.input}
    placeholder="Enter MEASLES Vaccine average monthly requirement"
    value={averageMonthlyRequirementmsl}
    onChangeText={setAverageMonthlyRequirementmsl}
  /> 
</View>

<ThemedText style={styles.subHeading}>MMSQ MULTIPLICATION FACTOR:</ThemedText>
  <TextInput
    style={styles.input}
    placeholder="MMSQ MULTIPLICATION FACTOR"
    value={multiplicationFactormsl}
    onChangeText={setMultiplicationFactormsl}
    keyboardType="numeric" // Ensure numeric keyboard for multiplication factor input
  /> 


  <View style={styles.calc}>

    
  <ThemedText style={styles.subHeading}>MEASLES VACCINE MONTHLY MAXIMUM STOCK QUANTITY:</ThemedText>
  
  
  {maximumStockmsl && (
    <ThemedText style={styles.mismatch}>
      {maximumStockmsl} doses
    </ThemedText>
  )}
</View>


<View style={styles.calc}>
  <ThemedText style={styles.subHeading}>
    MEASLES VACCINE DOSES REQUIRED TO MAKE UP TO MAXIMUM STOCK:
  </ThemedText>
  {dosesToIssueUpmsla && (
    <ThemedText style={styles.mismatch}>
      {dosesToIssueUpmsla} doses
    </ThemedText>
  )}
</View> 
  


<View>
<Text style={styles.label}>ACTUAL MEASLES VACCINE DOSES ISSUED (PLEASE ENTER ONLY MULTIPLES OF 20)</Text> 
<TextInput
  style={styles.input}
  placeholder="MEASLES vaccine doses issued "
  value={vaccineDosesIssuedmsla}
  onChangeText={setVaccineDosesIssuedmsla}
/> 
</View>

<View style={styles.calc}>
  <ThemedText style={styles.subHeading}>
  Total MEASLES vaccine available:
  </ThemedText>
  {vaccineTotal && (
    <ThemedText style={styles.mismatch}>
      {vaccineTotal} doses or {vaccineTotalInVials} vials
    </ThemedText>
  )}
</View>



<View style={styles.calc}>
  <ThemedText style={styles.subHeading}>
 QUANTITY (DOSES) OF DILUENT REQUIRED TO MATCH TOTAL AVAILABLE MEASLES VACCINE (FACTORING IN OPENING BALANCE):
 </ThemedText>
</View>
<ThemedText>
  {vaccineTotal && (
    <ThemedText style={styles.mismatch}>
      {diluentRequiredForTotalAvailable} doses or  {DiluentRequiredForTotalAvailableInViles} vials/ampoules
    </ThemedText>
  )}
</ThemedText>

<View>
<Text style={styles.label}>ACTUAL QUANTITY (DOSES) OF MEASLES DILUENT ISSUED (PLEASE ENTER ONLY MULTIPLES OF 20)</Text> 
<TextInput
  style={styles.input}
  placeholder="MEASLES diluent issued "
  value={diluentIssuedmsla}
  onChangeText={setDiluentIssuedmsla}
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
  QUANTITY OF 0.05ML SYRINGE REQUIRED TO MATCH TOTAL MEASLES VACCINE AVAILABLE (FACTORING IN OPENING BALANCE):
  </ThemedText>
  {vaccineTotal && (
    <ThemedText style={styles.mismatch}>
      {vaccine5requiredToMatchMslsAvail} pcs
    </ThemedText>
  )}
</View>

<View>
<Text style={styles.label}>ACTUAL MEASLES 0.05ML SYRINGE QUANTITY ISSUED (PLEASE ENTER ONLY MULTIPLES OF 20)</Text> 
<TextInput
  style={styles.input}
  placeholder="MEASLES 0.05ml syringe Quantity Issued "
  value={syringeQuantityIssuedmsla}
  onChangeText={setSyringeQuantityIssuedmsla}
/>
</View>
<View style={styles.calc}>
  <ThemedText style={styles.subHeading}>
  Total 0.05ml syringe available:
  </ThemedText>
  {syringeOpeningBalanceamsl && syringeQuantityIssuedmsla && (
    <ThemedText style={styles.mismatch}>
      {ml5Total} pcs
    </ThemedText>
  )}
</View>


<View style={styles.calc}>
  <ThemedText style={styles.subHeading}>
  0.05ML SYRINGE AVAILABLE MISMATCH:          
  </ThemedText>
  {ml5AvailableMismatchamsl && (
    <ThemedText style={styles.mismatch}>
      {ml5AvailableMismatchamsl} pcs 
    </ThemedText>
  )}
</View>

<View style={styles.calc}>
  <ThemedText style={styles.subHeading}>
  QUANTITY OF 2ML SYRINGE REQUIRED TO MATCH TOTAL MEASLES VACCINE AVAILABLE (FACTORING IN OPENING BALANCE):
  </ThemedText>
  {vaccineTotal && (
    <ThemedText style={styles.mismatch}>
      {mlsyringeReqFinalCalc} pcs
    </ThemedText>
  )}
</View>


<View>
<Text style={styles.label}>ACTUAL MEASLES 2ML SYRINGE QUANTITY ISSUED </Text> 
<TextInput
    style={styles.input}
    placeholder="MEASLES 2ml syringe Quantity Issued "
    value={mlsyringeQuantityIssuedmsla}
    onChangeText={setMlsyringeQuantityIssuedmsla}
  />
</View>

<View style={styles.calc}>
  <ThemedText style={styles.subHeading}>
  Total 2ml syringe available:
  </ThemedText>
  {mlsyringeOpeningBalanceamsl && mlsyringeQuantityIssuedmsla && (
    <ThemedText style={styles.mismatch}>
      {ml2Total} pcs 
    </ThemedText>
  )}
</View>


<View style={styles.calc}>
  <ThemedText style={styles.subHeading}>
  2ML SYRINGE AVAILABLE MISMATCH:          
  </ThemedText>
  {   ml2Total && (
    <ThemedText style={styles.mismatch}>
      {ml2AvailableMismatch} pcs
    </ThemedText>
  )}
</View>


<View style={styles.questionaireContainer}>
  <ThemedText style={styles.subHeading}>MEASLES VACCINE TEMP AT ISSUE</ThemedText>
  <View style={styles.ageGradeContainer}>
    <TouchableOpacity onPress={() => handleTempSelection('Below 2°C')} style={vaccineTempAtIssuesamsl === 'Below 2°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}>
      <ThemedText style={styles.ageGradeOptionText}>Below 2°C</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleTempSelection('Between 2°C - 8°C')} style={vaccineTempAtIssuesamsl === 'Between 2°C - 8°C' ? styles.selectedAgeGradess : styles.ageGradeOptions}>
      <ThemedText style={styles.ageGradeOptionText}>Between 2°C - 8°C</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleTempSelection('Above 8°C')} style={vaccineTempAtIssuesamsl === 'Above 8°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}>
      <ThemedText style={styles.ageGradeOptionText}>Above 8°C</ThemedText>
    </TouchableOpacity>
  </View>
</View>

{/* How Long Dropdown */}
{showHowLongmsla && (
  <View style={styles.questionaireContainer}>
    <ThemedText style={styles.subHeading}>HOW LONG HAD IT BEEN AT THIS TEMPERATURE?</ThemedText>
    <Picker
      selectedValue={howLongmsla}
      onValueChange={(itemValue) => setHowLongmsla(itemValue)}
      style={styles.pickerContainer}
    >
      <Picker.Item label="Less than 1 hrs" value="Less than 1 hrs" />
      <Picker.Item label="1hrs to 2 hrs" value="1hrs to 2 hrs" />
      <Picker.Item label="above 2 hrs" value="above 2 hrs" />
    </Picker>
  </View>
)}

<View  style={styles.questionaireContainer}>
 
<ThemedText style={styles.subHeading}>MEASLES VACCINE VVM STAGE AT ISSUE</ThemedText>
  <View style={styles.ageGradeContainer}>
    <TouchableOpacity onPress={() => setVaccineStageAtIssuemsl('Stage 1')} style={vaccineStageAtIssuemsl === 'Stage 1' ? styles.selectedAgeGradeStage1 : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}> VVM Stage 1</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setVaccineStageAtIssuemsl('Stage 2')} style={vaccineStageAtIssuemsl === 'Stage 2' ? styles.selectedAgeGradeStage2 : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>VVM Stage 2</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setVaccineStageAtIssuemsl('Stage 3')} style={vaccineStageAtIssuemsl === 'Stage 3' ? styles.selectedAgeGradeStage3 : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>VVM Stage 3</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setVaccineStageAtIssuemsl('Stage 4')} style={vaccineStageAtIssuemsl === 'Stage 4' ? styles.selectedAgeGradeStage4 : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>VVM Stage 4</ThemedText>
    </TouchableOpacity>

</View>
</View>

<TouchableOpacity onPress={handleGenerateFields1} style={styles.buttonfill}>
<Text style={styles.buttonText}>
  Fill another MEASLES Logistics form for a different manufacturer
</Text>
</TouchableOpacity>

{generateFields1 && (
  
  <>
    
    <Text style={styles.header}>
      MEASLES LOGISTICS DATA
      <TouchableOpacity onPress={() => setGenerateFields1(false)} style={styles.closeButton}>
      <MaterialIcons name="close" size={24} color="black" />
    </TouchableOpacity>S
      
    </Text>
    

    <Picker
  selectedValue={selectedManufacturerMeaslesb || ''}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedManufacturerMeaslesb(itemValue)
  }
  style={styles.pickerContainer}
  itemStyle={styles.pickerItem}
>
  <Picker.Item label="Select Manufacturer" value={null} /> {/* Default value for null */}
  {manufacturers.map((manufacturer, index) => (
    <Picker.Item key={index} label={manufacturer} value={manufacturer} />
  ))}
</Picker>

<View>
<Text style={styles.label}>MEASLES VACCINE BATCH NUMBER</Text>
<TextInput
      style={styles.input}
      placeholder="Enter MEASLES Vaccine batch number"
      value={batchNumbermslb}
      onChangeText={setBatchNumbermslb}
      
    />
</View>


<View>
  <Text style={styles.label}>MEASLES VACCINE EXPIRY DATE [MM/DD/YYYY]</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter MEASLES Vaccine expiring date. Format: MM/DD/YYYY"
    value={expiryDatemslb}
    onChangeText={handleMSLSDateChange}
  />
  {showAlertMSLS && (
    <View style={[styles.alert, isDateValid ? styles.alertValid : null]}>
      <Text style={styles.alertText}>{isValidDate(expiryDatemslb)}</Text>
    </View>
  )}
</View>


<View>
<Text style={styles.label}>MEASLES DILUENT BATCH NUMBER</Text>
<TextInput
      style={styles.input}
      placeholder="Enter MEASLES Diluent batch number"
      value={diluentBatchNumbermslb}
      onChangeText={setDiluentBatchNumbermslb}
    />
</View>


<View>
  <Text style={styles.label}>MEASLES DILUENT EXPIRY DATE [MM/DD/YYYY]</Text>
  <TextInput
    style={styles.input}
    placeholder="MEASLES Diluent expiring date. Format: MM/DD/YYYY"
    value={diluentExpiryDatemslb}
    onChangeText={handleDateChange}
  />
  {showAlert && (
    <View style={[styles.alert, isDateValid ? styles.alertValid : null]}>
      <Text style={styles.alertText}>{isValidDate(diluentExpiryDatemslb)}</Text>
    </View>
  )}
</View>



<View>
<Text style={styles.label}>MEASLES 0.05ML SYRINGE BATCH NUMBER</Text>
<TextInput
      style={styles.input}
      placeholder="Enter MEASLES Syringe 0.05ml batch number"
      value={syringe5BatchNumbermslb}
      onChangeText={setSyringe5BatchNumbermslb}
    />
</View>


<View>
  <Text style={styles.label}>MEASLES 0.05ML SYRINGE EXPIRY DATE [MM/DD/YYYY]</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter MEASLES Syringe 0.05ml expiring date. Format: MM/DD/YYYY"
    value={syringe5ExpiryDatemslb}
    onChangeText={handle5DateChange}
  />
  {showAlert5 && (
    <View style={[styles.alert, isDateValid ? styles.alertValid : null]}>
      <Text style={styles.alertText}>{isValidDate(syringe5ExpiryDatemslb)}</Text>
    </View>
  )}
</View>


<View>
<Text style={styles.label}>MEASLES 2ML SYRINGE BATCH NUMBER</Text>
<TextInput
      style={styles.input}
      placeholder="Enter MEASLES 2ml Syringe batch number"
      value={syringe2mlBatchNumbermslb}
      onChangeText={setSyringe2mlBatchNumbermslb}
    />
</View>


<View>
  <Text style={styles.label}>MEASLES 2ML SYRINGE EXPIRY DATE [MM/DD/YYYY]</Text>
  <TextInput
    style={styles.input}
    placeholder="MEASLES Syringe 2ml expiring date. Format: MM/DD/YYYY"
    value={syringe2mlExpiryDatemslb}
    onChangeText={handle2DateChange}
  />
  {showAlert2 && (
    <View style={[styles.alert, isDateValid ? styles.alertValid : null]}>
      <Text style={styles.alertText}>{isValidDate(syringe2mlExpiryDatemslb)}</Text>
    </View>
  )}
</View>


<View style={styles.questionaireContainer}>
  <ThemedText style={styles.subHeading}>MEASLES VACCINE TEMP AT PICK-UP</ThemedText>
  <View style={styles.ageGradeContainer}>
    <TouchableOpacity onPress={() => handleTempSelections('Below 2°C')} style={vaccineTempAtPickupbmsl === 'Below 2°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}>
      <ThemedText style={styles.ageGradeOptionText}>Below 2°C</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleTempSelections('Between 2°C - 8°C')} style={vaccineTempAtPickupbmsl === 'Between 2°C - 8°C' ? styles.selectedAgeGradess : styles.ageGradeOptions}>
      <ThemedText style={styles.ageGradeOptionText}>Between 2°C - 8°C</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleTempSelections('Above 8°C')} style={vaccineTempAtPickupbmsl === 'Above 8°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}>
      <ThemedText style={styles.ageGradeOptionText}>Above 8°C</ThemedText>
    </TouchableOpacity>
  </View>
</View>

{showHowLongsmslb && (
<View style={styles.questionaireContainer}>
<ThemedText style={styles.subHeading}>HOW LONG HAD IT BEEN AT THIS TEMPERATURE?</ThemedText>
<Picker
selectedValue={howLongsmslb}
onValueChange={(itemValue) => setHowLongsmslb(itemValue)}
style={styles.pickerContainer}
>
<Picker.Item label="Less than 1 hrs" value="Less than 1 hrs" />
<Picker.Item label="1hrs to 2 hrs" value="1hrs to 2 hrs" />
<Picker.Item label="above 2 hrs" value="above 2 hrs" />
</Picker>
</View>
)}




<View  style={styles.questionaireContainer}>
  <ThemedText style={styles.subHeading}>MEASLES VACCINE VVM STAGE AT PICKUP </ThemedText>
  <View style={styles.ageGradeContainer}>
    <TouchableOpacity onPress={() => setVaccineStageAtPickupmsl('Stage 1')} style={vaccineStageAtPickupmsl === 'Stage 1' ? styles.selectedAgeGradeStage1 : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>VVM Stage 1</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setVaccineStageAtPickupmsl('Stage 2')} style={vaccineStageAtPickupmsl === 'Stage 2' ? styles.selectedAgeGradeStage2 : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>VVM Stage 2</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setVaccineStageAtPickupmsl('Stage 3')} style={vaccineStageAtPickupmsl === 'Stage 3' ? styles.selectedAgeGradeStage3 : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>VVM Stage 3</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setVaccineStageAtPickupmsl('Stage 4')} style={vaccineStageAtPickupmsl === 'Stage 4' ? styles.selectedAgeGradeStage4 : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>VVM Stage 4</ThemedText>
    </TouchableOpacity>
  </View>
</View>


<View>
<Text style={styles.label}>MEASLES VACCINE OPENING BALANCE (PLEASE ENTER ONLY MULTIPLES OF 20)</Text>
<TextInput
      style={styles.input}
      placeholder="Enter MEASLES Vaccine opening balance"
      value={openingBalancebmsl}
      onChangeText={setOpeningBalancebmsl}
    />
</View>

<View  style={styles.calc}>
  <ThemedText style={styles.subHeading}>MEASLES VACCINE OPENING BALANCE IN AMPOULES :</ThemedText>
  {openingBalanceamsl && (
   
      <ThemedText style={styles.mismatch}>
        {openingBalanceInAmples} 
      </ThemedText>
  )}
</View>

<View>
<Text style={styles.label}>MEASLES DILUENT OPENING BALANCE (PLEASE ENTER ONLY MULTIPLES OF 20)</Text>
<TextInput
      style={styles.input}
      placeholder="Enter MEASLES Diluent opening balance"
      value={diluentOpeningBalancebmsl}
      onChangeText={setDiluentOpeningBalancebmsl}
    />
</View>

<View  style={styles.calc}>
  <ThemedText style={styles.subHeading}>MEASLES DILUENT OPENING BALANCE IN AMPOULES :</ThemedText>
  {diluentOpeningBalancebmsl && (
   
      <ThemedText style={styles.mismatch}>
        {diluentOpeningBalanceInAmples} 
      </ThemedText>
  )}
</View>
 

<View  style={styles.calc}>
  <ThemedText style={styles.subHeading}>MEASLES DILUENT MISMATCH :</ThemedText>
  {diluentMismatch && (
    <>
      <ThemedText style={styles.mismatch}>
        {diluentMismatch} 
      </ThemedText>
      <ThemedText>
        DILUENT MISMATCH IN AMPOULES:
      </ThemedText>
      <ThemedText style={styles.mismatch}>            
        {diluentMismatchInAmpules}
      </ThemedText>
    </>
  )}
</View>


<View>
<Text style={styles.label}>MEASLES 0.05ML SYRINGE OPENING BALANCE (PLEASE ENTER ONLY MULTIPLES OF 20)</Text> 
<TextInput
      style={styles.input}
      placeholder="Enter MEASLES 0.05ml syringe opening balance"
      value={syringeOpeningBalancebmsl}
      onChangeText={setSyringeOpeningBalancebmsl}
    />
</View>

<View  style={styles.calc}>
  <ThemedText style={styles.subHeading}>MEASLES SYRINGE 0.05ML MISMATCH :</ThemedText>
  {syringe5mismatchb && (
    
    <ThemedText style={styles.mismatch}>
      {syringe5mismatchb} 
    </ThemedText>
   
    
  )}
</View>

<View>
<Text style={styles.label}>MEASLES 2ML SYRINGE OPENING BALANCE </Text> 
<TextInput
      style={styles.input}
      placeholder="Enter MEASLES 2ml syringe opening balance"
      value={mlsyringeOpeningBalancebmsl}
      onChangeText={setMlsyringeOpeningBalancebmsl}
    />
</View>

<View  style={styles.calc}>
<ThemedText style={styles.subHeading}>MEASLES SYRINGE 2ML MISMATCH :</ThemedText>
  {syringe2mismatch && (
      <ThemedText style={styles.mismatch}>
        {syringe2mismatch} pcs
      </ThemedText>            
  )}
</View> 

<View>
<Text style={styles.label}>MEASLES VACCINE AVERAGE MONTHLY REQUIREMENT  (AMR) (PLEASE ENTER ONLY MULTIPLES OF 20)</Text> 
<TextInput
    style={styles.input}
    placeholder="Enter MEASLES Vaccine average monthly requirement"
    value={averageMonthlyRequirementmsl}
    onChangeText={setAverageMonthlyRequirementmsl}
  /> 
</View>

<ThemedText style={styles.subHeading}>MMSQ MULTIPLICATION FACTOR:</ThemedText>
  <TextInput
    style={styles.input}
    placeholder="MMSQ MULTIPLICATION FACTOR"
    value={multiplicationFactormsl}
    onChangeText={setMultiplicationFactormsl}
    keyboardType="numeric" // Ensure numeric keyboard for multiplication factor input
  /> 


  <View style={styles.calc}>

    
  <ThemedText style={styles.subHeading}>MEASLES VACCINE MONTHLY MAXIMUM STOCK QUANTITY:</ThemedText>
  
  
  {maximumStockmsl && (
    <ThemedText style={styles.mismatch}>
      {maximumStockmsl} doses
    </ThemedText>
  )}
</View>


<View style={styles.calc}>
  <ThemedText style={styles.subHeading}>
    MEASLES VACCINE DOSES REQUIRED TO MAKE UP TO MAXIMUM STOCK:
  </ThemedText>
  {dosesToIssueUpmslb && (
    <ThemedText style={styles.mismatch}>
      {dosesToIssueUpmslb} doses
    </ThemedText>
  )}
</View> 
  


<View>
<Text style={styles.label}>ACTUAL MEASLES VACCINE DOSES ISSUED (PLEASE ENTER ONLY MULTIPLES OF 20)</Text> 
<TextInput
  style={styles.input}
  placeholder="MEASLES vaccine doses issued "
  value={vaccineDosesIssuedmslb}
  onChangeText={setVaccineDosesIssuedmslb}
/> 
</View>

<View style={styles.calc}>
  <ThemedText style={styles.subHeading}>
  Total MEASLES vaccine available:
  </ThemedText>
  {vaccineTotal && (
    <ThemedText style={styles.mismatch}>
      {vaccineTotal} doses or {vaccineTotalInVials} vials
    </ThemedText>
  )}
</View>



<View style={styles.calc}>
  <ThemedText style={styles.subHeading}>
 QUANTITY (DOSES) OF DILUENT REQUIRED TO MATCH TOTAL AVAILABLE MEASLES VACCINE (FACTORING IN OPENING BALANCE):
 </ThemedText>
</View>
<ThemedText>
  {vaccineTotal && (
    <ThemedText style={styles.mismatch}>
      {diluentRequiredForTotalAvailable} doses or  {DiluentRequiredForTotalAvailableInViles} vials/ampoules
    </ThemedText>
  )}
</ThemedText>

<View>
<Text style={styles.label}>ACTUAL QUANTITY (DOSES) OF MEASLES DILUENT ISSUED (PLEASE ENTER ONLY MULTIPLES OF 20)</Text> 
<TextInput
  style={styles.input}
  placeholder="MEASLES diluent issued "
  value={diluentIssuedmslb}
  onChangeText={setDiluentIssuedmslb}
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
  QUANTITY OF 0.05ML SYRINGE REQUIRED TO MATCH TOTAL MEASLES VACCINE AVAILABLE (FACTORING IN OPENING BALANCE):
  </ThemedText>
  {vaccineTotal && (
    <ThemedText style={styles.mismatch}>
      {vaccine5requiredToMatchMslsAvail} pcs
    </ThemedText>
  )}
</View>

<View>
<Text style={styles.label}>ACTUAL MEASLES 0.05ML SYRINGE QUANTITY ISSUED (PLEASE ENTER ONLY MULTIPLES OF 20)</Text> 
<TextInput
  style={styles.input}
  placeholder="MEASLES 0.05ml syringe Quantity Issued "
  value={syringeQuantityIssuedmslb}
  onChangeText={setSyringeQuantityIssuedmslb}
/>
</View>
<View style={styles.calc}>
  <ThemedText style={styles.subHeading}>
  Total 0.05ml syringe available:
  </ThemedText>
  {syringeOpeningBalancebmsl && syringeQuantityIssuedmslb && (
    <ThemedText style={styles.mismatch}>
      {ml5Total} pcs
    </ThemedText>
  )}
</View>


<View style={styles.calc}>
  <ThemedText style={styles.subHeading}>
  0.05ML SYRINGE AVAILABLE MISMATCH:          
  </ThemedText>
  {ml5AvailableMismatchbmsl && (
    <ThemedText style={styles.mismatch}>
      {ml5AvailableMismatchbmsl} pcs 
    </ThemedText>
  )}
</View>

<View style={styles.calc}>
  <ThemedText style={styles.subHeading}>
  QUANTITY OF 2ML SYRINGE REQUIRED TO MATCH TOTAL MEASLES VACCINE AVAILABLE (FACTORING IN OPENING BALANCE):
  </ThemedText>
  {vaccineTotal && (
    <ThemedText style={styles.mismatch}>
      {mlsyringeReqFinalCalc} pcs
    </ThemedText>
  )}
</View>


<View>
<Text style={styles.label}>ACTUAL MEASLES 2ML SYRINGE QUANTITY ISSUED </Text> 
<TextInput
    style={styles.input}
    placeholder="MEASLES 2ml syringe Quantity Issued "
    value={mlsyringeQuantityIssuedmslb}
    onChangeText={setMlsyringeQuantityIssuedmslb}
  />
</View>

<View style={styles.calc}>
  <ThemedText style={styles.subHeading}>
  Total 2ml syringe available:
  </ThemedText>
  {mlsyringeOpeningBalancebmsl && mlsyringeQuantityIssuedmslb && (
    <ThemedText style={styles.mismatch}>
      {ml2Total} pcs 
    </ThemedText>
  )}
</View>


<View style={styles.calc}>
  <ThemedText style={styles.subHeading}>
  2ML SYRINGE AVAILABLE MISMATCH:          
  </ThemedText>
  {   ml2Total && (
    <ThemedText style={styles.mismatch}>
      {ml2AvailableMismatch} pcs
    </ThemedText>
  )}
</View>


<View style={styles.questionaireContainer}>
  <ThemedText style={styles.subHeading}>MEASLES VACCINE TEMP AT ISSUE</ThemedText>
  <View style={styles.ageGradeContainer}>
    <TouchableOpacity onPress={() => handleTempSelection('Below 2°C')} style={vaccineTempAtIssuesbmsl === 'Below 2°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}>
      <ThemedText style={styles.ageGradeOptionText}>Below 2°C</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleTempSelection('Between 2°C - 8°C')} style={vaccineTempAtIssuesbmsl === 'Between 2°C - 8°C' ? styles.selectedAgeGradess : styles.ageGradeOptions}>
      <ThemedText style={styles.ageGradeOptionText}>Between 2°C - 8°C</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleTempSelection('Above 8°C')} style={vaccineTempAtIssuesbmsl === 'Above 8°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}>
      <ThemedText style={styles.ageGradeOptionText}>Above 8°C</ThemedText>
    </TouchableOpacity>
  </View>
</View>

{/* How Long Dropdown */}
{showHowLongmslb && (
  <View style={styles.questionaireContainer}>
    <ThemedText style={styles.subHeading}>HOW LONG HAD IT BEEN AT THIS TEMPERATURE?</ThemedText>
    <Picker
      selectedValue={howLongmslb}
      onValueChange={(itemValue) => setHowLongmslb(itemValue)}
      style={styles.pickerContainer}
    >
      <Picker.Item label="Less than 1 hrs" value="Less than 1 hrs" />
      <Picker.Item label="1hrs to 2 hrs" value="1hrs to 2 hrs" />
      <Picker.Item label="above 2 hrs" value="above 2 hrs" />
    </Picker>
  </View>
)}

<View  style={styles.questionaireContainer}>
 
<ThemedText style={styles.subHeading}>MEASLES VACCINE VVM STAGE AT ISSUE</ThemedText>
  <View style={styles.ageGradeContainer}>
    <TouchableOpacity onPress={() => setVaccineStageAtIssuemsl('Stage 1')} style={vaccineStageAtIssuemsl === 'Stage 1' ? styles.selectedAgeGradeStage1 : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}> VVM Stage 1</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setVaccineStageAtIssuemsl('Stage 2')} style={vaccineStageAtIssuemsl === 'Stage 2' ? styles.selectedAgeGradeStage2 : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>VVM Stage 2</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setVaccineStageAtIssuemsl('Stage 3')} style={vaccineStageAtIssuemsl === 'Stage 3' ? styles.selectedAgeGradeStage3 : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>VVM Stage 3</ThemedText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setVaccineStageAtIssuemsl('Stage 4')} style={vaccineStageAtIssuemsl === 'Stage 4' ? styles.selectedAgeGradeStage4 : styles.ageGradeOption}>
      <ThemedText style={styles.ageGradeOptionText}>VVM Stage 4</ThemedText>
    </TouchableOpacity>

</View>
</View>


    
  </>
)}
    
  </>
)}


      
    <View style={styles.container}>
      <View style={styles.buttonContainer2}>
        <Button title="Previous" onPress={navigateBackward} color="green" />
      </View>
      <View style={styles.buttonContainer1}>
        <Button title="Next" onPress={navigateForward} color="green" />
      </View>
    </View>


 {/*<TouchableOpacity style={styles.button} onPress={clearFields}>
        <Text style={styles.buttonText}>Clear Fields</Text>
      </TouchableOpacity>
   
      {!locationSent && <ThemedText   style={styles.text}>Please navigate to the top to send your location before submitting.</ThemedText>}
       */}
     

      {showSupervisorForm && (
        <SupervisorAuthForm onSubmit={handleSubmit}  />
      )}
  
      
      </ThemedView>

    </ParallaxScrollView>
    
  );
}

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
    height: '100%', 
    width: '100%', 
    position: 'absolute',
    bottom: 0,
    left: 0,
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
