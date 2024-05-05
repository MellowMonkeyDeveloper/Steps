export interface SnackbarMessageProps {
  message: string;
}

export interface SnackbarActionProps {
  action: "Error" | "Warning" | "Success";
}

export interface SnackbarModelProps{
    model: 'Dopamine' | 'Strides' | 'Steps' | undefined
}