import { useState } from "react";
import { LuPencilLine, LuPlus, LuTrash } from "react-icons/lu";

import { Button, IconButton, Loader } from "@andromeda/core/components";
import { Drawer, PopupConfirm, Table } from "@/components";
import { useItemsAPI } from "@/services";
import { TItem } from "@andromeda/core/types";
import { useTranslation } from "react-i18next";

import EditItemForm from "./EditItem";
import AddItemForm from "./AddItem";
import { toast } from "react-toastify";
import priceFormatter from "@andromeda/core/utils/priceFormatter";

const ItemsPage = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const { getItems, deleteItem } = useItemsAPI();
  const [deleteValue, setDeleteValue] = useState<Pick<TItem, "code"> | null>(
    null
  );
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [editValue, setEditValue] = useState<TItem | null>(null);
  const [isAddItemDrawerOpen, setAddItemDrawerOpen] = useState(false);
  const [isEditItemDrawerOpen, setEditItemDrawerOpen] = useState(false);

  const { data: items, isLoading } = getItems();

  const handleDelete = () => {
    if (!deleteValue) return;
    deleteItem(deleteValue)
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

  if (!items) {
    return <div>{t("noItemsFound")}</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        maxWidth: "100%",
        maxHeight: "100%",
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
          {t("itemsManagement")}
        </h2>
        <Button
          onClick={() => setAddItemDrawerOpen(true)}
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
          <span>{t("addItem")}</span>
        </Button>
        <Drawer
          width={400}
          visible={isAddItemDrawerOpen}
          onClose={() => setAddItemDrawerOpen(false)}
        >
          <AddItemForm onClose={() => setAddItemDrawerOpen(false)} />
        </Drawer>
      </div>

      <Table
        data={items}
        renderHeader={() => (
          <>
            <th
              style={{
                textAlign: "center",
              }}
            >
              {t("image")}
            </th>
            {lang === "en" && <th>{t("nameEN")}</th>}
            {lang === "ar" && <th>{t("nameAR")}</th>}
            {lang === "ar" && (
              <th
                style={{
                  maxWidth: "200px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {t("descriptionAR")}
              </th>
            )}
            {lang === "en" && (
              <th
                style={{
                  maxWidth: "200px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {t("descriptionEN")}
              </th>
            )}
            <th>{t("price")}</th>
            {lang === "ar" && <th>{t("categoryAR")}</th>}
            {lang === "en" && <th>{t("categoryEN")}</th>}
            {/* <th style={{ textAlign: "center" }}>{t("enableComments")}</th> */}
            <th></th>
          </>
        )}
        renderRow={(item: TItem) => (
          <>
            <td>
              <img
                src={
                  item.image
                    ? (item.image as unknown as string)
                    : "/itemPlaceholder.jpg"
                }
                alt={item.nameEn}
                style={{
                  objectFit: "cover",
                  width: "50px",
                  height: "50px",
                  borderRadius: "8px",
                }}
              />
            </td>
            {lang === "en" && <td>{item.nameEn}</td>}
            {lang === "ar" && <td>{item.nameAr}</td>}
            {lang === "ar" && (
              <td
                style={{
                  maxWidth: "200px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.descriptionAr || "-"}
              </td>
            )}
            {lang === "en" && (
              <td
                style={{
                  maxWidth: "200px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.descriptionEn || "-"}
              </td>
            )}
            <td>{priceFormatter(item.price, lang)}</td>
            {lang === "ar" && <td>{item.categoryAr}</td>}
            {lang === "en" && <td>{item.categoryEn}</td>}
            {/* <td style={{ textAlign: "center" }}>
              {item.enableComments ? (
                <FaCheckCircle style={{ color: "green" }} />
              ) : (
                <FaBan style={{ color: "red" }} />
              )}
            </td> */}
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
                    setDeleteValue(item.code as unknown as Pick<TItem, "code">);
                    setPopupOpen(true);
                  }}
                />
                <IconButton
                  onClick={() => {
                    setEditValue(item);
                    setEditItemDrawerOpen(true);
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
        visible={isEditItemDrawerOpen}
        onClose={() => {
          setEditItemDrawerOpen(false);
          setEditValue(null);
        }}
      >
        <EditItemForm
          initialValues={editValue!}
          onClose={() => {
            setEditItemDrawerOpen(false);
            setEditValue(null);
          }}
        />
      </Drawer>

      <PopupConfirm
        isOpen={isPopupOpen}
        message={t("confirmDeleteItem")}
        onCancel={() => {
          setPopupOpen(false);
          setDeleteValue(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ItemsPage;
