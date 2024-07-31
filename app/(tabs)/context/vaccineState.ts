export interface VaccineState {
    vendorName: string;
    phoneNumber: number;
    conveyorName: string;
    conveyorPhoneNumber: number;
    distribution: string;
    reportingPeriod: string;
    issuingColdStore: string;
    pickUpDate: string;
    pickUpTime: string;
    deliveryDate: string;
    deliveryTime: string;
    selectedState: string | null;
    selectedLocalGovt: string | null;
    selectedWard: string | null;
    selectedFacility: string | null;
    facilityCceStatus: string;
    cceFunctionalityStatus: string;
    pocketExpenses: string;
    selectedManufacturer: string | null;
    batchNumber: string;
    expiryDate: string;
    diluentBatchNumber: string;
    diluentExpiryDate: string;
    syringe5BatchNumber: string;
    syringe5ExpiryDate: string;
    syringe2mlBatchNumber: string;
    syringe2mlExpiryDate: string;
    vaccineTempAtPickup: string;
    howLongs: string;
    bcgTempAtPickup: string;
    vaccineStageAtPickup: string;
    openingBalance: number;
    diluentOpeningBalance: number;
    syringeOpeningBalance: number;
    syringe5mismatch: number;
    openingBalanceInAmpoules: number;
    diluentOpeningBalanceInAmpoules: number;
    diluentMismatch: number;
    diluentMismatchInAmpules: number;
    mlsyringeOpeningBalance: number;
    syringe2mismatch: number;
    averageMonthlyRequirement: number;
    multiplicationFactor: number;
    maximumStock: number;
    dosesToIssueUp: number;
    vaccineDosesIssued: number;
    vaccineTotal: number;
    vaccineTotalInVials: number;
  }
  
  export type VaccineAction =
    | { type: 'SET_VENDOR_NAME'; payload: string }
    | { type: 'SET_VENDOR_PHONE_NUMBER'; payload: number }
    | { type: 'SET_CONVEYOR_NAME'; payload: string }
    | { type: 'SET_CONVEYOR_PHONE_NUMBER'; payload: number }
    | { type: 'SET_DISTRIBUTION'; payload: string }
    | { type: 'SET_REPORTING_PERIOD'; payload: string }
    | { type: 'SET_ISSUING_COLD_STORE'; payload: string }
    | { type: 'SET_PICK_UP_DATE'; payload: string }
    | { type: 'SET_PICK_UP_TIME'; payload: string }
    | { type: 'SET_DELIVERY_DATE'; payload: string }
    | { type: 'SET_DELIVERY_TIME'; payload: string }
    | { type: 'SET_SELECTED_STATE'; payload: string | null }
    | { type: 'SET_SELECTED_LOCAL_GOVT'; payload: string | null }
    | { type: 'SET_SELECTED_WARD'; payload: string | null }
    | { type: 'SET_SELECTED_FACILITY'; payload: string | null } 
    | { type: 'SET_FACILITY_CCE_STATUS'; payload: string }
    | { type: 'SET_CCE_FUNCTIONALITY_STATUS'; payload: string }
    | { type: 'SET_OUT_OF_POCKET_EXPENSES'; payload: string }
    | { type: 'SET_SELECTED_MANUFACTURER'; payload: string | null }
    | { type: 'SET_BATCH_NUMBER'; payload: string }
    | { type: 'SET_EXPIRY_DATE'; payload: string }
    | { type: 'SET_DILUENT_BATCH_NUMBER'; payload: string }
    | { type: 'SET_DILUENT_EXPIRY_DATE'; payload: string }
    | { type: 'SET_SYRINGE_5ML_BATCH_NUMBER'; payload: string }
    | { type: 'SET_SYRINGE_5ML_EXPIRY_DATE'; payload: string }
    | { type: 'SET_SYRINGE_2ML_BATCH_NUMBER'; payload: string }
    | { type: 'SET_SYRINGE_2ML_EXPIRY_DATE'; payload: string }
    | { type: 'SET_VACCINE_TEMP_AT_PICKUP'; payload: string }
    | { type: 'SET_HOW_LONGS'; payload: string } 
    | { type: 'SET_VVM_STAGE_AT_PICKUP'; payload: string } 
    | { type: 'SET_BCG_TEMP_AT_PICKUP'; payload: string } 
    | { type: 'SET_SELECTED_DURATION'; payload: string } 
    | { type: 'SET_VACCINE_STAGE_AT_PICK_UP'; payload: string } 
    | { type: 'SET_BCG_VACCINE_OPENING_BALANCE'; payload: number } 
    | { type: 'SET_BCG_VACCINE_OPENING_BALANCE_IN_AMPOULES'; payload: number } 
    | { type: 'SET_BCG_DILUENT_OPENING_BALANCE'; payload: number }   
    | { type: 'SET_BCG_DILUENT_OPENING_BALANCE_IN_AMPOULES'; payload: number }   
    | { type: 'SET_BCG_5ML_SYRINGE_OPENING_BALANCE'; payload: number } 
    | { type: 'SET_BCG_5ML_SYRINGE_MISMATCH'; payload: number } 
    | { type: 'SET_BCG_2ML_SYRINGE_OPENING_BALANCE'; payload: number } 
    | { type: 'SET_BCG_2ML_SYRINGE_MISMATCH'; payload: number } 
    | { type: 'SET_BCG_DILUENT_MISMATCH'; payload: number } 
    | { type: 'SET_BCG_DILUENT_MISMATCH_IN_AMPOULES'; payload: number } 
    | { type: 'SET_AVERAGE_MONTHLY_REQUIREMENT'; payload: number } 
    | { type: 'SET_MULTIPLICATION_FACTOR'; payload: number } 
    | { type: 'SET_MAXIMUM_STOCK'; payload: number } 
    | { type: 'SET_DOSES_TO_ISSUE_UP_TO_MAX'; payload: number } 
    | { type: 'SET_ACTUAL_VACCINE_DOSES_ISSUED'; payload: number } 
    | { type: 'SET_VACCINE_TOTAL'; payload: number } 
    | { type: 'SET_VACCINE_TOTAL_IN_VIALS'; payload: number } 





    | { type: 'SET_AMOUNT_ADDED'; payload: string }
    | { type: 'CALCULATE_TOTAL_OPENING_STOCK' }
    | { type: 'CALCULATE_CLOSING_STOCK' }
    | { type: 'CALCULATE_AMOUNT_SOLD' }
    | { type: 'CALCULATE_MISMATCH' };
  
