import db from '../db.js';

export const getTeamsPage = async (req, res) => {
    try {

        const currentSeason = 2026;
        const lastSeason = 2025;

        // 🏆 2025 CONSTRUCTOR CHAMPION
        const [lastChampion] = await db.query(`
            SELECT
                st.DisplayName AS Team,
                SUM(res.Points) AS Points
            FROM RESULTS res
            JOIN RACES r
                ON res.RaceID = r.RaceID
            JOIN SEASON_TEAMS st
                ON res.TeamID = st.TeamID
                AND st.Season = r.Season
            WHERE r.Season = ?
            GROUP BY st.TeamID, st.DisplayName
            ORDER BY Points DESC
            LIMIT 1
        `, [lastSeason]);

        // 📊 2026 LEADER
        const [currentLeader] = await db.query(`
            SELECT
                st.DisplayName AS Team,
                SUM(res.Points) AS Points
            FROM RESULTS res
            JOIN RACES r
                ON res.RaceID = r.RaceID
            JOIN SEASON_TEAMS st
                ON res.TeamID = st.TeamID
                AND st.Season = r.Season
            WHERE r.Season = ?
            GROUP BY st.TeamID, st.DisplayName
            ORDER BY Points DESC
            LIMIT 1
        `, [currentSeason]);

        // 🧱 ALL TEAMS
        const [teams] = await db.query(`
            SELECT
                st.TeamID,
                st.DisplayName AS Team,
                c.EngineSupplier AS Engine
            FROM SEASON_TEAMS st
            LEFT JOIN CARS c
                ON st.TeamID = c.TeamID
                AND st.Season = c.Season
            WHERE st.Season = ?
        `, [currentSeason]);

        // 👥 DRIVERS
        const [drivers] = await db.query(`
            SELECT DISTINCT
                d.Abbrev,
                r.TeamID
            FROM RESULTS r
            JOIN DRIVERS d
                ON r.DriverID = d.DriverID
            JOIN RACES ra
                ON r.RaceID = ra.RaceID
            WHERE ra.Season = ?
        `, [currentSeason]);

        // map drivers to teams
        const teamMap = teams.map(team => ({
            ...team,
            drivers: drivers
                .filter(d => d.TeamID === team.TeamID)
                .map(d => d.Abbrev)
        }));

        res.json({
            champion: lastChampion[0] || null,
            leader: currentLeader[0] || null,
            teams: teamMap
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
};