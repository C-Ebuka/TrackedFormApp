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

export default function HomeScreen() {
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('');
  const [selectedManufacturera, setSelectedManufacturera] = useState<string>('');
  const [selectedManufacturerb, setSelectedManufacturerb] = useState<string>('');
  const [vendorName, setVendorName] = useState('');
  const [vendorPhoneNumber, setVendorPhoneNumber] = useState('');
  const [conveyorName, setConveyorName] = useState('');
  const [conveyorPhoneNumber, setConveyorPhoneNumber] = useState('');
  const [coldStore, setColdStore] = useState('');
  const [distribution, setDistribution] = useState('');
  const [reporting, setReporting] = useState('');
  const [healthFacilityName, setHealthFacilityName] =useState('');
  const [healthFacilityWard, setHealthFacilityWard] = useState('');
  const [healthFacilityLGA, setHealthFacilityLGA] = useState('');
  const [healthFacilityState, setHealthFacilityState] = useState('');
  const [facilityCceStatus, setFacilityCceStatus] = useState('');
  const [cceFunctionalityStatus, setCceFunctionalityStatus] = useState('');
  const [pocketExpenses, setPocketExpenses] = useState('');
  const [vaccineTemp, setVaccineTemp] = useState('');
  const [vaccineTemps, setVaccineTemps] = useState('');
  const [openingBalance, setOpeningBalance] = useState('');
  const [openingBalanceInAmples, setOpeningBalanceInAmples] = useState('');
  const [diluentOpeningBalanceInAmples, setDiluentOpeningBalanceInAmples] = useState('');
  const [openingBalancea, setOpeningBalancea] = useState('');
  const [diluentOpeningBalance, setDiluentOpeningBalance] = useState('')
  const [diluentOpeningBalancea, setDiluentOpeningBalancea] = useState('')
  const [syringeOpeningBalance, setSyringeOpeningBalance] = useState('');
  const [mlsyringeOpeningBalance, setMlsyringeOpeningBalance] = useState('');
  const [diluentmismatcha, setDiluentmismatcha] = useState('');
  const [syringe5mismatch, setSyringe5mismatch] = useState('');
  const [syringe2mismatch, setSyringe2mismatch] = useState('');
  const [syringemismatch, setSyringemismatch] = useState('');
  const [mlsyringemismatch, setMlsyringemismatch] = useState('');
  const [averageMonthlyRequirement, setAverageMonthlyRequirement] = useState('');
  const [maximumStock, setMaximumStock] = useState('');
  const [dosesToIssueUp, setDosesToIssueUp] = useState('');
  const [vaccineDosesIssued, setVaccineDosesIssued] = useState('');
  const [diluentIssued, setDiluentIssued] = useState('');
  const [syringeQuantityIssued, setSyringeQuantityIssued] = useState('');
  const [mlsyringeQuantityIssued, setMlsyringeQuantityIssued] = useState('');
  const [vaccineStage, setVaccineStage] = useState('');
  const [vaccineStageAtIssue, setVaccineStageAtIssue] = useState('');
  const [vaccineStageAtPickup, setVaccineStageAtPickup] = useState('');
  const [vaccineTempAtIssue, setVaccineTempAtIssue] = useState('');
  const [vaccineTempAtIssues, setVaccineTempAtIssues] = useState('');
  const [vaccineTempAtPickup, setVaccineTempAtPickup] = useState('');
  const [dateOfPickUp, setDateOfPickUp] = useState('');
  const [timeOfPickUp, setTimeOfPickUp] = useState('');
  const [dateOfDelivery, setDateOfDelivery] = useState('');
  const [timeOfDelivery, setTimeOfDelivery] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [batchNumbera, setBatchNumbera] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [expiryDatea, setExpiryDatea] = useState('');
  const [diluentBatchNumber, setDiluentBatchNumber] = useState('');
  const [diluentExpiryDate, setDiluentExpiryDate] = useState('');
  const [showHowLong, setShowHowLong] = useState(false);
  const [howLong, setHowLong] = useState('');
  const [howLongs, setHowLongs] = useState('');
  const [showHowLongs, setShowHowLongs] = useState('');
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
  const [generateFields2, setGenerateFields2] = useState(false);
  const [generateFieldsCount, setGenerateFieldsCount] = useState(0);
  const [generateFieldsCount1, setGenerateFieldsCount1] = useState(0);
  const [generateFieldsCount2, setGenerateFieldsCount2] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [locationSent, setLocationSent] = useState(false);
  const [syringe5BatchNumber, setSyringe5BatchNumber] = useState('');
  const [syringe5ExpiryDate, setSyringe5ExpiryDate] = useState('');
  const [syringe2mlBatchNumber, setSyringe2mlBatchNumber] = useState('');
  const [syringe2mlExpiryDate, setSyringe2mlExpiryDate] = useState('');
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
  const [multiplicationFactor, setMultiplicationFactor] = useState('');
  const [dilAvailableMismatch, setDilAvailableMismatch] = useState('');
  const [dilAvailableMismatchInVials, setDilAvailableMismatchInVials] = useState('');
  const [ml5AvailableMismatch, setMl5AvailableMismatch] = useState('');
  const [ml2AvailableMismatch, setMl2AvailableMismatch] = useState('');
  const [diluentVaccineTotal, setDiluentVaccineTotal] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertBCG, setShowAlertBCG] = useState(false);
  const [isDateValid, setIsDateValid] = useState(false);
  const [showAlert5, setShowAlert5] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [diluentMismatch, setDiluentMismatch] = useState('');
  const [diluentMismatchInAmpules, setDiluentMismatchInAmpules] = useState('');
  const [diluentTotal, setDiluentTotal] = useState('')
  const [diluentTotalInAmples, setDiluentTotalInAmples] = useState('')
  const [ml5Total, setMl5Total] = useState('')
  const [ml2Total, setMl2Total] = useState('')
  const [totalBcgDiluentAvailable, setTotalBcgDiluentAvailable] = useState('');
  const [vaccine5requiredToMatchBcgAvail, setVaccine5requiredToMatchBcgAvail] = useState('');
   




  const clearFields = () => {
    setSelectedManufacturer('');
      setSelectedManufacturera('');
      setSelectedManufacturerb('');
      setVendorName('');
      setVendorPhoneNumber('');
      setConveyorName('');
      setConveyorPhoneNumber('');
      setColdStore('');
      setDistribution('');
      setReporting('');
      setHealthFacilityName('');
      setHealthFacilityWard('');
      setHealthFacilityLGA('');
      setHealthFacilityState('');
      setFacilityCceStatus('');
      setCceFunctionalityStatus('');
      setPocketExpenses('');
      setVaccineTemp('');
      setVaccineStage('');
      setOpeningBalance('');
      setOpeningBalanceInAmples('');
      setDiluentOpeningBalanceInAmples('');
      setOpeningBalancea('');
      setDiluentOpeningBalance('');
      setDiluentOpeningBalancea('');
      setSyringeOpeningBalance('');
      setMlsyringeOpeningBalance('');
      setSyringemismatch('');
      setMlsyringemismatch('');
      setAverageMonthlyRequirement('');
      setMaximumStock('');
      setDosesToIssueUp('');
      setVaccineDosesIssued('');
      setDiluentIssued('');
      setVaccineTempAtPickup('');
      setVaccineTempAtIssue('');
      setSyringeQuantityIssued('');
      setMlsyringeQuantityIssued('');
      setVaccineStageAtIssue('');
      setVaccineStageAtPickup('');
      setDateOfPickUp('');
      setTimeOfPickUp('');
      setDateOfDelivery('');
      setTimeOfDelivery('');
      setBatchNumber('');
      setBatchNumbera('');
      setHowLong('');
      setShowHowLong(false);

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

  const handleGenerateFields2 = () => {
    if (generateFieldsCount2 < 4) {
      setGenerateFieldsCount2(count => count + 1);
    }
    setGenerateFields2(true);
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
    setVaccineStage(stage);
    setVaccineStageAtIssue(stage);
    
  };

  const handleVaccineStageAtPickupSelection = (stage: string) => {
    setVaccineStage(stage);
    setVaccineStageAtPickup(stage);
    
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

const handleBCGDateChange = (text: string) => {
  setExpiryDate(text);
  const validityMessage: string = isValidDate(text); // Ensure validityMessage is typed as string
  setShowAlertBCG(validityMessage !== 'valid' && text.trim().length > 0);
};

const handleDateChange = (text: string) => {
  setDiluentExpiryDate(text);
  const validityMessage: string = isValidDate(text);
  setShowAlert(validityMessage !== 'valid' && text.trim().length > 0);
};

const handle5DateChange = (text: string) => {
  setSyringe5ExpiryDate(text);
  const validityMessage: string = isValidDate(text);
  setShowAlert5(validityMessage !== 'valid' && text.trim().length > 0);
};

const handle2DateChange = (text: string) => {
  setSyringe2mlExpiryDate(text);
  const validityMessage: string = isValidDate(text);
  setShowAlert2(validityMessage !== 'valid' && text.trim().length > 0);
};

const navigateForward = () => {
  navigation.navigate('MeaslesScreen');
};

const navigateBackward = () => {
  navigation.navigate('YellowFeverScreen');
};

const handleNavigation = () => {
  // Navigate to the other page
  navigation.navigate('MyComponent'); 
};



  useEffect(() => {

    if (openingBalance && diluentOpeningBalance) {
      const bcgOpening = parseInt(openingBalance);
      const diluentOpening = parseInt(diluentOpeningBalance);
      const diluentMismatchAdjustment = bcgOpening - diluentOpening;
      const mismatchAmpules = diluentMismatchAdjustment / 20;
      setDiluentMismatchInAmpules(mismatchAmpules.toString());
      setDiluentMismatch(diluentMismatchAdjustment.toString());
    } else {
      setDiluentMismatchInAmpules('');
      setDiluentMismatch('');
    }

    if (openingBalance ) {
      const openingBalanceInAmples = (Number(openingBalance))/20;
      setOpeningBalanceInAmples(openingBalanceInAmples.toString());
    } else {
      setOpeningBalanceInAmples('');
    }
    
    if (diluentOpeningBalance ) {
      const diluentOpeningBalanceInAmples = (Number(diluentOpeningBalance))/20;
      setDiluentOpeningBalanceInAmples(diluentOpeningBalanceInAmples.toString());
    } else {
      setDiluentOpeningBalanceInAmples('');
    }

    if (openingBalance && syringeOpeningBalance) {
        const syringe5MismatchAdjustment = parseInt(openingBalance) - parseInt(syringeOpeningBalance);
        setSyringe5mismatch(syringe5MismatchAdjustment.toString());
        }


        const mlsyringeOpeningBalanceInDoses = (20 * parseInt(mlsyringeOpeningBalance))

    if (openingBalance && mlsyringeOpeningBalance && mlsyringeOpeningBalanceInDoses) {
        const syringe2MismatchAdjustment = parseInt(openingBalance) - mlsyringeOpeningBalanceInDoses;
        const syringe2MismatchAdjustmentInPcs = syringe2MismatchAdjustment / 20;
        setSyringe2mismatch(syringe2MismatchAdjustmentInPcs.toString());
      }
    


      if (openingBalance && averageMonthlyRequirement && multiplicationFactor) {
        const maximumStockCalc = parseFloat(multiplicationFactor) * parseInt(averageMonthlyRequirement);
        setMaximumStock(maximumStockCalc.toString());

    }


    if (maximumStock && openingBalance) { 
      const quantityReqToMaxCalc = parseInt(maximumStock) - (Number(openingBalance));
      setDosesToIssueUp(quantityReqToMaxCalc.toString());

    }

    if (syringeMaxStockQuantity && syringeOpeningBalance) {
      const syringeToIssueUpCalc = parseInt(syringeMaxStockQuantity) - (Number(syringeOpeningBalance));
      setSyringeToIssueUp(syringeToIssueUpCalc.toString());
      
    }
    if (mlsyringeMaxStockQuantity && mlsyringeOpeningBalance) {
      const mlsyringeToIssueUpCalc = parseInt(mlsyringeMaxStockQuantity) - (Number(mlsyringeOpeningBalance));
      setMlsyringeToIssueUp(mlsyringeToIssueUpCalc.toString());   

    }


    if (vaccineDosesIssued && openingBalance) {
      const vaccineTotalCalc = parseInt(vaccineDosesIssued) + (Number(openingBalance));
      const vaccineTotalInVialsCalc = vaccineTotalCalc / 20 ;
      setVaccineTotal(vaccineTotalCalc.toString()); 
      setVaccineTotalInVials(vaccineTotalInVialsCalc.toString()); 
    }

    if (diluentOpeningBalance && diluentIssued) {
      const diluentTotalCalc = parseInt(diluentOpeningBalance) + (Number(diluentIssued));
      const diluentTotalInAmplesCalc = diluentTotalCalc / 20;
      setDiluentTotal(diluentTotalCalc.toString()); 
      setDiluentTotalInAmples(diluentTotalInAmplesCalc.toString()); 

    }

    if (syringeOpeningBalance && syringeQuantityIssued && vaccineTotal) {
      const ml5TotalCalc = parseInt(syringeOpeningBalance) + (Number(syringeQuantityIssued));
      const ml5AvailableMismatchCalc = parseInt(vaccineTotal) - (ml5TotalCalc);
      setMl5AvailableMismatch(ml5AvailableMismatchCalc.toString());
      setMl5Total(ml5TotalCalc.toString()); 
    }

    if (mlsyringeOpeningBalance && mlsyringeQuantityIssued && vaccineTotalInVials) {
      const ml2TotalCalc = parseInt(mlsyringeOpeningBalance) + (Number(mlsyringeQuantityIssued));
      setMl2Total(ml2TotalCalc.toString()); 
    }
 
    if (vaccineTotal && syringeOpeningBalance) {
      const vaccine5requiredToMatchBcgAvailCalc = parseInt(vaccineTotal) - (Number(syringeOpeningBalance));
      setVaccine5requiredToMatchBcgAvail(vaccine5requiredToMatchBcgAvailCalc.toString()); 
    }
   
    if (diluentOpeningBalance && diluentIssued ) {
      const totalBcgDiluentAvailableCalc =  (parseInt(diluentOpeningBalance) + parseInt(diluentIssued));
      setTotalBcgDiluentAvailable(totalBcgDiluentAvailableCalc.toString());

    }
    
    if (diluentOpeningBalance && vaccineTotal && diluentIssued && totalBcgDiluentAvailable) {
      const dilAvailableMismatchCalc = parseInt(vaccineTotal) - (parseInt(totalBcgDiluentAvailable));
      const dilAvailableMismatchInVialsCalc = dilAvailableMismatchCalc / 20 ;

      setDilAvailableMismatch(dilAvailableMismatchCalc.toString());
      setDilAvailableMismatchInVials(dilAvailableMismatchInVialsCalc.toString());

    }
    

    if (diluentOpeningBalance && diluentIssued ) {
      const totalBcgDiluentAvailableCalc =  (parseInt(diluentOpeningBalance) + parseInt(diluentIssued));
      setTotalBcgDiluentAvailable(totalBcgDiluentAvailableCalc.toString());

    }


    if (vaccineTotal && diluentOpeningBalance) {
      const DiluentRequiredForTotalAvailablCalc = parseInt(vaccineTotal) - (Number(diluentOpeningBalance));
      const DiluentRequiredForTotalAvailablInVilesCalc = DiluentRequiredForTotalAvailablCalc / 20;
      setDiluentRequiredForTotalAvailable(DiluentRequiredForTotalAvailablCalc.toString());
      setDiluentRequiredForTotalAvailableInViles(DiluentRequiredForTotalAvailablInVilesCalc.toString());
    }

    if (vaccineTotal && diluentOpeningBalance) {
      const DiluentVaccineTotalCalc = parseInt(vaccineTotal) - (Number(diluentOpeningBalance));
      setDiluentVaccineTotal(DiluentVaccineTotalCalc.toString());
    }
    

    if (vaccineTotal && mlsyringeOpeningBalance && vaccineTotalInVials ) {
      const MlsyringeReqCalc = parseInt(vaccineTotal) / 20;
      const mlsyringeReqFinalCalc = parseInt(vaccineTotalInVials) - (Number(mlsyringeOpeningBalance));
      setMlsyringeReqFinalCalc(mlsyringeReqFinalCalc.toString()); 
    }

    
    if ( vaccineTotalInVials && ml2Total ) {
      const ml2AvailableMismatchCalc = (Number(vaccineTotalInVials)) - (Number(ml2Total));
      setMl2AvailableMismatch(ml2AvailableMismatchCalc.toString());
    }
}, [openingBalance, diluentOpeningBalance, syringeOpeningBalance, mlsyringeMaxStockQuantity, 
  mlsyringeOpeningBalance, averageMonthlyRequirement, maximumStock, 
  syringeMaxStockQuantity, syringeOpeningBalance,     vaccineDosesIssued, vaccineTotal, 
  diluentOpeningBalance, multiplicationFactor, dilAvailableMismatch, diluentIssued, 
  diluentTotal, diluentTotalInAmples, syringe5mismatch, syringeQuantityIssued, mlsyringeQuantityIssued, vaccineTotalInVials, ml2Total
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
            selectedManufacturer,
            selectedManufacturera,
            selectedManufacturerb,
            vendorName,
            vendorPhoneNumber,
            conveyorName,
            conveyorPhoneNumber,
            coldStore,
            distribution,
            reporting,
            healthFacilityName,
            healthFacilityWard,
            healthFacilityLGA,
            healthFacilityState,
            facilityCceStatus,
            cceFunctionalityStatus,
            pocketExpenses,
            vaccineTemp,
            
            vaccineTemps,
            vaccineStage,
            vaccineStageAtIssue,
            vaccineStageAtPickup,
            vaccineTempAtPickup,
            vaccineTempAtIssues,
            openingBalance,
            openingBalancea,
            diluentOpeningBalance,
            diluentOpeningBalancea,
            syringeOpeningBalance,
            mlsyringeOpeningBalance,
           
            syringemismatch,
            mlsyringemismatch,
            averageMonthlyRequirement,
            maximumStock,
            dosesToIssueUp,
            vaccineDosesIssued,
            diluentIssued,
            syringeQuantityIssued,
            mlsyringeQuantityIssued,
            vaccineTempAtIssue,
            dateOfPickUp,
            timeOfPickUp,
            dateOfDelivery,
            timeOfDelivery,
            batchNumber,
            batchNumbera,
            howLong,
            showHowLongs,
            showHowLong,
            user: currentUser, // Add user login details
            location: { // Add location data
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                timestamp: location.timestamp
            },
            errorMsg,
            loadingLocation,
            selectedState,
            selectedLocalGovt,
            selectedWard,
            selectedFacility,
            generateFields,
            generateFields1,
            generateFields2,
            generateFieldsCount,
            generateFieldsCount1,
            generateFieldsCount2,
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
    setVaccineTempAtIssue(temp);

    
    setShowHowLong(temp === 'Below 2°C' || temp === 'Above 8°C');
  };

  const handleTempSelections = (temp: string) => {
    console.log(typeof temp);
    
    setVaccineTempAtPickup(temp) // Set vaccineTempAtIssue state
    
    // Set showHowLong to true only if the selected temperature is 'Below 2°C' or 'Above 8°C'
    setShowHowLongs(temp === 'Below 2°C' || temp === 'Above 8°C');
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
      headerBackgroundColor={{ light: '#5ced73', dark: '#1D3D47',  }}
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

        {/*
        <View  style={styles.align}>

            <TouchableOpacity onPress={handleGetLocation} style={styles.submitButton}>
                <ThemedText style={styles.submitButtonText}>
                    {loadingLocation ? 'Fetching Location...' : 'Send Current Location'}
                </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleNavigation} style={styles.button}>
                        <ThemedText style={styles.buttonText}>Go to Other Page</ThemedText>
            </TouchableOpacity>
          
        </View>
        */}

        

        <ThemedText style={styles.header}>GENERAL LOGISTICS DATA</ThemedText>
        <View>
          <Text style={styles.label}>VENDOR NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Vendor Name"
            value={vendorName}
            onChangeText={setVendorName}
          />
        </View>

        <View>
          <Text style={styles.label}>VENDOR PHONE NUMBER</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Vendor Phone Number"
          value={vendorPhoneNumber}
          onChangeText={setVendorPhoneNumber}
          keyboardType="phone-pad"
        />
        </View>

        <View>
          <Text style={styles.label}>CONVEYOR NAME</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Conveyor Name"
          value={conveyorName}
          onChangeText={setConveyorName}
        />
        </View>

        <View>
          <Text style={styles.label}>CONVEYOR PHONE NUMBER</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Conveyor Phone Number"
          value={conveyorPhoneNumber}
          onChangeText={setConveyorPhoneNumber}
          keyboardType="phone-pad"
        />
        </View>
        

        <View  style={styles.questionaireContainer}>
        <View>
          <ThemedText style={styles.subHeading}>TYPE OF DISTRIBUTION </ThemedText>
            <View style={styles.ageGradeContainer}>
            <TouchableOpacity onPress={() => setDistribution('Normal distribution')} style={distribution === 'Normal distribution' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Normal distribution</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDistribution('Top-up')} style={distribution === 'Top-up' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Top-up</ThemedText>
            </TouchableOpacity>  
          </View>
        </View>
        </View>

        <View style={styles.questionaireContainer}>
          <ThemedText style={styles.subHeading}>REPORTING PERIOD </ThemedText>
          
          <View style={styles.ageGradeContainer}>
          <View>
            <TouchableOpacity onPress={() => setReporting('Sep 2024')} style={reporting === 'Sep 2024' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Sep 2024</ThemedText>
            </TouchableOpacity>
          </View>
          </View>
        </View>


        <View style={styles.questionaireContainer}>
          <ThemedText style={styles.subHeading}>ISSUING COLD STORE </ThemedText>
          <View style={styles.ageGradeContainer}>
            <TouchableOpacity onPress={() => setColdStore('State cold store')} style={coldStore === 'State cold store' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>State cold store</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setColdStore('LGA cold store')} style={coldStore === 'LGA cold store' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>LGA cold store</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setColdStore('Equipped health facility')} style={coldStore === 'Equipped health facility' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Equipped health facility</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={styles.label}>PICK-UP DATE</Text>
        <TextInput
              style={styles.input}
              placeholder="Enter Date of pick up.           Format: DD/MM/YY 21/07/2019"
              value={dateOfPickUp}
              onChangeText={setDateOfPickUp}
            />
        </View>

        <View>
          <Text style={styles.label}>PICK-UP TIME</Text>
        <TextInput
              style={styles.input}
              placeholder="Enter Time of pick up.           Format: Hour:Minute 15:30"
              value={timeOfPickUp}
              onChangeText={setTimeOfPickUp}
            />
        </View>

        <View>
          <Text style={styles.label}>DELIVERY DATE [MM/DD/YYYY] </Text>
        <TextInput
              style={styles.input}
              placeholder="Enter Date of delivery at the health facility.       Format: DD/MM/YY 21/07/2019"
              value={dateOfDelivery}
              onChangeText={setDateOfDelivery}
            />
        </View>


        <View>
          <Text style={styles.label}>DELIVERY TIME</Text>
        <TextInput
              style={styles.input}
              placeholder="Enter Time of delivery at the health facility.      Format: Hour:Minute 15:30"
              value={timeOfDelivery}
              onChangeText={setTimeOfDelivery}
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

        <View  style={styles.questionaireContainer}>
          <ThemedText style={styles.subHeading}>HEALTH FACILITY CCE STATUS. </ThemedText>
          <View style={styles.ageGradeContainer}>
            <TouchableOpacity onPress={() => setFacilityCceStatus('Equipped')} style={facilityCceStatus === 'Equipped' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Equipped</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFacilityCceStatus('Unequipped')} style={facilityCceStatus === 'Unequipped' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Unequipped</ThemedText>
            </TouchableOpacity>
            {/*<TouchableOpacity onPress={() => setFacilityCceStatus('Equipped but not functional')} style={facilityCceStatus === 'Equipped but not functional' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Equipped but not functional</ThemedText>
            </TouchableOpacity>*/}
          </View>
        </View>


        <View  style={styles.questionaireContainer}>
          <ThemedText style={styles.subHeading}>CCE FUNCTIONALITY STATUS </ThemedText>
          <View style={styles.ageGradeContainer}>
            <TouchableOpacity onPress={() => setCceFunctionalityStatus('Functional')} style={cceFunctionalityStatus === 'Functional' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Functional</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCceFunctionalityStatus('Non functional - To be repaired.')} style={cceFunctionalityStatus === 'Non functional - To be repaired.' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Non functional - To be repaired.</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCceFunctionalityStatus('Non functional - To be decommisioned')} style={cceFunctionalityStatus === 'Non functional - To be decommisioned' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Non functional - To be decommisioned</ThemedText>
            </TouchableOpacity>
          </View>
         </View>

        <View  style={styles.questionaireContainer}>
          <ThemedText style={styles.subHeading}>DID HEALTH FACILITY MAKE  OUT-OF-POCKET EXPENSES FOR RI VACCINES THIS PERIOD? </ThemedText>
          <View style={styles.ageGradeContainer}>
            <TouchableOpacity onPress={() => setPocketExpenses('Yes')} style={pocketExpenses === 'Yes' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Yes</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPocketExpenses('No')} style={pocketExpenses === 'No' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>No</ThemedText>
            </TouchableOpacity>
          </View>
        </View>


        <ThemedText style={styles.header}>BCG LOGISTICS DATA</ThemedText>

        <Picker
          selectedValue={selectedManufacturer || ''}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedManufacturer(itemValue)
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
        <Text style={styles.label}>BCG VACCINE BATCH NUMBER</Text>
        <TextInput
              style={styles.input}
              placeholder="Enter BCG Vaccine batch number"
              value={batchNumber}
              onChangeText={setBatchNumber}
              
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
              onChangeText={setDiluentBatchNumber}
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
              onChangeText={setSyringe5BatchNumber}
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
              onChangeText={setSyringe2mlBatchNumber}
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
          <ThemedText style={styles.subHeading}>BCG VACCINE TEMP AT PICK-UP</ThemedText>
          <View style={styles.ageGradeContainer}>
            <TouchableOpacity onPress={() => handleTempSelections('Below 2°C')} style={vaccineTempAtPickup === 'Below 2°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}>
              <ThemedText style={styles.ageGradeOptionText}>Below 2°C</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTempSelections('Between 2°C - 8°C')} style={vaccineTempAtPickup === 'Between 2°C - 8°C' ? styles.selectedAgeGradess : styles.ageGradeOptions}>
              <ThemedText style={styles.ageGradeOptionText}>Between 2°C - 8°C</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTempSelections('Above 8°C')} style={vaccineTempAtPickup === 'Above 8°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}>
              <ThemedText style={styles.ageGradeOptionText}>Above 8°C</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {showHowLongs && (
  <View style={styles.questionaireContainer}>
    <ThemedText style={styles.subHeading}>HOW LONG HAD IT BEEN AT THIS TEMPERATURE?</ThemedText>
    <Picker
      selectedValue={howLongs}
      onValueChange={(itemValue) => setHowLongs(itemValue)}
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
            <TouchableOpacity onPress={() => setVaccineStageAtPickup('Stage 1')} style={vaccineStageAtPickup === 'Stage 1' ? styles.selectedAgeGradeStage1 : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 1</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVaccineStageAtPickup('Stage 2')} style={vaccineStageAtPickup === 'Stage 2' ? styles.selectedAgeGradeStage2 : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 2</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVaccineStageAtPickup('Stage 3')} style={vaccineStageAtPickup === 'Stage 3' ? styles.selectedAgeGradeStage3 : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 3</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVaccineStageAtPickup('Stage 4')} style={vaccineStageAtPickup === 'Stage 4' ? styles.selectedAgeGradeStage4 : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 4</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        
        <View>
        <Text style={styles.label}>BCG VACCINE OPENING BALANCE (PLEASE ENTER ONLY MULTIPLES OF 20)</Text>
        <TextInput
              style={styles.input}
              placeholder="Enter BCG Vaccine opening balance"
              value={openingBalance}
              onChangeText={setOpeningBalance}
            />
        </View>

        <View  style={styles.calc}>
          <ThemedText style={styles.subHeading}>BCG VACCINE OPENING BALANCE IN AMPOULES :</ThemedText>
          {openingBalance && (
           
              <ThemedText style={styles.mismatch}>
                {openingBalanceInAmples} 
              </ThemedText>
          )}
        </View>
        
        <View>
        <Text style={styles.label}>BCG DILUENT OPENING BALANCE (PLEASE ENTER ONLY MULTIPLES OF 20)</Text>
        <TextInput
              style={styles.input}
              placeholder="Enter BCG Diluent opening balance"
              value={diluentOpeningBalance}
              onChangeText={setDiluentOpeningBalance}
            />
        </View>

        <View  style={styles.calc}>
          <ThemedText style={styles.subHeading}>BCG DILUENT OPENING BALANCE IN AMPOULES :</ThemedText>
          {diluentOpeningBalance && (
           
              <ThemedText style={styles.mismatch}>
                {diluentOpeningBalanceInAmples} 
              </ThemedText>
          )}
        </View>
         
        
        <View  style={styles.calc}>
          <ThemedText style={styles.subHeading}>BCG DILUENT MISMATCH :</ThemedText>
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
        <Text style={styles.label}>BCG 0.05ML SYRINGE OPENING BALANCE (PLEASE ENTER ONLY MULTIPLES OF 20)</Text> 
        <TextInput
              style={styles.input}
              placeholder="Enter BCG 0.05ml syringe opening balance"
              value={syringeOpeningBalance}
              onChangeText={setSyringeOpeningBalance}
            />
        </View>

        <View  style={styles.calc}>
          <ThemedText style={styles.subHeading}>BCG SYRINGE 0.05ML MISMATCH :</ThemedText>
          {syringe5mismatch && (
            
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
              value={mlsyringeOpeningBalance}
              onChangeText={setMlsyringeOpeningBalance}
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
            value={averageMonthlyRequirement}
            onChangeText={setAverageMonthlyRequirement}
          /> 
        </View>

        <ThemedText style={styles.subHeading}>MMSQ MULTIPLICATION FACTOR:</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="MMSQ MULTIPLICATION FACTOR"
            value={multiplicationFactor}
            onChangeText={setMultiplicationFactor}
            keyboardType="numeric" // Ensure numeric keyboard for multiplication factor input
          /> 


          <View style={styles.calc}>

            
          <ThemedText style={styles.subHeading}>BCG VACCINE MONTHLY MAXIMUM STOCK QUANTITY:</ThemedText>
          
          
          {maximumStock && (
            <ThemedText style={styles.mismatch}>
              {maximumStock} doses
            </ThemedText>
          )}
        </View>


        <View style={styles.calc}>
          <ThemedText style={styles.subHeading}>
            BCG VACCINE DOSES REQUIRED TO MAKE UP TO MAXIMUM STOCK:
          </ThemedText>
          {dosesToIssueUp && (
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
          value={vaccineDosesIssued}
          onChangeText={setVaccineDosesIssued}
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
              {diluentRequiredForTotalAvailable} doses or  {DiluentRequiredForTotalAvailableInViles} vials/ampoules
            </ThemedText>
          )}
        </ThemedText>

        <View>
        <Text style={styles.label}>ACTUAL QUANTITY (DOSES) OF BCG DILUENT ISSUED (PLEASE ENTER ONLY MULTIPLES OF 20)</Text> 
        <TextInput
          style={styles.input}
          placeholder="BCG diluent issued "
          value={diluentIssued}
          onChangeText={setDiluentIssued}
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
              {vaccine5requiredToMatchBcgAvail} pcs
            </ThemedText>
          )}
        </View>

        <View>
        <Text style={styles.label}>ACTUAL BCG 0.05ML SYRINGE QUANTITY ISSUED (PLEASE ENTER ONLY MULTIPLES OF 20)</Text> 
      <TextInput
          style={styles.input}
          placeholder="BCG 0.05ml syringe Quantity Issued "
          value={syringeQuantityIssued}
          onChangeText={setSyringeQuantityIssued}
        />
        </View>
        <View style={styles.calc}>
          <ThemedText style={styles.subHeading}>
          Total 0.05ml syringe available:
          </ThemedText>
          {syringeOpeningBalance && syringeQuantityIssued && (
            <ThemedText style={styles.mismatch}>
              {ml5Total} pcs
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
              {mlsyringeReqFinalCalc} pcs
            </ThemedText>
          )}
        </View>


        <View>
        <Text style={styles.label}>ACTUAL BCG 2ML SYRINGE QUANTITY ISSUED </Text> 
        <TextInput
            style={styles.input}
            placeholder="BCG 2ml syringe Quantity Issued "
            value={mlsyringeQuantityIssued}
            onChangeText={setMlsyringeQuantityIssued}
          />
        </View>
    
      <View style={styles.calc}>
          <ThemedText style={styles.subHeading}>
          Total 2ml syringe available:
          </ThemedText>
          {mlsyringeOpeningBalance && mlsyringeQuantityIssued && (
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
          <ThemedText style={styles.subHeading}>BCG VACCINE TEMP AT ISSUE</ThemedText>
          <View style={styles.ageGradeContainer}>
            <TouchableOpacity onPress={() => handleTempSelection('Below 2°C')} style={vaccineTempAtIssue === 'Below 2°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}>
              <ThemedText style={styles.ageGradeOptionText}>Below 2°C</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTempSelection('Between 2°C - 8°C')} style={vaccineTempAtIssue === 'Between 2°C - 8°C' ? styles.selectedAgeGradess : styles.ageGradeOptions}>
              <ThemedText style={styles.ageGradeOptionText}>Between 2°C - 8°C</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTempSelection('Above 8°C')} style={vaccineTempAtIssue === 'Above 8°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}>
              <ThemedText style={styles.ageGradeOptionText}>Above 8°C</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* How Long Dropdown */}
        {showHowLong && (
          <View style={styles.questionaireContainer}>
            <ThemedText style={styles.subHeading}>HOW LONG HAD IT BEEN AT THIS TEMPERATURE?</ThemedText>
            <Picker
              selectedValue={howLong}
              onValueChange={(itemValue) => setHowLong(itemValue)}
              style={styles.pickerContainer}
            >
              <Picker.Item label="Less than 1 hrs" value="Less than 1 hrs" />
              <Picker.Item label="1hrs to 2 hrs" value="1hrs to 2 hrs" />
              <Picker.Item label="above 2 hrs" value="above 2 hrs" />
            </Picker>
          </View>
        )}

      <View  style={styles.questionaireContainer}>
         
        <ThemedText style={styles.subHeading}>BCG VACCINE VVM STAGE AT ISSUE</ThemedText>
          <View style={styles.ageGradeContainer}>
            <TouchableOpacity onPress={() => setVaccineStageAtIssue('Stage 1')} style={vaccineStageAtIssue === 'Stage 1' ? styles.selectedAgeGradeStage1 : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}> VVM Stage 1</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVaccineStageAtIssue('Stage 2')} style={vaccineStageAtIssue === 'Stage 2' ? styles.selectedAgeGradeStage2 : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 2</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVaccineStageAtIssue('Stage 3')} style={vaccineStageAtIssue === 'Stage 3' ? styles.selectedAgeGradeStage3 : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 3</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVaccineStageAtIssue('Stage 4')} style={vaccineStageAtIssue === 'Stage 4' ? styles.selectedAgeGradeStage4 : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 4</ThemedText>
            </TouchableOpacity>

        </View>
      </View>


      <TouchableOpacity onPress={handleGenerateFields} style={styles.buttonfill}>
        <Text style={styles.buttonText}>
          Fill another BCG Logistics form for a different manufacturer
        </Text>
      </TouchableOpacity>

        {/* Fields to be generated */}
        {generateFields && (
          
          <>
            
            <Text style={styles.header}>
              BCG LOGISTICS DATA
              <TouchableOpacity onPress={() => setGenerateFields(false)} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="black" />
            </TouchableOpacity>S
              
            </Text>
            
        <Picker
          selectedValue={selectedManufacturera}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedManufacturera(itemValue)
          }
          style={styles.pickerContainer} // Add style for the Picker container
            itemStyle={styles.pickerItem}
          >
            
          {manufacturers.map((manufacturer, index) => (
            <Picker.Item key={index} label={manufacturer} value={manufacturer} />
          ))}
        </Picker>

        <TextInput
              style={styles.input}
              placeholder="BCG Vaccine batch number"
              value={batchNumbera}
              onChangeText={setBatchNumbera}
            />

        <TextInput
              style={styles.input}
              placeholder="BCG Vaccine expiring date.     Format: January 7, 2019"
              value={expiryDatea}
              onChangeText={setExpiryDatea}
            />

        <TextInput
              style={styles.input}
              placeholder="BCG Vaccine opening balance"
              value={openingBalancea}
              onChangeText={setOpeningBalancea}
            />
 

<View style={styles.questionaireContainer}>
          <ThemedText style={styles.subHeading}>BCG Vaccine temp at pickup </ThemedText>
          <View style={styles.ageGradeContainer}>
            <TouchableOpacity onPress={() => handleTempSelection('Below 2°C')} style={vaccineTempAtIssue === 'Below 2°C' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Below 2°C</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTempSelection('Between 2°C - 8°C')} style={vaccineTempAtIssue === 'Between 2°C - 8°C' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Between 2°C - 8°C</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTempSelection('Above 8°C')} style={vaccineTempAtIssue === 'Above 8°C' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Above 8°C</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
    
    

        <View  style={styles.questionaireContainer}>
          <ThemedText style={styles.subHeading}>BCG Vaccine VVM stage at pickup </ThemedText>
          <View style={styles.ageGradeContainer}>
            <TouchableOpacity onPress={() => setVaccineStage('Stage 1')} style={vaccineStage === 'Stage 1' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 1</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVaccineStage('Stage 2')} style={vaccineStage === 'Stage 2' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 2</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVaccineStage('Stage 3')} style={vaccineStage === 'Stage 3' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 3</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVaccineStage('Stage 4')} style={vaccineStage === 'Stage 4' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 4</ThemedText>
            </TouchableOpacity>
          </View>
        </View>


        <TextInput
              style={styles.input}
              placeholder="BCG Diluent batch number"
              value={diluentBatchNumber}
              onChangeText={setDiluentBatchNumber}
            />

        <TextInput
              style={styles.input}
              placeholder="BCG Diluent expiring date.     Format: MM/DD/YY 01/17/2019"
              value={diluentExpiryDate}
              onChangeText={setDiluentExpiryDate}
            />

        <TextInput
              style={styles.input}
              placeholder="BCG Diluent opening balance"
              value={diluentOpeningBalancea}
              onChangeText={setDiluentOpeningBalancea}
            />
        <View  style={styles.questionaireContainer}>
        <ThemedText style={styles.subHeading}>BCG Diluent mismatch adjustment: {}</ThemedText>
        </View>

        
        <TextInput
              style={styles.input}
              placeholder="BCG 0.05ml syringe opening balance"
              value={syringeOpeningBalance}
              onChangeText={setSyringeOpeningBalance}
            />

        <TextInput
              style={styles.input}
              placeholder="BCG 2ml syringe opening balance"
              value={mlsyringeOpeningBalance}
              onChangeText={setMlsyringeOpeningBalance}
            />
        

        <TextInput
            style={styles.input}
            placeholder="0.05ml Syringe mismatch"
            value={syringemismatch}
            onChangeText={setSyringemismatch}
          />


        <TextInput
            style={styles.input}
            placeholder="2ml Syringe mismatch"
            value={mlsyringemismatch}
            onChangeText={setMlsyringemismatch}
          />

        <TextInput
            style={styles.input}
            placeholder="BCG Vaccine average monthly requirement"
            value={averageMonthlyRequirement}
            onChangeText={setAverageMonthlyRequirement}
          /> 


        <TextInput
            style={styles.input}
            placeholder="BCG vaccine maximum stock quantity"
            value={maximumStock}
            onChangeText={setMaximumStock}
          />        
          
        <TextInput
          style={styles.input}
          placeholder="BCG vaccine doses to issue up to monthly MSQ"
          value={dosesToIssueUp}
          onChangeText={setDosesToIssueUp}
        />

        <TextInput
          style={styles.input}
          placeholder="BCG vaccine doses issued "
          value={vaccineDosesIssued}
          onChangeText={setVaccineDosesIssued}
        />


        <TextInput
          style={styles.input}
          placeholder="BCG diluent issued "
          value={diluentIssued}
          onChangeText={setDiluentIssued}
        />


        
      <TextInput
          style={styles.input}
          placeholder="BCG 0.05ml syringe Quantity Issued "
          value={syringeQuantityIssued}
          onChangeText={setSyringeQuantityIssued}
        />


        
      <TextInput
          style={styles.input}
          placeholder="BCG 2ml syringe Quantity Issued "
          value={mlsyringeQuantityIssued}
          onChangeText={setMlsyringeQuantityIssued}
        />
  
  <View style={styles.questionaireContainer}>
          <ThemedText style={styles.subHeading}>BCG Vaccine temp at issue</ThemedText>
          <View style={styles.ageGradeContainer}>
            <TouchableOpacity onPress={() => handleTempSelection('Below 2°C')} style={vaccineTempAtIssue === 'Below 2°C' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Below 2°C</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTempSelection('Between 2°C - 8°C')} style={vaccineTempAtIssue === 'Between 2°C - 8°C' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Between 2°C - 8°C</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTempSelection('Above 8°C')} style={vaccineTempAtIssue === 'Above 8°C' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Above 8°C</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* How Long Dropdown */}
        {showHowLong && (
          <View style={styles.questionaireContainer}>
            <ThemedText style={styles.subHeading}>How long had it been at this temperature?</ThemedText>
            <Picker
              selectedValue={howLong}
              onValueChange={(itemValue) => setHowLong(itemValue)}
              style={styles.pickerContainer}
            >
              <Picker.Item label="Less than 1 hrs" value="Less than 1 hrs" />
              <Picker.Item label="1hrs to 2 hrs" value="1hrs to 2 hrs" />
              <Picker.Item label="above 2 hrs" value="above 2 hrs" />
            </Picker>
          </View>
        )}

      <View  style={styles.questionaireContainer}>
         
        <ThemedText style={styles.subHeading}>BCG Vaccine VVM stage at issue </ThemedText>
          <View style={styles.ageGradeContainer}>
            <TouchableOpacity onPress={() => setVaccineStageAtIssue('Stage 1')} style={vaccineStageAtIssue === 'Stage 1' ? styles.selectedAgeGradeStage1 : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}> VVM Stage 1</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVaccineStageAtIssue('Stage 2')} style={vaccineStageAtIssue === 'Stage 2' ? styles.selectedAgeGradeStage2 : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 2</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVaccineStageAtIssue('Stage 3')} style={vaccineStageAtIssue === 'Stage 3' ? styles.selectedAgeGradeStage3 : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 3</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVaccineStageAtIssue('Stage 4')} style={vaccineStageAtIssue === 'Stage 4' ? styles.selectedAgeGradeStage4 : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 4</ThemedText>
            </TouchableOpacity>
            </View>
      </View>

      <TouchableOpacity onPress={handleGenerateFields1} style={styles.buttonfill}>
        <Text style={styles.buttonText}>
          Fill another BCG Logistics form for a different manufacturer
        </Text>
      </TouchableOpacity>

      {generateFields1 && (
          
          <>
            
            <Text style={styles.header}>
              BCG LOGISTICS DATA
              <TouchableOpacity onPress={() => setGenerateFields1(false)} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="black" />
            </TouchableOpacity>S
              
            </Text>
            
        <Picker
          selectedValue={selectedManufacturerb}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedManufacturerb(itemValue)
          }
          style={styles.pickerContainer} // Add style for the Picker container
            itemStyle={styles.pickerItem}
          >
            
          {manufacturers.map((manufacturer, index) => (
            <Picker.Item key={index} label={manufacturer} value={manufacturer} />
          ))}
        </Picker>

        <TextInput
              style={styles.input}
              placeholder="BCG Vaccine batch number"
              value={batchNumbera}
              onChangeText={setBatchNumbera}
            />

        <TextInput
              style={styles.input}
              placeholder="BCG Vaccine expiring date.     Format: January 7, 2019"
              value={expiryDatea}
              onChangeText={setExpiryDatea}
            />

        <TextInput
              style={styles.input}
              placeholder="BCG Vaccine opening balance"
              value={openingBalancea}
              onChangeText={setOpeningBalancea}
            />
 

<View style={styles.questionaireContainer}>
          <ThemedText style={styles.subHeading}>BCG Vaccine temp at pickup </ThemedText>
          <View style={styles.ageGradeContainer}>
            <TouchableOpacity onPress={() => handleTempSelection('Below 2°C')} style={vaccineTempAtIssue === 'Below 2°C' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Below 2°C</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTempSelection('Between 2°C - 8°C')} style={vaccineTempAtIssue === 'Between 2°C - 8°C' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Between 2°C - 8°C</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTempSelection('Above 8°C')} style={vaccineTempAtIssue === 'Above 8°C' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Above 8°C</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
    
    

        <View  style={styles.questionaireContainer}>
          <ThemedText style={styles.subHeading}>BCG Vaccine VVM stage at pickup </ThemedText>
          <View style={styles.ageGradeContainer}>
            <TouchableOpacity onPress={() => setVaccineStage('Stage 1')} style={vaccineStage === 'Stage 1' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 1</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVaccineStage('Stage 2')} style={vaccineStage === 'Stage 2' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 2</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVaccineStage('Stage 3')} style={vaccineStage === 'Stage 3' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 3</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVaccineStage('Stage 4')} style={vaccineStage === 'Stage 4' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 4</ThemedText>
            </TouchableOpacity>
          </View>
        </View>


        <TextInput
              style={styles.input}
              placeholder="BCG Diluent batch number"
              value={diluentBatchNumber}
              onChangeText={setDiluentBatchNumber}
            />

        <TextInput
              style={styles.input}
              placeholder="BCG Diluent expiring date.     Format: MM/DD/YY 01/17/2019"
              value={diluentExpiryDate}
              onChangeText={setDiluentExpiryDate}
            />

        <TextInput
              style={styles.input}
              placeholder="BCG Diluent opening balance"
              value={diluentOpeningBalancea}
              onChangeText={setDiluentOpeningBalancea}
            />
        <View  style={styles.questionaireContainer}>
        <ThemedText style={styles.subHeading}>BCG Diluent mismatch adjustment: {}</ThemedText>
        </View>

        
        <TextInput
              style={styles.input}
              placeholder="BCG 0.05ml syringe opening balance"
              value={syringeOpeningBalance}
              onChangeText={setSyringeOpeningBalance}
            />

        <TextInput
              style={styles.input}
              placeholder="BCG 2ml syringe opening balance"
              value={mlsyringeOpeningBalance}
              onChangeText={setMlsyringeOpeningBalance}
            />
        

        <TextInput
            style={styles.input}
            placeholder="0.05ml Syringe mismatch"
            value={syringemismatch}
            onChangeText={setSyringemismatch}
          />


        <TextInput
            style={styles.input}
            placeholder="2ml Syringe mismatch"
            value={mlsyringemismatch}
            onChangeText={setMlsyringemismatch}
          />

        <TextInput
            style={styles.input}
            placeholder="BCG Vaccine average monthly requirement"
            value={averageMonthlyRequirement}
            onChangeText={setAverageMonthlyRequirement}
          /> 


        <TextInput
            style={styles.input}
            placeholder="BCG vaccine maximum stock quantity"
            value={maximumStock}
            onChangeText={setMaximumStock}
          />        
          
        <TextInput
          style={styles.input}
          placeholder="BCG vaccine doses to issue up to monthly MSQ"
          value={dosesToIssueUp}
          onChangeText={setDosesToIssueUp}
        />

        <TextInput
          style={styles.input}
          placeholder="BCG vaccine doses issued "
          value={vaccineDosesIssued}
          onChangeText={setVaccineDosesIssued}
        />


        <TextInput
          style={styles.input}
          placeholder="BCG diluent issued "
          value={diluentIssued}
          onChangeText={setDiluentIssued}
        />


        
      <TextInput
          style={styles.input}
          placeholder="BCG 0.05ml syringe Quantity Issued "
          value={syringeQuantityIssued}
          onChangeText={setSyringeQuantityIssued}
        />


        
      <TextInput
          style={styles.input}
          placeholder="BCG 2ml syringe Quantity Issued "
          value={mlsyringeQuantityIssued}
          onChangeText={setMlsyringeQuantityIssued}
        />
  
  <View style={styles.questionaireContainer}>
          <ThemedText style={styles.subHeading}>BCG Vaccine temp at issue</ThemedText>
          <View style={styles.ageGradeContainer}>
            <TouchableOpacity onPress={() => handleTempSelection('Below 2°C')} style={vaccineTempAtIssue === 'Below 2°C' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Below 2°C</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTempSelection('Between 2°C - 8°C')} style={vaccineTempAtIssue === 'Between 2°C - 8°C' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Between 2°C - 8°C</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTempSelection('Above 8°C')} style={vaccineTempAtIssue === 'Above 8°C' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Above 8°C</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* How Long Dropdown */}
        {showHowLong && (
          <View style={styles.questionaireContainer}>
            <ThemedText style={styles.subHeading}>How long had it been at this temperature?</ThemedText>
            <Picker
              selectedValue={howLong}
              onValueChange={(itemValue) => setHowLong(itemValue)}
              style={styles.pickerContainer}
            >
              <Picker.Item label="Less than 1 hrs" value="Less than 1 hrs" />
              <Picker.Item label="1hrs to 2 hrs" value="1hrs to 2 hrs" />
              <Picker.Item label="above 2 hrs" value="above 2 hrs" />
            </Picker>
          </View>
        )}

      <View  style={styles.questionaireContainer}>
         
        <ThemedText style={styles.subHeading}>BCG Vaccine VVM stage at issue </ThemedText>
          <View style={styles.ageGradeContainer}>
            <TouchableOpacity onPress={() => setVaccineStageAtIssue('Stage 1')} style={vaccineStageAtIssue === 'Stage 1' ? styles.selectedAgeGradeStage1 : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}> VVM Stage 1</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVaccineStageAtIssue('Stage 2')} style={vaccineStageAtIssue === 'Stage 2' ? styles.selectedAgeGradeStage2 : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 2</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVaccineStageAtIssue('Stage 3')} style={vaccineStageAtIssue === 'Stage 3' ? styles.selectedAgeGradeStage3 : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>VVM Stage 3</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVaccineStageAtIssue('Stage 4')} style={vaccineStageAtIssue === 'Stage 4' ? styles.selectedAgeGradeStage4 : styles.ageGradeOption}>
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

      {/*
      {!locationSent && <ThemedText   style={styles.text}>Please navigate to the top to send your location before submitting.</ThemedText>}
       */}
      <View style={styles.wrapper}>
      <TouchableOpacity onPress={handleOpenForm} style={styles.submitButton}>
        <ThemedText style={styles.submitButtonText}>Open Facility Authentication form</ThemedText>
      </TouchableOpacity>

      
      
        {/* Fields to be generated 
      <TouchableOpacity style={styles.button} onPress={clearFields}>
        <Text style={styles.buttonText}>Clear Fields</Text>
      </TouchableOpacity>
      */}
      </View>

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
