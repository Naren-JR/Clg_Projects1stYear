import db from "../db.js";

export const login = async (req, res) => {

    try {
        const [dbCheck] = await db.query(
            "SELECT DATABASE() AS db"
        );

        console.log(dbCheck);
        const {
            username,
            password
        } = req.body;
        console.log("LOGIN HIT");
        console.log(req.body);

        const [rows] = await db.query(
            `
            SELECT
                UserID,
                Username,
                Role,
                FormID
            FROM USERS
            WHERE Username = ?
            AND UserPassword = ?
            `,
            [username, password]
        );
        console.log(rows);
        if (rows.length === 0) {

            return res.status(401).json({
                error: "Invalid credentials"
            });

        }

        res.json(rows[0]);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

};