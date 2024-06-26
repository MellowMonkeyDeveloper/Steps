import {
  SnackbarMessage,
  SnackbarModel,
  SnackbarModelMessage,
  SnackbarAuthEnum,
  SnackbarNeutralResponses
} from "../Enums/Snackbar";
import {
  SnackbarMessageProps,
  SnackbarModelProps,
} from "../Interfaces/Snackbar";



const snackbarAuthObject: Record<SnackbarAuthEnum,SnackbarMessageProps> = {
  [SnackbarAuthEnum.LoggedIn]: {message: 'Login Successful', status: 'Success'},
  [SnackbarAuthEnum.Registered]: { message: "Registration Successful", status: 'Success' },
  [SnackbarAuthEnum.LoggedOut]: {message: 'Logout Successful', status: 'Success'},
  [SnackbarAuthEnum.LoggedInFailed]: {message: 'Login Failed', status: 'Error'},
  [SnackbarAuthEnum.LoggedOutFailed]: {message: 'Logout Failed', status: 'Error'},
  [SnackbarAuthEnum.RegistrationFailed]: {message: 'Registration Failed', status: 'Error'}
}

const snackbarModelObject: Record<SnackbarModel, SnackbarModelProps> = {
  [SnackbarModel.Dopamine]: { model: "Dopamine" },
  [SnackbarModel.Strides]: { model: "Strides" },
  [SnackbarModel.Steps]: { model: "Steps" },
};

const snackbarNeutralObject: Record<SnackbarNeutralResponses, SnackbarMessageProps> = {
  [SnackbarNeutralResponses.BadResponse]: {message: 'Bad response', status: 'Error'},
  [SnackbarNeutralResponses.DeleteFailed]: {message: 'Delete failed', status: 'Error'}
}

const snackbarModelMessageObject: Record<
  SnackbarModelMessage,
  SnackbarMessageProps
> = {
  [SnackbarModelMessage.DopamineCreated]: {
    message: `${snackbarModelObject.Dopamine.model} Added`,
    status: 'Success'
  },
  [SnackbarModelMessage.StridesCreated]: {
    message: `${snackbarModelObject.Strides.model} Added`,
    status: 'Success'
  },
  [SnackbarModelMessage.StepsCreated]: {
    message: `${snackbarModelObject.Steps.model} Added`,
    status: 'Success'
  },
  [SnackbarModelMessage.DopamineUpdated]: {
    message: `${snackbarModelObject.Dopamine.model} Updated`,
    status: 'Success'
  },
  [SnackbarModelMessage.StridesUpdated]: {
    message: `${snackbarModelObject.Strides.model} Updated`,
    status: 'Success'
  },
  [SnackbarModelMessage.StepsUpdated]: {
    message: `${snackbarModelObject.Steps.model} Updated`,
    status: 'Success'
  },
  [SnackbarModelMessage.DopamineDeleted]: {
    message: `${snackbarModelObject.Dopamine.model} Deleted`,
    status: 'Success'
  },
  [SnackbarModelMessage.StridesDeleted]: {
    message: `${snackbarModelObject.Strides.model} Deleted`,
    status: 'Success'
  },
  [SnackbarModelMessage.StepsDeleted]: {
    message: `${snackbarModelObject.Steps.model} Deleted`,
    status: 'Success'
  },
  [SnackbarModelMessage.DopamineCompleted]: {
    message: `${snackbarModelObject.Dopamine.model} Completed`,
    status: 'Success'
  },
  [SnackbarModelMessage.StridesCompleted]: {
    message: `${snackbarModelObject.Strides.model} Completed`,
    status: 'Success'
  },
  [SnackbarModelMessage.StepsCompleted]: {
    message: `${snackbarModelObject.Steps.model} Completed`,
    status: 'Success'
  },
  [SnackbarModelMessage.DopamineAdding]: {
    message: `Adding ${snackbarModelObject.Dopamine.model}`,
    status: 'Warning'
  },
  [SnackbarModelMessage.StepsAdd]: {
    message: `Adding ${snackbarModelObject.Steps.model}`,
    status: 'Warning'
  },
  [SnackbarModelMessage.StridesAdding]: {
    message: `Adding ${snackbarModelObject.Strides.model}`,
    status: 'Warning'
  },
  [SnackbarModelMessage.StepsRetrieved]: {
    message: `Retrieving ${snackbarModelObject.Steps.model}`,
    status: 'Success'
  },
  [SnackbarModelMessage.StridesRetrieved]: {
    message: `Retrieving ${snackbarModelObject.Strides.model}`,
    status: 'Success'
  },[SnackbarModelMessage.DopamineRetrieved]: {
    message: `Retrieving ${snackbarModelObject.Dopamine.model}`,
    status: 'Success'
  },
};

export {
  snackbarModelMessageObject,
  snackbarModelObject,
  snackbarAuthObject,
  snackbarNeutralObject
};
