import { useEffect, useState } from "react";
import "../css-pages/Drivers.css";

function Drivers() {

    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {

        try {

            const res = await fetch(
                "http://localhost:5000/drivers"
            );

            const data = await res.json();

            setDrivers(data || []);

        } catch (err) {

            console.error(err);

        }

    };

    return (

        <div className="drivers-page">

            <div className="section-header">

                <h2>Driver Garage</h2>

                <div className="header-line"></div>

            </div>

            <div className="drivers-list">

                {
                    drivers.map((driver, index) => (

                        <div
                            key={index}
                            className={`driver-row ${index % 2 === 0
                                ? "normal"
                                : "reverse"
                                }`}
                            style={{
                                "--team-color":
                                    driver.Color || "#ff1e00"
                            }}
                        >

                            {/* DRIVER PORTRAIT */}

                            <div className="driver-portrait">

                                <img
                                    src={
                                        driver.DriverImage ||
                                        "https://placehold.co/500x700/111111/ffffff?text=DRIVER"
                                    }
                                    alt={driver.LastName}
                                    onError={(e) => {
                                        e.target.src =
                                            "https://placehold.co/500x700/111111/ffffff?text=DRIVER";
                                    }}
                                />

                            </div>

                            {/* TERMINAL */}

                            <div className="driver-terminal">

                                <div className="terminal-watermark">

                                    {driver.Abbrev}

                                </div>

                                {/* TOP */}

                                <div className="terminal-top">

                                    <div>

                                        <p className="terminal-label">
                                            Driver
                                        </p>

                                        <h1>
                                            {driver.FirstName}{" "}
                                            {driver.LastName}
                                        </h1>

                                    </div>

                                    <div className="driver-number">

                                        #
                                        {
                                            driver.DriverNumber || "--"
                                        }

                                    </div>

                                </div>

                                {/* TEAM */}

                                <div className="team-line">

                                    {driver.Team || "-"}
                                    {" • "}
                                    {driver.Nationality}

                                </div>

                                {/* CURRENT SEASON */}

                                <div className="stats-section">

                                    <h3>
                                        Current Season
                                    </h3>

                                    <div className="stats-grid">

                                        <div className="stat-box">

                                            <span>
                                                Points
                                            </span>

                                            <h2>
                                                {driver.CurrentPoints}
                                            </h2>

                                        </div>

                                        <div className="stat-box">

                                            <span>
                                                Wins
                                            </span>

                                            <h2>
                                                {driver.Wins}
                                            </h2>

                                        </div>

                                        <div className="stat-box">

                                            <span>
                                                Podiums
                                            </span>

                                            <h2>
                                                {driver.Podiums}
                                            </h2>

                                        </div>

                                    </div>

                                </div>

                                {/* CAREER */}

                                <div className="stats-section muted">

                                    <h3>
                                        Career Totals &bull; 2021 Onwards
                                    </h3>

                                    <div className="stats-grid">

                                        <div className="stat-box">

                                            <span>
                                                Starts
                                            </span>

                                            <h2>
                                                {driver.Starts}
                                            </h2>

                                        </div>

                                        <div className="stat-box">

                                            <span>
                                                Championships
                                            </span>

                                            <h2>
                                                {driver.Championships}
                                            </h2>

                                        </div>

                                        <div className="stat-box">

                                            <span>
                                                Career Wins
                                            </span>

                                            <h2>
                                                {driver.Wins}
                                            </h2>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>

    );

}

export default Drivers;