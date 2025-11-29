import express from 'express';
const app = express();
const PORT = 5000;
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import DataModel from './src/model/data.model.js';
import data from "./data.json" with { type: "json" };
import dataRoutes from './src/routes/data.routes.js';
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api", dataRoutes);

app.get("/hello", (req, res) => {
    res.send("Hello from data controller");
  });

  

 mongoose.connect(`${process.env.MONGO_URI}`)
  .then(() => {console.log('Connected!')
    // insertData();
  })
  .catch(err => console.log("Error connecting to MongoDB:", err));

// async function insertData() {
//     try {
//         const existing = await DataModel.countDocuments();
//         if (existing === 0) {
//             await DataModel.insertMany(data);
//             console.log('Data inserted successfully');
//         } else {
//             console.log('Data already exists, skipping insertion');
//         }
//     } catch (error) {
//         console.error('Error inserting data:', error);
//     }
// }

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

export default app;