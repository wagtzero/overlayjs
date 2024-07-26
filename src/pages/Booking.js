import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PaymentForm from '../components/PaymentForm';

function Booking() {
  const { tourId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    guests: 1
  });
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Process booking details and show payment form
    setIsPaymentComplete(false);
  };

  const handlePaymentSuccess = (paymentResult) => {
    console.log('Payment successful!', paymentResult);
    setIsPaymentComplete(true);
  };

  return (
    <div>
      <h1>Book Your Tour</h1>
      {!isPaymentComplete ? (
        <>
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
            <button type="submit">Proceed to Payment</button>
          </form>
          <PaymentForm amount={formData.guests * 1000} onSuccess={handlePaymentSuccess} />
        </>
      ) : (
        <div>
          <h2>Booking Confirmed!</h2>
          <p>Thank you for your booking. You will receive a confirmation email shortly.</p>
        </div>
      )}
    </div>
  );
}

export default Booking;
