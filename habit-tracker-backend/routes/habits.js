import express from 'express';
import pool from '../db.js';
import checkAuth from '../middleware/authMiddleware.js';

function toCamelCase(h) {
    return {
        id: h.id,
        name: h.name,
        expectedDays: h.expected_days,
        completedDates: h.completed_dates
    };
}
const router = express.Router();
// = GET /api/habits
router.get('/', checkAuth, async (req, res) => {
    try {  
        const result = await pool.query('SELECT * FROM habits WHERE user_id = $1', [req.userId]);
        const habits = result.rows.map(toCamelCase);
        res.json(habits);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Mal request' });
    }

});        
// = GET /api/habits/5
router.get('/:id', checkAuth, async (req, res) => { 
    try {
        const result = await pool.query('SELECT * FROM habits WHERE id = $1 AND user_id = $2', [req.params.id, req.userId]);
        const habits = result.rows.map(toCamelCase);

        res.json(habits);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Mal request' });
    }
 });      
 // = POST /api/habits
router.post('/', checkAuth, async (req, res) => {
    try {
        const { name, expectedDays } = req.body; 
        
        const result = await pool.query(
            'INSERT INTO habits (name, expected_days, completed_dates, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, expectedDays, [], req.userId]  
        );
        const habits = result.rows.map(toCamelCase);

        
        res.status(201).json(habits[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create habit' });
    }
});  
// = PUT /api/habits/5 
router.put('/:id', checkAuth, async (req, res) => {
    const { name, expectedDays, completedDates } = req.body;
    try {
        const result = await pool.query('UPDATE habits SET name = $1, expected_days = $2, completed_dates = $3 WHERE id = $4 AND user_id = $5 RETURNING *', [name, expectedDays, completedDates, req.params.id, req.userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'id not found' });
        }
        const habits = result.rows.map(toCamelCase);

        res.json(habits[0]);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update habit' });
    }
 });   

 // = DELETE /api/habits/5
router.delete('/:id', checkAuth, async (req, res) => {
    try {
    const result = await pool.query('DELETE FROM habits WHERE id = $1 AND user_id = $2 RETURNING *', [req.params.id, req.userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'id not found' });
        }
        const habits = result.rows.map(toCamelCase);

        res.json(habits[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update habit' });
    }
 });    

export default router;