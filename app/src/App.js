import * as React from "react";

import { Routes, Route, Link } from "react-router-dom";

import Sightings from "./Sightings";
import Species from "./Species";
import Specimens from "./Specimens";

const App = () => {
  return (
    <main>
      <nav>
        <Link to="/">Home</Link> | <Link to="dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </main>
  );
};

const Home = () => {
  return (
    <>
      <Species />
      <Specimens />
      <Sightings />
    </>
  );
};

const Dashboard = () => (
  <>
    <h1>Dashboard</h1>
  </>
);

export default App;
