import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: { // Name of the item (e.g., "Mandazi", "Flour")
    type: String,
    required: true
  },

  category: { // Category of the item (e.g., "Drinks", "ingredients")
    type: String,
    required: true
  },
    price: { //selling price for the item (e.g., 10 for Mandazi)
      type: Number,
      required: true
    },

    stock: { //stock for simple items like flour, sugar, etc.
        type: Number,
        default: 0,
    },

    components: [ //composite item support Example: Mandazi = flour + sugar + oil
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Item"
            },
            quantity: Number // how much of ingredients is used
        }
    ],

    costPerUnit: { // Optional: cost per unit for ingredients
        type: Number,
        default: 0
    },

    isComposite: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model("Item", ItemSchema);