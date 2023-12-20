import PropTypes from "prop-types";
import styles from "./search-options-list.module.scss";
import { FaTreeCity } from "react-icons/fa6";
import { LuHotel } from "react-icons/lu";
import { MdOutlineLocationOn } from "react-icons/md";
import { VscCircleLargeFilled } from "react-icons/vsc";
import Balancer from "react-wrap-balancer";

SearchOptionsList.propTypes = {
  query: PropTypes.object,
  setQueryText: PropTypes.func,
  setPropertyId: PropTypes.func,
};

function SearchOptionsList({ query, setQueryText, setPropertyId }) {
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
              {query?.data?.properties?.map((property) => (
                <li
                  key={property?._id}
                  onClick={() => {
                    console.log(
                      "selecting property",
                      property.name,
                      property._id
                    );
                    setQueryText(property?.name);
                    setPropertyId(property._id);
                  }}
                >
                  <LuHotel className={styles.icon} />
                  <span>
                    <Balancer>{property?.name}</Balancer>
                  </span>
                </li>
              ))}
              {!!query?.data?.properties?.length && (
                <div className={styles.seperator}></div>
              )}
              {query?.data?.cities?.map((city) => (
                <li
                  key={city}
                  onClick={() => {
                    setQueryText(city);
                    setPropertyId("");
                  }}
                >
                  <FaTreeCity className={styles.icon} />
                  <span>
                    <Balancer>{city}</Balancer>
                  </span>
                </li>
              ))}
              {!!query?.data?.cities?.length && (
                <div className={styles.seperator}></div>
              )}
              {query?.data?.addresses?.map((address) => (
                <li
                  key={address}
                  onClick={() => {
                    setQueryText(address);
                    setPropertyId("");
                  }}
                >
                  <MdOutlineLocationOn className={styles.icon} />
                  <span>
                    <Balancer>{address}</Balancer>
                  </span>
                </li>
              ))}
              {!!query?.data?.addresses?.length && (
                <div className={styles.seperator}></div>
              )}

              {query?.data?.countries?.map((country) => (
                <li
                  key={country}
                  onClick={() => {
                    setQueryText(country);
                    setPropertyId("");
                  }}
                >
                  <VscCircleLargeFilled className={styles.icon} />
                  <span>
                    <Balancer>{country}</Balancer>
                  </span>
                </li>
              ))}
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default SearchOptionsList;
