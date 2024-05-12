export interface SnackbarMessageProps {
  message: string;
  status: SnackbarStatusProps['status']
}

export interface SnackbarStatusProps {
  status: "Error" | "Warning" | "Success";
}

export interface SnackbarModelProps{
    model: 'Dopamine' | 'Strides' | 'Steps' | undefined
}