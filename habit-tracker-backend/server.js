import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';
import habitsRouter from './routes/habits.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/api/test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: 'DB connected!', time: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'DB connection failed' });
    }
});
app.use('/api/habits', habitsRouter);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});