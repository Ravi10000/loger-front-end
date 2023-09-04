import styles from "./search-results.page.module.scss";
import HeroSection from "#components/hero-section/hero-section";
import { RiArrowRightSLine } from "react-icons/ri";
import { RxCaretSort } from "react-icons/rx";
import { Balancer } from "react-wrap-balancer";
import FilterSidebar, {
  FilterGroup,
} from "#components/filter-sidebar/filter-sidebar";
import { filterOptions } from "#data/filter-options.data";
import { useState } from "react";
import { BsFilter } from "react-icons/bs";
import { searchResult } from "#data/search-results-data";
import SearchResultCard from "#components/search-result-card/search-result-card";

function SearchResultsPage() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className={styles.searchResultsPage}>
      <HeroSection small />
      <div className={styles.searchPath}>
        <div className={styles.searchPathTerm}>
          <p>Home</p>
          <RiArrowRightSLine className={styles.arrow} />
          <p>India</p>
          <RiArrowRightSLine className={styles.arrow} />
          <p>Uttarakhand</p>
          {/* <RiArrowRightSLine className={styles.arrow} /> */}
        </div>
        {/* <p>Hotels List - Style</p> */}
      </div>
      <div className={styles.sortingContainer}>
        <div className={styles.container}>
          <h2 className={styles.resultsCount}>
            <Balancer>Uttarakhand: 104 Properties Found</Balancer>
          </h2>
          <div className={styles.innerContainer}>
            <h4>Sorting Result By:</h4>
            <div className={styles.sort}>
              <SortingBox title="Name" />
              <SortingBox title="Price" />
              <SortingBox title="Rating" />
              <SortingBox title="Popularity" />
            </div>
          </div>
        </div>
      </div>
      <main>
        <div className={styles.left}>
          <div className={styles.menuIcon} onClick={() => setShowSidebar(true)}>
            <BsFilter className={styles.icon} />
            <p>Filter</p>
          </div>
          <img className={styles.map} src="/images/map.png" alt="map" />
          {showSidebar && (
            <FilterSidebar
              filterOptions={filterOptions}
              close={() => setShowSidebar(false)}
            />
          )}
          <div className={styles.filterGroupContainer}>
            <FilterGroup filterOptions={filterOptions} />
          </div>
        </div>
        <div className={styles.right}>
          {Array(10)
            .fill()
            .map((_, i) => (
              <SearchResultCard key={i} property={searchResult} />
            ))}
        </div>
      </main>
    </div>
  );
}

export default SearchResultsPage;

function SortingBox({ title }) {
  return (
    <div className={styles.sortingBox}>
      <p>{title}</p>
      <RxCaretSort className={styles.icon} />
    </div>
  );
}
