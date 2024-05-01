import {
  APIRouteDeleteProps,
  APIRouteGetProps,
} from "@/types/Interfaces/APIRoutes";
import {
  SnackbarMessageProps,
  SnackbarModelProps,
} from "@/types/Interfaces/Snackbar";
import {
  snackbarMessageObject,
  snackbarModelObject,
} from "@/types/Objects/Snackbar";
import { SetStateAction, Dispatch } from "react";

const handleDelete = async (
  type: "Dopamine" | "Strides" | "Steps",
  apiRoute: APIRouteDeleteProps["route"],
  deleteKey: any,
  setSnackbar: Dispatch<SetStateAction<boolean>>,
  setSnackbarStatus: Dispatch<SetStateAction<"Success" | "Error" | "Warning">>,
  setSnackbarDetails: Dispatch<SetStateAction<any>>,
  setDeleteModal: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const response = await fetch(`${apiRoute}?key=${deleteKey}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log("fail");
      setDeleteModal(false);
      setSnackbar(true);
      setSnackbarStatus("Error");
      setSnackbarDetails(snackbarMessageObject["Action Failed"].message);
    } else {
      setDeleteModal(false);
      setSnackbar(true);
      setSnackbarStatus("Success");
      setSnackbarDetails(snackbarMessageObject.Deleted.message);
    }
  } catch (error) {
    console.log(error);
    setDeleteModal(false);
    setSnackbar(true);
    setSnackbarStatus("Error");
    setSnackbarDetails(snackbarMessageObject["Action Failed"].message);
  }
};

const handleDropdown = async (
  setDropdown: Dispatch<SetStateAction<boolean>>,
  apiRoute: APIRouteGetProps["route"],
  setDeleteModal: Dispatch<SetStateAction<boolean>>,
  setSnackbar: Dispatch<SetStateAction<boolean>>,
  setSnackbarDetails: Dispatch<SetStateAction<string>>,
  setSnackbarStatus: Dispatch<SetStateAction<"Success" | "Error" | "Warning">>,
  getKey: string
) => {
  setDropdown((prev) => !prev);
  try {
    const response = await fetch(`${apiRoute}?key=${getKey}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log("fail");
      setDeleteModal(false);
      setSnackbar(true);
      setSnackbarStatus("Error");
      setSnackbarDetails(snackbarMessageObject["Action Failed"].message);
    } else {
      setDeleteModal(false);
      setSnackbar(true);
      setSnackbarStatus("Success");
      setSnackbarDetails(snackbarMessageObject.Deleted.message);
    }
  } catch (error) {
    console.log(error);
    setDeleteModal(false);
    setSnackbar(true);
    setSnackbarStatus("Error");
    setSnackbarDetails(snackbarMessageObject["Action Failed"].message);
  }
};

const handleAdd = (
  type: SnackbarModelProps['model'],
  setAdd: Dispatch<SetStateAction<boolean>>,
  setPostModel: Dispatch<SetStateAction<SnackbarModelProps["model"]>>
) => {
  if (type === "Dopamine") {
    setAdd(true);
    setPostModel("Strides");
  } else if (type === "Strides") {
    setAdd(true);
    setPostModel("Steps");
  }
};

export { handleDelete, handleDropdown, handleAdd };
