import ItemForm, { ItemActionsFormProps } from "./ItemForm";
import { useItemsAPI } from "@/services";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddItemForm = ({ onClose }: { onClose?: () => void }) => {
  const { addItem, uploadItemImage } = useItemsAPI();
  const { restaurantCode } = useParams();
  const onSubmit = (values: ItemActionsFormProps) => {
    addItem({
      ...values,
      restaurantCode: restaurantCode || "",
    })
      .then((response) => {
        if (values.image) {
          uploadItemImage({
            code: response.menuCode,
            image: values.image,
          }).catch((error) => {
            // Handle error, e.g., show an error message
            toast.error("Error uploading image: " + error.message);
          });
        }
        if (onClose) {
          onClose();
        }
        // Handle success, e.g., show a success message or redirect
        toast.success("Item added successfully!");
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        toast.error("Error adding item: " + error.message);
      });
  };

  return (
    <ItemForm
      initialValues={{
        nameAr: "",
        nameEn: "",
        price: 0,
        categoryCode: "",
        enableComments: false,
      }}
      onSubmit={onSubmit}
    />
  );
};

export default AddItemForm;
