import React from 'react';

export default function SkillList({ items, onEdit, onDelete }) {
  if (!items.length) return <p style={{ color: '#aab3e4' }}>No records yet.</p>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Provider</th>
          <th>Date</th>
          <th>Level</th>
          <th>Link</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((it) => (
          <tr key={it._id}>
            <td>{it.name}</td>
            <td>{it.provider}</td>
            <td>{it.date}</td>
            <td><span className={`pill pill-${(it.level || 'Beginner').toLowerCase()}`}>{it.level}</span></td>
            <td>
              {it.link ? (
                <a href={it.link} target="_blank" rel="noreferrer">View</a>
              ) : (
                '-' 
              )}
            </td>
            <td>
              <div className="actions">
                <button className="btn" onClick={() => onEdit(it)}>Edit</button>
                <button className="btn secondary" onClick={() => onDelete(it._id)}>Delete</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
