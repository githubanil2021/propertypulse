import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";
import {convertToSerializableObject} from "@/utils/convertToObject";
import BookmarkButton from '@/components/BookmarkButton';
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";


const PropertyPage = async ({ params }) => {
  const { id } = await params;

  await connectDB();

  const propertyDoc = await Property.findById(id).lean();
  const property = convertToSerializableObject(propertyDoc);

  if(!property) {
    reutrn (<h1 className="text-center text-2xl font-bold mt-10">
      Property not found
    </h1>);
  }

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href={`/properties`}
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-gray-900"
          >
            <FaArrowLeft />
            Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-6 px-6">
         <div className="flex flex-col md:flex-row gap-6">
  <div className="md:w-[70%]">
    <PropertyDetails property={property} />
  </div>

  <aside className="md:w-[30%] space-y-4">
    <BookmarkButton property={property} />
    <ShareButtons property={property} />
    <PropertyContactForm property={property} />
  </aside>
</div>
        </div>
      </section>
       
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;
