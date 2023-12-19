import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function useSearchInputs() {
  const [searchParams] = useSearchParams();

  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const location = searchParams.get("location") || "";
  const propertyId = searchParams.get("propertyId") || "";
  const noOfAdults = parseInt(searchParams.get("noOfRooms")) || 0;
  const noOfRooms = parseInt(searchParams.get("noOfRooms")) || 0;

  useEffect(() => {
    console.log("checkIn changed");
  }, [checkIn]);

  return { checkIn, checkOut, noOfAdults, noOfRooms, location, propertyId };
}

export default useSearchInputs;
