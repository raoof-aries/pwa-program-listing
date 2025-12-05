import { Link } from "react-router-dom";
import { programs } from "../data/programs";
import ProgramCard from "../components/ProgramCard.jsx";
import "./ProgramList.css";

export default function ProgramList() {
  return (
    <main className="programList">
      <header className="programList__header">
        <h1 className="programList__title">Today's Programs</h1>
      </header>

      <section className="programList__grid">
        {programs.map((p) => (
          <Link to={`/program/${p.id}`} key={p.id} className="link-reset">
            <ProgramCard program={p} />
          </Link>
        ))}
      </section>
    </main>
  );
}
