import styles from "./search.module.scss";
import { useDeferredValue, useEffect, useId, useState } from "react";
import MemberInfo from "#components/member-info/member-info";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomDatePicker from "#components/custom-date-picker/custom-date-picker";
import { useQuery } from "@tanstack/react-query";
import { getValidSearchOptions } from "#api/properties.req";
import { MdOutlineLocationOn } from "react-icons/md";
import { LuHotel } from "react-icons/lu";
import { VscCircleLargeFilled } from "react-icons/vsc";
import { FaTreeCity } from "react-icons/fa6";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const checkIn = searchParams.get("checkIn");
  // const checkOut = searchParams.get("checkOut");
  // const location = searchParams.get("location");
  // const noOfRooms = parseInt(searchParams.get("noOfRooms"));
  // const noOfAdults = parseInt(searchParams.get("noOfAdults"));
  // const noOfChildren = parseInt(searchParams.get("noOfChildren"));

  const id = useId();
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") || "");
  const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  // const [showOptions, setShowOptions] = useState(false);
  const [noOfRooms, setNoOfRooms] = useState(
    parseInt(searchParams.get("noOfRooms")) || 0
  );
  const [noOfAdults, setNoOfAdults] = useState(
    parseInt(searchParams.get("noOfAdults")) || 0
  );
  // const [noOfChildren, setNoOfChildren] = useState(state?.noOfChildren || 0);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const deferredLocation = useDeferredValue(location);
  const validOptionsQuery = useQuery({
    queryKey: ["valid search options", deferredLocation],
    enabled: !!deferredLocation && deferredLocation.length > 2 && isSearching,
    queryFn: async () => {
      const { data } = await getValidSearchOptions(deferredLocation);
      console.log({ data });
      // let validOptions = [];
      return data;

      // data.properties?.forEach((property) => {
      //   let keys = Object.keys(property);
      //   keys.forEach((key) => {
      //     if (key !== "_id") validOptions.push(property[key]);
      //   });
      // });
      // console.log({ validOptions });
      // return validOptions;
    },
  });
  useEffect(() => {
    if (deferredLocation && deferredLocation.length > 2) {
      validOptionsQuery.refetch();
    }
  }, [deferredLocation]);

  function handleSearch() {
    navigate(
      `/search-results?checkIn=${checkIn}&checkOut=${checkOut}&location=${location}&noOfRooms=${noOfRooms}&noOfAdults=${noOfAdults}${
        selectedProperty ? `&propertyId=${selectedProperty?._id}` : ""
      }`
      // {
      //   state: {
      //     checkIn,
      //     checkOut,
      //     location,
      //     noOfRooms,
      //     noOfAdults,
      //     noOfChildren,
      //   },
      // }
    );
  }

  return (
    <div className={styles.searchContainer}>
      <div className={styles.search}>
        <div className={`${styles.inputContainer} ${styles.hotelSelector}`}>
          <label htmlFor={`${id}-hotelSelector`}>
            <img src="/images/icons/location.svg" alt="location" />
          </label>
          <input
            onFocus={() => setIsSearching(true)}
            onBlur={() => setTimeout(() => setIsSearching(false), 200)}
            id={`${id}-hotelSelector`}
            className={styles.hotelInput}
            placeholder="Choose Your Area or Hotel Name"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {isSearching && (
            <SearchOptionsList
              query={validOptionsQuery}
              setSelectedProperty={setSelectedProperty}
              setQueryText={setLocation}
              // close={() => setShowOptions(false)}
            />
          )}
        </div>
        <div className={styles.dates}>
          <div className={styles.inputContainer}>
            <CustomDatePicker
              label="Check In"
              date={checkIn}
              setDate={setCheckIn}
            />
          </div>
          <div className={styles.inputContainer}>
            <CustomDatePicker
              label="Check Out"
              date={checkOut}
              setDate={setCheckOut}
            />
          </div>
        </div>
        <MemberInfo
          states={{
            noOfRooms,
            setNoOfRooms,
            // noOfChildren,
            // setNoOfChildren,
            noOfAdults,
            setNoOfAdults,
          }}
        />
        <button className={styles.searchBtn} onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

function SearchOptionsList({ query, setQueryText, setSelectedProperty }) {
  // console.log(query?.data);
  return (
    <>
      {!query?.isLoading && (
        <ul className={styles.searchOptions}>
          {query.isError ? (
            <li>error fetching search options</li>
          ) : !query?.data ? (
            <li>No properties or location found</li>
          ) : (
            <>
              {query?.data?.cities?.map((city) => (
                <li
                  key={city}
                  onClick={() => {
                    setQueryText(city);
                  }}
                >
                  <FaTreeCity className={styles.icon} />
                  <span>{city}</span>
                </li>
              ))}
              {query?.data?.cities?.length > 0 && (
                <div className={styles.seperator}></div>
              )}
              {query?.data?.properties?.map((property) => (
                <li
                  key={property?._id}
                  onClick={() => {
                    setQueryText(property?.name);
                    setSelectedProperty(property);
                  }}
                >
                  <LuHotel className={styles.icon} />
                  <span> {property?.name}</span>
                </li>
              ))}
              {query?.data?.properties?.length > 0 && (
                <div className={styles.seperator}></div>
              )}
              {query?.data?.addresses?.map((address) => (
                <li
                  key={address}
                  onClick={() => {
                    setQueryText(address);
                  }}
                >
                  <MdOutlineLocationOn className={styles.icon} />
                  <span>{address}</span>
                </li>
              ))}
              {query?.data?.addresses?.length > 0 && (
                <div className={styles.seperator}></div>
              )}

              {query?.data?.countries?.map((country) => (
                <li
                  key={country}
                  onClick={() => {
                    setQueryText(country);
                  }}
                >
                  <VscCircleLargeFilled className={styles.icon} />
                  <span>{country}</span>
                </li>
              ))}
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default Search;
