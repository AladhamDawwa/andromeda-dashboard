import { TOrderItem } from "@/types";
import { TItem, TRestaurant } from "@andromeda/core/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type OrderState = {
  cart: TOrderItem[];
  currentOrderId: string | null;
  taxRate: number;
  serviceRate: number;
  restaurant: TRestaurant | null;

  setCart: (items: TOrderItem[]) => void;
  clearCart: () => void;
  addToCart: (item: TItem, quantity?: number, comment?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItem: (itemId: string, quantity: number, comment?: string) => void;

  getOrderItem: (itemId: string) => TOrderItem | undefined;
  getItemQuantity: (itemId: string) => number;

  getSubtotal: () => number;
  getTotalItems: () => number;

  setOrderId: (orderId: string | null) => void;

  setTaxandServiceRates: (taxes: number, services: number) => void;
  setRestaurant: (restaurant: TRestaurant) => void;
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      cart: [],
      currentOrderId: null,

      taxRate: 0,
      serviceRate: 0,
      restaurant: null,

      setCart: (orderItems) => set({ cart: orderItems }),
      clearCart: () => set({ cart: [] }),
      addToCart: (item, quantity, comment) => {
        const existingItem = get().cart.find((i) => i.code === item.code);
        if (existingItem) {
          set({
            cart: get().cart.map((i) =>
              i.code === item.code
                ? { ...i, quantity: i.quantity + (quantity || 1), comment }
                : i
            ),
          });
        } else {
          set({
            cart: [
              ...get().cart,
              { ...item, quantity: quantity || 1, comment },
            ],
          });
        }
      },

      removeFromCart: (itemId) =>
        set({
          cart: get().cart.filter((item) => item.code !== itemId),
        }),

      updateCartItem: (itemId, quantity, comment) =>
        set({
          cart: get().cart.map((item) =>
            item.code === itemId ? { ...item, quantity, comment } : item
          ),
        }),
      getOrderItem: (itemId: string) => {
        const item = get().cart.find((item) => item.code === itemId);
        return item ? item : undefined;
      },
      getItemQuantity: (itemId: string) => {
        const item = get().cart.find((item) => item.code === itemId);
        return item ? item.quantity : 0;
      },
      getSubtotal: () => {
        const cart = get().cart;
        const subtotal = cart.reduce((acc, item) => {
          const itemPrice = item.price * item.quantity;
          return acc + itemPrice;
        }, 0);
        return subtotal;
      },

      getTotalItems: () => {
        const cart = get().cart;
        const total = cart.reduce((acc, item) => {
          return acc + item.quantity;
        }, 0);
        return total;
      },

      setOrderId: (orderId) => set({ currentOrderId: orderId }),
      setTaxandServiceRates: (taxes, services) =>
        set({ taxRate: taxes, serviceRate: services }),

      setRestaurant: (restaurant) => set({ restaurant: restaurant }),
    }),
    {
      name: "food-order-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
