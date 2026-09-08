import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        const password_hash = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
            [email, password_hash]
        );
        const user = result.rows[0];


        res.status(201).json(user);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Signup failed' });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'email not found' });
        }

        const user = result.rows[0];  // ← 여기서 user 변수 확보

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (isMatch === false) {
            return res.status(401).json({ error: 'wrong password' });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed' });
    }
});

export default router;