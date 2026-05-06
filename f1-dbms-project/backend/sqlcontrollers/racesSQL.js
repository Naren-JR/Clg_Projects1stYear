import db from '../db.js';

export const getRaces = async (req, res) => {
    const { season = 'All', circuit = 'All' } = req.query;

    try {
        const bothSelected = season !== 'All' && circuit !== 'All';
        const params = [];

        if (bothSelected) {
            // Single query — race info + results in one shot
            const [results] = await db.query(`
        SELECT
          res.Pos,
          d.Abbrev       AS Driver,
          st.DisplayName AS Team,
          res.Points,
          res.Standings,
          res.LapTime,
          r.RaceName,
          r.Season,
          r.RaceDate
        FROM RESULTS res
        JOIN RACES r    ON res.RaceID   = r.RaceID
        JOIN CIRCUITS c ON r.CircuitID  = c.CircuitID
        JOIN DRIVERS d  ON res.DriverID = d.DriverID
        JOIN SEASON_TEAMS st ON res.TeamID = st.TeamID AND st.Season = r.Season
        WHERE r.Season = ? AND c.CircuitName = ?
        ORDER BY res.Pos IS NULL, res.Pos
      `, [season, circuit]);

            if (results.length === 0) return res.json({ type: 'none' });
            return res.json({ type: 'results', data: results });
        }

        // Otherwise return race list
        let query = `
      SELECT
        r.RaceID,
        r.RaceName,
        r.Season,
        r.RaceNumber,
        r.RaceDate,
        c.CircuitName,
        c.Country
      FROM RACES r
      JOIN CIRCUITS c ON r.CircuitID = c.CircuitID
      WHERE 1=1
    `;

        if (season !== 'All') { query += ` AND r.Season = ?`; params.push(season); }
        if (circuit !== 'All') { query += ` AND c.CircuitName = ?`; params.push(circuit); }

        query += ` ORDER BY r.Season, r.RaceNumber`;

        const [races] = await db.query(query, params);
        return res.json({ type: 'races', data: races });

    } catch (err) {
        console.error('getRaces error:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};