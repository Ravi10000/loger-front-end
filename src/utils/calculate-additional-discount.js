import dayjs from "dayjs";

export function calculateAdditionalDiscount({
  checkIn,
  checkOut,
  content,
  propertyPrice,
}) {
  console.log({
    checkIn,
    checkOut,
    content,
    propertyPrice,
  });
  const stayLength = dayjs(checkOut).diff(dayjs(checkIn), "day");
  const appliedDiscount = {};
  if (stayLength > 29 && content?.monthlyPlanDiscount) {
    appliedDiscount.discount = content?.monthlyPlanDiscount;
    appliedDiscount.label = "Monthly Plan Discount";
    appliedDiscount.key = "monthlyPlanDiscount";
    propertyPrice = parseFloat(
      propertyPrice - (propertyPrice / 100) * content?.monthlyPlanDiscount
    ).toFixed(2);
  } else if (stayLength > 6 && content?.weeklyPlanDiscount) {
    propertyPrice -= parseFloat(
      (propertyPrice / 100) * content?.weeklyPlanDiscount
    ).toFixed(2);
    appliedDiscount.discount = content?.weeklyPlanDiscount;
    appliedDiscount.label = "Weekly Plan Discount";
    appliedDiscount.key = "weeklyPlanDiscount";
  }
  console.log({ propertyPrice, appliedDiscount });
  return { discountedPrice: propertyPrice, appliedDiscount };
}
