import { useEffect, useState }
    from "react";

import "../css-pages/AdminDashboard.css";

function AdminDashboard() {

    const [visits, setVisits] =
        useState([]);

    const [announcements, setAnnouncements] =
        useState([]);

    const [title, setTitle] =
        useState("");

    const [content, setContent] =
        useState("");

    useEffect(() => {

        fetchVisits();

        fetchAnnouncements();

    }, []);

    const fetchVisits =
        async () => {

            try {

                const res =
                    await fetch(
                        "http://localhost:5000/admin/visits"
                    );

                const data =
                    await res.json();

                setVisits(data);

            } catch (err) {

                console.error(err);

            }

        };

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

    const updateStatus =
        async (
            formID,
            status
        ) => {

            try {

                await fetch(
                    `http://localhost:5000/admin/visit/${formID}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            status
                        })
                    }
                );

                fetchVisits();

            } catch (err) {

                console.error(err);

            }

        };

    const postAnnouncement =
        async () => {

            try {

                const res =
                    await fetch(
                        "http://localhost:5000/announcements",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                title,
                                content
                            })
                        }
                    );

                const data =
                    await res.json();

                console.log(data);

                if (!res.ok) {

                    alert(
                        data.error
                    );

                    return;

                }

                alert(
                    "Announcement posted"
                );

                setTitle("");

                setContent("");

                fetchAnnouncements();

            } catch (err) {

                console.error(err);

            }

        };

    const deleteAnnouncement =
        async (id) => {

            try {

                await fetch(
                    `http://localhost:5000/announcements/${id}`,
                    {
                        method: "DELETE"
                    }
                );

                fetchAnnouncements();

            } catch (err) {

                console.error(err);

            }

        };

    return (

        <div className="admin-page">

            <div className="admin-section">

                <h1>
                    Reservations
                </h1>

                <table>

                    <thead>

                        <tr>

                            <th>
                                Name
                            </th>

                            <th>
                                Email
                            </th>

                            <th>
                                Team
                            </th>

                            <th>
                                Date
                            </th>

                            <th>
                                Visitors
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            visits.map(
                                (v, i) => (

                                    <tr key={i}>

                                        <td>
                                            {v.FullName}
                                        </td>

                                        <td>
                                            {v.Email}
                                        </td>

                                        <td>
                                            {v.Team}
                                        </td>

                                        <td>
                                            {v.PreferredDate}
                                        </td>

                                        <td>
                                            {v.TotalVisitors}
                                        </td>

                                        <td>
                                            {v.VisitStatus}
                                        </td>

                                        <td>

                                            <button
                                                onClick={() =>
                                                    updateStatus(
                                                        v.FormID,
                                                        "Approved"
                                                    )
                                                }
                                            >
                                                Approve
                                            </button>

                                            <button
                                                onClick={() =>
                                                    updateStatus(
                                                        v.FormID,
                                                        "Cancelled"
                                                    )
                                                }
                                            >
                                                Cancel
                                            </button>

                                        </td>

                                    </tr>

                                )
                            )
                        }

                    </tbody>

                </table>

            </div>

            <div className="admin-section">

                <h1>
                    Post Announcement
                </h1>

                <input
                    type="text"
                    placeholder="Announcement Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(
                            e.target.value
                        )
                    }
                />

                <textarea
                    placeholder="Announcement Content"
                    value={content}
                    onChange={(e) =>
                        setContent(
                            e.target.value
                        )
                    }
                />

                <button
                    onClick={postAnnouncement}
                >
                    Post Announcement
                </button>

                <div className="announcement-list">

                    {
                        announcements.map(
                            (a, i) => (

                                <div
                                    className="announcement-item"
                                    key={i}
                                >

                                    <div>

                                        <h3>
                                            {a.Title}
                                        </h3>

                                        <p>
                                            {a.Content}
                                        </p>

                                    </div>

                                    <button
                                        onClick={() =>
                                            deleteAnnouncement(
                                                a.AnnouncementID
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            )
                        )
                    }

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;