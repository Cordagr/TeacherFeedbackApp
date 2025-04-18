import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Update with backend URL

const FeedbackLive = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    socket.on('new-feedback', (data) => {
      setFeedbacks(prev => [data, ...prev]);
    });

    return () => socket.off('new-feedback');
  }, []);

  return (
    <div>
      <h2>Live Feedback</h2>
      {feedbacks.map((fb, idx) => (
        <div key={idx}>
          <strong>{fb.user}:</strong> {fb.message}
        </div>
      ))}
    </div>
  );
};

export default FeedbackLive;
