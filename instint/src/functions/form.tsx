import { APIMethodsProps } from "@/types/Interfaces/APIMethods";
import { APIRoutePostPatchProps } from "@/types/Interfaces/APIRoutes";
import { ChangeEvent } from "react";
import { parseCookies } from "nookies";
const handleSubmit = async (
  e: void,
  apiMethod: APIMethodsProps['method'],
  formData: any,
  apiRoute: APIRoutePostPatchProps['route'],
  userID: number,
  key: number,
) => {
  e
    try {
      const response = await fetch(`${apiRoute}`, {
        method: apiMethod,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({todo: formData, user: userID, key: key}),
      });
      const fetchResponse = await response.json();
      const cookies = parseCookies()
      console.log(cookies)
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