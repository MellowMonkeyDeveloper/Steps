import { APIRoutePostPatchProps } from "@/types/Interfaces/APIRoutes";
import { ToDoProps } from "@/types/Interfaces/Models";
import { SnackbarMessageProps } from "@/types/Interfaces/Snackbar";
import { snackbarModelMessageObject, snackbarModelObject, snackbarNeutralObject } from "@/types/Objects/Snackbar";
import { Dispatch, SetStateAction } from "react";

const handleCompleted = async (
  data: ToDoProps,
  apiRoute: APIRoutePostPatchProps["route"],
  setSnackbar: Dispatch<SetStateAction<boolean>>,
  setSnackbarDetails: Dispatch<SetStateAction<SnackbarMessageProps>>
) => {
    data.completed = true
    console.log(data)
  try {
    const response = await fetch(`${apiRoute}?key=${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: data }),
    });
    if(response.ok){
        setSnackbarDetails(snackbarModelMessageObject["Dopamine Completed"])
    }
  } catch (error) {
    setSnackbarDetails(snackbarNeutralObject["Bad Response"])
    setSnackbar(true)
  }
};

export {handleCompleted}