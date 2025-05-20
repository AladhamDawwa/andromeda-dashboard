import { Input } from "@andromeda/core/components";
import { InputProps } from "@andromeda/core/components/Input";
import { Field } from "formik";
import { FieldProps } from "formik";

type InputFieldProps = {
  name: string;
} & InputProps;

const InputField = ({ name, ...props }: InputFieldProps) => {
  return (
    <Field name={name}>
      {({ field, form: { errors, touched } }: FieldProps) => {
        const error = touched[field.name] && !!errors[field.name];
        return (
          <Input
            {...props}
            error={error ? String(errors[field.name]) : undefined}
            {...field}
          />
        );
      }}
    </Field>
  );
};

export default InputField;
