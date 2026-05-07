import db from '../db.js';

export const getRaces = async (req, res) => {
    const { season = 'All', circuit = 'All' } = req.query;

    try {
        console.log("QUERY:", season, circuit);

        // 🔹 SPECIFIC CIRCUIT → FULL RESULTS
        if (season !== 'All' && circuit !== 'All') {
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
                ORDER BY (res.Pos = 0), res.Pos
            `, [season, circuit]);

            if (results.length === 0) {
                return res.json({ type: 'none' });
            }

            return res.json({ type: 'results', data: results });
        }

        // 🔹 ALL → WINNERS ONLY
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

        if (races.length === 0) {
            return res.json({ type: 'none' });
        }

        return res.json({ type: 'races', data: races });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'server error' });
    }
};