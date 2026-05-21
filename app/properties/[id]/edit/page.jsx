import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyEditForm from "@/components/PropertyEditForm";
import { convertToSerializableObject } from "@/utils/convertToObject";

const PropertyEditPage = async ({ params }) => {
  const { id } = await params;
  await connectDB();

  const propertyDoc = await Property.findById(id).lean();
  const propertyDoc2 = await Property.find().lean();

  if (!propertyDoc) {
    return (
      <h1 className="text-center text-2xl font-bold">PROPERTY NOT FOUND</h1>
    );
  }

  const property = convertToSerializableObject(propertyDoc);

  
  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold">PROPERTY NOT FOUND</h1>
    );
  }

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-2-2xl py-24">
        <div className="bg-white px-6py-8 mb-4 shadow-medium rounded border m-4 md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default PropertyEditPage;
