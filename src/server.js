const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Sample data
const tours = [
  { id: 1, name: 'Tour A', description: 'Description of Tour A' },
  { id: 2, name: 'Tour B', description: 'Description of Tour B' },
];

// Routes
app.get('/api/tours', (req, res) => {
  res.json(tours);
});

app.get('/api/tours/:id', (req, res) => {
  const tour = tours.find(t => t.id === parseInt(req.params.id));
  res.json(tour || {});
});

app.post('/api/bookings', (req, res) => {
  // Save booking data to database
  console.log('Booking received:', req.body);
  res.status(201).json({ message: 'Booking successful' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
