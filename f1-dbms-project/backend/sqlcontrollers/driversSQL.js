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

    (
        SELECT SUM(r1.Points)
        FROM RESULTS r1
        INNER JOIN RACES ra1
            ON r1.RaceID = ra1.RaceID
        WHERE r1.DriverID = d.DriverID
          AND ra1.Season = YEAR(NOW())
    ) AS CurrentPoints,

    (
        SELECT COUNT(*)
        FROM RESULTS r2
        INNER JOIN RACES ra2
            ON r2.RaceID = ra2.RaceID
        WHERE r2.DriverID = d.DriverID
          AND ra2.Season = YEAR(NOW())
          AND r2.Pos = 1
    ) AS Wins,

    (
        SELECT COUNT(*)
        FROM RESULTS r3
        INNER JOIN RACES ra3
            ON r3.RaceID = ra3.RaceID
        WHERE r3.DriverID = d.DriverID
          AND ra3.Season = YEAR(NOW())
          AND r3.Pos <= 3
    ) AS Podiums,

    (
        SELECT COUNT(*)
        FROM RESULTS r4
        WHERE r4.DriverID = d.DriverID
    ) AS Starts,

    (
        SELECT COUNT(*)
        FROM CHAMPIONSHIPS ch
        WHERE ch.DriverID = d.DriverID
          AND ch.Category = 'Drivers'
    ) AS Championships,

    (
        SELECT COUNT(*)
        FROM RESULTS r5
        WHERE r5.DriverID = d.DriverID
          AND r5.Pos = 1
    ) AS CareerWins

FROM DRIVERS d

LEFT JOIN DRIVER_NUMBERS dn
    ON d.DriverID = dn.DriverID

LEFT JOIN (
    SELECT
        r.DriverID,
        r.TeamID
    FROM RESULTS r
    INNER JOIN RACES ra
        ON r.RaceID = ra.RaceID
    WHERE ra.Season = YEAR(NOW())
    GROUP BY r.DriverID, r.TeamID
) currTeam
    ON d.DriverID = currTeam.DriverID

LEFT JOIN SEASON_TEAMS st
    ON currTeam.TeamID = st.TeamID
   AND st.Season = YEAR(NOW())

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

ORDER BY CurrentPoints DESC
`);

        res.json(drivers);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

};