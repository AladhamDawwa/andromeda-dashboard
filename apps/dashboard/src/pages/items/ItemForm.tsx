import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import { Button } from "@andromeda/core/components";
import InputField from "@andromeda/core/elements/InputField";
import SelectField from "@andromeda/core/elements/SelectField";
import TextareaField from "@andromeda/core/elements/TextareaField";
// import CheckboxField from "@andromeda/core/elements/CheckboxField";
import ImageUploaderField from "@andromeda/core/elements/ImageUploaderField";
import { useCategoriesAPI } from "@/services";
import { TItem } from "@andromeda/core/types";

export type ItemActionsFormProps = Omit<
  TItem,
  "code" | "restaurantCode" | "categoryAr" | "categoryEn"
>;

const ItemActionsForm = ({
  initialValues,
  onSubmit,
}: {
  initialValues: ItemActionsFormProps;
  onSubmit: (values: ItemActionsFormProps) => void;
}) => {
  const { t } = useTranslation();

  const { getCategories } = useCategoriesAPI();
  const { data: categories } = getCategories();

  const validationSchema = Yup.object({
    nameAr: Yup.string().required(t("requiredField")),
    nameEn: Yup.string().required(t("requiredField")),
    descriptionAr: Yup.string(),
    descriptionEn: Yup.string(),
    price: Yup.number().required(t("requiredField")),
    categoryCode: Yup.string().required(t("requiredField")),
    enableComments: Yup.boolean(),
    image: Yup.mixed(),
  });

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
          placeholder={t("nameARPlaceholder")}
          type="text"
        />
        <InputField
          name="nameEn"
          label={`${t("nameEN")} *`}
          placeholder={t("nameENPlaceholder")}
          type="text"
        />
        <TextareaField
          name="descriptionAr"
          label={t("descriptionAR")}
          placeholder={t("descriptionARPlaceholder")}
          rows={5}
        />
        <TextareaField
          name="descriptionEn"
          label={t("descriptionEN")}
          placeholder={t("descriptionENPlaceholder")}
          rows={5}
        />
        <InputField
          name="price"
          label={`${t("price")} *`}
          placeholder={t("pricePlaceholder")}
          type="number"
        />
        <SelectField
          name="categoryCode"
          label={t("category")}
          labelKey="nameEn"
          valueKey="code"
          placeholder={t("categorySelectPlaceholder")}
          options={categories || []}
        />
        {/* <CheckboxField name="enableComments" label={t("enableComments")} /> */}
        <ImageUploaderField name="image" label={t("uploadItemImage")} />
        <Button type="submit" style={{ marginTop: "1rem" }}>
          {t("save")}
        </Button>
      </Form>
    </Formik>
  );
};

export default ItemActionsForm;
