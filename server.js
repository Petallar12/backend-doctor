// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module
const db = require('./db'); // Assuming you have a db.js file to handle your database connection

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to get all doctors
app.get('/doctors', (req, res) => {
    const sql = 'SELECT * FROM doctor';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Route to get a doctor by ID
app.get('/doctors/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM doctor WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
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
        if (err) throw err;
        res.json({ id: result.insertId });
    });
});

// Route to update a doctor by ID
app.put('/doctor/:id', (req, res) => {
    const { id } = req.params;
    const { name, speciality, clinic_name, address_1, address_2, address_3, address_4, image_url, more_info } = req.body;
    const sql = 'UPDATE doctor SET name = ?, speciality = ?, clinic_name = ?, address_1 = ?, address_2 = ?, address_3 = ?, address_4 = ?, image_url = ?, more_info = ? WHERE id = ?';
    db.query(sql, [name, speciality, clinic_name, address_1, address_2, address_3, address_4, image_url, more_info, id], (err) => {
        if (err) throw err;
        res.json({ message: 'Doctor updated' });
    });
});

// Route to delete a doctor by ID
app.delete('/doctor/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM doctor WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Doctor deleted' });
    });
});

// Start the server
app.listen(5000, () => {
    console.log('Server started on port 5000');
});
