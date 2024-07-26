const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('your-secret-key-here');
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

app.post('/api/payment-intent', async (req, res) => {
  const { paymentMethodId, amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true
    });

    res.send({ success: true, paymentIntent });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.post('/api/bookings', (req, res) => {
  // Save booking data to database
  console.log('Booking received:', req.body);
  res.status(201).json({ message: 'Booking successful' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
