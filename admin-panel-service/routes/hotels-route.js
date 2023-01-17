import express from "express";

import Hotel from "../models/Hotel.js";
import {
    createHotel
    , updateHotel
    , deleteHotel
    , getHotel
    , getHotels
} from '../controllers/hotel-controller.js'
import { verifyAdmin } from '../utils/verifyToken.js'


const router = express.Router();

//CREATE
router.post('/', verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

//GET
router.get("/:id", getHotel);

//GET ALL
router.get("/", getHotels);

export default router