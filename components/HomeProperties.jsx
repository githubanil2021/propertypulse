//import propertyData from "../properties.json";
import PropertyCard from "./PropertyCard";
import Link from "next/link";

import connectDB from "@/config/database";
import Property from "@/models/Property";


const HomeProperties = async () => {
  await connectDB();
  const propertyData = await Property.find({}).lean();
  console.log(propertyData);
  
  const recentProperties = propertyData.slice(0, 3); // Get the first 6 properties for display
  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <h2 className="text-3xl text bold mb-6 text-blue-500 text-center">
            Recent Properties
          </h2>
          {recentProperties.length === 0 ? (
            <p>No Property Found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>{" "}
      </section>

      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
