

//memebership plan
import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    duration: {
      type: Number, // number of days or months
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    features: [
      {
        type: String,
        trim: true,
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },

    discount: {
      type: Number,
      default: 0, // percentage discount
    },

    finalPrice: {
      type: Number,
      default: function () {
        return this.price - (this.price * this.discount) / 100;
      },
    },

    planType: {
      type: String,
      enum: ["basic", "standard", "premium"],
      default: "basic",
    },
  },
  { timestamps: true }
);

 const Plan =  mongoose.model("Plan", planSchema);
 export default Plan;
