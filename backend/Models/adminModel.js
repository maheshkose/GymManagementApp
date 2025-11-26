import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {

    phone: {
      type: String,
    },

    profileImage: {
      type: String, // Cloudinary URL or local uploads
      default: "",
    },

    permissions: {
      type: [String], // Dynamic permissions list
      default: [
        "manage_members",
        "manage_trainers",
        "manage_payments",
        "manage_plans",
        "view_dashboard",
      ],
    },

    lastLogin: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default adminSchema;
