import React, { createContext, useReducer, useContext, useEffect, ReactNode } from 'react';
import { VaccineState, VaccineAction } from './vaccineState';

const initialState: VaccineState = {
  vendorName: '',
  phoneNumber: 0,
  conveyorName: '',
  conveyorPhoneNumber: 0,
  distribution: '',
  reportingPeriod: '',
  issuingColdStore: '',
  pickUpDate: '',
  pickUpTime: '',
  deliveryDate: '',
  deliveryTime: '',
  selectedState: '',
  selectedLocalGovt: '',
  selectedWard: '',
  selectedFacility: '',
  facilityCceStatus: '',
  cceFunctionalityStatus: '',
  pocketExpenses: '',
  selectedManufacturer: null,
  batchNumber: '',
  expiryDate: '',
  diluentBatchNumber: '',
  diluentExpiryDate: '',
  syringe5BatchNumber: '',
  syringe5ExpiryDate: '',
  syringe2mlBatchNumber: '',
  syringe2mlExpiryDate: '',
  vaccineTempAtPickup: '',
  howLongs: '',
  bcgTempAtPickup: '',
  vaccineStageAtPickup: '',
  openingBalance: 0,
  diluentOpeningBalance: 0,
  syringeOpeningBalance: 0,
  syringe5mismatch: 0,
  openingBalanceInAmpoules: 0,
  diluentOpeningBalanceInAmpoules: 0,
  diluentMismatch: 0,
  diluentMismatchInAmpules: 0,
  mlsyringeOpeningBalance: 0,
  syringe2mismatch: 0,
  averageMonthlyRequirement: 0,
  multiplicationFactor: 0,
};

interface VaccineContextType {
  state: VaccineState;
  dispatch: React.Dispatch<VaccineAction>;
}

const VaccineContext = createContext<VaccineContextType | undefined>(undefined);

