import React, { createContext, useContext, useReducer, ReactNode, useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';


// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface DataProviderProps {
  children: ReactNode; // ReactNode type includes JSX elements
}

// Define context type
interface DataContextType {
  homeScreen: any; // Update with actual type
  updateHomeScreen: (values: any) => void;
  measlesScreen: any; // Update with actual type
  updateMeaslesScreen: (values: any) => void;
  yellowFeverScreen: any; // Update with actual type
  updateYellowFeverScreen: (values: any) => void;
}


const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) =>  {
  const [homeScreen, setHomeScreen] = useState({ selectedManufacturerMeasles: false, selectedManufacturerMeaslesa: false, selectedManufacturerMeaslesb: false,
            vaccineTempAtIssuesbcg: 0, vaccineTempAtIssuesabcg: 0, vaccineTempAtIssuesbbcg: 0, vaccineStageAtIssuebcg: 0, vaccineStageAtPickupbcg: 0,
            vaccineTempAtPickupbcg: 0,
            vaccineTempAtPickupabcg: 0,
            vaccineTempAtPickupbbcg: 0,
            measlesOpeningBalance: 0,
            openingBalanceabcg: 0,
            openingBalancebbcg: 0,
 });

  const [measlesScreen, setMeaslesScreen] = useState({             
    selectedManufacturerMeasles: 0,
    selectedManufacturerMeaslesa: 0,
    selectedManufacturerMeaslesb: 0,
    vaccineTempAtIssuesmsl: 0,
    vaccineTempAtIssuesamsl: 0,
    vaccineTempAtIssuesbmsl: 0,
    vaccineStageAtIssuemsl: 0,
    vaccineStageAtPickupmsl: 0,
    vaccineTempAtPickupmsl: 0,
    vaccineTempAtPickupamsl: 0,
    vaccineTempAtPickupbmsl: 0,
    measlesOpeningBalance: 0,
    openingBalanceamsl: 0,
    openingBalancebmsl: 0,});
    
  const [yellowFeverScreen, setYellowFeverScreen] = useState({ openingBalance: 0, mismatch: 0, addedStock: 0 });

  const updateHomeScreen = (values: any) => {
    setHomeScreen({ ...homeScreen, ...values });
  };

  const updateMeaslesScreen = (values: any) => {
    setMeaslesScreen({ ...measlesScreen, ...values });
  };

  const updateYellowFeverScreen = (values: any) => {
    setYellowFeverScreen({ ...yellowFeverScreen, ...values });
  };

  return (
    <DataContext.Provider
      value={{
        homeScreen,
        updateHomeScreen,
        measlesScreen,
        updateMeaslesScreen,
        yellowFeverScreen,
        updateYellowFeverScreen,
      }}
    >
      {children}
    </DataContext.Provider>
  );

};
