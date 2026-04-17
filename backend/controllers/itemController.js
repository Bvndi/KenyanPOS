import Item from '../models/Item.js';

// Create a new item
export const createItem = async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
};

// Get all items
export const getItems = async (req, res) => {
    try {
    const items = await Item.find().populate("components.itemId");
    res.json(items);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
};

// Get a single item by ID
export const getItemById = async (req, res) => {
    try {
    const item = await Item.findById(req.params.id).populate("components.itemId");
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
};

// Update an item by ID
export const updateItem = async (req, res) => {
    try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
};

// Delete an item by ID
export const deleteItem = async (req, res) => {
    try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
};