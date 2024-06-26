import { SnackbarModelProps } from "./Snackbar";

export interface ToDoProps {
  title: string;
  deadline: Date;
  motivation: string;
  completed: boolean;
  description: string;
  user?: number;
  id?: number;
  type: SnackbarModelProps['model'];
}

export interface DopamineProps {
  user: number;
  todo: ToDoProps;
}

export interface StridesProps {
  dopamine: number;
  todo: ToDoProps;
}

export interface StepsProps {
  strides: number;
  todo: ToDoProps;
}

export interface ModelProps {
  key: number;
  todo: ToDoProps;
  id?: number;
}
