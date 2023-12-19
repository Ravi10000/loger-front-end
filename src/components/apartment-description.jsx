import PropTypes from "prop-types";

ApartmentDescription.propTypes = {
  apartment: PropTypes.object,
};

function ApartmentDescription({ apartment }) {
  return (
    <>
      <h2>Description</h2>
      <div>
        {/* <h4>About Host</h4> */}
        <h5>Host: {apartment?.hostName}</h5>
        <p>{apartment?.aboutHost}</p>
      </div>
      <div>
        <h5>About Neighborhood</h5>
        <p>{apartment?.aboutNeighborhood}</p>
      </div>
      <div>
        <h5>About Property</h5>
        <p>{apartment?.aboutProperty}</p>
      </div>
    </>
  );
}

export default ApartmentDescription;
