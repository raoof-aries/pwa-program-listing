import React from "react";

export default function EmployeeTable({ rows }) {
  if (!rows || rows.length === 0) return <p>No attendees.</p>;

  return (
    <div className="table-wrap">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee code</th>
            <th>Division</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx}>
              <td>{r.name}</td>
              <td>{r.empCode}</td>
              <td>{r.division}</td>
              <td>{r.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
