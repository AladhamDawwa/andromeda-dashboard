import { TItem } from "@andromeda/core/types";
import ItemForm, { ItemActionsFormProps } from "./ItemForm";
import { toast } from "react-toastify";
import { useItemsAPI } from "@/services";

const EditItemForm = ({
  initialValues,
  onClose,
}: {
  initialValues: TItem;
  onClose?: () => void;
}) => {
  const { editItem, uploadItemImage } = useItemsAPI();

  if (!initialValues) {
    return null;
  }
  return (
    <ItemForm
      initialValues={initialValues}
      onSubmit={(values: ItemActionsFormProps) => {
        editItem({
          ...values,
          code: initialValues.code,
          restaurantCode: initialValues.restaurantCode,
        })
          .then(() => {
            if (values.image && values.image !== initialValues.image) {
              uploadItemImage({
                code: initialValues.code,
                image: values.image,
              })
                .then(() => {
                  if (onClose) {
                    onClose();
                  }
                })
                .catch((error) => {
                  // Handle error, e.g., show an error message
                  toast.error("Error uploading image: " + error.message);
                });
            } else if (onClose) {
              onClose();
            }
            // Handle success, e.g., show a success message or redirect
            toast.success("Item updated successfully!");
          })
          .catch((error) => {
            // Handle error, e.g., show an error message
            toast.error("Error updating item: " + error.message);
          });
      }}
    />
  );
};

export default EditItemForm;
