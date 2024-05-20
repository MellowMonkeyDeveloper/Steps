import {
  APIRouteDeleteProps,
  APIRouteGetProps,
} from "@/types/Interfaces/APIRoutes";
import { ModelProps } from "@/types/Interfaces/Models";
import {
  SnackbarMessageProps,
  SnackbarModelProps,
} from "@/types/Interfaces/Snackbar";
import {
  snackbarModelMessageObject,
  snackbarModelObject,
  snackbarNeutralObject,
} from "@/types/Objects/Snackbar";
import { Dispatch, SetStateAction } from "react";
import { retrieveData } from "./fetchfunctions";

const handleDelete = async (
  type: "Dopamine" | "Strides" | "Steps" | 'Deadlines',
  deleteKey: any,
  setSnackbar: Dispatch<SetStateAction<boolean>>,
  setSnackbarDetails: Dispatch<SetStateAction<any>>,
  setDeleteModal: Dispatch<SetStateAction<boolean>>
) => {
  const apiRoute: APIRouteDeleteProps['route'] =
    type === "Dopamine"
      ? "/api/delete/dopamine"
      : type === "Steps"
      ? "/api/delete/steps"
      : type === "Strides"
      ? "/api/delete/strides"
      : type === 'Deadlines'
      ? '/api/delete/todo'
      : '';
  try {
    console.log(apiRoute)
    const response = await fetch(`${apiRoute}?key=${deleteKey}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    });
    console.log(response)
    if (response.ok) {
      console.log("fail");
      setDeleteModal(false);
      setSnackbar(true);
      setSnackbarDetails(
        type === "Dopamine"
          ? snackbarModelMessageObject["Dopamine Deleted"]
          : type === "Steps"
          ? snackbarModelMessageObject["Step Deleted"]
          : type === "Strides"
          ? snackbarModelMessageObject["Stride Deleted"]
          : snackbarModelMessageObject["Step Deleted"]
      );
    } else {
      setDeleteModal(false);
      setSnackbar(true);
      setSnackbarDetails(snackbarNeutralObject["Delete Failed"]);
    }
  } catch (error) {
    console.log(error);
    setDeleteModal(false);
    setSnackbar(true);
    setSnackbarDetails(snackbarNeutralObject["Bad Response"]);
  }
};

const handleDropdown = async (
  dropdown: boolean,
  setDropdown: Dispatch<SetStateAction<boolean>>,
  setDataArray: Dispatch<SetStateAction<ModelProps[]>> | null,
  setSnackbar: Dispatch<SetStateAction<boolean>>,
  setSnackbarDetails: Dispatch<SetStateAction<string>>,
  getKey: ModelProps["key"],
  apiRoute?: APIRouteGetProps["route"] | undefined
) => {
  console.log(getKey, apiRoute);
  setDropdown((prev) => !prev);
  if (!dropdown) {
    retrieveData(
      apiRoute,
      setDataArray,
      setSnackbar,
      setSnackbarDetails,
      getKey
    );
  } else if (dropdown) {
    return;
  }
};

const handleAdd = (
  type: SnackbarModelProps["model"],
  setAdd: Dispatch<SetStateAction<boolean>>,
  setSnackbar: Dispatch<SetStateAction<boolean>>,
  setSnackbarDetails: Dispatch<SetStateAction<SnackbarMessageProps>>
) => {
  if (type === "Dopamine") {
    setAdd(true);
    setSnackbar(true);
    setSnackbarDetails(snackbarModelMessageObject["Add Stride"]);
  } else if (type === "Strides") {
    setAdd(true);
    setSnackbar(true);
    setSnackbarDetails(snackbarModelMessageObject["Add Steps"]);
  }
};

export { handleAdd, handleDelete, handleDropdown };
