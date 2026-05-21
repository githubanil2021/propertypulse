import { Schema, model, models } from "mongoose";

const PropertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    location: {
      street: String,
      city: String,
      state: String,
      zip: String,
    },
    beds: {
      type: Number,
      required: [true, "Number of beds is required"],
    },
    baths: {
      type: Number,
      required: [true, "Number of baths is required"],
    },
    square_feet: {
      type: Number,
      required: [true, "Square footage is required"],
    },
    amenities: [String],
    rates: {
      nightly: Number,
      weekly: Number,
      monthly: Number,
    },
    seller_info: {
      name: String,
      email: String,
      phone: String,
    },
    images: [String],
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Property = models.Property || model("Property", PropertySchema);

export default Property;
