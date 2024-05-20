export interface APIRoutePostPatchProps {
  route:
    | "/api/post/dopamine"
    | "/api/post/strides"
    | "/api/post/steps"
    | "/api/update/dopamine"
    | "/api/update/strides"
    | "/api/update/steps"
    | '/api/update/todo'
    | undefined;
}

export interface APIRouteDeleteProps {
  route: '' | '/api/delete/todo' |  "/api/delete/dopamine" | "/api/delete/strides" | "/api/delete/steps";
}

export interface APIRouteGetProps {
  route: "/api/get/dopamine" | "/api/get/strides" | "/api/get/steps";
}

export interface APIRouteAuthProps {
  route:
    | "/api/auth/csrf"
    | "/api/auth/login"
    | "/api/auth/logout"
    | "/api/auth/register"
    | "/api/auth/resetpassword"
    | "/api/auth/verify";
}
