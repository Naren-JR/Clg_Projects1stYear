const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const db = require('./db');

// ── Helpers ──────────────────────────────────────────────────────────────────

function loadCSV(filename) {
    const file = fs.readFileSync(path.join(__dirname, 'data', filename));
    return parse(file, { columns: true, skip_empty_lines: true });
}

function nullable(val) {
    return val === '' || val === undefined ? null : val;
}

// ── Schema ────────────────────────────────────────────────────────────────────

async function runSchema(conn) {
    const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    // Split on semicolons, filter blanks, run each statement
    const statements = sql.split(';').map(s => s.trim()).filter(Boolean);
    for (const stmt of statements) {
        await conn.query(stmt);
    }
    console.log('Schema applied');
}

// ── Seeders ───────────────────────────────────────────────────────────────────

async function seedTeams(conn) {
    const rows = loadCSV('teams.csv');
    for (const r of rows) {
        await conn.query(
            'INSERT IGNORE INTO TEAMS (TeamID, TeamName) VALUES (?, ?)',
            [r.TeamID, r.TeamName]
        );
    }
    console.log(`TEAMS: ${rows.length} rows`);
}

async function seedSeasonTeams(conn) {
    const rows = loadCSV('season_teams.csv');
    for (const r of rows) {
        await conn.query(
            `INSERT IGNORE INTO SEASON_TEAMS (TeamID, Season, DisplayName, ColorPrimary, ColorSecondary)
       VALUES (?, ?, ?, ?, ?)`,
            [r.TeamID, r.Season, nullable(r.DisplayName), nullable(r.ColorPrimary), nullable(r.ColorSecondary)]
        );
    }
    console.log(`SEASON_TEAMS: ${rows.length} rows`);
}

async function seedDrivers(conn) {
    const rows = loadCSV('drivers.csv');
    for (const r of rows) {
        await conn.query(
            `INSERT IGNORE INTO DRIVERS (Abbrev, FirstName, LastName, Nationality, DOB, DebutYear, DriverRole)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [r.Abbrev, r.FirstName, r.LastName, r.Nationality, nullable(r.DOB), nullable(r.DebutYear), r.DriverRole]
        );
    }
    console.log(`DRIVERS: ${rows.length} rows`);
}

async function seedCircuits(conn) {
    const rows = loadCSV('circuits.csv');
    for (const r of rows) {
        await conn.query(
            `INSERT IGNORE INTO CIRCUITS (CircuitID, CircuitName, Country, CircuitLength_km, Turns)
       VALUES (?, ?, ?, ?, ?)`,
            [r.CircuitID, r.CircuitName, r.Country, r.CircuitLength_km, r.Turns]
        );
    }
    console.log(`CIRCUITS: ${rows.length} rows`);
}

async function seedCars(conn) {
    const rows = loadCSV('cars.csv');
    for (const r of rows) {
        await conn.query(
            `INSERT IGNORE INTO CARS (CarID, TeamID, Chassis, PowerUnit, EngineSupplier, Weight, Season)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [r.CarID, r.TeamID, r.Chassis, nullable(r.PowerUnit), nullable(r.EngineSupplier), nullable(r.Weight), r.Season]
        );
    }
    console.log(`CARS: ${rows.length} rows`);
}

async function seedPitwall(conn) {
    const rows = loadCSV('pitwall.csv');
    for (const r of rows) {
        await conn.query(
            `INSERT IGNORE INTO PITWALL (StaffID, TeamID, DriverID, StaffName, StaffRole, Season)
       VALUES (?, ?, ?, ?, ?, ?)`,
            [r.StaffID, r.TeamID, nullable(r.DriverID), r.StaffName, r.StaffRole, r.Season]
        );
    }
    console.log(`PITWALL: ${rows.length} rows`);
}

async function seedRaces(conn) {
    const rows = loadCSV('races.csv');
    for (const r of rows) {
        await conn.query(
            `INSERT IGNORE INTO RACES (RaceID, CircuitID, Season, RaceNumber, RaceName, RaceDate, Laps, Weather)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [r.RaceID, r.CircuitID, r.Season, r.RaceNumber, r.RaceName, r.RaceDate, r.Laps, nullable(r.Weather)]
        );
    }
    console.log(`RACES: ${rows.length} rows`);
}

async function seedResults(conn) {
    const rows = loadCSV('results.csv');
    for (const r of rows) {
        await conn.query(
            `INSERT IGNORE INTO RESULTS (ResultID, RaceID, DriverID, TeamID, Pos, Points, Standings, LapTime)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [r.ResultID, r.RaceID, r.DriverID, r.TeamID, nullable(r.Pos), r.Points ?? 0, r.Standings, nullable(r.LapTime)]
        );
    }
    console.log(`RESULTS: ${rows.length} rows`);
}

async function seedChampionships(conn) {
    const rows = loadCSV('championships.csv');
    for (const r of rows) {
        await conn.query(
            `INSERT IGNORE INTO CHAMPIONSHIPS (ChampionID, Season, Category, DriverID, TeamID, Points, Wins)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [r.ChampionID, r.Season, r.Category, nullable(r.DriverID), nullable(r.TeamID), r.Points, r.Wins]
        );
    }
    console.log(`CHAMPIONSHIPS: ${rows.length} rows`);
}

async function seedVisits(conn) {
    const rows = loadCSV('visits.csv');
    for (const r of rows) {
        await conn.query(
            `INSERT IGNORE INTO VISITS
        (FormID, FullName, Email, Phone, Gender, DOB, Team, PreferredDate, TotalVisitors, TourDuration, SpecialRequests)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                r.FormID, r.FullName, r.Email, r.Phone, nullable(r.Gender),
                nullable(r.DOB), nullable(r.Team), r.PreferredDate,
                r.TotalVisitors, r.TourDuration, nullable(r.SpecialRequests)
            ]
        );
    }
    console.log(`VISITS: ${rows.length} rows`);
}

async function seedVisitDepartments(conn) {
    const rows = loadCSV('visit_departments.csv');
    for (const r of rows) {
        await conn.query(
            'INSERT IGNORE INTO VISIT_DEPARTMENTS (FormID, Department) VALUES (?, ?)',
            [r.FormID, r.Department]
        );
    }
    console.log(`VISIT_DEPARTMENTS: ${rows.length} rows`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function seed() {
    const conn = await db.getConnection();

    try {
        await runSchema(conn);

        // FK-safe insertion order
        await seedTeams(conn);
        await seedSeasonTeams(conn);
        await seedDrivers(conn);
        await seedCircuits(conn);
        await seedCars(conn);
        await seedPitwall(conn);
        await seedRaces(conn);
        await seedResults(conn);
        await seedChampionships(conn);
        await seedVisits(conn);
        await seedVisitDepartments(conn);

        console.log('\nSeed complete');
    } catch (err) {
        console.error('Seed failed:', err.message);
    } finally {
        conn.release();
        process.exit();
    }
}

seed();