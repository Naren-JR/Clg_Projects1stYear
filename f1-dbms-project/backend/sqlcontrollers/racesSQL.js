import db from '../db.js';

export const getRaces = async (req, res) => {
    const { season, circuit } = req.query;

    try {
        // find race
        let raceQuery = `
            SELECT r.RaceID
            FROM RACES r
            JOIN CIRCUITS c ON r.CircuitID = c.CircuitID
            WHERE 1=1
        `;

        const params = [];

        if (season !== 'All') {
            raceQuery += ` AND r.Season = ?`;
            params.push(season);
        }

        if (circuit !== 'All') {
            raceQuery += ` AND c.CircuitName = ?`;
            params.push(circuit);
        }

        const [raceRows] = await db.query(raceQuery, params);

        // if both selected → return results
        if (season !== 'All' && circuit !== 'All') {
            if (raceRows.length === 0) {
                return res.json({ type: 'none' });
            }

            const raceId = raceRows[0].RaceID;

            const [results] = await db.query(`
                SELECT res.Pos, d.Abbrev, t.TeamName, res.Points, res.Standings, res.LapTime
                FROM RESULTS res
                JOIN DRIVERS d ON res.DriverID = d.DriverID
                JOIN TEAMS t ON res.TeamID = t.TeamID
                WHERE res.RaceID = ?
                ORDER BY res.Pos IS NULL, res.Pos
            `, [raceId]);

            return res.json({ type: 'results', data: results });
        }

        // otherwise return races
        const [races] = await db.query(`
            SELECT r.RaceID, r.RaceName, r.Season, r.RaceNumber, c.CircuitName
            FROM RACES r
            JOIN CIRCUITS c ON r.CircuitID = c.CircuitID
            WHERE (? = 'All' OR r.Season = ?)
            AND (? = 'All' OR c.CircuitName = ?)
            ORDER BY r.Season, r.RaceNumber
        `, [season, season, circuit, circuit]);

        res.json({ type: 'races', data: races });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};