export function getPhoneNCountryCode(value) {
  const countryCode = value?.split(" ")?.[0];
  let phoneNumber = value?.split(" ")?.[1];
  if (countryCode && phoneNumber)
    phoneNumber = phoneNumber?.replaceAll?.("-", "");
  return { phoneNumber, countryCode };
}
