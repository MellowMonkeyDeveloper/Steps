import { SnackbarMessage, SnackbarModel, SnackbarModelMessage } from "../Enums/Snackbar";
import { SnackbarMessageProps, SnackbarModelProps } from "../Interfaces/Snackbar";


const snackbarMessageObject: Record<SnackbarMessage, SnackbarMessageProps> = {
    [SnackbarMessage.Completed]: {message: 'Completed'},
    [SnackbarMessage.Created]: {message: 'Created'},
    [SnackbarMessage.Deleted]: {message: 'Deleted'},
    [SnackbarMessage.Error]: {message: 'Action failed!'},
    [SnackbarMessage.LoggedIn]: {message: 'You are logged in!'},
    [SnackbarMessage.Registered]: {message: 'You are registered!'},
    [SnackbarMessage.Updated]: {message: 'Updated!'},
    [SnackbarMessage.Warning]: {message: 'Warning!'},
}

const snackbarModelObject: Record<SnackbarModel, SnackbarModelProps> = {
    [SnackbarModel.Dopamine]: {model: 'Dopamine'},
    [SnackbarModel.Strides]: {model: 'Strides'},
    [SnackbarModel.Steps]: {model: 'Steps'}
}

const snackbarModelMessageObject: Record<SnackbarModelMessage, SnackbarMessageProps> = {
    [SnackbarModelMessage.DopamineCreated]: {message: `${snackbarModelObject[0].model} ${snackbarMessageObject.Created.message}`},
    [SnackbarModelMessage.StridesCreated]: {message: `${snackbarModelObject[1].model} ${snackbarMessageObject.Created.message}`},
    [SnackbarModelMessage.StepsCreated]: {message: `${snackbarModelObject[2].model} ${snackbarMessageObject.Created.message}`},
    [SnackbarModelMessage.DopamineUpdated]: {message: `${snackbarModelObject[0].model} ${snackbarMessageObject.Updated.message}`},
    [SnackbarModelMessage.StridesUpdated]: {message: `${snackbarModelObject[1].model} ${snackbarMessageObject.Updated.message}`},
    [SnackbarModelMessage.StepsUpdated]: {message: `${snackbarModelObject[2].model} ${snackbarMessageObject.Updated.message}`},
    [SnackbarModelMessage.DopamineDeleted]: {message: `${snackbarModelObject[0].model} ${snackbarMessageObject.Deleted.message}`},
    [SnackbarModelMessage.StridesDeleted]: {message: `${snackbarModelObject[1].model} ${snackbarMessageObject.Deleted.message}`},
    [SnackbarModelMessage.StepsDeleted]: {message: `${snackbarModelObject[2].model} ${snackbarMessageObject.Deleted.message}`},
    [SnackbarModelMessage.DopamineCompleted]: {message: `${snackbarModelObject[0].model} ${snackbarMessageObject["Goal Completed!"].message}`},
    [SnackbarModelMessage.StridesCompleted]: {message: `${snackbarModelObject[1].model} ${snackbarMessageObject["Goal Completed!"].message}`},
    [SnackbarModelMessage.StepsCompleted]: {message: `${snackbarModelObject[2].model} ${snackbarMessageObject["Goal Completed!"].message}`},

}


export {snackbarMessageObject, snackbarModelMessageObject, snackbarModelObject}