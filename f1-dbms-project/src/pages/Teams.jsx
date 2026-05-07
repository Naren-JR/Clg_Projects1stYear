import { useEffect, useState } from 'react';
import '../css-pages/Teams.css';

function Teams() {

  const [teams, setTeams] = useState([]);
  const [champion, setChampion] = useState(null);
  const [leader, setLeader] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await fetch("http://localhost:5000/teams");
      const data = await res.json();

      setTeams(data.teams || []);
      setChampion(data.champion);
      setLeader(data.leader);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="teams-container">

      {/* 🏆 HEADER */}
      <div className="teams-hero">
        <div className="champ-box">
          <h3>2025 Champion</h3>
          <h1>{champion?.Team || "-"}</h1>
          <p>{champion?.Points} pts</p>
        </div>

        <div className="leader-box">
          <h3>2026 Leader</h3>
          <h1>{leader?.Team || "-"}</h1>
          <p>{leader?.Points} pts</p>
        </div>
      </div>

      {/* 🧱 TEAM GRID */}
      <div className="teams-grid">
        {teams.map((team, i) => (
          <div key={i} className="team-card">

            <h2>{team.Team}</h2>

            <p><span>Engine:</span> {team.Engine}</p>

            <p>
              <span>Drivers:</span>
              {team.drivers.join(", ") || "-"}
            </p>

            {/* PIT WALL */}
            <div className="pitwall">
              <div className="pit-light green"></div>
              <div className="pit-light yellow"></div>
              <div className="pit-light red"></div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Teams;