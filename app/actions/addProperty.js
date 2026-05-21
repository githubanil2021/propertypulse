"use server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

import { SquareLoader } from "react-spinners";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

async function addProperty(formData) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User not authenticated");
  }

  const { userId } = sessionUser;

  const amenities = formData.getAll("amenities");
  const images = formData.getAll("images").filter((image) => image.name !== "");

  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    //price: parseFloat(formData.get("price")),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zip: formData.get("location.zip"),
    },
    beds: parseInt(formData.get("beds")),
    baths: parseInt(formData.get("baths")),
    square_feet: parseInt(formData.get("square_feet")),
    rates: {
      weekly: parseFloat(formData.get("rates.weekly")),
      monthly: parseFloat(formData.get("rates.monthly")),
      nightly: parseFloat(formData.get("rates.nightly")),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      contact: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
    amenities,
  };

  const imageUrls = [];
  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);
    const imageBase64 = imageData.toString("base64");

    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      {
        folder: "propertypulse",
      },
    );

    imageUrls.push(result.secure_url);
  }

  propertyData.images = imageUrls;

  console.log("Property Data:", propertyData);

  const newProperty = new Property(propertyData);
  await newProperty.save();

  revalidatePath("/", "layout");
  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
