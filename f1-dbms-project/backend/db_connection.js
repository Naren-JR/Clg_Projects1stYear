import express, { json } from "express";
import { createConnection } from "mysql2";

const app = express();
app.use(json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

const db = createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "f1dbms",
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MySQL connected");
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

app.get("/test", (req, res) => {
    db.query("desc teams", (err, result) => {
        if (err) res.send(err);
        else res.json(result);
    });
});