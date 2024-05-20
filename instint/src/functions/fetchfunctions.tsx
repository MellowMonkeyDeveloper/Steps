import { SnackbarModelMessage } from "@/types/Enums/Snackbar";
import { APIRouteGetProps } from "@/types/Interfaces/APIRoutes";
import { ModelProps, ToDoProps } from "@/types/Interfaces/Models";
import { SnackbarMessageProps } from "@/types/Interfaces/Snackbar";
import { Dispatch, SetStateAction } from "react";
import { setCookie } from "nookies";
import {
  snackbarAuthObject,
  snackbarModelMessageObject,
  snackbarModelObject,
} from "@/types/Objects/Snackbar";
import { Redacted } from "next/font/google";
async function retrieveData(
  apiRoute: APIRouteGetProps["route"] | undefined,
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
      credentials: "include",
    });
    console.log(key, apiRoute)
    // Check if response is successful
    if (!response.ok) {
      setSnackbar(true);
      setSnackbarDetails(
        apiRoute === "/api/get/dopamine"
          ? snackbarModelMessageObject["Retrieved Dopamine"]
          : apiRoute === "/api/get/steps"
          ? snackbarModelMessageObject["Retrieved Steps"]
          : apiRoute === "/api/get/strides"
          ? snackbarModelMessageObject["Retrieved Strides"]
          : snackbarModelMessageObject["Retrieved Dopamine"]
      );
      throw new Error("Network response was not ok");
    }

    // Parse JSON data from response body
    const data = await response.json();
    console.log(data)
    setDataArray(data)
    // Log the parsed JSON data
  } catch (error) {
    // Handle errors
    setSnackbar(true);
    console.error("There was a problem with the fetch operation:", error);
  }
}

async function retrieveCSRF() {
  const response = await fetch("/api/get/csrf/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const token = await response.json();
  console.log(token);
  setCookie(null, "csrftoken", token.csrf, {
    maxAge: 80000,
    path: "/",
    secure: true,
    sameSite: "strict",
  });
}

async function verifyToken(setLoggedIn: Dispatch<SetStateAction<boolean>>, setSnackbar: Dispatch<SetStateAction<boolean>>, setSnackbarDetails: Dispatch<SetStateAction<SnackbarMessageProps>>) {
  const response = await fetch('/api/auth/verify', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  })
  console.log(response)
  if(response.ok){
    console.log('ok')
    setLoggedIn(true)
    setSnackbarDetails(snackbarAuthObject["Logged In"])
    setSnackbar(true)
  }else{
    setLoggedIn(false)
    setSnackbarDetails(snackbarAuthObject["Failed Login"])
    setSnackbar(true)
  }
}

const retrieveDeadline = async (
  setData: Dispatch<SetStateAction<ToDoProps[]>>,
  index: -1 | 1 | 0,
  date: Date,
  setCurrentDate: Dispatch<SetStateAction<Date>>
) => {
  const retrieveDate = date.setDate(date.getDate() + index)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate() + index;
  const year = date.getFullYear();
  const dateTemplate = `${year}-${month}-${day}`;
  console.log(dateTemplate, month, day, year)
  setCurrentDate(dateTemplate)
  try {
    const response = await fetch(`/api/get/deadlines?date=${dateTemplate}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    console.log(data)
    setData(data);
  } catch (error) {
    console.log(error);
  }
};

export { retrieveData, retrieveCSRF, verifyToken, retrieveDeadline };
