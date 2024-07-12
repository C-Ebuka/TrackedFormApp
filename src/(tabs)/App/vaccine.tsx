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
 
  const [generateFields, setGenerateFields] = useState(false);
  const [showSupervisorForm, setShowSupervisorForm] = useState(false); 


   


  
    




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
        <Text style={styles.label}>BCG VACCINE OPENING BALANCE (PLEASE ENTER ONLY MULTIPLES OF 20)</Text>
        <TextInput
              style={styles.input}
              placeholder="Enter BCG Vaccine opening balance"
              value={openingBalance}
              onChangeText={setOpeningBalance}
            />
        </View>



  <View style={styles.questionaireContainer}>
          <ThemedText style={styles.subHeading}>BCG VACCINE TEMP AT ISSUE</ThemedText>
          <View style={styles.ageGradeContainer}>
            <TouchableOpacity onPress={() => handleTempSelection('Below 2°C')} style={vaccineTempAtIssue === 'Below 2°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}>
              <ThemedText style={styles.ageGradeOptionText}>Below 2°C</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTempSelection('Between 2°C - 8°C')} style={vaccineTempAtIssue === 'Between 2°C - 8°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}>
              <ThemedText style={styles.ageGradeOptionText}>Between 2°C - 8°C</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTempSelection('Above 8°C')} style={vaccineTempAtIssue === 'Above 8°C' ? styles.selectedAgeGrades : styles.ageGradeOptions}>
              <ThemedText style={styles.ageGradeOptionText}>Above 8°C</ThemedText>
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
s
      
      {!locationSent && <ThemedText   style={styles.text}>Please navigate to the top to send your location before submitting.</ThemedText>}
      <View style={styles.wrapper}>
      <TouchableOpacity onPress={handleOpenForm} style={styles.submitButton}>
        <ThemedText style={styles.submitButtonText}>Open Facility Authentication form</ThemedText>
      </TouchableOpacity>

      
      

      <TouchableOpacity style={styles.button} onPress={clearFields}>
        <Text style={styles.buttonText}>Clear Fields</Text>
      </TouchableOpacity>
      </View>

      {showSupervisorForm && (
        <SupervisorAuthForm onSubmit={handleSubmit}  />
      
      
      )}
  
      
      </ThemedView>

    </ParallaxScrollView>
    
  );
}

