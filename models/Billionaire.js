import mongoose from "mongoose";

const billionaireSchema = new mongoose.Schema({
  display: { type: String, required: true },
  netWorth: { type: Number, required: true },
  img_url: { type: String, required: true },
});

export const Billionaire = mongoose.model("Billionaire", billionaireSchema);
