import {
  APIRouteDeleteProps,
  APIRouteGetProps,
} from "@/types/Interfaces/APIRoutes";
import {
  SnackbarActionProps,
  SnackbarMessageProps,
  SnackbarModelProps,
} from "@/types/Interfaces/Snackbar";
import {
  snackbarMessageObject,
  snackbarModelObject,
} from "@/types/Objects/Snackbar";
import { SetStateAction, Dispatch } from "react";
import { retrieveData } from "./fetchfunctions";
import { ModelProps } from "@/types/Interfaces/Models";

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
  dropdown: boolean,
  setDropdown: Dispatch<SetStateAction<boolean>>,
  setDataArray: Dispatch<SetStateAction<ModelProps[]>> | null,
  setSnackbar: Dispatch<SetStateAction<boolean>>,
  setSnackbarDetails: Dispatch<SetStateAction<string>>,
  setSnackbarStatus: Dispatch<SetStateAction<SnackbarActionProps["action"]>>,
  getKey: ModelProps['key'],
  apiRoute?: APIRouteGetProps["route"] | undefined
) => {
  setDropdown((prev) => !prev);
  if (dropdown) {
    retrieveData(
      apiRoute,
      setDataArray,
      setSnackbar,
      setSnackbarStatus,
      setSnackbarDetails,
      getKey
    );
  } else if (!dropdown) {
    return;
  }
};

const handleAdd = (
  type: SnackbarModelProps["model"],
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
