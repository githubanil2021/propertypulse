"use server";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User Id required");
  }

  const { userId } = sessionUser;
  const property = await Property.findById(propertyId);
  if (!property) {
    throw new Error("Property not found");
  }

  //owner check
  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  //extract public ids from image urls and delete from cloudinary
  const publicIds = property.images.map((url) => {
    const parts = url.split("/");
    const filename = parts[parts.length - 1];
    const publicId = filename.split(".")[0];
    return `propertypulse/${publicId}`;
  });

  //delete from cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy(publicId);
    }
  }

  await property.deleteOne();
  revalidatePath("/", "layout");
}

export default deleteProperty;
