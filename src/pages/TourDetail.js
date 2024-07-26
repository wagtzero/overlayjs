import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TourDetail() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    // Fetch tour detail from an API
    fetch(`/api/tours/${id}`)
      .then(response => response.json())
      .then(data => setTour(data));
  }, [id]);

  if (!tour) return <div>Loading...</div>;

  return (
    <div>
      <h1>{tour.name}</h1>
      <p>{tour.description}</p>
      <Link to={`/booking/${tour.id}`}>Book Now</Link>
    </div>
  );
}

export default TourDetail;
