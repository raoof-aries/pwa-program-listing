import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { programs } from "../data/programs";
import EmployeeTable from "../components/EmployeeTable.jsx";
import "./ProgramDetails.css";

export default function ProgramDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const program = programs.find((p) => p.id === id);

  if (!program) {
    return (
      <div className="programDetails">
        <div className="programDetails__notFound">
          <h1 className="programDetails__notFoundTitle">Program not found</h1>
          <div className="center">
            <button onClick={() => navigate(-1)} className="btn">
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="programDetails">
      <header className="programDetails__header">
        <h1 className="programDetails__title">{program.name}</h1>
        <p className="programDetails__subtitle">
          {program.attendees.length} attendees
        </p>
      </header>

      <section className="programDetails__content">
        <EmployeeTable rows={program.attendees} />
      </section>

      <footer className="programDetails__footer">
        <Link to="/" className="btn-outline">
          Back to programs
        </Link>
      </footer>
    </main>
  );
}
