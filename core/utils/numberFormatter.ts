const NumberFormatter = (number: number, locale: string) => {
  const options = {
    maximumFractionDigits: 2,
  };
  return new Intl.NumberFormat(
    locale === "ar" ? "ar-EG" : "en-US",
    options
  ).format(number);
};

export default NumberFormatter;
