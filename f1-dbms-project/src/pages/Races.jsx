import { useState, useEffect } from 'react';
import '../css-pages/Races.css';

function Races() {
    const [season, setSeason] = useState('2025');
    const [circuit, setCircuit] = useState('All');
    const [races, setRaces] = useState([]);
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchRaces();
    }, [season, circuit]);

    const fetchRaces = async () => {
        try {
            const res = await fetch(
                `http://localhost:5000/races?season=${season}&circuit=${circuit}`
            );
            const data = await res.json();
            setMessage('');
            if (data.type === 'results') {
                setResults(data.data);
                setRaces([]);
            } else if (data.type === 'races') {
                setRaces(data.data);
                setResults([]);
            } else {
                setMessage("No race held");
                setRaces([]);
                setResults([]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {/* FILTERS */}
            <div className="filters">
                <select onChange={(e) => setSeason(e.target.value)}>
                    <option value="2025">Current Season</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                </select>

                <select onChange={(e) => setCircuit(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Australia">Australia</option>
                    <option value="China">China</option>
                    <option value="Japan">Japan</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Miami">Miami</option>
                    <option value="Canada">Canada</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Spain">Spain</option>
                    <option value="Austria">Austria</option>
                    <option value="France">France</option>
                    <option value="British">British</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Styria">Styria</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Russia">Russia</option>
                    <option value="Imola">Imola</option>
                    <option value="Italy">Italy</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Singapore">Singapore</option>
                    <option value="United States">United States</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Las Vegas">Las Vegas</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Abu Dhabi">Abu Dhabi</option>
                </select>
            </div>

            {/* RACES LIST */}
            {races.length > 0 && (
                <div className="race-list">
                    {races.map((race) => (
                        <div key={race.RaceID} className="race-card">
                            <h3>{race.RaceName}</h3>
                            <p>{race.CircuitName}</p>
                            <p>Round {race.RaceNumber}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* RESULTS TABLE */}
            <table className="results-table">
                <thead>
                    <tr>
                        <th>Pos</th>
                        <th>Driver</th>
                        <th>Team</th>
                        <th>Points</th>
                        <th>Status</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {results.length > 0 ? (
                        results.map((r, i) => (
                            <tr key={i}>
                                <td>{r.Pos}</td>
                                <td>{r.Abbrev}</td>
                                <td>{r.TeamName}</td>
                                <td>{r.Points}</td>
                                <td>{r.Standings}</td>
                                <td>{r.LapTime ? r.LapTime : '-'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* MESSAGE */}
            {message && <p>{message}</p>}
        </>
    );
}

export default Races;