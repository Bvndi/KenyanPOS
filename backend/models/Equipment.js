import mongoose from "mongoose";

const EquipmentSchema = new mongoose.Schema({
    name: { // Name of the equipment (e.g., "Fryer", "Oven")
        type: String,
        required: true
    },

    description: { // Description of the equipment (e.g., "Used for frying mandazi")
        type: String,
        default: ""
    },

    purchaseDate: { // Date when the equipment was purchased
        type: Date,
        required: true
    },

    condition: { // Condition of the equipment (e.g., "Good", "Needs Repair")
        type: String,
        enum: ["New", "Good", "Needs Repair", "Broken"],
        default: "Good"
    },

    value: { // Current value of the equipment (e.g., 5000 for a fryer)
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.model("Equipment", EquipmentSchema);