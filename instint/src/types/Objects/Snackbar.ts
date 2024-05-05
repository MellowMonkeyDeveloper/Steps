import {
  SnackbarMessage,
  SnackbarModel,
  SnackbarModelMessage,
} from "../Enums/Snackbar";
import {
  SnackbarMessageProps,
  SnackbarModelProps,
} from "../Interfaces/Snackbar";

const snackbarMessageObject: Record<SnackbarMessage, SnackbarMessageProps> = {
  [SnackbarMessage.Completed]: { message: "Completed" },
  [SnackbarMessage.Created]: { message: "Created" },
  [SnackbarMessage.Deleted]: { message: "Deleted" },
  [SnackbarMessage.Error]: { message: "Action failed!" },
  [SnackbarMessage.LoggedIn]: { message: "You are logged in!" },
  [SnackbarMessage.Registered]: { message: "You are registered!" },
  [SnackbarMessage.Updated]: { message: "Updated!" },
  [SnackbarMessage.Warning]: { message: "Warning!" },
  [SnackbarMessage.Adding]: { message: "Add" },
};

const snackbarModelObject: Record<SnackbarModel, SnackbarModelProps> = {
  [SnackbarModel.Dopamine]: { model: "Dopamine" },
  [SnackbarModel.Strides]: { model: "Strides" },
  [SnackbarModel.Steps]: { model: "Steps" },
};

const snackbarModelMessageObject: Record<
  SnackbarModelMessage,
  SnackbarMessageProps
> = {
  [SnackbarModelMessage.DopamineCreated]: {
    message: `${snackbarModelObject.Dopamine.model} ${snackbarMessageObject.Created.message}`,
  },
  [SnackbarModelMessage.StridesCreated]: {
    message: `${snackbarModelObject.Strides.model} ${snackbarMessageObject.Created.message}`,
  },
  [SnackbarModelMessage.StepsCreated]: {
    message: `${snackbarModelObject.Steps.model} ${snackbarMessageObject.Created.message}`,
  },
  [SnackbarModelMessage.DopamineUpdated]: {
    message: `${snackbarModelObject.Dopamine.model} ${snackbarMessageObject.Updated.message}`,
  },
  [SnackbarModelMessage.StridesUpdated]: {
    message: `${snackbarModelObject.Strides.model} ${snackbarMessageObject.Updated.message}`,
  },
  [SnackbarModelMessage.StepsUpdated]: {
    message: `${snackbarModelObject.Steps.model} ${snackbarMessageObject.Updated.message}`,
  },
  [SnackbarModelMessage.DopamineDeleted]: {
    message: `${snackbarModelObject.Dopamine.model} ${snackbarMessageObject.Deleted.message}`,
  },
  [SnackbarModelMessage.StridesDeleted]: {
    message: `${snackbarModelObject.Strides.model} ${snackbarMessageObject.Deleted.message}`,
  },
  [SnackbarModelMessage.StepsDeleted]: {
    message: `${snackbarModelObject.Steps.model} ${snackbarMessageObject.Deleted.message}`,
  },
  [SnackbarModelMessage.DopamineCompleted]: {
    message: `${snackbarModelObject.Dopamine.model} ${snackbarMessageObject["Goal Completed!"].message}`,
  },
  [SnackbarModelMessage.StridesCompleted]: {
    message: `${snackbarModelObject.Strides.model} ${snackbarMessageObject["Goal Completed!"].message}`,
  },
  [SnackbarModelMessage.StepsCompleted]: {
    message: `${snackbarModelObject.Steps.model} ${snackbarMessageObject["Goal Completed!"].message}`,
  },
  [SnackbarModelMessage.DopamineAdding]: {
    message: `${snackbarMessageObject.Add.message} ${snackbarModelObject.Dopamine.model}`,
  },
  [SnackbarModelMessage.StepsAdd]: {
    message: `${snackbarMessageObject.Add} ${snackbarModelObject.Steps}`,
  },
  [SnackbarModelMessage.StridesAdding]: {
    message: `${snackbarMessageObject.Add} ${snackbarModelObject.Strides.model}`,
  },
};

export {
  snackbarMessageObject,
  snackbarModelMessageObject,
  snackbarModelObject,
};
