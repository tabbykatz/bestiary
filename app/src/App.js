import * as React from "react";

import { Routes, Route, Link } from "react-router-dom";

import Sightings from "./Sightings";
import Species from "./Species";
import Specimens from "./Specimens";

const App = () => {
  return (
    <main>
      <nav>
        <Link to="/">Admin</Link> | <Link to="Portal">Portal</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/portal" element={<Portal />} />
      </Routes>
    </main>
  );
};

const Admin = () => {
  return (
    <>
      <Species />
      <Specimens />
      <Sightings />
    </>
  );
};

const Portal = () => (
  <>
    <h1>Portal</h1>
  </>
);

export default App;
