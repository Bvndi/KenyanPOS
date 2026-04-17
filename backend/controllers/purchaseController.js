import Purchase from "../models/Purchase.js";
import Item from "../models/Item.js";

// Create a purchase & increase stock
export const createPurchase = async (req, res) => {
    try {
        const { itemId, quantity, costPerUnit, supplier } = req.body;

        const totalCost = quantity * costPerUnit;

        // 1. Create purchase record
        const purchase = new Purchase({
            itemId,
            quantity,
            costPerUnit,
            totalCost,
            supplier
        });
        await purchase.save();

        // 2. Update item stock
        const item = await Item.findById(itemId);
        item.stock += quantity;
        item.costPerUnit = costPerUnit; // update latest cost
        await item.save();

        res.status(201).json({
            message: "Purchase created and stock updated",
            purchase,
            updatedItem: item
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all purchases
export const getPurchases = async (req, res) => {
    try {
        const purchase = await Purchase.find().populate("itemId");
        res.json(purchase);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get purchase by ID
export const getPurchaseById = async (req, res) => {
    try {
        const purchase = await Purchase.findById(req.params.id).populate("itemId");
        if (!purchase) return res.status(404).json({ message: "Purchase not found" });
        res.json(purchase);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
