import React, { useEffect, useState } from 'react';
import SkillForm from './components/SkillForm.jsx';
import SkillList from './components/SkillList.jsx';
import NavBar from './components/NavBar.jsx';
import Report from './components/Report.jsx';
import { Routes, Route } from 'react-router-dom';

const API = '/api/skills';

export default function App() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchAll = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleSave = async (payload) => {
    if (editing) {
      const res = await fetch(`${API}/${editing._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setEditing(null);
        fetchAll();
      }
    } else {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) fetchAll();
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    if (res.ok) fetchAll();
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <h1>Skill Development & Certification Tracker</h1>

              <div className="card">
                <div className="card-header">
                  <h2 style={{ margin: 0 }}>{editing ? 'Edit Record' : 'Add New Record'}</h2>
                </div>
                <div className="card-body">
                  <SkillForm onSave={handleSave} editing={editing} />
                  {editing && (
                    <div className="actions">
                      <button className="btn secondary" onClick={() => setEditing(null)}>Cancel Edit</button>
                    </div>
                  )}
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h2 style={{ margin: 0 }}>All Records</h2>
                </div>
                <div className="card-body">
                  <SkillList items={items} onEdit={setEditing} onDelete={handleDelete} />
                </div>
              </div>
            </div>
          }
        />
        <Route path="/report" element={<Report />} />
      </Routes>
    </>
  );
}
