import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function Booking() {
  const { tourId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    guests: 1
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Send booking data to an API
    fetch(`/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...formData, tourId })
    })
      .then(response => response.json())
      .then(data => {
        alert('Booking successful!');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>Book Your Tour</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div>
          <label>Guests</label>
          <input type="number" name="guests" value={formData.guests} onChange={handleChange} min="1" required />
        </div>
        <button type="submit">Book</button>
      </form>
    </div>
  );
}

export default Booking;
