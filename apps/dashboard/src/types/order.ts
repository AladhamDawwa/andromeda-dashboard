export type TOrderCard = {
  orderCode: string;
  orderPlacedTime: number;
  tableNumber: number;
  status: string;
};
export type TOrderItem = {
  menuItemCode: string;
  quantity: number;
  price: string;
  comment: string | null;
  menuItemName: string;
};
export type TOrderDetails = {
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
