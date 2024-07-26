import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Tours() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    // Fetch tours data from an API
    fetch('/api/tours')
      .then(response => response.json())
      .then(data => setTours(data));
  }, []);

  return (
    <div>
      <h1>Tours</h1>
      <ul>
        {tours.map(tour => (
          <li key={tour.id}>
            <Link to={`/tours/${tour.id}`}>{tour.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tours;
