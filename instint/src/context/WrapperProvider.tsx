"use client";
import { retrieveCSRF } from "@/functions/fetchfunctions";
import { SnackbarModelMessage } from "@/types/Enums/Snackbar";
import { ModelProps } from "@/types/Interfaces/Models";
import { SnackbarMessageProps } from "@/types/Interfaces/Snackbar";
import {
  snackbarMessageObject,
  snackbarModelMessageObject,
  snackbarModelObject,
} from "@/types/Objects/Snackbar";
import React, {
  Dispatch,
  useContext,
  SetStateAction,
  createContext,
  useState,
  useEffect,
} from "react";
import { useStyleRegistry } from "styled-jsx";
import { parseCookies } from "nookies";
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
  snackbarStatus: "Success" | "Error" | "Warning";
  setSnackbarStatus: Dispatch<SetStateAction<"Success" | "Warning" | "Error">>;
  snackbarDetails: SnackbarMessageProps["message"];
  setSnackbarDetails: Dispatch<SetStateAction<SnackbarMessageProps["message"]>>;
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
  const [dopamineID, setDopamineID] = useState<string>("");
  const [stridesID, setStridesID] = useState<string>("");
  const [snackbar, setSnackbar] = useState<boolean>(false);
  const [stepsID, setStepsID] = useState<number>(0);
  const [snackbarStatus, setSnackbarStatus] = useState<
    "Success" | "Warning" | "Error"
  >("Success");
  const [snackbarDetails, setSnackbarDetails] = useState<
    SnackbarMessageProps["message"]
  >(snackbarModelMessageObject["Dopamine Completed"].message);
  const [postModel, setPostModel] = useState<"Dopamine" | "Strides" | "Steps">(
    "Dopamine"
  );
  const [csrf, setCsrf] = useState<string>("");
  useEffect(() => {
    retrieveCSRF();
  }, []);

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
    snackbarStatus,
    setSnackbarStatus,
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
