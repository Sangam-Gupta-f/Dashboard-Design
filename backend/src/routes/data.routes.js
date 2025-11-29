import express from "express";
import { getData, getFilters } from "../controller/data.controller.js";

const router = express.Router();

router.post("/data", getData);

router.get("/filters", getFilters);

export default router;
