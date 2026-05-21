'use client';

import Image from "next/image";
import { Gallery, Item } from 'react-photoswipe-gallery';

const PropertyImages = ({ images }) => {
  return (
    <Gallery>
      <section className="bg-blue-500 p-4">
        <div className="container m-auto">

          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width="1000"
              height="600"
            >
              {({ ref, open }) => (
                <Image
                  src={images[0]}
                  className="object-cover h-[400px] rounded-lg"
                  width={1800}
                  height={400}
                  alt=""
                  ref={ref}
                  onClick={open}
                />
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {images.map((image, index) => (
                <div
                  key={index}
                  className={
                    images.length === 3 && index === 2
                      ? 'col-span-2'
                      : 'col-span-1'
                  }
                >

                  <Item
                    original={image}
                    thumbnail={image}
                    width="1000"
                    height="600"
                  >
                    {({ ref, open }) => (
                      <Image
                        alt=""
                        src={image}
                        className="object-cover w-full h-[400px] rounded-lg"
                        width={1800}
                        height={400}
                        ref={ref}
                        onClick={open}
                      />
                    )}
                  </Item>

                </div>
              ))}

            </div>
          )}

        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImages;