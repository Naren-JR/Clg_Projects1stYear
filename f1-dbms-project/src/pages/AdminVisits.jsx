import { useEffect, useState } from "react";
import "../css-pages/AdminVisits.css";

function AdminVisits() {

    const [visits, setVisits] = useState([]);

    useEffect(() => {
        fetchVisits();
    }, []);

    const fetchVisits = async () => {

        try {

            const res = await fetch(
                "http://localhost:5000/admin/visits"
            );

            const data = await res.json();

            setVisits(data);

        } catch (err) {

            console.error(err);

        }

    };

    return (

        <div className="admin-page">

            <div className="section-header">

                <h2>Facility Reservations</h2>

                <div className="header-line"></div>

            </div>

            <div className="table-wrapper">

                <table className="admin-table">

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Team</th>

                            <th>Date</th>

                            <th>Visitors</th>

                        </tr>

                    </thead>

                    <tbody>

                        {visits.map((v, i) => (

                            <tr key={i}>

                                <td>{v.FullName}</td>

                                <td>{v.Email}</td>

                                <td>{v.Team}</td>

                                <td>{v.PreferredDate}</td>

                                <td>{v.TotalVisitors}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default AdminVisits;