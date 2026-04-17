import express from "express";
import {
    createEquipment,
    getEquipment,
    getEquipmentById,
    updateEquipment,
    deleteEquipment
} from "../controllers/equipmentController.js";

const router = express.Router();

// Create new equipment
router.post("/", createEquipment);
// Get all equipment
router.get("/", getEquipment);
// Get equipment by ID
router.get("/:id", getEquipmentById);
// Update equipment
router.put("/:id", updateEquipment);
// Delete equipment
router.delete("/:id", deleteEquipment);

export default router;