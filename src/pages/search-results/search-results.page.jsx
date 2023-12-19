import styles from "./search-results.page.module.scss";
import HeroSection from "#components/hero-section/hero-section";
import { RiArrowRightSLine } from "react-icons/ri";
import { RxCaretSort } from "react-icons/rx";
import { Balancer } from "react-wrap-balancer";
import FilterSidebar from "#components/filter-sidebar/filter-sidebar";
import { Fragment, useState } from "react";
import { BsFilter } from "react-icons/bs";
import ConnectedSearchResultCard from "#components/search-result-card/search-result-card";
import { useQuery } from "@tanstack/react-query";
import { filterProperties, getOneProperty } from "#api/properties.req";
import LoadingPage from "#pages/loading/loading";
import PropTypes from "prop-types";
import { useFilter } from "#hooks/use-filter";
// import useSearchItem from "#hooks/search-item";
import { useSearchParams } from "react-router-dom";

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const location = searchParams.get("location");
  const noOfRooms = searchParams.get("noOfRooms");
  const noOfAdults = searchParams.get("noOfAdults");
  const propertyId = searchParams.get("propertyId");

  const [price] = useFilter("price", null);
  const [facilities] = useFilter("facilities", []);
  const [propertyTypes] = useFilter("propertyTypes", []);

  const propertiesQuery = useQuery({
    queryKey: [
      "products",
      "search",
      {
        mandatoryFields: {
          queryText: location,
          checkIn,
          checkOut,
          noOfRooms,
          noOfAdults,
        },
        optionalFields: {
          propertyId,
          price,
          facilities,
          propertyTypes,
        },
      },
    ],
    enabled:
      !!location && !!checkIn && !!checkOut && !!noOfAdults && !!noOfRooms,
    queryFn: async () => {
      let propertyRes;
      if (propertyId) {
        propertyRes = await getOneProperty({
          propertyId,
          checkIn,
          checkOut,
          noOfRooms,
          noOfAdults,
        });
      } else {
        propertyRes = await filterProperties({
          queryText: location,
          checkIn,
          checkOut,
          noOfRooms,
          noOfAdults,
          ...(propertyId && { propertyId }),
          ...(price && { price }),
          ...(facilities?.length && { facilities }),
          ...(propertyTypes?.length && { propertyTypes }),
        });
      }
      console.log({ propertyRes });
      return propertyRes?.data?.properties;
    },
  });
  console.log({ properties: propertiesQuery?.data?.properties });

  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className={styles.searchResultsPage}>
      <HeroSection small />
      <div className={styles.searchPath}>
        <div className={styles.searchPathTerm}>
          <p>Home</p>
          <RiArrowRightSLine className={styles.arrow} />
          <p className="__capitalize">{location}</p>
        </div>
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
          {showSidebar && <FilterSidebar close={() => setShowSidebar(false)} />}
          <div className={styles.filterGroupContainer}>
            <FilterSidebar.FilterGroup />
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
            propertiesQuery?.data?.map((property) => {
              return property?.packages ? (
                <Fragment key={property?._id}>
                  {property?.packages?.map((pkg, idx) => {
                    return (
                      <ConnectedSearchResultCard
                        key={property?._id + idx}
                        property={property}
                        pkg={pkg}
                      />
                    );
                  })}
                </Fragment>
              ) : (
                <ConnectedSearchResultCard
                  occupancy={noOfAdults}
                  property={property}
                  key={property?._id}
                />
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}

export default SearchResultsPage;

SortingBox.propTypes = {
  title: PropTypes.string,
};
function SortingBox({ title }) {
  return (
    <div className={styles.sortingBox}>
      <p>{title}</p>
      <RxCaretSort className={styles.icon} />
    </div>
  );
}
