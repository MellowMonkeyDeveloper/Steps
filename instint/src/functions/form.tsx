import { APIRoutePostPatchProps } from "@/types/Interfaces/APIRoutes";
import { ChangeEvent } from "react";

const handleSubmit = async (
  e: ChangeEvent,
  apiMethod: "POST" | "PATCH" | "PUT",
  formData: any,
  apiRoute: APIRoutePostPatchProps['route']
) => {
  e.preventDefault();
    try {
      const response = await fetch(`${apiRoute}`, {
        method: apiMethod,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const fetchResponse = await response.json();
      console.log(fetchResponse);
      if (response.ok) {
        console.log("ok");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  export {handleSubmit}