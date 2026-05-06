import db from '../db.js';
// SPECIFIC CIRCUIT
const [results] = await db.query(`
    SELECT
        res.Pos,
        d.Abbrev AS Driver,
        st.DisplayName AS Team,
        res.Points,
        res.LapTime,
        r.RaceName
    FROM RESULTS res
    JOIN RACES r ON res.RaceID = r.RaceID
    JOIN DRIVERS d ON res.DriverID = d.DriverID
    LEFT JOIN SEASON_TEAMS st
        ON res.TeamID = st.TeamID AND st.Season = r.Season
    WHERE r.Season = ?
    AND r.CircuitID = ?
    ORDER BY res.Pos
`, [season, circuit]);


// ALL (WINNERS)
const [races] = await db.query(`
    SELECT
        r.RaceID,
        r.RaceName,
        r.RaceNumber,
        d.Abbrev AS Winner,
        st.DisplayName AS Team,
        res.Points,
        res.LapTime
    FROM RACES r
    JOIN RESULTS res ON r.RaceID = res.RaceID
    JOIN DRIVERS d ON res.DriverID = d.DriverID
    LEFT JOIN SEASON_TEAMS st
        ON res.TeamID = st.TeamID AND st.Season = r.Season
    WHERE r.Season = ?
    AND res.Pos = 1
    ORDER BY r.RaceNumber
`, [season]);