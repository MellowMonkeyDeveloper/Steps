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
  dopamineID: string;
  setDopamineID: Dispatch<SetStateAction<string>>;
  stridesID: string;
  setStridesID: Dispatch<SetStateAction<string>>;
  deleteModal: boolean;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  dopamineTitle: string;
  setDopamineTitle: Dispatch<SetStateAction<string>>;
  stridesTitle: string;
  setStridesTitle: Dispatch<SetStateAction<string>>;
  stepsTitle: string;
  setStepsTitle: Dispatch<SetStateAction<string>>;
  deleteItem: boolean;
  setDeleteItem: Dispatch<SetStateAction<boolean>>;
  updateData: boolean;
  setUpdateData: Dispatch<SetStateAction<boolean>>;
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  csrf: string;
  setCsrf: Dispatch<SetStateAction<string>>;
  userID: number;
  setUserID: Dispatch<SetStateAction<number>>;
  postModel: "Dopamine" | "Strides" | "Steps";
  setPostModel: Dispatch<SetStateAction<"Dopamine" | "Strides" | "Steps">>;
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
  const [updateData, setUpdateData] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [dopamineTitle, setDopamineTitle] = useState<string>("");
  const [stridesTitle, setStridesTitle] = useState<string>("");
  const [stepsTitle, setStepsTitle] = useState<string>("");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<boolean>(false);
  const [userID, setUserID] = useState<number>(0);
  const [dopamineID, setDopamineID] = useState<string>("");
  const [stridesID, setStridesID] = useState<string>("");
  const [snackbar, setSnackbar] = useState<boolean>(false);
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

  useEffect(() => {

  }, [])

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
    csrf,
    setCsrf,
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
    updateData,
    setUpdateData,
    dopamineTitle,
    setDopamineTitle,
    stridesTitle,
    setStridesTitle,
    stepsTitle,
    setStepsTitle,
    postModel,
    setPostModel,
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
