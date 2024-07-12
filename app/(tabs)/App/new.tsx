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
  const [openingBalancea, setOpeningBalancea] = useState('');
  const [diluentOpeningBalance, setDiluentOpeningBalance] = useState('')
  const [diluentOpeningBalancea, setDiluentOpeningBalancea] = useState('')
  const [syringeOpeningBalance, setSyringeOpeningBalance] = useState('');
  const [mlsyringeOpeningBalance, setMlsyringeOpeningBalance] = useState('');
  const [diluentmismatch, setDiluentmismatch] = useState('');
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
  const [vaccineTempAtIssue, setVaccineTempAtIssue] = useState('');
  const [vaccineStage, setVaccineStage] = useState('');
  const [vaccineStageAtIssue, setVaccineStageAtIssue] = useState('');
  const [vaccineTempAtIssues, setVaccineTempAtIssues] = useState('');
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
  const [generateFieldsCount, setGenerateFieldsCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [locationSent, setLocationSent] = useState(false);
  const [syringe5BatchNumber, setSyringe5BatchNumber] = useState('');
  const [syringe5ExpiryDate, setSyringe5ExpiryDate] = useState('');
  const [syringe2mlBatchNumber, setSyringe2mlBatchNumber] = useState('');
  const [syringe2mlExpiryDate, setSyringe2mlExpiryDate] = useState('');
  const [quantityReqToMax, setQuantityReqToMax] = useState('');
  const [diluentMaxStock, setDiluentMaxStock] = useState(''); 
  const [syringeMaxStockQuantity, setSyringeMaxStockQuantity] = useState('');
  const [mlsyringeMaxStockQuantity, setMlsyringeMaxStockQuantity] = useState('');
  const [syringeToIssueUp, setSyringeToIssueUp] = useState('');
  const [mlsyringeToIssueUp, setMlsyringeToIssueUp] = useState(''); 
  const [vaccineTotal, setVaccineTotal] = useState('');  
  const [diluentRequiredForTotalAvailable, setDiluentRequiredForTotalAvailable] = useState('');




  const clearFields = () => {
    setSelectedManufacturer('');
      setSelectedManufacturera('');
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
      setSyringeQuantityIssued('');
      setMlsyringeQuantityIssued('');
      setVaccineTempAtIssue('');
      setVaccineStageAtIssue('');
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



  const handleSubmit = async () => {
    try {

      const diluentMismatchAdjustment = parseInt(openingBalance) - parseInt(diluentOpeningBalance);
        setDiluentmismatch(diluentMismatchAdjustment.toString());

      const diluentMismatchAdjustmenta = parseInt(openingBalancea) - parseInt(diluentOpeningBalancea);
        setDiluentmismatcha(diluentMismatchAdjustmenta.toString());

      const syringe5MismatchAdjustment = parseInt(openingBalance) - parseInt(syringeOpeningBalance);
      setSyringe5mismatch(syringe5MismatchAdjustment.toString());

      const syringe2MismatchAdjustment = parseInt(openingBalance) - (20 * parseInt(mlsyringeOpeningBalance));
      setSyringe2mismatch(syringe2MismatchAdjustment.toString());

      const maximumStockCalc = (1.5 * parseInt(averageMonthlyRequirement));
      setMaximumStock(maximumStockCalc.toString());

      const quantityReqToMaxCalc = parseInt(maximumStock) - (Number(openingBalance));
      setDosesToIssueUp(quantityReqToMaxCalc.toString());


      const syringeToIssueUpCalc = parseInt(syringeMaxStockQuantity) - (Number(syringeOpeningBalance));
      setSyringeToIssueUp(syringeToIssueUpCalc.toString());
      
      const mlsyringeToIssueUpCalc = parseInt(mlsyringeMaxStockQuantity) - (Number(mlsyringeOpeningBalance));
      setMlsyringeToIssueUp(mlsyringeToIssueUpCalc.toString());   

      const vaccineTotalCalc = parseInt(vaccineDosesIssued) + (Number(openingBalance));
      setVaccineTotal(vaccineTotalCalc.toString()); 

      const DiluentRequiredForTotalAvailablCalc = parseInt(vaccineTotal) - (Number(diluentOpeningBalance));
      setDiluentRequiredForTotalAvailable(DiluentRequiredForTotalAvailablCalc.toString());
      
      


        // Fetch the current user login details (you need to implement this part)
        const currentUser = getCurrentUser(); // Example function, replace with your actual implementation
        
        // Handle permissions and get the current location
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
       
        let location = await Location.getCurrentPositionAsync({});

        if (noLocation()) {
          Alert.alert('Error', 'Please click on the button at the top to send your current location.');
          return;
        }

        setSubmitted(true);

        if (!noLocation() && !loadingLocation) {
        
        // Create data object including user login details and location
        const data = {
            selectedManufacturer,
            selectedManufacturera,
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
            vaccineTempAtIssues,
            openingBalance,
            openingBalancea,
            diluentOpeningBalance,
            diluentOpeningBalancea,
            syringeOpeningBalance,
            mlsyringeOpeningBalance,
            diluentmismatch,
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
            generateFieldsCount,
            submitted
            
        };
        // Write form data to Firestore
        const docRef = await addDoc(collection(db, 'Tracking-Form'), data);
        console.log('Document written with ID: ', docRef.id);

        // Add a new document in collection "cities"
       
        const cityRef = doc(db, 'Tracking-Form', 'LA');
        await setDoc(cityRef, data, { merge: true });

      
      }
      setLocationSent(true);
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
    setVaccineTemp(temp); // Set vaccineTemp state
    
    setShowHowLong(temp === 'Below 2°C' || temp === 'Above 8°C');
  };

  const handleTempSelections = (temp: string) => {
    console.log(typeof temp);
    
    setVaccineTempAtIssues(temp); // Set vaccineTempAtIssue state
    
    // Set showHowLong to true only if the selected temperature is 'Below 2°C' or 'Above 8°C'
    setShowHowLongs(temp === 'Below 2°C' || temp === 'Above 8°C');
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
          <ThemedText style={styles.subHeading}>Type of distribution. </ThemedText>
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
          <ThemedText style={styles.subHeading}>Reporting period. </ThemedText>
          
          <View style={styles.ageGradeContainer}>
          <View>
            <TouchableOpacity onPress={() => setReporting('Sep 2024')} style={reporting === 'Sep 2024' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Sep 2024</ThemedText>
            </TouchableOpacity>
          </View>
          </View>
        </View>


        <View style={styles.questionaireContainer}>
          <ThemedText style={styles.subHeading}>Issuing cold store. </ThemedText>
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
          <Text style={styles.label}>DELIVERY DATE</Text>
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
          <ThemedText style={styles.subHeading}>Health facility. </ThemedText>
            <View style={styles.ageGradeContainer}>
              
      <View style={styles.container}>
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
          <ThemedText style={styles.subHeading}>Health facility CCE status. </ThemedText>
          <View style={styles.ageGradeContainer}>
            <TouchableOpacity onPress={() => setFacilityCceStatus('Equipped')} style={facilityCceStatus === 'Equipped' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Equipped</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFacilityCceStatus('Unequipped')} style={facilityCceStatus === 'Unequipped' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Unequipped</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFacilityCceStatus('Equipped but not functional')} style={facilityCceStatus === 'Equipped but not functional' ? styles.selectedAgeGrade : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Equipped but not functional</ThemedText>
            </TouchableOpacity>
          </View>
        </View>


        <View  style={styles.questionaireContainer}>
          <ThemedText style={styles.subHeading}>CCE functionality status. </ThemedText>
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
          <ThemedText style={styles.subHeading}>Did health facility make out-of-pocket expenses for RI vaccines this period? </ThemedText>
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
        <Text style={styles.label}>BCG VACCINE EXPIRY DATE</Text>
        <TextInput
              style={styles.input}
              placeholder="Enter BCG Vaccine expiring date.     Format: January 7, 2019"
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
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
        <Text style={styles.label}>BCG DILUENT EXPIRY DATE</Text>
        <TextInput
              style={styles.input}
              placeholder="BCG Diluent expiring date.     Format: MM/DD/YY 01/17/2019"
              value={diluentExpiryDate}
              onChangeText={setDiluentExpiryDate}
            />
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
        <Text style={styles.label}>BCG 0.05ML SYRINGE EXPIRY DATE</Text>
        <TextInput
              style={styles.input}
              placeholder="Enter BCG Syringe 0.05ml expiring date.     Format: MM/DD/YY 01/17/2019"
              value={syringe5ExpiryDate}
              onChangeText={setSyringe5ExpiryDate}
            />
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
        <Text style={styles.label}>BCG 2ML SYRINGE EXPIRY DATE</Text>
        <TextInput
              style={styles.input}
              placeholder="BCG Syringe 2ml expiring date.     Format: MM/DD/YY 01/17/2019"
              value={syringe2mlExpiryDate}
              onChangeText={setSyringe2mlExpiryDate}
            />
        </View>


<View style={styles.questionaireContainer}>
          <ThemedText style={styles.subHeading}>BCG Vaccine temp at pickup</ThemedText>
          <View style={styles.ageGradeContainer}>
            <TouchableOpacity onPress={() => handleTempSelections('Below 2°C')} style={vaccineTempAtIssues === 'Below 2°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}>
              <ThemedText style={styles.ageGradeOptionText}>Below 2°C</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTempSelections('Between 2°C - 8°C')} style={vaccineTempAtIssues === 'Between 2°C - 8°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}>
              <ThemedText style={styles.ageGradeOptionText}>Between 2°C - 8°C</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTempSelections('Above 8°C')} style={vaccineTempAtIssues === 'Above 8°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}>
              <ThemedText style={styles.ageGradeOptionText}>Above 8°C</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {showHowLongs && (
  <View style={styles.questionaireContainer}>
    <ThemedText style={styles.subHeading}>How long had it been at this temperature?</ThemedText>
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

        
        <View>
        <Text style={styles.label}>BCG VACCINE OPENING BALANCE</Text>
        <TextInput
              style={styles.input}
              placeholder="Enter BCG Vaccine opening balance"
              value={openingBalance}
              onChangeText={setOpeningBalance}
            />
        </View>
        
        <View>
        <Text style={styles.label}>BCG DILUENT OPENING BALANCE</Text>
        <TextInput
              style={styles.input}
              placeholder="Enter BCG Diluent opening balance"
              value={diluentOpeningBalance}
              onChangeText={setDiluentOpeningBalance}
            />
        </View>

        <View>
        <Text style={styles.label}>BCG 0.05ml SYRINGE OPENING BALANCE</Text> 
        <TextInput
              style={styles.input}
              placeholder="Enter BCG 0.05ml syringe opening balance"
              value={syringeOpeningBalance}
              onChangeText={setSyringeOpeningBalance}
            />
        </View>

        <View>
        <Text style={styles.label}>BCG 2ml SYRINGE OPENING BALANCE</Text> 
        <TextInput
              style={styles.input}
              placeholder="Enter BCG 2ml syringe opening balance"
              value={mlsyringeOpeningBalance}
              onChangeText={setMlsyringeOpeningBalance}
            />
        </View>
        


        <View style={styles.questionaireContainer}>
          <ThemedText style={styles.subHeading}>BCG Diluent mismatch :</ThemedText>
          {diluentmismatch && (
            <ThemedText style={styles.mismatch}>
              {diluentmismatch} 
            </ThemedText>
          )}
          <ThemedText style={styles.subHeading}>BCG Syringe 0.5ml mismatch :</ThemedText>
          {syringe5mismatch && (
            <ThemedText style={styles.mismatch}>
              {syringe5mismatch} 
            </ThemedText>
          )}
          <ThemedText style={styles.subHeading}>BCG syringe 2ml mismatch :</ThemedText>
          {syringe2mismatch && (
            <ThemedText style={styles.mismatch}>
              {syringe2mismatch} 
            </ThemedText>
          )}
        </View>


        <View>
        <Text style={styles.label}>BCG VACCINE AVERAGE MONTHLY REQUIREMENT  (AMR)</Text> 
        <TextInput
            style={styles.input}
            placeholder="Enter BCG Vaccine average monthly requirement"
            value={averageMonthlyRequirement}
            onChangeText={setAverageMonthlyRequirement}
          /> 
        </View>


          <View style={styles.questionaireContainer}>
          <ThemedText style={styles.subHeading}>BCG vaccine monthly maximum stock quantity:</ThemedText>
          {maximumStock && (
            <ThemedText style={styles.mismatch}>
              {maximumStock} of BCG Vaccine
            </ThemedText>
          )}
        </View>


        <View style={styles.questionaireContainer}>
          <ThemedText style={styles.subHeading}>
            BCG vaccine doses to issue to make up to maximum stock:
          </ThemedText>
          {dosesToIssueUp && (
            <ThemedText style={styles.mismatch}>
              {dosesToIssueUp} of BCG Vaccine
            </ThemedText>
          )}
        </View> 
          


        <View>
        <Text style={styles.label}>ACTUAL BCG VACCINE DOSES ISSUED</Text> 
        <TextInput
          style={styles.input}
          placeholder="BCG vaccine doses issued "
          value={vaccineDosesIssued}
          onChangeText={setVaccineDosesIssued}
        /> 
        </View>

        <View style={styles.questionaireContainer}>
          <ThemedText style={styles.subHeading}>
          BCG vaccine total available:
          </ThemedText>
          {vaccineTotal && (
            <ThemedText style={styles.mismatch}>
              {vaccineTotal} of BCG 2 ml syringe
            </ThemedText>
          )}
        </View>

        <View>
        <Text style={styles.label}>ACTUAL BCG DILUENT ISSUED</Text> 
        <TextInput
          style={styles.input}
          placeholder="BCG diluent issued "
          value={diluentIssued}
          onChangeText={setDiluentIssued}
        />
        </View>


        <View>
        <Text style={styles.label}>ACTUAL BCG 0.05ML SYRINGE QUANTITY ISSUED</Text> 
      <TextInput
          style={styles.input}
          placeholder="BCG 0.05ml syringe Quantity Issued "
          value={syringeQuantityIssued}
          onChangeText={setSyringeQuantityIssued}
        />
        </View>


        <View>
        <Text style={styles.label}>ACTUAL BCG 2ML SYRINGE QUANTITY ISSUED</Text> 
      <TextInput
          style={styles.input}
          placeholder="BCG 2ml syringe Quantity Issued "
          value={mlsyringeQuantityIssued}
          onChangeText={setMlsyringeQuantityIssued}
        />
      </View>

  <View style={styles.questionaireContainer}>
          <ThemedText style={styles.subHeading}>BCG Vaccine temp at issue</ThemedText>
          <View style={styles.ageGradeContainer}>
            <TouchableOpacity onPress={() => handleTempSelection('Below 2°C')} style={vaccineTempAtIssue === 'Below 2°C' ? styles.selectedAgeGrades : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Below 2°C</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTempSelection('Between 2°C - 8°C')} style={vaccineTempAtIssue === 'Between 2°C - 8°C' ? styles.selectedAgeGrades : styles.ageGradeOption}>
              <ThemedText style={styles.ageGradeOptionText}>Between 2°C - 8°C</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTempSelection('Above 8°C')} style={vaccineTempAtIssue === 'Above 8°C' ? styles.selectedAgeGrades : styles.ageGradeOption}>
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


      <TouchableOpacity onPress={handleGenerateFields} style={styles.button}>
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
            </TouchableOpacity>
              
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
        <ThemedText style={styles.subHeading}>BCG Diluent mismatch adjustment: {diluentmismatch}</ThemedText>
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
      
  
      
      {!locationSent && <ThemedText   style={styles.text}>Please navigate to the top to send your location before submitting.</ThemedText>}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <ThemedText style={styles.submitButtonText}>Submit</ThemedText>
      </TouchableOpacity>

 {/*<TouchableOpacity style={styles.button} onPress={clearFields}>
        <Text style={styles.buttonText}>Clear Fields</Text>
      </TouchableOpacity>
   
      {!locationSent && <ThemedText   style={styles.text}>Please navigate to the top to send your location before submitting.</ThemedText>}
       */}
  
        


      
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
   
    marginTop: 20,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
    width: 200, 
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  buttonContainer2: {
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
    marginBottom: 36,
    paddingHorizontal: 18,
    borderRadius: 4,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    backgroundColor: 'lightblue',
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
    backgroundColor: 'lightblue',
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
    backgroundColor: 'lightblue',
    padding: 8,
    borderRadius: 4,
  },
  selectedAgeGradeStage1: {
    backgroundColor: 'darkgreen',
    padding: 8,
    borderRadius: 4,
},
selectedAgeGradeStage2: {
    backgroundColor: 'lightgreen',
    padding: 8,
    borderRadius: 4,
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
    marginBottom: 8,
  },
  mismatch: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#6FA4E8', 
    backgroundColor: '#D3D3D3', 
  },

  submitButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'center', // Horizontally center the button
    width: '40%',
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
    backgroundColor: 'white', 
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
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
},
buttonText: {
    color: 'white',
    fontWeight: 'bold',
},
label: {
  fontSize: 16,
  marginBottom: 5,
  backgroundColor: '#ccc', // Grey background color
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 5,
  fontWeight: 'bold',
},
});
