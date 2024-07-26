import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-publishable-key-here');

function StripeProvider({ children }) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}

export default StripeProvider;
