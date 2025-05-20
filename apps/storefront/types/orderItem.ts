import { TItem } from "@andromeda/core/types";

export type TOrderItem = TItem & {
  comment?: string;
  quantity: number;
};
