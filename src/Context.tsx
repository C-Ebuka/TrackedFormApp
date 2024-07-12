import React, { createContext, useContext, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/database';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import * as Location from 'expo-location';
import { Alert } from 'react-native';




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


// Define types for form data
interface Data {
  vendorName: string;
  vendorPhoneNumber: string;
  conveyorName: string;
  conveyorPhoneNumber: string;
  coldStore: string;
  distribution: string;
  reporting: string;
  healthFacilityName: string;
  healthFacilityWard: string;
  healthFacilityLGA: string;
  healthFacilityState: string;
  facilityCceStatus: string;
  cceFunctionalityStatus: string;
  pocketExpenses: string;
  selectedState: string | null;
  selectedLocalGovt: string | null;
  selectedWard: string | null;
  selectedFacility: string | null;
  selectedManufacturer: string | null;
  selectedManufacturera: string | null;
  selectedManufacturerb: string | null;
  vaccineTemp: string | null;
  vaccineTemps: string | null;
  vaccineStage: string | null;
  vaccineStageAtIssue: string | null;
  vaccineStageAtPickup: string | null;
  vaccineTempAtPickup: string | null;
  vaccineTempAtIssues: string | null;
  openingBalance: string | null;
  openingBalancea: string | null;
  diluentOpeningBalance: string | null;
  diluentOpeningBalancea: string | null;
  syringeOpeningBalance: string | null;
  mlsyringeOpeningBalance: string | null;      
  syringemismatch: string | null;
  mlsyringemismatch: string | null;
  averageMonthlyRequirement: string | null;
  maximumStock: string | null;
  dosesToIssueUp: string | null;
  vaccineDosesIssued: string | null;
  diluentIssued: string | null;
  syringeQuantityIssued: string | null;
  mlsyringeQuantityIssued: string | null;
  vaccineTempAtIssue: string | null;
  dateOfPickUp: string | null;
  timeOfPickUp: string | null;
  dateOfDelivery: string | null;
  timeOfDelivery: string | null;
  batchNumber: string | null;
  batchNumbera: string | null;
  howLong: string | null;
  showHowLongs: string | null;
  showHowLong: string | null;
  user: string | null; 
  location: {
    latitude: string;
    longitude: string;
    timestamp: string;
  };
  errorMsg: string;
  loadingLocation: string;
   
  generateFields: string;
  generateFields1: string;
  generateFields2: string;
  generateFieldsCount: string;
  generateFieldsCount1: string;
  generateFieldsCount2: string;
  submitted: string;
}

// Define types for context values
interface DataContextType {
  Data: Data;
  updateData: (newData: Partial<Data>) => void;
  handleSubmit: (db: any, collectionName: string) => Promise<void>;
}

// Create a context object with initial values
const DataContext = createContext<DataContextType | undefined>(undefined);

// Create a provider component
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [Data, setData] = useState<Data>({
    vendorName: '',
    vendorPhoneNumber: '',
    conveyorName: '',
    conveyorPhoneNumber: '',
    coldStore: '',
    distribution: '',
    reporting: '',
    healthFacilityName: '',
    healthFacilityWard: '',
    healthFacilityLGA: '',
    healthFacilityState: '',
    facilityCceStatus: '',
    cceFunctionalityStatus: '',
    pocketExpenses: '',
    selectedState: null,
    selectedLocalGovt: null,
    selectedWard: null,
    selectedFacility: null,
    selectedManufacturer: '',
    selectedManufacturera: '',
    selectedManufacturerb: '',
    vaccineTemp: '',
    vaccineTemps: '',
    vaccineStage: '',
    vaccineStageAtIssue: '',
    vaccineStageAtPickup: '',
    vaccineTempAtPickup: '',
    vaccineTempAtIssues: '',
    openingBalance: '',
    openingBalancea: '',
    diluentOpeningBalance: '',
    diluentOpeningBalancea: '',
    syringeOpeningBalance: '',
    mlsyringeOpeningBalance: '',      
    syringemismatch: '',
    mlsyringemismatch: '',
    averageMonthlyRequirement: '',
    maximumStock: '',
    dosesToIssueUp: '',
    vaccineDosesIssued: '',
    diluentIssued: '',
    syringeQuantityIssued: '',
    mlsyringeQuantityIssued: '',
    vaccineTempAtIssue: '',
    dateOfPickUp: '',
    timeOfPickUp: '',
    dateOfDelivery: '',
    timeOfDelivery: '',
    batchNumber: '',
    batchNumbera: '',
    howLong: '',
    showHowLongs: '',
    showHowLong: '',
    user: '', // fixed typo here
    location: {
      latitude: '',
      longitude: '',
      timestamp: ''
    },
    errorMsg: '',
    loadingLocation: '',
    generateFields: '',
    generateFields1: '',
    generateFields2: '',
    generateFieldsCount: '',
    generateFieldsCount1: '',
    generateFieldsCount2: '',
    submitted: '',
  });

  // Function to update form data
  const updateData = (newData: Partial<Data>) => {
    setData({ ...Data, ...newData });
  };

  {/* Function to submit form data
  const submitData = async (db: any, Tracking-Form: string) => {
    try {
      // Write form data to Firestore
      const docRef = await addDoc(collection(db, Tracking-Form), Data);
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error submitting form:', error);
      throw new Error('Failed to submit form. Please try again later.');
    }
  };
  */}
  const [location, setLocation] = useState<LocationObject | "">("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loadingLocation, setLoadingLocation] = useState<boolean>(false);
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
  const [vaccineStage, setVaccineStage] = useState('');
  const [vaccineStageAtIssue, setVaccineStageAtIssue] = useState('');
  const [vaccineStageAtPickup, setVaccineStageAtPickup] = useState('');
  const [vaccineTempAtIssue, setVaccineTempAtIssue] = useState('');
  const [vaccineTempAtIssues, setVaccineTempAtIssues] = useState('');
  const [vaccineTempAtPickup, setVaccineTempAtPickup] = useState('');
  const [syringemismatch, setSyringemismatch] = useState('');
  const [mlsyringemismatch, setMlsyringemismatch] = useState('');
  const [averageMonthlyRequirement, setAverageMonthlyRequirement] = useState('');
  const [maximumStock, setMaximumStock] = useState('');
  const [dosesToIssueUp, setDosesToIssueUp] = useState('');
  const [vaccineDosesIssued, setVaccineDosesIssued] = useState('');
  const [diluentIssued, setDiluentIssued] = useState('');
  const [syringeQuantityIssued, setSyringeQuantityIssued] = useState('');
  const [mlsyringeQuantityIssued, setMlsyringeQuantityIssued] = useState('');
  const [dateOfPickUp, setDateOfPickUp] = useState('');
  const [timeOfPickUp, setTimeOfPickUp] = useState('');
  const [dateOfDelivery, setDateOfDelivery] = useState('');
  const [timeOfDelivery, setTimeOfDelivery] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [batchNumbera, setBatchNumbera] = useState('');
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
  const [showHowLong, setShowHowLong] = useState(false);
  const [howLong, setHowLong] = useState('');
  const [showHowLongs, setShowHowLongs] = useState('');
  const [locationSent, setLocationSent] = useState(false);

  
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
  
  
  const handleSubmit = async (db: any, collectionName: string) => {
    try {
      // Fetch the current user login details (you need to implement this part)
      const currentUser = getCurrentUser(); // Example function, replace with your actual implementation
  
      // Handle permissions and get the current location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      setLoadingLocation(true);
      
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


  // Context provider value
  const value: DataContextType = {
    Data,
    updateData,
    handleSubmit,
  };

  // Return the provider with its children
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Custom hook to use the data context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
