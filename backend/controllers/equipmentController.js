import Equipment from "../models/Equipment.js";

// Create new equipment
export const createEquipment = async (req, res) => {
    try {
        const equipment = new Equipment(req.body);
        await equipment.save();
        res.status(201).json(equipment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all equipment
export const getEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.find();
        res.json(equipment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get equipment by ID
export const getEquipmentById = async (req, res) => {
    try {
        const equipment = await Equipment.findById(req.params.id);
        if (!equipment) return res.status(404).json({ message: "Equipment not found" });
        res.json(equipment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update equipment
export const updateEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(equipment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete equipment
export const deleteEquipment = async (req, res) => {
    try {
        await Equipment.findByIdAndDelete(req.params.id);
        res.json({ message: "Equipment deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};