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
      
      
  };

  

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
      
      


        // Fetch the current user login details (you need to implement this part)
        const currentUser = getCurrentUser(); // Example function, replace with your actual implementation
        
         
        let location = await Location.getCurrentPositionAsync({});

        if (noLocation()) {
          Alert.alert('Error', 'Please click on the button at the top to send your current location.');
          return;
        }

     
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
        // Optionally, you can perform additional operations here after successful data write.
  }

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

  

  
  

  const handleNavigation = () => {
    // Navigate to the other page
    navigation.navigate('MyComponent'); 
};



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
        


            
          </>
        )}
      
  
      
      {!locationSent && <ThemedText   style={styles.text}>Please navigate to the top to send your location before submitting.</ThemedText>}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <ThemedText style={styles.submitButtonText}>Submit</ThemedText>
      </TouchableOpacity>
      
      </ThemedView>

    </ParallaxScrollView>
    
  );
}
