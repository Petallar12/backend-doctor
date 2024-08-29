// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from a .env file
const db = require('./db'); // Database connection setup

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON bodies

// Route to get all doctors
app.get('/doctors', (req, res) => {
    const sql = 'SELECT * FROM doctor';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching doctors:', err);
            return res.status(500).json({ error: 'Failed to fetch doctors' });
        }
        res.json(results);
    });
});

// Route to get a doctor by ID
app.get('/doctors/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM doctor WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error fetching doctor by ID:', err);
            return res.status(500).json({ error: 'Failed to fetch doctor' });
        }
        if (result.length === 0) {
            return res.status(404).send('Doctor not found');
        }
        res.json(result[0]);
    });
});

// Route to add a new doctor
app.post('/doctor', (req, res) => {
    const { name, speciality, clinic_name, address_1, address_2, address_3, address_4, image_url, more_info } = req.body;
    const sql = 'INSERT INTO doctor (name, speciality, clinic_name, address_1, address_2, address_3, address_4, image_url, more_info) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, speciality, clinic_name, address_1, address_2, address_3, address_4, image_url, more_info], (err, result) => {
        if (err) {
            console.error('Error adding new doctor:', err);
            return res.status(500).json({ error: 'Failed to add doctor' });
        }
        res.json({ id: result.insertId, message: 'Doctor added successfully' });
    });
});

// Route to update a doctor by ID
app.put('/doctor/:id', (req, res) => {
    const { id } = req.params;
    const { name, speciality, clinic_name, address_1, address_2, address_3, address_4, image_url, more_info } = req.body;
    const sql = 'UPDATE doctor SET name = ?, speciality = ?, clinic_name = ?, address_1 = ?, address_2 = ?, address_3 = ?, address_4 = ?, image_url = ?, more_info = ? WHERE id = ?';
    db.query(sql, [name, speciality, clinic_name, address_1, address_2, address_3, address_4, image_url, more_info, id], (err) => {
        if (err) {
            console.error('Error updating doctor:', err);
            return res.status(500).json({ error: 'Failed to update doctor' });
        }
        res.json({ message: 'Doctor updated successfully' });
    });
});

// Route to delete a doctor by ID
app.delete('/doctor/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM doctor WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            console.error('Error deleting doctor:', err);
            return res.status(500).json({ error: 'Failed to delete doctor' });
        }
        res.json({ message: 'Doctor deleted successfully' });
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

