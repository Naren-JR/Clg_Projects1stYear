import db from "../db.js";

export const getAnnouncements =
    async (req, res) => {

        try {

            const [rows] =
                await db.query(
                    `
SELECT *
FROM ANNOUNCEMENTS
ORDER BY CreatedAt DESC
LIMIT 5
`
                );

            res.json(rows);

        } catch (err) {

            console.error(err);

            res.status(500).json({
                error: err.message
            });

        }

    };

export const createAnnouncement =
    async (req, res) => {

        try {

            const {
                title,
                content
            } = req.body;

            await db.query(
                `
INSERT INTO ANNOUNCEMENTS
(
Title,
Content
)
VALUES(?,?)
`,
                [title, content]
            );

            res.json({
                success: true
            });

        } catch (err) {

            console.error(err);

            res.status(500).json({
                error: err.message
            });

        }

    };

export const deleteAnnouncement =
    async (req, res) => {

        try {

            const { id } = req.params;

            await db.query(
                `
DELETE FROM ANNOUNCEMENTS
WHERE AnnouncementID=?
`,
                [id]
            );

            res.json({
                success: true
            });

        } catch (err) {

            console.error(err);

            res.status(500).json({
                error: err.message
            });

        }

    };