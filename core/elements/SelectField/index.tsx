import { Field } from "formik";
import { FieldProps } from "formik";
import { Select } from "../../components";
import { CustomSelectProps } from "../../components/Select";

type CustomSelectPropsFieldProps = {
  name: string;
} & Omit<CustomSelectProps<any>, "value" | "onChange">;

const SelectField = ({ name, ...props }: CustomSelectPropsFieldProps) => {
  return (
    <Field name={name}>
      {({ field, form: { setFieldValue, errors, touched } }: FieldProps) => {
        const error = touched[field.name] && !!errors[field.name];
        return (
          <Select
            {...props}
            {...field}
            value={field.value}
            onChange={(item) => setFieldValue(field.name, item)}
            error={error ? String(errors[field.name]) : undefined}
          />
        );
      }}
    </Field>
  );
};

export default SelectField;
