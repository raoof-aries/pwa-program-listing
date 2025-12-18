import React from "react";
import "./ProgramCard.css";

export default function ProgramCard({ program }) {
  // API returns time strings like "10:00 AM" instead of ISO dates
  const timeRange = () => {
    if (program.end && program.end !== program.start) {
      return `${program.start} - ${program.end}`;
    }
    return program.start;
  };

  const attendeeCount = program.attendees ? program.attendees.length : 0;

  return (
    <article className="programCard">
      <div className="programCard__left">
        <h3 className="programCard__title">{program.name}</h3>
        <p className="programCard__meta">
          {attendeeCount} attendee{attendeeCount !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="programCard__right">
        <p className="programCard__time">{timeRange()}</p>
      </div>
    </article>
  );
}
