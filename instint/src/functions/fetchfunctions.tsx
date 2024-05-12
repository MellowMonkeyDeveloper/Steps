import { SnackbarModelMessage } from "@/types/Enums/Snackbar";
import { APIRouteGetProps } from "@/types/Interfaces/APIRoutes";
import { ModelProps } from "@/types/Interfaces/Models";
import {
  SnackbarMessageProps,
} from "@/types/Interfaces/Snackbar";
import { Dispatch, SetStateAction } from "react";
import { setCookie } from "nookies";
async function retrieveData(
  apiRoute: APIRouteGetProps['route'] | undefined,
  setDataArray: Dispatch<SetStateAction<ModelProps[]>>,
  setSnackbar: Dispatch<SetStateAction<boolean>>,
  setSnackbarDetails: Dispatch<SetStateAction<SnackbarMessageProps>>,
  key?: number
) {
  try {
    const response = await fetch(`${apiRoute}?key=${key}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    });

    // Check if response is successful
    if (!response.ok) {
      setSnackbar(true);
      setSnackbarDetails(snackbarMessageObject["Action Failed"]);
      throw new Error("Network response was not ok");
    }

    // Parse JSON data from response body
    const data = await response.json();
    if(apiRoute === '/api/get/dopamine'){
      console.log(data)
      setDataArray(data)
    }else if(apiRoute === '/api/get/steps' || apiRoute === '/api/get/strides'){
      setDataArray(data)
      console.log(data)
    }
    // Log the parsed JSON data
  } catch (error) {
    // Handle errors
    setSnackbar(true);
    setSnackbarDetails(snackbarMessageObject["Action Failed"])
    console.error("There was a problem with the fetch operation:", error);
  }
}

async function retrieveCSRF() {
  const response = await fetch('/api/get/csrf/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const token = await response.json()
  console.log(token)
  setCookie(null, 'csrftoken', token.csrf, {
    maxAge: 80000,
    path: '/',
    secure: true,
    sameSite: 'strict'
  })
}

export {retrieveData, retrieveCSRF}