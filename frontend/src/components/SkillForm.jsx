import React, { useEffect, useState } from 'react';

export default function SkillForm({ onSave, editing }) {
  const [form, setForm] = useState({
    name: '',
    provider: '',
    date: '',
    link: '',
    level: 'Beginner',
  });

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name || '',
        provider: editing.provider || '',
        date: editing.date || '',
        link: editing.link || '',
        level: editing.level || 'Beginner',
      });
    } else {
      setForm({ name: '', provider: '', date: '', link: '', level: 'Beginner' });
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-row">
          <label className="label">Skill/Certification Name</label>
          <input className="input" placeholder="e.g., React, AWS Practitioner" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <label className="label">Provider/Organization</label>
          <input className="input" placeholder="e.g., Coursera, AWS" name="provider" value={form.provider} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <label className="label">Completion Date</label>
          <input className="input" type="date" name="date" value={form.date} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <label className="label">Certificate Link (optional)</label>
          <input className="input" placeholder="https://..." name="link" value={form.link} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label className="label">Skill Level</label>
          <select className="select" name="level" value={form.level} onChange={handleChange}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      </div>
      <div className="actions">
        <button className="btn" type="submit">{editing ? 'Update' : 'Add'} Record</button>
      </div>
    </form>
  );
}
