import { useCategoriesAPI } from "@/services";
import { TCategory } from "@/types/category";
import CategoryForm from "./CategoryForm";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

type AddCategoryFormProps = Pick<TCategory, "nameEn" | "nameAr">;

const AddCategoryForm = ({ onClose }: { onClose?: () => void }) => {
  const { t } = useTranslation();
  const { addCategory } = useCategoriesAPI();

  const onSubmit = (values: AddCategoryFormProps) => {
    addCategory(values)
      .then(() => {
        toast.success(t("addCategorySuccess"));
        if (onClose) {
          onClose();
        }
      })
      .catch((err) => {
        toast.error(t("addCategoryError"));
        console.error("addCategory err", err);
      });
  };

  return (
    <CategoryForm
      initialValues={{
        nameAr: "",
        nameEn: "",
      }}
      onSubmit={onSubmit}
    />
  );
};

export default AddCategoryForm;
