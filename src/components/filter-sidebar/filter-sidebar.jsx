import styles from "./filter-sidebar.module.scss";
import FilterOption from "#components/filter-option/filter-option";
import WithBackdrop from "#components/with-backdrop/with-backdrop";
import { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";

function FilterSidebar({ filterOptions, close }) {
  const popupRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) close();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);
  return (
    <WithBackdrop left>
      <div className={styles.filterSidebar} ref={popupRef}>
        <div className={styles.close}>
          <MdClose className={styles.closeIcon} onClick={close} />
        </div>
        {/* <div className={styles.container}>
          {filterOptions.map((filterOption) => (
            <div className={styles.filterGroup} key={filterOption?.id}>
              <h3>{filterOption?.title}</h3>
              <div className={styles.options}>
                {filterOption?.options?.map((option) => (
                  <FilterOption
                    key={option?.filterText}
                    title="500 - 1500"
                    count="2516"
                    isPrice
                  />
                ))}
              </div>
            </div>
          ))}
        </div> */}
        <FilterGroup filterOptions={filterOptions} />
      </div>
    </WithBackdrop>
  );
}

export function FilterGroup({ filterOptions }) {
  return (
    <div className={styles.container}>
      <h3>Filters By:</h3>
      {filterOptions.map((filterOption) => (
        <div className={styles.filterGroup} key={filterOption?.id}>
          <h3>{filterOption?.title}</h3>
          <div className={styles.options}>
            {filterOption?.options?.map((option) => (
              <FilterOption
                key={option?.filterText}
                title={option?.filterText}
                count={option?.count}
                isPrice={filterOption?.isPriceFilter}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export default FilterSidebar;
