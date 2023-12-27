import { findProperty } from "#api/properties.req";
import { useQuery } from "@tanstack/react-query";

export function useProperty(propertyId, select = [], populate, onSuccess) {
  const {
    data: property,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["property", propertyId, select, populate],
    enabled: propertyId?.length === 24,
    queryFn: async ({ queryKey }) => {
      const res = await findProperty(
        propertyId,
        queryKey?.[2]?.join?.(" "),
        queryKey?.[3]?.join?.(" ")
      );
      onSuccess?.(res?.data?.property);
      return res?.data?.property || null;
    },
  });

  return { property, isFetching, error };
}
