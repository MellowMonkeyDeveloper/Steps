"use client";
import React, {
  Dispatch,
  useContext,
  SetStateAction,
  createContext,
  useState,
  useEffect,
} from "react";
import { useStyleRegistry } from "styled-jsx";

// Create a new context
interface WrapperContext {
  snackStatus: 'Success' | 'Error';
  setSnackStatus: Dispatch<SetStateAction<'Success' | 'Error'>>;
  snackShow: boolean;
  setSnackShow: Dispatch<SetStateAction<boolean>>;
  colorMode: boolean;
  setColorMode: Dispatch<SetStateAction<boolean>>;
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
  const [colorMode, setColorMode] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<boolean>(false)
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [dopamineTitle, setDopamineTitle] = useState<string>("");
  const [stridesTitle, setStridesTitle] = useState<string>("");
  const [stepsTitle, setStepsTitle] = useState<string>("");
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [deleteItem, setDeleteItem] = useState<boolean>(false)
  const [snackStatus, setSnackStatus] = useState<'Success' | 'Error'>('Error');
  const [snackShow, setSnackShow] = useState<boolean>(false);
  const [postModel, setPostModel] = useState<"Dopamine" | "Strides" | "Steps">(
    "Dopamine"
  );
  useEffect(() => {
    console.log(dopamineTitle, stridesTitle)
  }, [dopamineTitle, stridesTitle])
  const wrapperContextValue: WrapperContext = {
    showMenu,
    setShowMenu,
    snackStatus,
    setSnackStatus,
    snackShow,
    setSnackShow,
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
