import db from '../db.js';

export const getTeamsPage = async (req, res) => {

    try {

        const currentSeason = 2026;
        const lastSeason = 2025;

        // LAST YEAR CHAMPION

        const [lastChampion] = await db.query(`
            SELECT
                st.DisplayName AS Team,
                st.Color,
                SUM(r.Points) AS Points

            FROM RESULTS r

            JOIN RACES ra
                ON r.RaceID = ra.RaceID

            JOIN SEASON_TEAMS st
                ON r.TeamID = st.TeamID
                AND st.Season = ra.Season

            WHERE ra.Season = ?

            GROUP BY
                st.TeamID,
                st.DisplayName,
                st.Color

            ORDER BY SUM(r.Points) DESC

            LIMIT 1
        `, [lastSeason]);

        // CURRENT LEADER

        const [currentLeader] = await db.query(`
    SELECT
        st.DisplayName AS Team,
        st.Color,
        SUM(r.Points) AS Points

    FROM RESULTS r

    JOIN RACES ra
        ON r.RaceID = ra.RaceID

    JOIN SEASON_TEAMS st
        ON r.TeamID = st.TeamID
        AND st.Season = ra.Season

    WHERE ra.Season = ?

    GROUP BY
        st.TeamID,
        st.DisplayName,
        st.Color

    ORDER BY SUM(r.Points) DESC

    LIMIT 1
`, [currentSeason]);

        // TEAM DATA

        const [teams] = await db.query(`
            SELECT
                st.TeamID,
                st.DisplayName AS Team,
                st.Color,

                c.Chassis,
                c.EngineSupplier,

                COALESCE(SUM(res.Points), 0) AS Points

            FROM SEASON_TEAMS st

            LEFT JOIN CARS c
                ON st.TeamID = c.TeamID
                AND st.Season = c.Season

            LEFT JOIN RESULTS res
                ON st.TeamID = res.TeamID

            LEFT JOIN RACES ra
                ON res.RaceID = ra.RaceID
                AND ra.Season = st.Season

            WHERE st.Season = ?

            GROUP BY
                st.TeamID,
                st.DisplayName,
                st.Color,
                c.Chassis,
                c.EngineSupplier

            ORDER BY Points DESC
        `, [currentSeason]);

        // DRIVERS

        const [drivers] = await db.query(`
            SELECT DISTINCT
                r.TeamID,
                d.Abbrev
            FROM RESULTS r

            JOIN DRIVERS d
                ON r.DriverID = d.DriverID

            JOIN RACES ra
                ON r.RaceID = ra.RaceID

            WHERE ra.Season = ?
        `, [currentSeason]);

        // MERGE

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