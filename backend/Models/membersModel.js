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

    email: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
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

    plansArray: [
      {
        plan: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Plan",
          required: true,
        },
        planStartingDate: {
          type: Date,
        },
        planEndingDate: {
          type: Date,
        },
        paidAmount: {
          type: Number,
          default: 0,
        },
        dueAmount: {
          type: Number,
          default: 0,
        },
        finalPrice: {
          type: Number,
          default: 0,
        },
        enrollmentAmount: {
          type: Number,
          default: 0,
        },
        paymentStatus: {
          type: String,
          enum: ["paid", "pending", "partial"],
          default: "pending",
        },
      },
    ],
    currentPlan: {
      plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
        required: true,
      },
      planStartingDate: {
        type: Date,
        required:true
      },
      planEndingDate: {
        type: Date,
      },
      // enrollmentAmount: {
      //   type: Number,
      //   default: 0,
      // },
      // finalPrice: {
      //   type: Number,
      //   default: 0,
      // },
      paidAmount: {
        type: Number,
        default: 0,
      },
      dueAmount: {
        type: Number,
        default: 0,
      },

      paymentStatus: {
        type: String,
        enum: ["paid", "pending", "partial"],
        default: "pending",
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    profileImage: {
      public_id: {
        type: String, // cloudinary URL
        default: "",
      },
      secure_url: {
        type: String, // cloudinary URL
        default: "",
      },
    },

    attendence: [
      {
        date: {
          type: Date,
        },
        status: {
          type: String,
          enum: ["present", "absent"],
          default: "present",
        },
      },
    ],
  },
  { timestamps: true }
);

// Auto calculate end date based on plan duration
// membersSchema.pre("save", async function (next) {
//   if (this.isModified("currentPlan.planStartingDate") || this.isModified("currentPlan")) {
//     const plan = await mongoose.model("Plan").findById(this.currentPlan.plan);
//     if (!plan) {
//       return next(new ErrorHandler("plan not found", 400));
//     }
//     this.currentPlan.planEndingDate = new Date(
//       this.currentPlan.planStartingDate.getTime() + plan.duration * 24 * 60 * 60 * 1000
//     );
//     this.currentPlan.dueAmount = plan.finalPrice - this.currentPlan.paidAmount;
//     this.plansArray.push(this.currentPlan);
//   }
//   return next();
// });

const Members = mongoose.model("Member", membersSchema);
export default Members;
