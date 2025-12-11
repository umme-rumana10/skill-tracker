import React, { useEffect, useState } from 'react';

const API = 'https://skill-tracker-bg53.onrender.com/api/skills';

export default function Report() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(API);
      const data = await res.json();
      setItems(data);
    })();
  }, []);

  const printReport = () => window.print();

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 style={{ margin: 0 }}>Skills & Certifications Report</h2>
          <button className="btn" onClick={printReport}>Print Report</button>
        </div>
        <div className="card-body">
          {items.length === 0 ? (
            <p>No records to show.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Provider</th>
                  <th>Date</th>
                  <th>Level</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it._id}>
                    <td>{it.name}</td>
                    <td>{it.provider}</td>
                    <td>{it.date}</td>
                    <td><span className={`pill pill-${(it.level || 'Beginner').toLowerCase()}`}>{it.level}</span></td>
                    <td>{it.link ? <a href={it.link} target="_blank" rel="noreferrer">Open</a> : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
