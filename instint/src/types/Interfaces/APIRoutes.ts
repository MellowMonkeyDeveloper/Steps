export interface APIRoutePostPatchProps {
  route:
    | "/api/post/dopamine"
    | "/api/post/strides"
    | "/api/post/steps"
    | "/api/update/dopamine"
    | "/api/update/strides"
    | "/api/update/steps";
}

export interface APIRouteDeleteProps {
  route: "/api/delete/dopamine" | "/api/delete/strides" | "/api/delete/steps";
}

export interface APIRouteGetProps {
    route: '/api/get/dopamine' | '/api/get/strides' | '/api/get/steps'
}