import { Checkbox } from "../../components";
import { Field, FieldProps } from "formik";
import { TCheckboxProps } from "../../components/Checkbox";

type TCheckBoxFieldProps = {
  name: string;
} & TCheckboxProps;

const index = ({ name, ...props }: TCheckBoxFieldProps) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        return (
          <Checkbox
            {...props}
            isChecked={field.value}
            onChange={() => form.setFieldValue(field.name, !field.value)}
          />
        );
      }}
    </Field>
  );
};

export default index;
