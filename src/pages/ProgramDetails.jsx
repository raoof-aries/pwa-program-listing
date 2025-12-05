import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { programs } from "../data/programs";
import EmployeeTable from "../components/EmployeeTable.jsx";

export default function ProgramDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const program = programs.find((p) => p.id === id);

  if (!program) {
    return (
      <div className="container">
        <header className="header">
          <h1>Program not found</h1>
        </header>
        <div className="center">
          <button onClick={() => navigate(-1)} className="btn">
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="container">
      <header className="header">
        <h1>{program.name}</h1>
        <p className="sub">{program.attendees.length} attendees</p>
      </header>

      <section>
        <EmployeeTable rows={program.attendees} />
      </section>

      <footer className="footer-actions">
        <Link to="/" className="btn-outline">
          Back to programs
        </Link>
      </footer>
    </main>
  );
}
