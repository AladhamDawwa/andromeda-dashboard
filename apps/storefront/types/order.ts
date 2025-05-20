import { TOrderItem } from "@/types/orderItem";

export type TOrder = {
  orderCode: string;
  tableNumber: number;
  items: TOrderItem[];
  subtotal: string;
  totalPrice: string;
  tip: string;
  serviceFees: string;
  taxes: string;
  status: string;
  orderPlacedTime: number;
};

export type TOrderItemDetails = {
  menuItemCode: string;
  quantity: number;
  price: string;
  comment: string | null;
  menuItemName: string;
};

export type TOrderDetails = {
  orderCode: string;
  tableNumber: number;
  items: TOrderItemDetails[];
  subtotal: string;
  totalPrice: string;
  tip: string;
  serviceFees: string;
  taxes: string;
  status: string;
  orderPlacedTime: number;
};
