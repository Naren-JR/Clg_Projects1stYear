import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Home from './pages/Home'
import Visit from './pages/Visit'
import Stats from './pages/Stats'
import Races from './pages/Races'
import Navbar from './components/Navbar'
import NxtRace from './components/NxtRace'

import './App.css'

function App() {

	return (
		<>
			<Navbar />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/Races" element={<Races />} />
				<Route path="/Stats" element={<Stats />} />
				<Route path="/Visit" element={<Visit />} />
			</Routes>
		</>
	)
}

export default App
