import express from "express";

import cors from "cors";

import db from "./db.js";

import racesRoutes from "./routes/races.js";
import teamsRoutes from "./routes/teams.js";
import driversRoutes from "./routes/drivers.js";
import loginRoutes from "./routes/login.js";
import visitRoutes from "./routes/visit.js";
import myvisitRoutes from "./routes/myvisit.js";
import adminRoutes from "./routes/admin.js";
import announcementRoutes from "./routes/announcements.js";
import homeRoutes from "./routes/home.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", homeRoutes);
app.use("/races", racesRoutes);
app.use("/teams", teamsRoutes);
app.use("/", driversRoutes);

app.use("/", loginRoutes);
app.use("/visit", visitRoutes);
app.use("/myvisit", myvisitRoutes);
app.use("/admin", adminRoutes);
app.use("/announcements", announcementRoutes);

app.get("/test", async (req, res) => {

  try {

    const [result] =
      await db.query(
        "SELECT 1 AS test"
      );

    res.json(result);

  } catch (err) {

    console.log(err);

    res.status(500).send(err);

  }

});

app.listen(5000, () => {

  console.log(
    "Server running on port 5000"
  );

});