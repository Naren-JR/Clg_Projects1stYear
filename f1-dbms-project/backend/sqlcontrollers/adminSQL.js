import db from "../db.js";

export const getAllVisits = async (
    req,
    res
) => {

    try {

        const [rows] =
            await db.query(
                `
                SELECT
                    FormID,
                    FullName,
                    Email,
                    Team,
                    PreferredDate,
                    TotalVisitors,
                    VisitStatus
                FROM VISITS
                ORDER BY SubmitTime DESC
                `
            );

        res.json(rows);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error:
                err.message
        });

    }

};

export const updateVisitStatus =
    async (req, res) => {

        try {

            const {
                id
            } = req.params;

            const {
                status
            } = req.body;

            await db.query(
                `
                UPDATE VISITS
                SET VisitStatus = ?
                WHERE FormID = ?
                `,
                [status, id]
            );

            res.json({
                success: true
            });

        } catch (err) {

            console.error(err);

            res.status(500).json({
                error:
                    err.message
            });

        }

    };