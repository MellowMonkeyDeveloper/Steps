"use client";
import { retrieveCSRF } from "@/functions/fetchfunctions";

import { JwtPayload, jwtDecode } from "jwt-decode";
import { ModelProps } from "@/types/Interfaces/Models";
import { SnackbarMessageProps } from "@/types/Interfaces/Snackbar";
import {
  snackbarModelMessageObject
} from "@/types/Objects/Snackbar";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { parseCookies } from "nookies";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
// Create a new context
interface WrapperContext {
  dopamineData: ModelProps[];
  setDopamineData: Dispatch<SetStateAction<ModelProps[]>>;
  stridesData: ModelProps[];
  setStridesData: Dispatch<SetStateAction<ModelProps[]>>;
  stepsData: ModelProps[];
  setStepsData: Dispatch<SetStateAction<ModelProps[]>>;
  snackbar: boolean;
  setSnackbar: Dispatch<SetStateAction<boolean>>;

  snackbarDetails: SnackbarMessageProps;
  setSnackbarDetails: Dispatch<SetStateAction<SnackbarMessageProps>>;
  colorMode: boolean;
  setColorMode: Dispatch<SetStateAction<boolean>>;
  dopamineID: number;
  setDopamineID: Dispatch<SetStateAction<number>>;
  stridesID: number;
  setStridesID: Dispatch<SetStateAction<number>>;
  deleteModal: boolean;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;

  deleteItem: boolean;
  setDeleteItem: Dispatch<SetStateAction<boolean>>;

  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;

  userID: number;
  setUserID: Dispatch<SetStateAction<number>>;

  stepsID: number;
  setStepsID: Dispatch<SetStateAction<number>>;
}
export const WrapperContextProvider = createContext<WrapperContext | null>(
  null
);
interface ContextProviderProps {
  children: React.ReactNode;
}
// Create a context provider component
const WrapperProvider = ({ children }: ContextProviderProps) => {
  // Define state or any necessary variables
  const [dopamineData, setDopamineData] = useState<ModelProps[]>([
    {
      key: 1,
      todo: {
        motivation: "",
        deadline: new Date(2024, 4, 1),
        description: "",
        completed: false,
        title: "",
      },
    },
  ]);
  const [stridesData, setStridesData] = useState<ModelProps[]>([
    {
      key: 1,
      todo: {
        motivation: "",
        deadline: new Date(2024, 4, 1),
        description: "",
        completed: false,
        title: "",
      },
    },
  ]);
  const [stepsData, setStepsData] = useState<ModelProps[]>([
    {
      key: 1,
      todo: {
        motivation: "",
        deadline: new Date(2024, 4, 1),
        description: "",
        completed: false,
        title: "",
      },
    },
  ]);
  const [colorMode, setColorMode] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<boolean>(false);
  const [userID, setUserID] = useState<number>(0);
  const [dopamineID, setDopamineID] = useState<number>(0);
  const [stridesID, setStridesID] = useState<number>(0);
  const [snackbar, setSnackbar] = useState<boolean>(false);
  const [stepsID, setStepsID] = useState<number>(0);

  const [snackbarDetails, setSnackbarDetails] = useState<SnackbarMessageProps>(
    snackbarModelMessageObject["Dopamine Completed"]
  );
  const {auth_token} = parseCookies()

  useEffect(() => {
    console.log(auth_token)
    if(auth_token){
      const decode = jwtDecode<JwtPayload>(auth_token)
      console.log(decode)
    }
  }, [])



  useEffect(() => {}, []);

  const wrapperContextValue: WrapperContext = {
    dopamineData,
    setDopamineData,
    stridesData,
    setStridesData,
    stepsData,
    setStepsData,
    dopamineID,
    setDopamineID,
    stridesID,
    setStridesID,
    stepsID,
    setStepsID,
    showMenu,
    setShowMenu,
    snackbar,
    setSnackbar,

    snackbarDetails,
    setSnackbarDetails,
    colorMode,
    setColorMode,
    deleteModal,
    setDeleteModal,

    deleteItem,
    setDeleteItem,
    userID,
    setUserID,
  };

  // Define any other context-specific logic

  return (
    // Provide the context value to its children
    <WrapperContextProvider.Provider value={wrapperContextValue}>
      {children}
    </WrapperContextProvider.Provider>
  );
};

export const useWrapper = () => {
  const context = useContext(WrapperContextProvider);
  if (context === null) {
    throw new Error("useWrapper must be used within a WalletProvider");
  }
  return context;
};

export default WrapperProvider;
