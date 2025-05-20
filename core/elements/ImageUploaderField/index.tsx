import { ImageUploader } from "../../components";
import { Field, FieldProps } from "formik";
import { ImageUploaderProps } from "../../components/ImageUploader";

type ImageUploaderPropsFieldProps = {
  name: string;
} & Omit<ImageUploaderProps, "initialImage" | "onImageUpload">;

const index = ({ name, ...props }: ImageUploaderPropsFieldProps) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        return (
          <ImageUploader
            {...props}
            initialImage={field.value}
            onImageUpload={(file) => {
              form.setFieldValue(field.name, file);
            }}
          />
        );
      }}
    </Field>
  );
};

export default index;
