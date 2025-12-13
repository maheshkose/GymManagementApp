import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    amount: {
        type: Number,
        required: true,
        min: 0
    },

    category: {
        type: String,
        enum: [
            "Equipment",
            "Maintenance",
            "Electricity",
            "Rent",
            "Salaries",
            "Supplements",
            "Marketing",
            "Miscellaneous"
        ],
        required: true
    },

    paymentMethod: {
        type: String,
        enum: ["Cash", "Online", "Bank Transfer", "Cheque"],
        default: "Cash"
    },

    vendor: {
        type: String, // who did you pay?
        default: "N/A"
    },

    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    receiptImage:{
     public_id: { type: String,default:"" },
      secure_url: { type: String,default:"" },
    },

    isRecurring: {
        type: Boolean,
        default: false
    },

    recurringPeriod: {
        type: String,
        enum: ["Daily", "Weekly", "Monthly", "Yearly", null],
        default: null
    }
},{timestamps:true});

const Expense =  mongoose.model("Expense", expenseSchema);
export default Expense;
