import Image from "next/image";

const PropertyHeaderImage = async ({ image }) => {
  console.log("ak", image);
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <div className="relative h-[400px] w-full">
            <Image
              src={image}
              alt="Property Header"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
