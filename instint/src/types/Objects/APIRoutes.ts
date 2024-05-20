import {
  APIRouteAuth,
  APIRouteDelete,
  APIRouteGet,
  APIRoutePostPatch,
} from "../Enums/APIRoutes";
import {
  APIRoutePostPatchProps,
  APIRouteDeleteProps,
  APIRouteGetProps,
  APIRouteAuthProps,
} from "../Interfaces/APIRoutes";
const apiRoutesPostPatchObject: Record<
  APIRoutePostPatch,
  APIRoutePostPatchProps
> = {
  [APIRoutePostPatch.DopaminePost]: { route: "/api/post/dopamine" },
  [APIRoutePostPatch.DopaminePatch]: { route: "/api/update/dopamine" },
  [APIRoutePostPatch.StridesPatch]: { route: "/api/update/strides" },
  [APIRoutePostPatch.StridesPost]: { route: "/api/post/strides" },
  [APIRoutePostPatch.StepsPatch]: { route: "/api/update/steps" },
  [APIRoutePostPatch.StepsPost]: { route: "/api/post/steps" },
};

const apiRoutesDeleteObject: Record<APIRouteDelete, APIRouteDeleteProps> = {
  [APIRouteDelete.DopamineDelete]: { route: "/api/delete/dopamine" },
  [APIRouteDelete.StridesDelete]: { route: "/api/delete/strides" },
  [APIRouteDelete.StepsDelete]: { route: "/api/delete/steps" },
};

const apiRoutesGetObject: Record<APIRouteGet, APIRouteGetProps> = {
  [APIRouteGet.DopamineGet]: { route: "/api/get/dopamine" },
  [APIRouteGet.StridesGet]: { route: "/api/get/strides" },
  [APIRouteGet.StepsGet]: { route: "/api/get/steps" },
};

const apiRoutesAuthObject: Record<APIRouteAuth, APIRouteAuthProps> = {
  [APIRouteAuth.Login]: {route: '/api/auth/login'},
  [APIRouteAuth.Logout]: {route: '/api/auth/logout'},
  [APIRouteAuth.Register]: {route: '/api/auth/register'},
  [APIRouteAuth.Reset]: {route: '/api/auth/resetpassword'},
  [APIRouteAuth.Verify]: {route: '/api/auth/verify'}
}
export {apiRoutesAuthObject, apiRoutesDeleteObject, apiRoutesPostPatchObject, apiRoutesGetObject };
