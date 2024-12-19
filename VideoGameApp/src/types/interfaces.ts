import { VideoGameResponse } from "../types/types";

export interface VideoGameFormProps {
  title: string;
  open: boolean;
  handleClose: () => void;
  notifySuccess: (message: string) => void;
  notifyError: (message: string) => void;
  initialValues?: VideoGameResponse;
}