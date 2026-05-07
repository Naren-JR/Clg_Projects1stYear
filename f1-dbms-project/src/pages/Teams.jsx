import { useState, useEffect } from "react";
import "../css-pages/teams.css";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await fetch("http://localhost:5000/Teams");
      const data = await res.json();

      if (data.length > 0) {
        setTeams(data);
        setMessage("");
      } else {
        setMessage("No teams available");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error fetching teams");
    }
  };

  return (
    <>
      <div className="teams-container">
        {teams.map((team) => (
          <div key={team.TeamID} className="team-card">
            <h2>{team.TeamName}</h2>
            <p>Team ID: {team.TeamID}</p>
          </div>
        ))}
      </div>

      {message && <p className="message">{message}</p>}
    </>
  );
}

export default Teams;
