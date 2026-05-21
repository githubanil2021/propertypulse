import {
  FaTimes,
  FaBed,
  FaRulerCombined,
  FaBath,
  FaCheck,
  FaMapMarker,
} from "react-icons/fa";

const PropertyDetails = async ({ property }) => {
  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
        <div className="p-4">
          <div className="text-left md:text-center lg:text-left mb-6">
            <div className="text-gray-600">{property.type}</div>
            <h3 className="text-xl font-bold">{property.name}</h3>
            <p className="text-orange-500 text-sm">
              <FaMapMarker className="inline-block mr-1" />
              {property.location.city}, {property.location.state},{" "}
              {property.location.zipcode}
            </p>
          </div>

          <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
            {property.rentalPrice}
          </h3>

          <h2 className="text-lg font-semibold mb-4 bg-gray-500 px-4">
            Rates and Options:
          </h2>
          <div className="flex justify-center gap-4 text-gray-500 mb-4 inline-justify "></div>

          <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
            <p>
              <i className="fa-solid fa-money-bill"></i> Weekly
            </p>
            <div className="text-xl font-bold text-blue-500">
              {property.rates.weekly ? (
                `$${property.rates.weekly.toLocaleString()}`
              ) : (
                <FaTimes className="text-red-700" />
              )}
            </div>
            <p>
              <i className="fa-solid fa-money-bill"></i> Monthly
            </p>
            <div className="text-xl font-bold text-blue-500">
              {property.rates.monthly ? (
                `$${property.rates.monthly.toLocaleString()}`
              ) : (
                <FaTimes className="text-red-700" />
              )}
            </div>
            <p>
              <i className="fa-solid fa-money-bill"></i> Nightly
            </p>
            <div className="text-xl font-bold text-blue-500">
              {property.rates.nightly ? (
                `$${property.rates.nightly.toLocaleString()}`
              ) : (
                <FaTimes className="text-red-700" />
              )}
            </div>
          </div>

          <div className="border border-gray-100 mb-5"></div>

          <div className="flex flex-col lg:flex-row justify-between mb-4">
            <div className="flex align-middle gap-2 mb-4 lg:mb-0">
              <i className="fa-solid fa-location-dot text-lg text-orange-700"></i>
              <span className="text-orange-700">
                {" "}
                {property.city}, {property.state}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden relative mt-6">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4 bg-gray-500 px-4">
            Description:
          </h2>
          <div className="flex justify-center gap-4 text-blue-500 mb-4 inline-justify ">
            <p>
              <FaBed className="inline-block mr-1" /> {property.beds}
              <span className="md:hidden lg:inline">Beds</span>
            </p>
            <p>
              <FaBath className="inline-block mr-1" /> {property.baths}
              <span className="md:hidden lg:inline">Baths</span>
            </p>
            <p>
              <FaRulerCombined className="inline-block mr-1" />
              {property.square_feet}
              <span className="md:hidden lg:inline">sqft</span>
            </p>
          </div>
          <div className="text-xl  text-blue-300">{property.description}</div>

          <div className="border border-gray-100 mb-5"></div>

          <div className="flex flex-col lg:flex-row justify-between mb-4">
            <div className="flex align-middle gap-2 mb-4 lg:mb-0">
              <i className="fa-solid fa-location-dot text-lg text-orange-700"></i>
              <span className="text-orange-700">
                {" "}
                {property.city}, {property.state}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden relative mt-6">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4 bg-gray-500 px-4">
            Amenities:
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-500">
            {property.amenities.map((amenity, index) => (
              <li key={index} className="flex items-center gap-2">
                <FaCheck className="text-green-500" /> {amenity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PropertyDetails;
