export function currencyFormator(value, currency = "INR") {
  const formator = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
  });
  return formator.format(value);
}
