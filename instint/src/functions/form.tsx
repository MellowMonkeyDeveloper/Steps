import { APIMethodsProps } from "@/types/Interfaces/APIMethods";
import {
  APIRouteAuthProps,
  APIRoutePostPatchProps,
} from "@/types/Interfaces/APIRoutes";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { parseCookies } from "nookies";
import { SnackbarMessage } from "@/types/Enums/Snackbar";
import {
  SnackbarMessageProps,
  SnackbarModelProps,
} from "@/types/Interfaces/Snackbar";
import {
  snackbarAuthObject,
  snackbarModelMessageObject,
  snackbarNeutralObject,
} from "@/types/Objects/Snackbar";
import { ToDoProps } from "@/types/Interfaces/Models";
import { SensorDoor } from "@mui/icons-material";
const handleSubmit = async (
  e: void,
  apiMethod: APIMethodsProps["method"],
  formData: any,
  apiRoute: APIRoutePostPatchProps["route"] | null,
  userID: number,
  key: number,
  setShowForm: Dispatch<SetStateAction<boolean>>,
  setSnackbar: Dispatch<SetStateAction<boolean>>,
  setSnackbarDetails:
    | Dispatch<SetStateAction<SnackbarMessageProps>>
    | NonNullable,
  type: SnackbarModelProps["model"],
) => {
  e;
  const okResponse: SnackbarMessageProps | null =
    apiMethod === "PATCH" && type === "Dopamine"
      ? snackbarModelMessageObject["Dopamine Updated"]
      : apiMethod === "PATCH" && type === "Steps"
      ? snackbarModelMessageObject["Step Updated"]
      : apiMethod === "PATCH" && type === "Strides"
      ? snackbarModelMessageObject["Stride Updated"]
      : apiMethod === "POST" && type === "Dopamine"
      ? snackbarModelMessageObject["Dopamine Created"]
      : apiMethod === "POST" && type === "Steps"
      ? snackbarModelMessageObject["Step Created"]
      : apiMethod === "POST" && type === "Strides"
      ? snackbarModelMessageObject["Stride Created"]
      : null;

  const badResponse: SnackbarMessageProps | null =
    snackbarNeutralObject["Bad Response"];

  try {
    const response = await fetch(`${apiRoute}`, {
      method: apiMethod,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ todo: formData, key: key }),
    });
    console.log(formData);
    const fetchResponse = await response.json();
    console.log(fetchResponse, response.ok);
    console.log('good')
    setSnackbarDetails(okResponse);
    setSnackbar(true);
    setShowForm(false)
  } catch (error) {
    console.log(error)
    setShowForm(false)
    setSnackbar(true)
    setSnackbarDetails(badResponse)
  }
};

export interface AuthFormProps {
  username: string;
  email: string;
  password: string;
}

const handleAuth = async (
  e: React.FormEvent<HTMLFormElement>,
  formObject: AuthFormProps,
  apiRoute: APIRouteAuthProps["route"],
  setSnackbar: Dispatch<SetStateAction<boolean>>,
  setSnackbarDetails: Dispatch<SetStateAction<SnackbarMessageProps>>,
  type: "Register" | "Login",
  setLoggedIn: Dispatch<SetStateAction<boolean>>
) => {
  e.preventDefault();
  const okResponse =
    type === "Register"
      ? snackbarAuthObject.Registered
      : snackbarAuthObject["Logged In"];
  const badResponse =
    type === "Register"
      ? snackbarAuthObject["Failed Registration"]
      : snackbarAuthObject["Failed Login"];
  console.log(apiRoute);
  const response = await fetch(apiRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObject),
  });
  console.log(response.ok)
  if (response.ok) {
    setLoggedIn(true);
    setSnackbarDetails(okResponse);
    setSnackbar(true);
    console.log(response.headers);
  } else {
    setLoggedIn(false);
    setSnackbarDetails(badResponse);
    setSnackbar(true);
  }
};

export { handleSubmit, handleAuth };
