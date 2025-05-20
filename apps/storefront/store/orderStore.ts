import { TItem, TRestaurant } from "@andromeda/core/types";
import { TMenu } from "@andromeda/core/types/menu";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type OrderItem = TItem & {
  comment?: string;
  quantity: number;
};

type OrderState = {
  menu: TMenu | null;
  order: OrderItem[];
  currentOrderId: string | null;
  taxes: number;
  services: number;
  restaurant: TRestaurant | null;

  setMenu: (menu: TMenu) => void;
  setOrder: (order: OrderItem[]) => void;
  setRestaurant: (restaurant: TRestaurant) => void;
  setTaxesAndServices: (taxes: number, services: number) => void;
  addToOrder: (item: TItem, quantity?: number, comment?: string) => void;
  removeFromOrder: (itemId: string) => void;
  updateOrderItem: (itemId: string, quantity: number, comment?: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getItemQuantity: (itemId: string) => number;
  getOrderItem: (itemId: string) => OrderItem | undefined;

  setOrderId: (orderId: string) => void;
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      menu: null,
      order: [],
      currentOrderId: null,
      taxes: 0,
      services: 0,
      restaurant: null,

      setMenu: (menu: TMenu) => set({ menu: menu }),

      setTaxesAndServices: (taxes, services) =>
        set({ taxes: taxes, services: services }),

      setRestaurant: (restaurant) => set({ restaurant: restaurant }),

      addToOrder: (item, quantity, comment) => {
        const existingItem = get().order.find((i) => i.code === item.code);
        if (existingItem) {
          set({
            order: get().order.map((i) =>
              i.code === item.code
                ? { ...i, quantity: i.quantity + (quantity || 1), comment }
                : i
            ),
          });
        } else {
          set({
            order: [
              ...get().order,
              { ...item, quantity: quantity || 1, comment },
            ],
          });
        }
      },

      removeFromOrder: (itemId) =>
        set({
          order: get().order.filter((item) => item.code !== itemId),
        }),

      updateOrderItem: (itemId, quantity, comment) =>
        set({
          order: get().order.map((item) =>
            item.code === itemId ? { ...item, quantity, comment } : item
          ),
        }),

      clearCart: () => set({ order: [] }),

      getItemQuantity: (itemId: string) => {
        const item = get().order.find((item) => item.code === itemId);
        return item ? item.quantity : 0;
      },
      getOrderItem: (itemId: string) => {
        const item = get().order.find((item) => item.code === itemId);
        // return item && { quantity: 0, comment: "" };
        return item ? item : undefined;
      },

      getTotalPrice: () => {
        const order = get().order;
        const total = order.reduce((acc, item) => {
          const itemPrice = item.price * item.quantity;
          return acc + itemPrice;
        }, 0);
        return total;
      },

      getTotalItems: () => {
        const order = get().order;
        const total = order.reduce((acc, item) => {
          return acc + item.quantity;
        }, 0);
        return total;
      },

      setOrderId: (orderId) => set({ currentOrderId: orderId }),

      setOrder: (order) => set({ order }),
    }),
    {
      name: "food-order-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
