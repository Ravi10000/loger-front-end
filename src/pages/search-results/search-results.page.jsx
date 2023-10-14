import styles from "./search-results.page.module.scss";
import HeroSection from "#components/hero-section/hero-section";
import { RiArrowRightSLine } from "react-icons/ri";
import { RxCaretSort } from "react-icons/rx";
import { Balancer } from "react-wrap-balancer";
import FilterSidebar, {
  FilterGroup,
} from "#components/filter-sidebar/filter-sidebar";
import { filterOptions } from "#data/filter-options.data";
import { Fragment, useEffect, useState } from "react";
import { BsFilter } from "react-icons/bs";
import SearchResultCard from "#components/search-result-card/search-result-card";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchProperties } from "#api/properties.req";

function SearchResultsPage() {
  // const {
  //   state: { checkIn, checkOut, location, noOfRooms, noOfAdults, noOfChildren },
  // } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const location = searchParams.get("location");
  const noOfRooms = parseInt(searchParams.get("noOfRooms"));
  const noOfAdults = parseInt(searchParams.get("noOfAdults"));
  // const noOfChildren = parseInt(searchParams.get("noOfChildren"));

  const propertiesQuery = useQuery({
    queryKey: ["products", "search"],
    queryFn: async () => {
      const res = await searchProperties({
        queryText: location,
        checkIn,
        checkOut,
        noOfRooms,
        noOfAdults,
      });
      console.log({ properties: res.data.properties });
      return res?.data?.properties;
    },
  });

  useEffect(() => {
    // queryClient.invalidateQueries(["products", "search"]);
    propertiesQuery.refetch();
  }, [searchParams]);

  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className={styles.searchResultsPage}>
      <HeroSection
        small
        // state={{
        //   checkIn,
        //   checkOut,
        //   location,
        //   noOfRooms,
        //   noOfAdults,
        //   noOfChildren,
        // }}
      />
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
            <Balancer>
              {location}: {propertiesQuery?.data?.length || "No"} Properties
              Found
            </Balancer>
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
          {/* {Array(10)
            .fill()
            .map((_, i) => (
              <SearchResultCard key={i} property={searchResult} />
            ))} */}
          {/* {propertiesQuery?.data?.map((property) => (
            <SearchResultCard key={property._id} property={property} />
          ))} */}

          {/* <div className={styles.loaderContainer}>
            <span className={styles.loader}></span>
          </div> */}

          {propertiesQuery?.isLoading ? (
            <div className={styles.loaderContainer}>
              <span className={styles.loader}></span>
            </div>
          ) : propertiesQuery?.isError ? (
            <div className={styles.loaderContainer}>
              <p>Erros occured while fetching properties, please try again.</p>
            </div>
          ) : (
            propertiesQuery?.data?.map((property, idx) => {
              return (
                <Fragment key={idx}>
                  {property?.packages?.map((pkg, idx) => {
                    return (
                      <SearchResultCard
                        key={idx}
                        property={property}
                        pkg={pkg}
                        roomsCount={noOfRooms}
                        adultsCount={noOfAdults}
                      />
                    );
                  })}
                </Fragment>
              );
            })
          )}
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
