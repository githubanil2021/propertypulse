"use server"
import connectDB from "@/config/database"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function updateProperty(propertyId, formData) {
    
    await connectDB();
    const sessionUser = await getSessionUser();
    
    if (!sessionUser || !sessionUser.userId) {
        throw new Error("User is required");
    }
    
    const { userId } = sessionUser;

    //check existing property
    const existingProperty=await Property.findById(propertyId);

    //verify ownership
    if(existingProperty.owner.toString() != userId)
    {
        throw new Error('Current user does not own this');
    }


    const amenities = formData.getAll("amenities");
  
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

  const updatedProperty = await Property.findByIdAndUpdate(propertyId, propertyData);

  revalidatePath('/','layout');
  redirect(`/properties/${updatedProperty._id}`);
    

}

export default updateProperty;