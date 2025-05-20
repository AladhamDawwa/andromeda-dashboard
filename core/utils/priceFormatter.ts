const PriceFormatter = (amount: number, locale: string) => {
  const formattedPrice = new Intl.NumberFormat(
    locale === "ar" ? "ar-EG" : "en-US",
    {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 2,
    }
  ).format(amount);

  return formattedPrice;
};

export default PriceFormatter;
