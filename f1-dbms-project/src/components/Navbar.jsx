import { Link } from "react-router-dom";
import "../css-pages/Navbar.css";

function Navbar() {

    const user =
        JSON.parse(localStorage.getItem("user"));

    return (

        <div className="navbar">

            <div className="brand">
                F1DBMS
            </div>

            <div className="links">

                <Link className="link" to="/">
                    Home
                </Link>

                <Link className="link" to="/drivers">
                    Drivers
                </Link>

                <Link className="link" to="/teams">
                    Teams
                </Link>

                <Link className="link" to="/races">
                    Races
                </Link>

                <Link className="link" to="/visit">
                    Visit
                </Link>

                {/* ADMIN ONLY */}

                {
                    user?.role === "admin" && (

                        <Link
                            className="link"
                            to="/admin/visits"
                        >
                            Reservations
                        </Link>

                    )
                }

                {/* LOGIN */}

                {
                    !user && (

                        <Link
                            className="link"
                            to="/login"
                        >
                            Login
                        </Link>

                    )
                }

            </div>

        </div>

    );

}

export default Navbar;