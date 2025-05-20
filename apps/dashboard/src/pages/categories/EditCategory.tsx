import { useCategoriesAPI } from "@/services";
import { TCategory } from "@/types/category";
import CategoryActionsForm from "./CategoryForm";

const EditCategoryForm = ({
  initialValues,
  onClose,
}: {
  initialValues: Pick<TCategory, "code" | "nameEn" | "nameAr">;
  onClose?: () => void;
}) => {
  const { updateCategory } = useCategoriesAPI();
  if (!initialValues) {
    return null;
  }
  return (
    <CategoryActionsForm
      initialValues={initialValues}
      onSubmit={(values: Pick<TCategory, "nameEn" | "nameAr">) => {
        updateCategory({ ...values, code: initialValues.code })
          .then((res) => {
            console.log("updateCategory res", res);
            if (onClose) {
              onClose();
            }
          })
          .catch((err) => {
            console.error("updateCategory err", err);
          });
      }}
    />
  );
};

export default EditCategoryForm;
