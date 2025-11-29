import mongoose from "mongoose";
//import data from "../../data.json" assert { type: "json" };
const dataSchema = new mongoose.Schema(
  {
    end_year: String,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    region: String,
    start_year: String,
    impact: String,
    added: Date,
    published: Date,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number,
    url: String,
  },
  { timestamps: true }
);

const DataModel = mongoose.model("Data", dataSchema);

export default DataModel;
