import React from "react";
import { Routes, Route } from "react-router-dom";
import ProgramList from "./pages/ProgramList.jsx";
import ProgramDetails from "./pages/ProgramDetails.jsx";
import { ProgramProvider } from "./context/ProgramContext";

export default function App() {
  return (
    <div className="app-root">
      <ProgramProvider>
        <Routes>
          <Route path="/" element={<ProgramList />} />
          <Route path="/program/:id" element={<ProgramDetails />} />
        </Routes>
      </ProgramProvider>
    </div>
  );
}
