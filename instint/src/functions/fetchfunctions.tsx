import { SnackbarModelMessage } from "@/types/Enums/Snackbar";
import { APIRouteGetProps } from "@/types/Interfaces/APIRoutes";
import { ModelProps } from "@/types/Interfaces/Models";
import {
  SnackbarActionProps,
  SnackbarMessageProps,
} from "@/types/Interfaces/Snackbar";
import { snackbarMessageObject } from "@/types/Objects/Snackbar";
import { Dispatch, SetStateAction } from "react";

async function retrieveData(
  apiRoute: APIRouteGetProps['route'] | undefined,
  setDataArray: Dispatch<SetStateAction<ModelProps[]>> | null,
  setSnackbar: Dispatch<SetStateAction<boolean>>,
  setSnackbarStatus: Dispatch<SetStateAction<SnackbarActionProps["action"]>>,
  setSnackbarDetails: Dispatch<SetStateAction<SnackbarMessageProps["message"]>>,
  key?: number
) {
  try {
    const response = await fetch(`${apiRoute}${key}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if response is successful
    if (!response.ok) {
      setSnackbar(true);
      setSnackbarStatus("Error");
      setSnackbarDetails(snackbarMessageObject["Action Failed"].message);
      throw new Error("Network response was not ok");
    }

    // Parse JSON data from response body
    const data = await response.json();
    setDataArray(data)
    // Log the parsed JSON data
  } catch (error) {
    // Handle errors
    setSnackbar(true);
    setSnackbarStatus('Error')
    setSnackbarDetails(snackbarMessageObject["Action Failed"].message)
    console.error("There was a problem with the fetch operation:", error);
  }
}

export {retrieveData}