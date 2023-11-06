//types
import * as formErrorMessageTypes from "../../utilities/types/formErrorMessage.types";

export default function FormErrorMessage({
  errors,
  fieldKey,
}: formErrorMessageTypes.propTypes) {
  return (
    <p className="text-sm text-red-500">
      {errors[fieldKey]?.message ? `⚠ ${errors[fieldKey]?.message}` : ""}
    </p>
  );
}
