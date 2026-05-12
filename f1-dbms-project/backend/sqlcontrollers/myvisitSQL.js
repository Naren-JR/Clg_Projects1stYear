import db from "../db.js";

export const getVisit = async (req, res) => {
  try {
    const { formid } = req.params;

    const [rows] = await db.query(
      `
                SELECT
                    FormID,
                    FullName,
                    Team,
                    PreferredDate,
                    TotalVisitors,
                    VisitStatus
                FROM VISITS
                WHERE FormID = ?
                `,
      [formid],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Reservation not found",
      });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
};

export const cancelVisit = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      `
            UPDATE VISITS
            SET VisitStatus = 'Cancelled'
            WHERE FormID = ?
            `,
      [id],
    );

    res.json({
      message: "Visit cancelled",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
};
