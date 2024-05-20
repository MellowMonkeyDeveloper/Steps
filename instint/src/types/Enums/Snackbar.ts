export enum SnackbarMessage {
  Created = "Created",
  Updated = "Updated",
  Deleted = "Deleted",
  Error = "Action Failed",
  Warning = "Warning",

  Completed = "Goal Completed!",
  Adding = "Add",
}


export enum SnackbarAuthEnum {
  LoggedOut = "Logged Out",
  LoggedOutFailed = "Failed Log Out",
  LoggedInFailed = "Failed Login",
  RegistrationFailed = "Failed Registration",
  Registered = "Registered",
  LoggedIn = "Logged In",
}

export enum SnackbarAction {
  Error = "Error",
  Warning = "Warning",
  Success = "Success",
}

export enum SnackbarModel {
  Dopamine = "Dopamine",
  Strides = "Strides",
  Steps = "Steps",
}

export enum SnackbarModelMessage {
  DopamineCreated = "Dopamine Created",
  DopamineUpdated = "Dopamine Updated",
  DopamineDeleted = "Dopamine Deleted",
  DopamineAdding = "Add Dopamine",
  StridesCreated = "Stride Created",
  StridesDeleted = "Stride Deleted",
  StridesUpdated = "Stride Updated",
  StridesAdding = "Add Stride",
  StepsCreated = "Step Created",
  StepsDeleted = "Step Deleted",
  StepsUpdated = "Step Updated",
  DopamineCompleted = "Dopamine Completed",
  StridesCompleted = "Stride Completed",
  StepsCompleted = "Step Completed",
  StepsAdd = "Add Steps",
  DopamineRetrieved = 'Retrieved Dopamine',
  StridesRetrieved = 'Retrieved Strides',
  StepsRetrieved = 'Retrieved Steps'
}

export enum SnackbarNeutralResponses{
  DeleteFailed = 'Delete Failed',
  BadResponse = 'Bad Response'
}
