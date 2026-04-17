import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    costPerUnit: {
        type: Number,
        required: true
    },

    totalCost: { 
        type: Number,
        required: true
    },

    supplier: {
        type: String,
        default: "Unknown"
    },

    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export default mongoose.model("Purchase", PurchaseSchema);