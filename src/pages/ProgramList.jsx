import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { programs } from "../data/programs";
import ProgramCard from "../components/ProgramCard.jsx";
import "./ProgramList.css";

// Use dynamic today in real apps
const TODAY = "2025-12-17";

/* ---------- CALCULATE YESTERDAY ---------- */
const YESTERDAY = (() => {
  const d = new Date(TODAY);
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
})();

export default function ProgramList() {
  /* ---------- TODAY PROGRAMS ---------- */
  const todaysPrograms = useMemo(() => {
    return programs.filter((p) => p.start.startsWith(TODAY));
  }, []);

  /* ---------- FIND LAST PROGRAM DATE BEFORE TODAY ---------- */
  const lastProgramDate = useMemo(() => {
    const pastDates = programs
      .map((p) => p.start.split("T")[0])
      .filter((date) => date < TODAY);

    if (pastDates.length === 0) return "";

    return pastDates.sort((a, b) => new Date(b) - new Date(a))[0];
  }, []);

  /* ---------- STATE: AUTO-SELECT LAST PROGRAM DATE ---------- */
  const [pastDate, setPastDate] = useState(lastProgramDate);

  /* ---------- PREVIOUS PROGRAMS (ONLY ONE DATE) ---------- */
  const pastPrograms = useMemo(() => {
    if (!pastDate) return [];

    return programs
      .filter((p) => p.start.startsWith(pastDate))
      .sort((a, b) => new Date(a.start) - new Date(b.start));
  }, [pastDate]);

  return (
    <main className="programList">
      {/* ---------- TODAY ---------- */}
      <section className="programSection">
        <h2 className="programSection__title">Today's Programs</h2>

        {todaysPrograms.length === 0 ? (
          <p className="programSection__empty">
            No programs available for today.
          </p>
        ) : (
          <div className="programList__grid">
            {todaysPrograms.map((p) => (
              <Link to={`/program/${p.id}`} key={p.id} className="link-reset">
                <ProgramCard program={p} />
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ---------- PREVIOUS (LAST PROGRAM DAY ONLY) ---------- */}
      <section className="programSection">
        <div className="programSection__header">
          <h2 className="programSection__title">Previous Programs</h2>

          <input
            type="date"
            value={pastDate}
            max={YESTERDAY}
            onChange={(e) => setPastDate(e.target.value)}
            className="programSection__date"
          />
        </div>

        {pastPrograms.length === 0 ? (
          <p className="programSection__empty">No previous programs found.</p>
        ) : (
          <div className="programList__grid">
            {pastPrograms.map((p) => (
              <Link to={`/program/${p.id}`} key={p.id} className="link-reset">
                <ProgramCard program={p} />
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
