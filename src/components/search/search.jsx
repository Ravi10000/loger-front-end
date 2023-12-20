import styles from "./search.module.scss";
import { useId, useState } from "react";
import MemberInfo from "#components/member-info/member-info";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomDatePicker from "#components/custom-date-picker/custom-date-picker";
import { useQuery } from "@tanstack/react-query";
import { getValidSearchOptions } from "#api/properties.req";
import dayjs from "dayjs";
import { pushFlash } from "#redux/flash/flash.actions";
import { connect } from "react-redux";
import SearchOptionsList from "#components/search-options-list/search-options-list";
// import useSearchInputs from "#hooks/search-inputs.search-params";
import { useDebounce } from "@uidotdev/usehooks";
import PropTypes from "prop-types";
import useSearchItem from "#hooks/search-item";

ConnectedSearch.propTypes = {
  pushFlash: PropTypes.func,
};

function ConnectedSearch({ pushFlash }) {
  const navigate = useNavigate();
  const id = useId();
  const [isSearching, setIsSearching] = useState(false);
  const [searchParams] = useSearchParams();

  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") || "");
  const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [noOfRooms, setNoOfRooms] = useState(
    searchParams.get("noOfRooms") || 0
  );
  const [noOfAdults, setNoOfAdults] = useState(
    searchParams.get("noOfAdults") || 0
  );
  const [propertyId, setPropertyId] = useState(
    searchParams.get("propertyId") || ""
  );

  const debouncedLocation = useDebounce(location, 300);
  const validOptionsQuery = useQuery({
    queryKey: ["valid search options", debouncedLocation],
    enabled: !!debouncedLocation && debouncedLocation.length > 2 && isSearching,
    queryFn: async () => {
      const { data } = await getValidSearchOptions(debouncedLocation);
      return data;
    },
  });

  function handleSearch() {
    if (!location)
      return pushFlash({
        type: "warning",
        message: "Please enter a location",
      });
    let newCheckIn = checkIn || dayjs().format("YYYY-MM-DD");
    let newCheckOut =
      checkOut || dayjs(dayjs(newCheckIn).add(1, "day")).format("YYYY-MM-DD");
    console.log("before navigate to search results");
    console.log({
      newCheckIn,
      newCheckOut,
      propertyId,
      location,
      noOfRooms,
      noOfAdults,
    });
    navigate(
      `/search-results?checkIn=${newCheckIn}&checkOut=${newCheckOut}&location=${location}&noOfRooms=${
        noOfRooms || 1
      }&noOfAdults=${noOfAdults || 1}${
        propertyId ? `&propertyId=${propertyId}` : ""
      }`
    );
  }

  return (
    <div className={styles.searchContainer} id="search">
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
              setPropertyId={setPropertyId}
              setQueryText={setLocation}
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
          {...{
            noOfRooms: parseInt(noOfRooms) || 0,
            setNoOfRooms,
            noOfAdults: parseInt(noOfAdults) || 0,
            setNoOfAdults,
          }}
        />
        <button className={styles.searchBtn} onClick={handleSearch}>
          <p>Search</p>
        </button>
      </div>
    </div>
  );
}

const Search = connect(null, { pushFlash })(ConnectedSearch);
export default Search;
