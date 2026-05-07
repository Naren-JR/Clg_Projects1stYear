import { useState, useEffect } from 'react';
import '../css-pages/Races.css';

function Races() {
    const [season, setSeason] = useState('2026');
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
            console.log("API DATA:", data);

            setMessage('');

            if (data.type === 'results') {
                setResults(data.data);
                setRaces([]);
            } else if (data.type === 'races') {
                setRaces(data.data);
                setResults([]);
            } else {
                setMessage("No race held for this selection");
                setRaces([]);
                setResults([]);
            }
        } catch (err) {
            console.error(err);
            setMessage("Error fetching data");
        }
    };

    return (
        <>
            {/* FILTERS */}
            <div className="filters">
                <select value={season} onChange={(e) => setSeason(e.target.value)}>
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>

                </select>

                <select value={circuit} onChange={(e) => setCircuit(e.target.value)}>
                    <option value="All">All</option>
                    <option value="1">Bahrain</option>
                    <option value="2">Imola</option>
                    <option value="3">Portugal</option>
                    <option value="4">Spain</option>
                    <option value="5">Monaco</option>
                    <option value="6">Azerbaijan</option>
                    <option value="7">France</option>
                    <option value="8">Austria</option>
                    <option value="9">Britain</option>
                    <option value="10">Hungary</option>
                    <option value="11">Belgium</option>
                    <option value="12">Netherlands</option>
                    <option value="13">Italy</option>
                    <option value="16">USA</option>
                    <option value="17">Mexico</option>
                    <option value="18">Brazil</option>
                    <option value="19">Qatar</option>
                    <option value="20">Saudi Arabia</option>
                    <option value="21">Abu Dhabi</option>
                    <option value="22">Australia</option>
                    <option value="23">Miami</option>
                    <option value="24">Canada</option>
                    <option value="25">Singapore</option>
                    <option value="26">Japan</option>
                    <option value="27">Las Vegas</option>
                    <option value="28">China</option>
                </select>
            </div>

            {/* TABLE */}
            <table className="results-table">
                <thead>
                    <tr>
                        <th>Race</th>
                        <th>Pos</th>
                        <th>Driver</th>
                        <th>Team</th>
                        <th>Points</th>
                        <th>Time</th>
                    </tr>
                </thead>

                <tbody>
                    {/* ALL → winners */}
                    {circuit === "All" && races.map((race, i) => (
                        <tr key={i}>
                            <td>{race.RaceName}</td>
                            <td>1</td>
                            <td>{race.Winner || "-"}</td>
                            <td>{race.Team || "-"}</td>
                            <td>{race.Points || "-"}</td>
                            <td>{race.LapTime || "-"}</td>
                        </tr>
                    ))}

                    {/* SPECIFIC → full results */}
                    {circuit !== "All" && results.map((r, i) => (
                        <tr key={i}>
                            <td>{r.RaceName}</td>
                            <td>{r.Pos}</td>
                            <td>{r.Driver}</td>
                            <td>{r.Team}</td>
                            <td>{r.Points}</td>
                            <td>{r.LapTime || '-'}</td>
                        </tr>
                    ))}
                    {console.log(results[0])}
                    {/* EMPTY */}
                    {races.length === 0 && results.length === 0 && (
                        <tr>
                            <td colSpan="6">{message}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default Races;