import express from "express";
import racesRoutes from "./routes/races.js";
import db from "./db.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cors());
app.use(express.json());

// routes
app.use("/races", racesRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

// Teams route
app.get("/Teams", async (req, res) => {
  try {
    const sql = "SELECT * FROM teams";

    const [result] = await db.query(sql);

    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
