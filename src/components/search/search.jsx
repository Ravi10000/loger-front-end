import styles from "./search.module.scss";
import { useDeferredValue, useEffect, useId, useState } from "react";
import MemberInfo from "#components/member-info/member-info";
import { useNavigate } from "react-router-dom";
import CustomDatePicker from "#components/custom-date-picker/custom-date-picker";
import { useQuery } from "@tanstack/react-query";
import { getValidSearchOptions } from "#api/properties.req";

function Search({ state }) {
  const id = useId();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(state?.checkIn || "");
  const [checkOut, setCheckOut] = useState(state?.checkOut || "");
  const [location, setLocation] = useState(state?.location || "");
  const [showOptions, setShowOptions] = useState(false);
  const [noOfRooms, setNoOfRooms] = useState(state?.noOfRooms || 0);
  const [noOfAdults, setNoOfAdults] = useState(state?.noOfAdults || 0);
  const [noOfChildren, setNoOfChildren] = useState(state?.noOfChildren || 0);

  const deferredLocation = useDeferredValue(location);
  const validOptionsQuery = useQuery({
    queryKey: ["valid search options", deferredLocation],
    enabled: !!deferredLocation && deferredLocation.length > 2,
    queryFn: async () => {
      const { data } = await getValidSearchOptions(deferredLocation);
      console.log({ data });
      let validOptions = [];

      data.properties?.forEach((property) => {
        let keys = Object.keys(property);
        keys.forEach((key) => {
          if (key !== "_id") {
            validOptions.push(property[key]);
          }
        });
      });
      setShowOptions(true);
      console.log({ validOptions });
      return validOptions;
    },
  });
  useEffect(() => {
    if (deferredLocation && deferredLocation.length > 2) {
      validOptionsQuery.refetch();
    }
  }, [deferredLocation]);

  function handleSearch() {
    navigate("/search-results", {
      state: {
        checkIn,
        checkOut,
        location,
        noOfRooms,
        noOfAdults,
        noOfChildren,
      },
    });
  }
  // console.log({
  //   checkIn,
  //   checkOut,
  //   location,
  //   noOfRooms,
  //   noOfAdults,
  //   noOfChildren,
  // });

  return (
    <div className={styles.searchContainer}>
      <div className={styles.search}>
        <div className={`${styles.inputContainer} ${styles.hotelSelector}`}>
          <label htmlFor={`${id}-hotelSelector`}>
            <img src="/images/icons/location.svg" alt="location" />
          </label>
          <input
            id={`${id}-hotelSelector`}
            className={styles.hotelInput}
            placeholder="Choose Your Area or Hotel Name"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {showOptions && (
            <SearchOptionsList
              query={validOptionsQuery}
              setQueryText={setLocation}
              close={() => setShowOptions(false)}
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
            noOfChildren,
            setNoOfChildren,
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

function SearchOptionsList({ query, setQueryText, close }) {
  // console.log(query?.data);
  return (
    <>
      {!query?.isLoading && (
        <ul className={styles.searchOptions}>
          {query.isError ? (
            <p>error fetching search options</p>
          ) : (
            query?.data?.map((item, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setQueryText(item);
                  close();
                }}
              >
                {item}
              </li>
            ))
          )}
        </ul>
      )}
    </>
  );
}

export default Search;
