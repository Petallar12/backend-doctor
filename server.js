const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db'); // Database connection setup

const app = express();

// Middleware
app.use(cors({
    origin: 'https://petallar12.github.io' // Set the origin to your GitHub Pages URL
}));
app.use(bodyParser.json()); // Parse JSON bodies

// Route to get all doctors
app.get('/doctors', (req, res) => {
    const sql = 'SELECT * FROM doctor';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching doctors:', err);
            res.status(500).json({ error: 'Failed to fetch doctors' });
        } else {
            res.json(results);
        }
    });
});
app.get('/home', (req, res) => {
  res.status(200).json('Welcome, your app is working well');
});

app.get('/', (req, res) => {
    res.status(200).json('Welcome, your app is working well');
  });

// Route to get a doctor by ID
app.get('/doctors/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM doctor WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error fetching doctor by ID:', err);
            res.status(500).json({ error: 'Failed to fetch doctor' });
        } else if (result.length === 0) {
            res.status(404).send('Doctor not found');
        } else {
            res.json(result[0]);
        }
    });
});

// Route to add a new doctor
app.post('/doctor', (req, res) => {
    const { name, speciality, clinic_name, address_1, address_2, address_3, address_4, image_url, more_info } = req.body;
    const sql = 'INSERT INTO doctor (name, speciality, clinic_name, address_1, address_2, address_3, address_4, image_url, more_info) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, speciality, clinic_name, address_1, address_2, address_3, address_4, image_url, more_info], (err, result) => {
        if (err) {
            console.error('Error adding new doctor:', err);
            res.status(500).json({ error: 'Failed to add doctor' });
        } else {
            res.json({ id: result.insertId, message: 'Doctor added successfully' });
        }
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
            res.status(500).json({ error: 'Failed to update doctor' });
        } else {
            res.json({ message: 'Doctor updated successfully' });
        }
    });
});

// Route to delete a doctor by ID
app.delete('/doctor/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM doctor WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            console.error('Error deleting doctor:', err);
            res.status(500).json({ error: 'Failed to delete doctor' });
        } else {
            res.json({ message: 'Doctor deleted successfully' });
        }
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
