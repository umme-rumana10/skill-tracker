import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import SkillForm from './components/SkillForm.jsx';
import SkillList from './components/SkillList.jsx';
import Report from './components/Report.jsx';

const API = 'https://skill-tracker-bg53.onrender.com/api/skills';

export default function App() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all records
  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await fetch(API);
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
      alert('Error fetching records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Save new record or update existing
  const handleSave = async (payload) => {
    try {
      const url = editing ? `${API}/${editing._id}` : API;
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save record');
      setEditing(null);
      fetchAll();
    } catch (err) {
      console.error(err);
      alert('Error saving record.');
    }
  };

  // Delete a record
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete record');
      fetchAll();
    } catch (err) {
      console.error(err);
      alert('Error deleting record.');
    }
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
                  <h2>{editing ? 'Edit Record' : 'Add New Record'}</h2>
                </div>
                <div className="card-body">
                  <SkillForm onSave={handleSave} editing={editing} />
                  {editing && (
                    <div className="actions">
                      <button className="btn secondary" onClick={() => setEditing(null)}>
                        Cancel Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h2>All Records</h2>
                </div>
                <div className="card-body">
                  {loading ? (
                    <p>Loading records...</p>
                  ) : (
                    <SkillList items={items} onEdit={setEditing} onDelete={handleDelete} />
                  )}
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
