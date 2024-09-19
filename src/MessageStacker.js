import React, { useState, useEffect, useCallback } from 'react';

const API_URL = 'https://dummyjson.com/test?data=dsds';

const MessageStacker = () => {
  const [messages, setMessages] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  
  const addMessage = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const message = `API Call at ${new Date().toLocaleTimeString()}: ${JSON.stringify(data)}`;
      setMessages(prevMessages => [
        ...prevMessages,
        message
      ]);
    } catch (error) {
      const errorMessage = `Error fetching data at ${new Date().toLocaleTimeString()}: ${error.message}`;
      setMessages(prevMessages => [
        ...prevMessages,
        errorMessage
      ]);
    }
  }, []);

  
  const handleButtonClick = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  };


  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(addMessage, 2000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Cleanup on unmount 
  }, [isRunning, addMessage]);

  return (
    <div>
      <button onClick={handleButtonClick}>
        {isRunning ? 'Stop' : 'Call the api data'}
      </button>
      <div>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '8px' }}>
            {message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageStacker;
