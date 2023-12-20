import PropTypes from "prop-types";

ApartmentDescription.propTypes = {
  apartment: PropTypes.object,
};

function ApartmentDescription({ apartment }) {
  return (
    <>
      <h4>Description</h4>
      {/* <div>
        <h5>Host: {apartment?.hostName}</h5>
        <p>{apartment?.aboutHost?.substring?.(0, 75) ?? "" + "..."}</p>
      </div>
      <div>
        <h5>About Neighborhood</h5>
        <p>{apartment?.aboutNeighborhood?.substring?.(0, 75) ?? "" + "..."}</p>
      </div> */}
      <div>
        {/* <h5>About Property</h5> */}
        <p>{apartment?.aboutProperty?.substring?.(0, 150) + "..."}</p>
      </div>
    </>
  );
}

export default ApartmentDescription;
