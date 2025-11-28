import mongoose from "mongoose";
import ErrorHandler from "../Middlewares/ErrorHandler.js";

const membersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, "Name must contain at least 3 characters"],
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      minLength: [10, "Phone must be 10 digits"],
      maxLength: [10, "Phone must be 10 digits"],
    },

    email:{
      type:String,
      trim:true,
      unique:true,
      sparse:true
    },

    address: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",   // link to Plan model
      required: true,
    },

    planStartingDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    planEndingDate: {
      type: Date
      
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    profileImage: {
      
        public_id:{
            type: String, // cloudinary URL
      default: "",
        },
        secure_url:{
            type: String, // cloudinary URL
      default: "",
        }
      
    },

    // Payment Information
    totalPrice: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
    },

    paidAmount: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["paid", "pending", "partial"],
      default: "pending",
    },
    attendence:[
      {
        date:{
          type:Date,
          status: { type: String, enum: ["present", "absent"], default: "present" }
        },
      }
    ]
      
  },
  { timestamps: true }
);

// Auto calculate end date based on plan duration
membersSchema.pre("save", async function (next) {
  if (this.isModified("planStartingDate") || this.isModified("plan")) {
    const plan = await mongoose.model("Plan").findById(this.plan);
    if(!plan){
        return next(new ErrorHandler('plan not found',400))
    }
    this.planEndingDate = new Date(
      this.planStartingDate.getTime() + plan.duration * 24 * 60 * 60 * 1000
    );
  }
//   next();
});



const Members =  mongoose.model("Member", membersSchema);
export default Members;