const VaccineReducer = (state: VaccineState, action: VaccineAction): VaccineState => {
  switch (action.type) {
    case 'SET_VENDOR_NAME':
      return {
        ...state,
        vendorName: action.payload,
      };
    case 'SET_VENDOR_PHONE_NUMBER':
      return {
        ...state,
        phoneNumber: action.payload,
      };
      case 'SET_CONVEYOR_NAME':
      return {
        ...state,
        conveyorName: action.payload,
      };
    case 'SET_CONVEYOR_PHONE_NUMBER':
      return {
        ...state,
        conveyorPhoneNumber: action.payload,
      };
    case 'SET_DISTRIBUTION':
      return {
        ...state,
        distribution: action.payload,
      };
    case 'SET_REPORTING_PERIOD':
      return {
        ...state,
        reportingPeriod: action.payload,
      };
    case 'SET_ISSUING_COLD_STORE':
      return {
        ...state,
        issuingColdStore: action.payload,
      };
    case 'SET_PICK_UP_DATE':
      return {
        ...state,
        pickUpDate: action.payload,
      };
    case 'SET_PICK_UP_TIME':
      return {
        ...state,
        pickUpTime: action.payload,
      };
    case 'SET_DELIVERY_DATE':
      return {
        ...state,
        deliveryDate: action.payload,
      };
    case 'SET_DELIVERY_TIME':
      return {
        ...state,
        deliveryTime: action.payload,
      };
    case 'SET_SELECTED_STATE':
      return {
        ...state,
        selectedState: action.payload,
        selectedLocalGovt: null,
        selectedWard: null,
        selectedFacility: null,
      };
    case 'SET_SELECTED_LOCAL_GOVT':
      return {
        ...state,
        selectedLocalGovt: action.payload,
        selectedWard: null,
        selectedFacility: null,
      };
    case 'SET_SELECTED_WARD':
      return {
        ...state,
        selectedWard: action.payload,
        selectedFacility: null,
      };
    case 'SET_SELECTED_FACILITY':
      return {
        ...state,
        selectedFacility: action.payload,
      };
    case 'SET_SELECTED_MANUFACTURER':
      return {
        ...state,
        selectedManufacturer: action.payload,
      };
      case 'SET_BATCH_NUMBER':
        return {
          ...state,
          batchNumber: action.payload,
        };
      case 'SET_EXPIRY_DATE':
        return {
          ...state,
          expiryDate: action.payload,
        };
      case 'SET_DILUENT_BATCH_NUMBER':
        return {
          ...state,
          diluentBatchNumber: action.payload,
        };
      case 'SET_DILUENT_EXPIRY_DATE':
        return {
          ...state,
          diluentExpiryDate: action.payload,
        };
      case 'SET_SYRINGE_5ML_BATCH_NUMBER':
        return {
          ...state,
          syringe5BatchNumber: action.payload,
        };
      case 'SET_SYRINGE_5ML_EXPIRY_DATE':
        return {
          ...state,
          syringe5ExpiryDate: action.payload,
        };
      case 'SET_SYRINGE_2ML_BATCH_NUMBER':
        return {
          ...state,
          syringe2mlBatchNumber: action.payload,
        };
    case 'SET_VACCINE_TEMP_AT_PICKUP':
      return {
        ...state,
        vaccineTempAtPickup: action.payload,
      };
    case 'SET_HOW_LONGS':
      return {
        ...state,
        howLongs: action.payload,
      };
    case 'SET_VVM_STAGE_AT_PICKUP':
      return {
        ...state,
        vaccineTempAtPickup: action.payload,
      };
    case 'SET_BCG_TEMP_AT_PICKUP':
      return {
        ...state,
        vaccineTempAtPickup: action.payload,
      }; 
    case 'SET_SELECTED_DURATION':
      return {
        ...state,
        howLongs: action.payload,
      }; 
    case 'SET_VACCINE_STAGE_AT_PICK_UP':
      return {
        ...state,
        vaccineStageAtPickup: action.payload,
      }; 
    case 'SET_BCG_VACCINE_OPENING_BALANCE':
      return {
        ...state,
        openingBalance: action.payload,
      }; 
      case 'SET_BCG_VACCINE_OPENING_BALANCE_IN_AMPOULES':
        return {
          ...state,
          openingBalanceInAmpoules: action.payload,
        }; 
    case 'SET_BCG_DILUENT_OPENING_BALANCE':
      return {
        ...state,
        diluentOpeningBalance: action.payload,
      }; 
    case 'SET_BCG_DILUENT_OPENING_BALANCE_IN_AMPOULES':
      return {
        ...state,
        diluentOpeningBalance: action.payload,
      }; 

    case 'SET_BCG_DILUENT_MISMATCH':
      return {
        ...state,
        diluentMismatch: action.payload,
      }; 
    case 'SET_BCG_DILUENT_MISMATCH_IN_AMPOULES':
      return {
        ...state,
        diluentMismatchInAmpules: action.payload,
      }; 
    case 'SET_BCG_5ML_SYRINGE_OPENING_BALANCE':
      return {
        ...state,
        syringeOpeningBalance: action.payload,
      }; 
    case 'SET_BCG_5ML_SYRINGE_MISMATCH':
        return {
            ...state,
            syringe5mismatch: action.payload,
        };   
    case 'SET_BCG_2ML_SYRINGE_OPENING_BALANCE':
        return {
            ...state,
            mlsyringeOpeningBalance: action.payload,
        };  
    case 'SET_BCG_2ML_SYRINGE_MISMATCH':
        return {
            ...state,
            syringe2mismatch: action.payload,
        }; 
    case 'SET_AVERAGE_MONTHLY_REQUIREMENT':
        return {
            ...state,
            averageMonthlyRequirement: action.payload,
        }; 
    case 'SET_MULTIPLICATION_FACTOR':
        return {
            ...state,
            multiplicationFactor: action.payload,
        }; 
    {/*case 'CALCULATE_TOTAL_OPENING_Vaccine':
      return {
        ...state,
        totalOpeningVaccine: state.openingVaccine + state.amountAdded,
      };
    case 'CALCULATE_CLOSING_Vaccine':
      return {
        ...state,
        closingVaccine: state.totalOpeningVaccine - state.amountSold,
      };
    case 'CALCULATE_AMOUNT_SOLD':
      return {
        ...state,
        amountSold: state.totalOpeningVaccine - state.closingVaccine,
      };
    case 'CALCULATE_MISMATCH':
      return {
        ...state,
        mismatch: state.expectedOpeningVaccine - state.openingVaccine,
      };*/}
    default:
      return state;
  }
};

export const VaccineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(VaccineReducer, initialState);

  {/*useEffect(() => {
    dispatch({ type: 'CALCULATE_TOTAL_OPENING_Vaccine' });
  }, [state.openingVaccine, state.amountAdded]);

  useEffect(() => {
    dispatch({ type: 'CALCULATE_CLOSING_Vaccine' });
  }, [state.totalOpeningVaccine, state.amountSold]);

  useEffect(() => {
    dispatch({ type: 'CALCULATE_AMOUNT_SOLD' });
  }, [state.totalOpeningVaccine, state.closingVaccine]);

  useEffect(() => {
    dispatch({ type: 'CALCULATE_MISMATCH' });
  }, [state.expectedOpeningVaccine, state.openingVaccine]);*/}

  return (
    <VaccineContext.Provider value={{ state, dispatch }}>
      {children}
    </VaccineContext.Provider>
  );
};

export const useVaccine = () => {
  const context = useContext(VaccineContext);
  if (!context) {
    throw new Error('useVaccine must be used within a VaccineProvider');
  }
  return context;
};
