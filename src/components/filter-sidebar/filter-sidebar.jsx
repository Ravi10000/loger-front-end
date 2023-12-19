import styles from "./filter-sidebar.module.scss";
import FilterOption from "#components/filter-option/filter-option";
import WithBackdrop from "#components/with-backdrop/with-backdrop";
import { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import { fetchAllFacilities } from "#api/facilities.req";
import { useQuery } from "@tanstack/react-query";
import { useFilter } from "#hooks/use-filter";
import { filterOptions } from "#data/filter-options.data";
import PropTypes from "prop-types";

FilterSidebar.propTypes = {
  close: PropTypes.func,
};

function FilterSidebar({ close }) {
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) close();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, close]);

  return (
    <WithBackdrop left>
      <div className={styles.filterSidebar} ref={popupRef}>
        <div className={styles.close}>
          <MdClose className={styles.closeIcon} onClick={close} />
        </div>
        <FilterSidebar.FilterGroup />
      </div>
    </WithBackdrop>
  );
}

FilterSidebar.FilterGroup = function FilterGroup() {
  const facilitiesQuery = useQuery({
    queryKey: ["facilities"],
    queryFn: async () => {
      const { data } = await fetchAllFacilities();
      return data;
    },
  });

  const facilities = facilitiesQuery?.data?.facilities;
  const [price, setPrice] = useFilter("price", null);
  const [selectedFacilities, setSelectedFacilities] = useFilter(
    "facilities",
    []
  );
  const [propertyTypes, setPropertyTypes] = useFilter("propertyTypes", []);
  return (
    <div className={styles.container}>
      <h3>Filters By:</h3>
      <div className={styles.filterGroup} key={filterOptions[0]?.id}>
        <h3>{filterOptions[0]?.title}</h3>
        <div className={styles.options} key={filterOptions[0].id}>
          {filterOptions[0]?.options?.map((option) => (
            <FilterOption
              key={option?.filterText}
              title={option?.filterText}
              count={option?.matchedCount}
              value={option?.value}
              isPrice={true}
              checked={price?.min === option?.value?.min}
              setValue={setPrice}
            />
          ))}
        </div>
      </div>
      <div className={styles.filterGroup} key={filterOptions[1]?.id}>
        <h3>{filterOptions[1]?.title}</h3>
        <div className={styles.options} key={filterOptions[1].id}>
          {filterOptions[1]?.options?.map((option) => (
            <FilterOption
              key={option?.filterText}
              title={option?.filterText}
              count={option?.matchedCount}
              value={option?.value}
              checked={propertyTypes?.includes(option?.value)}
              setValue={setPropertyTypes}
              list
            />
          ))}
        </div>
      </div>
      {facilities?.length && (
        <div className={styles.filterGroup} key="services">
          <h3>Room Facilities</h3>
          <div className={styles.options}>
            {facilities?.map((option) => (
              <FilterOption
                key={option?._id}
                title={option?.name}
                count={404}
                value={option?._id}
                checked={selectedFacilities?.includes(option?._id)}
                setValue={setSelectedFacilities}
                list
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default FilterSidebar;
