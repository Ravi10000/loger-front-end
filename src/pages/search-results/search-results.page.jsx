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
import { filterProperties, searchProperties } from "#api/properties.req";
import LoadingPage from "#pages/loading/loading";
import { useFilter } from "#hooks/use-filter";

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
  const propertyId = searchParams.get("propertyId");
  // console.log({ propertyId });
  // const [price, setPrice] = useFilter(null, "price");
  // const [facilities, setFacilities] = useFilter([], "facilities");
  // const [propertyTypes, setPropertyTypes] = useFilter([], "propertyTypes");
  const price = searchParams.get("price")
    ? JSON.parse(searchParams.get("price"))
    : null;
  const facilities = searchParams.get("facilities")
    ? JSON.parse(searchParams.get("facilities"))
    : null;
  const propertyTypes = searchParams.get("propertyTypes")
    ? JSON.parse(searchParams.get("propertyTypes"))
    : null;
  // console.log({ price, facilities, propertyTypes });

  const propertiesQuery = useQuery({
    queryKey: ["products", "search"],
    queryFn: async () => {
      let res = {};
      if (!price && !facilities?.length && !propertyTypes?.length) {
        res = await filterProperties({
          queryText: location,
          checkIn,
          checkOut,
          noOfRooms,
          noOfAdults,
          ...(propertyId && { propertyId }),
        });
      }
      res = await filterProperties({
        queryText: location,
        checkIn,
        checkOut,
        noOfRooms,
        noOfAdults,
        ...(price && { price }),
        ...(facilities?.length && { facilities }),
        ...(propertyTypes?.length && { propertyTypes }),
      });
      console.log({ properties: res?.data?.properties });
      return res?.data?.properties;
    },
  });

  useEffect(() => {
    propertiesQuery.refetch();
  }, [searchParams]);

  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className={styles.searchResultsPage}>
      <HeroSection small />
      <div className={styles.searchPath}>
        <div className={styles.searchPathTerm}>
          <p>Home</p>
          {/* <RiArrowRightSLine className={styles.arrow} />
          <p>India</p> */}
          <RiArrowRightSLine className={styles.arrow} />
          <p className="__capitalize">{location}</p>
        </div>
        {/* <p>Hotels List - Style</p> */}
      </div>
      <div className={styles.sortingContainer}>
        <div className={styles.container}>
          <h2 className={`__capitalize ${styles.resultsCount}`}>
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
          {propertiesQuery?.isLoading ? (
            <LoadingPage />
          ) : propertiesQuery?.isError ? (
            <div className={styles.loaderContainer}>
              <p>Erros occured while fetching properties, please try again.</p>
            </div>
          ) : (
            propertiesQuery?.data?.map((property, idx) => {
              return property?.packages ? (
                <Fragment key={idx}>
                  {property?.packages?.map((pkg, idx) => {
                    return (
                      <SearchResultCard
                        key={idx}
                        property={property}
                        pkg={pkg}
                      />
                    );
                  })}
                </Fragment>
              ) : (
                <SearchResultCard property={property} key={property?._id} />
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
