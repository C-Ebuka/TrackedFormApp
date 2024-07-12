import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define types for state and actions
interface StateType {
  measlesData: any; // Replace 'any' with the actual type of measlesData
  otherScreenData: any; // Replace 'any' with the actual type of otherScreenData
}

type ActionType =
  | { type: 'UPDATE_MEASLES_DATA'; payload: any } // Replace 'any' with the actual type of payload
  | { type: 'UPDATE_OTHER_SCREEN_DATA'; payload: any }; // Replace 'any' with the actual type of payload

// Define initial state
const initialState: StateType = {
  measlesData: {}, // Initial state of measlesData
  otherScreenData: {}, // Initial state of otherScreenData
};

// Create AppContext
const AppContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Define reducer function
const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'UPDATE_MEASLES_DATA':
      return { ...state, measlesData: action.payload };
    case 'UPDATE_OTHER_SCREEN_DATA':
      return { ...state, otherScreenData: action.payload };
    default:
      return state;
  }
};

// Create AppProvider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use AppContext
export const useAppContext = () => useContext(AppContext);
