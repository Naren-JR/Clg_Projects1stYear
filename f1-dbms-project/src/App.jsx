import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import Visit from "./pages/Visit";
import Stats from "./pages/Stats";
import Races from "./pages/Races";
import Teams from "./pages/Teams";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import MyVisit from "./pages/MyVisit";
import Drivers from "./pages/Drivers";
import Navbar from "./components/Navbar";
import NxtRace from "./components/NxtRace";

import "./App.css";

function App() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Drivers" element={<Drivers />} />
        <Route path="/Races" element={<Races />} />
        <Route path="/Stats" element={<Stats />} />
        <Route path="/Visit" element={<Visit />} />
        <Route path="/Teams" element={<Teams />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/myvisit" element={<MyVisit />} />
      </Routes>
    </>
  );
}

export default App;
