import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "@andromeda/core/components";
import InputField from "@andromeda/core/elements/InputField";
import { TCategory } from "@/types/category";
import { useTranslation } from "react-i18next";

type CategoryActionsFormProps = Pick<TCategory, "nameAr" | "nameEn">;

const validationSchema = Yup.object({
  nameAr: Yup.string().required("This field is required"),
  nameEn: Yup.string().required("This field is required"),
});

const CategoryActionsForm = ({
  initialValues,
  onSubmit,
}: {
  initialValues: CategoryActionsFormProps;
  onSubmit: (values: CategoryActionsFormProps) => void;
}) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form
        style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
      >
        <InputField
          name="nameAr"
          label={`${t("nameAR")} *`}
          placeholder={t("enterCategoryArName")}
          type="text"
        />
        <InputField
          name="nameEn"
          label={`${t("nameEN")} *`}
          placeholder={t("enterCategoryEnName")}
          type="text"
        />

        <Button type="submit" style={{ marginTop: "1rem" }}>
          {t("save")}
        </Button>
      </Form>
    </Formik>
  );
};

export default CategoryActionsForm;
