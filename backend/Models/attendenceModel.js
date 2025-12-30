import mongoose from "mongoose";

const attendenceSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      default: null,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },
    date: {
      type: Date,
      required: true,
    },
    checkInTime: {
      type: Date,
      required: true,
    },
    checkOutTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["present", "absent", "leave"],
      required: true,
    },
  },
  { timestamps: true, strictPopulate: false }
);


// ✅ Custom validation: either member or employee must exist
attendenceSchema.pre("validate", function (next) {
  if (!this.member && !this.employee) {
    next(new Error("Either member or employee is required"));
  } else {
    // next();
  }
});

const Attendance = mongoose.model("Attendance", attendenceSchema);
export default Attendance;

//add a cron job to mark absent employees and members at 11:59 PM every day and automatically check them out if they are not checked out yet