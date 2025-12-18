import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProgramContext } from "../context/ProgramContext";
import EmployeeTable from "../components/EmployeeTable.jsx";
import "./ProgramDetails.css";

export default function ProgramDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { findProgramById } = useProgramContext();

  const program = findProgramById(id);

  if (!program) {
    return (
      <div className="programDetails">
        <div className="programDetails__notFound">
          <h1 className="programDetails__notFoundTitle">Program not found</h1>
          <p className="programDetails__subtitle">
            Please select a program from the programs list.
          </p>
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
          {program.attendees.length} attendee
          {program.attendees.length !== 1 ? "s" : ""}
        </p>
      </header>

      <section className="programDetails__content">
        {program.attendees.length === 0 ? (
          <div className="programDetails__empty">
            <p>No attendees registered for this program yet.</p>
          </div>
        ) : (
          <EmployeeTable rows={program.attendees} />
        )}
      </section>

      <footer className="programDetails__footer">
        <Link to="/" className="btn-outline">
          Back to programs
        </Link>
      </footer>
    </main>
  );
}
