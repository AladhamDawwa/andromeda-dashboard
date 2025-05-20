export type TMenuItem = {
  code: string;
  restaurantCode: string;
  categoryCode: string;
  categoryEn: string;
  categoryAr: string;
  nameEn: string;
  nameAr: string;
  price: number;
  descriptionEn?: string;
  descriptionAr?: string;
  enableComments: boolean;
  image?: File;
};
