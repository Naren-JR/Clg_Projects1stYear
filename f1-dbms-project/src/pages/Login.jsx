import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css-pages/Login.css";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await fetch(
                "http://localhost:5000/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Login failed");
                return;
            }

            localStorage.setItem(
                "user",
                JSON.stringify(data)
            );

            navigate("/");

        } catch (err) {

            console.error(err);

            setError("Server error");

        }

    };

    return (

        <div className="login-page">

            <form
                className="login-card"
                onSubmit={handleSubmit}
            >

                <h1>F1DBMS Login</h1>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                {error && (
                    <p className="login-error">
                        {error}
                    </p>
                )}

                <button type="submit">
                    Login
                </button>

            </form>

        </div>

    );

}

export default Login;