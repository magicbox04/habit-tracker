import express from 'express';
import pool from '../db.js';

const router = express.Router();
try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: 'DB connected!', time: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'DB connection failed' });
    }
// = GET /api/habits
router.get('/', async (req, res) => {
    try {  
        const result = await pool.query('SELECT * FROM habits');
        res.json(result.rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Mal request' });
    }

});        
// = GET /api/habits/5
router.get('/:id', async (req, res) => { 
    try {
        const result = await pool.query('SELECT * FROM habits WHERE id = $1', [req.params.id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Mal request' });
    }
 });      
 // = POST /api/habits
router.post('/', async (req, res) => {
    try {
        const { name, expectedDays } = req.body; 
        
        const result = await pool.query(
            'INSERT INTO habits (name, expected_days, completed_dates) VALUES ($1, $2, $3) RETURNING *',
            [name, expectedDays, []]  // 배열 순서 = $1, $2, $3 순서
        );
        
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create habit' });
    }
});  
// = PUT /api/habits/5 
router.put('/:id', async (req, res) => {
    const { name, expectedDays, completedDates } = req.body;
    try {
        const result = await pool.query('UPDATE habits SET name = $1, expected_days = $2, completed_dates = $3 WHERE id = $4 RETURNING *', [name, expectedDays, completedDates, req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'id not found' });
        }

        res.json(result.rows[0]);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update habit' });
    }
 });   

 // = DELETE /api/habits/5
router.delete('/:id', async (req, res) => {
    try {
    const result = await pool.query('DELETE FROM habits WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'id not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update habit' });
    }
 });    

export default router;