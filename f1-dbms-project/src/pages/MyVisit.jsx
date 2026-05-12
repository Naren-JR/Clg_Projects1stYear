import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css-pages/MyVisit.css";

function MyVisit() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [visit, setVisit] = useState(null);

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user?.FormID) return;

    fetchVisit();
  }, []);

  const fetchVisit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/myvisit/${user.FormID}`);

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error);

        return;
      }

      setVisit(data);
    } catch (err) {
      console.error(err);
    }
  };

  const cancelVisit = async () => {
    try {
      const confirmCancel = window.confirm("Cancel reservation?");

      if (!confirmCancel) return;

      await fetch(`http://localhost:5000/myvisit/cancel/${user.FormID}`, {
        method: "PUT",
      });

      setMessage("Visit cancelled");

      setVisit(null);

      user.FormID = null;

      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="myvisit-page">
      <div className="myvisit-card">
        <div className="visit-header">
          <div>
            <p className="portal-label">F1 PADDOCK PORTAL</p>

            <h1>My Visit</h1>

            <p className="welcome-text">Welcome back, {user?.Username}</p>
          </div>

          <div className="status-pill">
            {user?.FormID ? "ACTIVE" : "NO BOOKING"}
          </div>
        </div>

        <div className="visit-content">
          <div className="visit-main">
            {!user?.FormID && (
              <div className="no-visit">
                <h2>No reservation found</h2>

                <p>
                  Reserve your Formula 1 paddock experience and manage your
                  bookings from this dashboard.
                </p>

                <button onClick={() => navigate("/visit")}>
                  Create Reservation
                </button>
              </div>
            )}

            {visit && (
              <div className="visit-details">
                <div className="detail-row">
                  <span>Visitor Name</span>

                  <strong>{visit.FullName}</strong>
                </div>

                <div className="detail-row">
                  <span>Team Access</span>

                  <strong>{visit.Team}</strong>
                </div>

                <div className="detail-row">
                  <span>Visit Date</span>

                  <strong>{visit.PreferredDate}</strong>
                </div>

                <div className="detail-row">
                  <span>Total Visitors</span>

                  <strong>{visit.TotalVisitors}</strong>
                </div>

                <div className="detail-row">
                  <span>Reservation Status</span>

                  <strong className="status-active">{visit.VisitStatus}</strong>
                </div>

                <div className="visit-actions">
                  <button
                    className="edit-btn"
                    onClick={() =>
                      navigate("/visit", {
                        state: visit,
                      })
                    }
                  >
                    Edit Reservation
                  </button>

                  <button className="cancel-btn" onClick={cancelVisit}>
                    Cancel Visit
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="visit-sidebar">
            <div className="sidebar-card">
              <h3>Account</h3>

              <p>Username</p>

              <strong>{user?.Username}</strong>
            </div>

            <div className="sidebar-card">
              <h3>Access Role</h3>

              <p>Current Access</p>

              <strong>{user?.Role}</strong>
            </div>

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default MyVisit;
