import { useState } from "react";
import { LuPencilLine, LuPlus, LuTrash } from "react-icons/lu";
import { useTranslation } from "react-i18next";

import { useCategoriesAPI } from "@/services";
import { Button, IconButton, Loader } from "@andromeda/core/components";
import { Table, PopupConfirm, Drawer } from "@/components";
import { TCategory } from "@/types/category";

import AddCategoryForm from "./AddCategory";
import EditCategoryForm from "./EditCategory";
import { toast } from "react-toastify";

const CategoriesPage = () => {
  const { t } = useTranslation();
  const { getCategories, deleteCategory } = useCategoriesAPI();

  const [editValue, setEditValue] = useState<TCategory | null>(null);
  const [deleteValue, setDeleteValue] = useState<string | null>(null);
  const [isAddCategoryDrawerOpen, setAddCategoryDrawerOpen] = useState(false);
  const [isEditCategoryDrawerOpen, setEditCategoryDrawerOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleDelete = () => {
    if (!deleteValue) return;
    deleteCategory(deleteValue as unknown as Pick<TCategory, "code">)
      .then(() => {
        toast.success(t("deleteCategorySuccess"));
      })
      .catch((err) => {
        toast.error(t("deleteCategoryError"));
        console.error("Error deleting category:", err);
      });
    setPopupOpen(false);
    setDeleteValue(null);
  };

  const { data: categories, isLoading } = getCategories();

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Loader />
      </div>
    );
  }

  if (!categories) {
    return <div>{t("noCategoriesFound")}</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontSize: "1rem", fontWeight: "bold" }}>
          {t("categoriesManagement")}
        </h2>
        <Button
          onClick={() => setAddCategoryDrawerOpen(true)}
          style={{
            display: "flex",
            gap: "2px",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            alignItems: "center",
          }}
        >
          <LuPlus
            style={{
              marginRight: "0.5rem",
              fontSize: "1.5rem",
            }}
          />
          <span>{t("addCategory")}</span>
        </Button>
        <Drawer
          width={400}
          visible={isAddCategoryDrawerOpen}
          onClose={() => setAddCategoryDrawerOpen(false)}
        >
          <AddCategoryForm onClose={() => setAddCategoryDrawerOpen(false)} />
        </Drawer>
      </div>

      <Table
        data={categories}
        renderHeader={() => (
          <>
            <th>{t("nameEN")}</th>
            <th>{t("nameAR")}</th>
            <th style={{ textAlign: "center" }}>{t("numOfItems")}</th>
            <th></th>
          </>
        )}
        renderRow={(category: TCategory) => (
          <>
            <td>{category.nameEn}</td>
            <td>{category.nameAr}</td>
            <td style={{ textAlign: "center" }}>{category.menuItems.length}</td>
            <td>
              <div
                style={{
                  display: "flex",
                  gap: "0.25rem",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <IconButton
                  icon={<LuTrash style={{ color: "red", display: "flex" }} />}
                  onClick={() => {
                    setDeleteValue(category.code);
                    setPopupOpen(true);
                  }}
                />
                <IconButton
                  onClick={() => {
                    setEditValue(category);
                    setEditCategoryDrawerOpen(true);
                  }}
                  icon={
                    <LuPencilLine style={{ color: "gray", display: "flex" }} />
                  }
                />
              </div>
            </td>
          </>
        )}
      />

      <Drawer
        width={400}
        visible={isEditCategoryDrawerOpen}
        onClose={() => {
          setEditCategoryDrawerOpen(false);
          setEditValue(null);
        }}
      >
        <EditCategoryForm
          initialValues={editValue!}
          onClose={() => {
            setEditCategoryDrawerOpen(false);
            setEditValue(null);
          }}
        />
      </Drawer>

      <PopupConfirm
        isOpen={isPopupOpen}
        message={t("confirmDeleteCategory")}
        onCancel={() => {
          setPopupOpen(false);
          setDeleteValue(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default CategoriesPage;
