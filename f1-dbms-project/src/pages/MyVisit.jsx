import { useState } from "react";
import "../css-pages/MyVisit.css";

function MyVisit() {

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [visit, setVisit] =
        useState(null);

    const [message, setMessage] =
        useState("");

    const fetchVisit = async () => {

        try {

            const res = await fetch(
                "http://localhost:5000/myvisit/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            );

            const data =
                await res.json();

            if (!res.ok) {

                setMessage(
                    data.error
                );

                return;

            }

            setVisit(data);

        } catch (err) {

            console.error(err);

        }

    };

    const cancelVisit = async () => {

        try {

            await fetch(
                `http://localhost:5000/myvisit/cancel/${visit.FormID}`,
                {
                    method: "PUT"
                }
            );

            setMessage(
                "Visit cancelled"
            );

            setVisit(null);

        } catch (err) {

            console.error(err);

        }

    };

    return (

        <div className="myvisit-page">

            <div className="myvisit-card">

                <h1>
                    My Visit
                </h1>

                {
                    !visit && (

                        <>

                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) =>
                                    setUsername(
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                            />

                            <button onClick={fetchVisit}
                            >
                                Fetch Reservation
                            </button>

                        </>

                    )
                }

                {
                    visit && (

                        <div className="visit-details">

                            <h2>
                                {visit.FullName}
                            </h2>

                            <p>
                                Team:
                                {" "}
                                {visit.Team}
                            </p>

                            <p>
                                Date:
                                {" "}
                                {visit.PreferredDate}
                            </p>

                            <p>
                                Visitors:
                                {" "}
                                {visit.TotalVisitors}
                            </p>

                            <p>
                                Status:
                                {" "}
                                {visit.VisitStatus}
                            </p>

                            <button
                                className="cancel-btn"
                                onClick={cancelVisit}
                            >
                                Cancel Visit
                            </button>

                        </div>

                    )
                }

                {
                    message && (
                        <p className="message">
                            {message}
                        </p>
                    )
                }

            </div>

        </div>

    );

}

export default MyVisit;