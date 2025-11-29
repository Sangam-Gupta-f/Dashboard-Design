import DataModel from "../model/data.model.js";
import app from "../../server.js";
const getData = async (req, res) => {
  try {
    const filters = {};

    if (req.body?.end_year) filters.end_year = req.body.end_year;
    if (req.body?.topic) filters.topic = req.body.topic;
    if (req.body?.sector) filters.sector = req.body.sector;
    if (req.body?.region) filters.region = req.body.region;
    if (req.body?.country) filters.country = req.body.country;
    if (req.body?.city) filters.city = req.body.city;
    if (req.body?.pestle) filters.pestle = req.body.pestle;
    if (req.body?.source) filters.source = req.body.source;

    const data = await DataModel.find(filters).limit(50);

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.log("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching data",
      error: "Internal Server Error",
    });
  }
};

const getFilters = async (req, res) => {
  try {
    const filters = {
      end_year: await DataModel.distinct("end_year"),
      topics: await DataModel.distinct("topic"),
      sector: await DataModel.distinct("sector"),
      region: await DataModel.distinct("region"),
      pestle: await DataModel.distinct("pestle"),
      source: await DataModel.distinct("source"),
      country: await DataModel.distinct("country"),
      city: await DataModel.distinct("city"),
      start_year: await DataModel.distinct("start_year"),
      swot: await DataModel.distinct("swot"),
    };

    for (const key in filters) {
      filters[key] = filters[key].filter(
        (item) => item !== null && item !== ""
      );
    }
    res.status(200).json({ success: true, data: filters });
  } catch (error) {
    console.log("Error fetching filters:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching filter",
      error: "Internal Server Error",
    });
  }
};

export { getData, getFilters };
