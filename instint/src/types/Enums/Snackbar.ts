export enum SnackbarMessage {
    Created = 'Created',
    Updated = 'Updated',
    Deleted = 'Deleted',
    Error = 'Action Failed',
    Warning = 'Warning',
    Registered = 'Registered',
    LoggedIn = 'Logged In',
    Completed = 'Goal Completed!'
}

export enum SnackbarAction {
    Error,
    Warning,
    Success
}

export enum SnackbarModel {
    Dopamine,
    Strides,
    Steps
}

export enum SnackbarModelMessage {
    DopamineCreated = 'Dopamine Created',
    DopamineUpdated = 'Dopamine Updated',
    DopamineDeleted = 'Dopamine Deleted',
    StridesCreated = 'Strides Created',
    StridesDeleted = 'Strides Deleted',
    StridesUpdated = 'Strides Updated',
    StepsCreated = 'Steps Created',
    StepsDeleted = 'Steps Deleted',
    StepsUpdated = 'Steps Updated',
    DopamineCompleted = 'Dopamine Completed',
    StridesCompleted = 'Strides Completed',
    StepsCompleted = 'Steps Completed'
}