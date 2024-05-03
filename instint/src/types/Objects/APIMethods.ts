import { APIMethods } from "../Enums/APIMethods";
import { APIMethodsProps } from "../Interfaces/APIMethods";

const apiMethodsObject: Record<APIMethods, APIMethodsProps> = {
  [APIMethods.DELETE]: { method: "DELETE" },
  [APIMethods.GET]: { method: "GET" },
  [APIMethods.PATCH]: { method: "PATCH" },
  [APIMethods.PUT]: { method: "PUT" },
  [APIMethods.POST]: { method: "POST" },
};

export { apiMethodsObject };
