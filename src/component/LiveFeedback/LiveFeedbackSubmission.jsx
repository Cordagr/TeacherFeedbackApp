const FeedbackForm = () => {
    const [message, setMessage] = useState('');
    
    const handleSubmit = async () => {
      await fetch('http://localhost:3001/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: "Student A", message })
      });
      setMessage('');
    };
  
    return (
      <div>
        <input value={message} onChange={e => setMessage(e.target.value)} />
        <button onClick={handleSubmit}>Send Feedback</button>
      </div>
    );
  };
  