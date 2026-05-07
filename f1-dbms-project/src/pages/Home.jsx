import { useEffect } from "react";
import "../css-pages/home.css";
import { initTelemetry } from "../components/telemetry";

function Home() {

    useEffect(() => {
        initTelemetry();
    }, []);

    return (
        <div className="home-container">

            {/* 🔥 HERO NEWS */}
            <section className="news-section">
                <div className="news-headline">
                    <img src="https://images.unsplash.com/photo-1541447271487-09612b3f49f7?q=80&w=2000" />
                    <div className="news-overlay">
                        <h2>Ferrari announces major aero upgrade</h2>
                    </div>
                </div>

                <div className="news-side">
                    {[
                        "McLaren leads Constructors",
                        "FIA releases 2025 regulations",
                        "Mercedes PU breakthrough",
                        "Red Bull strategy shakeup"
                    ].map((text, i) => (
                        <div className="news-card" key={i}>
                            <img src={`https://picsum.photos/200/200?random=${i}`} />
                            <p>{text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 🏆 CHAMPION */}
            <section className="champions-section">
                <div className="champion-card">

                    <div className="champion-left">
                        <h3>2025 Drivers Champion</h3>
                        <h1>Lando Norris</h1>
                        <p>423 pts • McLaren</p>
                    </div>

                    <img
                        src="https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000000/common/f1/2025/mclaren/lannor01/2025mclarenlannor01right.webp"
                        className="champion-img"
                    />
                </div>
            </section>

            {/* ⚡ TELEMETRY */}
            <section className="telemetry-section">
                <h2>Live Telemetry</h2>

                <div className="controls">
                    <select id="teamSelect">
                        <option value="mclaren">McLaren</option>
                        <option value="redbull">Red Bull</option>
                        <option value="ferrari">Ferrari</option>
                        <option value="mercedes">Mercedes</option>
                    </select>

                    <select id="soundPreset">
                        <option value="standard">Standard</option>
                        <option value="v8">V8</option>
                        <option value="v6">V6</option>
                        <option value="electric">Electric</option>
                    </select>

                    <select id="rampSelect">
                        <option value="gentle">Gentle</option>
                        <option value="normal">Normal</option>
                        <option value="fast">Fast</option>
                    </select>
                </div>

                {/* SPEEDOMETER */}
                <div className="speedometer-wrap">
                    <svg viewBox="0 0 200 120">
                        <path d="M20,100 A80,80 0 0,1 180,100"
                            stroke="#222" strokeWidth="12" fill="none" />

                        <path id="arcFill"
                            d="M20,100 A80,80 0 0,1 180,100"
                            stroke="white" strokeWidth="12"
                            fill="none"
                            strokeDasharray="260"
                            strokeDashoffset="260"
                        />
                    </svg>

                    <div className="digital-readouts">
                        <h1><span id="speedVal">0</span> km/h</h1>
                        <p>Gear: <span id="gearVal">N</span></p>
                        <p>RPM: <span id="rpmVal">0</span></p>
                    </div>
                </div>

                {/* CONTROLS */}
                <input id="throttleInput" type="range" min="0" max="100" />

                <div className="buttons">
                    <button id="startBtn">Start</button>
                    <button id="stopBtn">Stop</button>
                    <button id="resetBtn">Reset</button>
                </div>
            </section>

        </div>
    );
}

export default Home;