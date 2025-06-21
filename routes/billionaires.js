import express from "express";
import { Billionaire } from "../models/Billionaire.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await Billionaire.find();
  res.json(data);
});

export default router;
