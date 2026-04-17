import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema({
    items: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Item",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            priceAtSale: {
                type: Number,
                required: true
            }
        }
    ],

    total: {
        type: Number,
        required: true
    },

    paymentMethod: {
        type: String,
        enum: ["cash", "mpesa", "card", "other"],
        default: "cash"
    },

    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export default mongoose.model("Sale", SaleSchema);