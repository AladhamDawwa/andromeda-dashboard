import { Field } from "formik";
import { FieldProps } from "formik";
import Textarea, { TextareaProps } from "@andromeda/core/components/Textarea";

type TeaxtareaFieldProps = {
  name: string;
} & TextareaProps;

const TextareaField = ({ name, ...props }: TeaxtareaFieldProps) => {
  return (
    <Field name={name}>
      {({ field, form: { errors, touched } }: FieldProps) => {
        const error = touched[field.name] && !!errors[field.name];
        return (
          <Textarea
            {...props}
            error={error ? String(errors[field.name]) : undefined}
            {...field}
          />
        );
      }}
    </Field>
  );
};

export default TextareaField;
