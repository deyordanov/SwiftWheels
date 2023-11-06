import { FieldErrors } from "react-hook-form";

export type propTypes = {
  errors: FieldErrors<{ [x: string]: string }>;
  fieldKey: string;
};
