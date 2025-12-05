import React from "react";
import "./ProgramCard.css";

export default function ProgramCard({ program }) {
  const start = new Date(program.start);
  const end = program.end ? new Date(program.end) : null;

  function timeRange() {
    const opts = { hour: "2-digit", minute: "2-digit" };
    return `${start.toLocaleTimeString([], opts)}${
      end ? " - " + end.toLocaleTimeString([], opts) : ""
    }`;
  }

  return (
    <article className="programCard">
      <div className="programCard__left">
        <h3 className="programCard__title">{program.name}</h3>
        <p className="programCard__meta">
          {program.attendees.length} attendees
        </p>
      </div>
      <div className="programCard__right">
        <p className="programCard__time">{timeRange()}</p>
      </div>
    </article>
  );
}
