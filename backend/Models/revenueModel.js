import mongoose from "mongoose";

const revenueSchema = new mongoose.Schema({
    source: {
        type: String,
        enum: [
            "Membership",
            "Personal Training",
            "Product Sale",
            "Supplements",
            "Gym Merchandise",
            "Other"
        ],
        required: true
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

    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        default: null
    },

    paymentMethod: {
        type: String,
        enum: ["Cash", "Online", "UPI", "Card", "Bank Transfer"],
        required: true
    },

    receivedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    invoiceNumber: {
        type: String,
        unique: true,
        default: null
    },

    receiptImage: {
     public_id: { type: String,default:"" },
      secure_url: { type: String,default:"" },
    }
});

const Revenue = mongoose.model("Revenue", revenueSchema);
export default Revenue;
