import Sale from "../models/Sale.js";
import Item from "../models/Item.js";

// Create a sale & decrease stock
export const createSale = async (req, res) => {
    try {
        const { items, paymentMethod } = req.body;

        let total = 0;

        // 1. Calculate total price
        for (const cartItem of items) {
            const item = await Item.findById(cartItem.itemId);
            total += cartItem.quantity * item.price;
        }

        // 2. Deduct stock
        for (const cartItem of items) {
            const item = await Item.findById(cartItem.itemId);

            if (!item.isComposite) {
                // Simple item - just deduct stock
                item.stock -= cartItem.quantity;
                if (item.stock < 0) return res.status(400).json({ message: `Insufficient stock for ${item.name}` });
                await item.save();
            } else {
                // Composite item - deduct ingredients
                for (const component of item.components) {
                    const ingredient = await Item.findById(component.itemId);
                    const deductionAmount = component.quantity * cartItem.quantity;

                    ingredient.stock -= deductionAmount;
                    if (ingredient.stock < 0) {
                        return res.status(400).json({
                            message: `Not enough stock for ingredient ${ingredient.name} of composite item ${item.name}`
                        });
                    }

                    await ingredient.save();
                }
            }
        }

        // 3. Create sale record
        const sale = new Sale({
            items,
            total,
            paymentMethod
        });
        await sale.save();

        res.status(201).json({
            message: "Sale processed successfully",
            sale
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all sales
export const getSales = async (req, res) => {
    try {
        const sales = await Sale.find().populate("items.itemId");
        res.json(sales);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single sale by ID
export const getSaleById = async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id).populate("items.itemId");
        if (!sale) return res.status(404).json({ message: "Sale not found" });
        res.json(sale);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};