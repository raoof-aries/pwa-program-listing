import { Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useProgramContext } from "../context/ProgramContext";
import ProgramCard from "../components/ProgramCard.jsx";
import "./ProgramList.css";

const TODAY = new Date().toISOString().split("T")[0];

const YESTERDAY = (() => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
})();

export default function ProgramList() {
  const {
    todayPrograms,
    pastPrograms,
    loading,
    error,
    fetchTodayPrograms,
    fetchProgramsByDate,
  } = useProgramContext();

  const [pastDate, setPastDate] = useState(YESTERDAY);

  // Fetch today's programs on mount
  useEffect(() => {
    fetchTodayPrograms();
  }, [fetchTodayPrograms]);

  // Fetch past programs when date changes
  useEffect(() => {
    if (pastDate) {
      fetchProgramsByDate(pastDate);
    }
  }, [pastDate, fetchProgramsByDate]);

  return (
    <main className="programList">
      {/* ---------- TODAY ---------- */}
      <section className="programSection">
        <h2 className="programSection__title">Today's Programs</h2>

        {loading.today ? (
          <p className="programSection__empty">Loading today's programs...</p>
        ) : error.today ? (
          <p className="programSection__empty">Error: {error.today}</p>
        ) : todayPrograms.length === 0 ? (
          <p className="programSection__empty">
            No programs available for today.
          </p>
        ) : (
          <div className="programList__grid">
            {todayPrograms.map((p) => (
              <Link to={`/program/${p.id}`} key={p.id} className="link-reset">
                <ProgramCard program={p} />
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ---------- PREVIOUS ---------- */}
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

        {loading.past ? (
          <p className="programSection__empty">Loading programs...</p>
        ) : error.past ? (
          <p className="programSection__empty">Error: {error.past}</p>
        ) : pastPrograms.length === 0 ? (
          <p className="programSection__empty">
            No programs found for this date.
          </p>
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
