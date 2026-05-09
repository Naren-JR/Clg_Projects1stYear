import db from "../db.js";

export const loginVisit = async (
    req,
    res
) => {

    try {

        console.log(req.body);

        const {
            username,
            password
        } = req.body;

        const [users] =
            await db.query(
                `
                SELECT *
                FROM USERS
                WHERE Username = ?
                AND UserPassword = ?
                `,
                [username, password]
            );

        if (users.length === 0) {

            return res.status(401).json({
                error:
                    "Invalid credentials"
            });

        }

        const user =
            users[0];

        const [visits] =
            await db.query(
                `
                SELECT *
                FROM VISITS
                WHERE FormID = ?
                `,
                [user.FormID]
            );

        if (visits.length === 0) {

            return res.status(404).json({
                error:
                    "No reservation found"
            });

        }

        res.json(visits[0]);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error:
                err.message
        });

    }

};

export const cancelVisit = async (
    req,
    res
) => {

    try {

        const {
            id
        } = req.params;

        await db.query(
            `
            UPDATE VISITS
            SET VisitStatus = 'Cancelled'
            WHERE FormID = ?
            `,
            [id]
        );

        res.json({
            message:
                "Visit cancelled"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error:
                err.message
        });

    }

};