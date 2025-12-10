import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Employee name is required"],
      trim: true,
      minLength: [3, "Name must contain at least 3 characters"],
    },

    email: {
      type: String,
      required: [true, "Employee email is required"],
      unique: true,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      minLength: [10, "Phone number must be 10 digits"],
      maxLength: [10, "Phone number must be 10 digits"],
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    role: {
      type: String,
      enum: ["trainer", "receptionist", "accountant", "cleaner", "manager"],
      required: true,
      default: "trainer",
    },

    salary: {
      type: Number,
      required: true,
    },
    salaryPaid:[
        {
            date:{
                type:Date,
                default:Date.now
            },
            paidAmount:{
                type:Number,
                required:true,
                default:0
            },
            dueAmount:{
                type:Number,
                required:true,
                default:0
            }
        }
    ],

    joiningDate: {
      type: Date,
      default: Date.now,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    profileImage: {
      public_id: { type: String,default:"" },
      secure_url: { type: String,default:"" },
    },
    attendance: [
      {
        date: Date,
        status: {
          type: String,
          enum: ["present", "absent"],
          default: "present",
        },
      },
    ],

    documents: {
      aadhaar: String,
      pancard: String,
    },
    trainerClients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member", // or "User" depending on your model name
      },
    ]
  },
  { timestamps: true }
);

const Employee =  mongoose.model("Employee", employeeSchema);
export default Employee;

