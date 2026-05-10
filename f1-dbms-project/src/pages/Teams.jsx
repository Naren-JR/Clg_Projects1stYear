import {
  useEffect,
  useState
} from "react";

import "../css-pages/Teams.css";

function Teams() {

  const [teams, setTeams] =
    useState([]);

  const [champion, setChampion] =
    useState(null);

  const [leader, setLeader] =
    useState(null);

  useEffect(() => {

    fetchTeams();

  }, []);

  const fetchTeams =
    async () => {

      try {

        const res =
          await fetch(
            "http://localhost:5000/teams"
          );

        const data =
          await res.json();

        setTeams(
          data.teams || []
        );

        setChampion(
          data.champion
        );

        setLeader(
          data.leader
        );

      } catch (err) {

        console.error(err);

      }

    };

  return (

    <div className="teams-page">

      {/* HERO */}

      <div className="teams-hero">

        <div
          className="hero-card champion"
          style={{
            borderColor:
              champion?.Color
              || "#ff1e00",

            boxShadow:
              `0 0 30px ${champion?.Color
              || "#ff1e00"
              }22`
          }}
        >

          <p className="hero-label">
            2025 Constructor Champion
          </p>

          <h1>
            {champion?.Team || "-"}
          </h1>

          <span
            style={{
              color:
                champion?.Color
                || "#ff1e00"
            }}
          >
            {
              champion?.Points
              || 0
            } PTS
          </span>

        </div>

        <div
          className="hero-card leader"
          style={{
            borderColor:
              leader?.Color
              || "#ff1e00",

            boxShadow:
              `0 0 30px ${leader?.Color
              || "#ff1e00"
              }22`
          }}
        >

          <p className="hero-label">
            2026 Championship Leader
          </p>

          <h1>
            {leader?.Team || "-"}
          </h1>

          <span
            style={{
              color:
                leader?.Color
                || "#ff1e00"
            }}
          >
            {
              leader?.Points
              || 0
            } PTS
          </span>

        </div>

      </div>

      {/* SECTION TITLE */}

      <div className="section-header">

        <h2>
          Constructors Grid
        </h2>

        <div className="header-line"></div>

      </div>

      {/* TEAM GRID */}

      <div className="teams-grid">

        {
          teams.map(
            (team, i) => (

              <div
                key={i}
                className="team-card"
              >

                {/* CAR IMAGE */}

                <div className="car-image-wrapper">

                  <img
                    src={team.CarImage}
                    alt={team.Team}
                    className="car-image"
                    onError={(e) => {

                      e.target.src =
                        "https://placehold.co/600x240/111111/ff1e00?text=F1+CAR";

                    }}
                  />

                </div>

                {/* TEAM INFO */}

                <div className="team-content">

                  <div className="team-top">

                    <h2>
                      {team.Team}
                    </h2>

                    <div className="team-points">

                      {
                        team.Points
                        || 0
                      } pts

                    </div>

                  </div>

                  <div className="team-meta">

                    <p>

                      <span>
                        Engine
                      </span>

                      {
                        team.EngineSupplier
                        || "-"
                      }

                    </p>

                    <p>

                      <span>
                        Drivers
                      </span>

                      {
                        team.drivers?.join(
                          " • "
                        ) || "-"
                      }

                    </p>

                  </div>

                </div>

              </div>

            )
          )
        }

      </div>

    </div>

  );

}

export default Teams;