import db from "../db.js";

export const getTeamsPage = async (req, res) => {

    try {

        const [lastChampion] = await db.query(`
SELECT
st.DisplayName AS Team,
st.Color,
SUM(r.Points) AS Points
FROM RESULTS r
JOIN RACES ra
ON r.RaceID=ra.RaceID
JOIN SEASON_TEAMS st
ON r.TeamID=st.TeamID
AND st.Season=ra.Season
WHERE ra.Season=YEAR(NOW())-1
GROUP BY
st.TeamID,
st.DisplayName,
st.Color
ORDER BY SUM(r.Points) DESC
LIMIT 1
`);

        const [currentLeader] = await db.query(`
SELECT
st.DisplayName AS Team,
st.Color,
SUM(r.Points) AS Points
FROM RESULTS r
JOIN RACES ra
ON r.RaceID=ra.RaceID
JOIN SEASON_TEAMS st
ON r.TeamID=st.TeamID
AND st.Season=ra.Season
WHERE ra.Season=YEAR(NOW())
GROUP BY
st.TeamID,
st.DisplayName,
st.Color
ORDER BY SUM(r.Points) DESC
LIMIT 1
`);

        const [teams] = await db.query(`
SELECT
st.TeamID,
st.DisplayName AS Team,
st.Color,
c.Chassis,
c.EngineSupplier,
c.CarImage,
COALESCE(
SUM(
CASE
WHEN ra.Season=YEAR(NOW())
THEN res.Points
ELSE 0
END
),0
) AS Points
FROM SEASON_TEAMS st
LEFT JOIN CARS c
ON st.TeamID=c.TeamID
AND st.Season=c.Season
LEFT JOIN RESULTS res
ON st.TeamID=res.TeamID
LEFT JOIN RACES ra
ON res.RaceID=ra.RaceID
WHERE st.Season=YEAR(NOW())
GROUP BY
st.TeamID,
st.DisplayName,
st.Color,
c.Chassis,
c.EngineSupplier,
c.CarImage
ORDER BY Points DESC
`);

        const [drivers] = await db.query(`
SELECT DISTINCT
r.TeamID,
d.Abbrev
FROM RESULTS r
JOIN DRIVERS d
ON r.DriverID=d.DriverID
JOIN RACES ra
ON r.RaceID=ra.RaceID
WHERE ra.Season=YEAR(NOW())
`);

        const finalTeams = teams.map(team => ({
            ...team,
            drivers: drivers
                .filter(d => d.TeamID === team.TeamID)
                .map(d => d.Abbrev)
        }));

        res.json({
            champion: lastChampion[0] || null,
            leader: currentLeader[0] || null,
            teams: finalTeams
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

};