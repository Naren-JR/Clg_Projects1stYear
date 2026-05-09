import { useEffect, useState } from "react";

import "../css-pages/home.css";

function Home() {

    const [announcements, setAnnouncements] =
        useState([]);

    useEffect(() => {

        fetchAnnouncements();

    }, []);

    const fetchAnnouncements =
        async () => {

            try {

                const res =
                    await fetch(
                        "http://localhost:5000/announcements"
                    );

                const data =
                    await res.json();

                setAnnouncements(data);

            } catch (err) {

                console.error(err);

            }

        };

    return (

        <div className="home-container">

            {/* HERO NEWS */}

            <section className="news-section">

                <div className="news-headline">

                    <img
                        src="https://images.unsplash.com/photo-1541447271487-09612b3f49f7?q=80&w=2000"
                        alt="headline"
                    />

                    <div className="news-overlay">

                        <h2>
                            Ferrari announces major aero upgrade
                        </h2>

                    </div>

                </div>

                {/* SIDE NEWS */}

                <div className="news-side">

                    {[
                        "McLaren leads Constructors",
                        "FIA releases 2026 regulations",
                        "Mercedes PU breakthrough"
                    ].map((text, i) => (

                        <div className="news-card" key={i}>

                            <img
                                src={`https://picsum.photos/300/300?random=${i}`}
                                alt="news"
                            />

                            <p>{text}</p>

                        </div>

                    ))}

                </div>

            </section>

            {/* CHAMPION */}

            <section className="champions-section">

                <div className="champion-card">

                    <div className="champion-left">

                        <h3>
                            2025 Drivers Champion
                        </h3>

                        <h1>
                            Lando Norris
                        </h1>

                        <p>
                            423 PTS • McLaren
                        </p>

                    </div>

                    <img
                        src="https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000000/common/f1/2025/mclaren/lannor01/2025mclarenlannor01right.webp"
                        alt="Champion"
                        className="champion-img"
                    />

                </div>

            </section>

            {/* ANNOUNCEMENTS */}

            <section className="announcements-section">

                <div className="announcement-header">

                    <h2>
                        Team Announcements
                    </h2>

                    <div className="announcement-line"></div>

                </div>

                <div className="announcements-grid">

                    {
                        announcements.map(
                            (a, i) => (

                                <div
                                    className="announcement-card"
                                    key={i}
                                >

                                    <h3>
                                        {a.Title}
                                    </h3>

                                    <p>
                                        {a.Content}
                                    </p>

                                    <span>
                                        {
                                            new Date(
                                                a.CreatedAt
                                            ).toLocaleDateString()
                                        }
                                    </span>

                                </div>

                            )
                        )
                    }

                </div>

            </section>

        </div>

    );

}

export default Home;