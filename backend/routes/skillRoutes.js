const express = require('express');
const Skill = require('../models/skillModel');

const router = express.Router();

// Create
router.post('/', async (req, res) => {
  try {
    const { name, provider, date, link, level } = req.body;
    const skill = await Skill.create({ name, provider, date, link, level });
    res.status(201).json(skill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all
router.get('/', async (_req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Skill not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Skill.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Skill not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
