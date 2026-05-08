import db from "../db.js";

export const getDriversPage = async (req, res) => {

    try {

        const [drivers] = await db.query(`

            SELECT

                d.DriverID,
                d.Abbrev,
                d.FirstName,
                d.LastName,
                d.Nationality,

                st.DisplayName AS Team,
                st.Color,

                dn.DriverNumber,
                dn.DriverImage,

                COALESCE(SUM(res.Points), 0) AS Points,

                COUNT(
                    CASE
                        WHEN res.Pos = 1 THEN 1
                    END
                ) AS Wins,

                COUNT(
                    CASE
                        WHEN res.Pos <= 3 THEN 1
                    END
                ) AS Podiums,

                COUNT(res.ResultID) AS Starts

            FROM DRIVERS d

            LEFT JOIN RESULTS res
                ON d.DriverID = res.DriverID

            LEFT JOIN RACES ra
                ON res.RaceID = ra.RaceID

            LEFT JOIN SEASON_TEAMS st
                ON res.TeamID = st.TeamID
                AND st.Season = ra.Season

            LEFT JOIN DRIVER_NUMBERS dn
                ON d.DriverID = dn.DriverID
                AND dn.Season = 2026

            WHERE ra.Season = 2026

            GROUP BY
                d.DriverID,
                d.Abbrev,
                d.FirstName,
                d.LastName,
                d.Nationality,
                st.DisplayName,
                st.Color,
                dn.DriverNumber,
                dn.DriverImage

            ORDER BY Points DESC

        `);

        res.json(drivers);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

};