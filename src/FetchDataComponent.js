// src/FetchDataComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios if using it

const FetchDataComponent = () => {
  const [data, setData] = useState(null); // State to store the API data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to store any errors

  useEffect(() => {
    // Define an asynchronous function to fetch data
    const fetchData = async () => {
      try {
        // Add a delay of 2000ms (2 seconds) before calling the API
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Call the API and get the response
        const response = await axios.get('https://dummyjson.com/test?data=dsds');
        
        // Update the state with the data from the response
        setData(response.data);
      } catch (error) {
        // Handle errors
        setError(error.message);
      } finally {
        // Set loading to false once data fetching is complete
        setLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  // Render loading, error, or data based on the state
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Fetched Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display the data in a formatted manner */}
    </div>
  );
};

export default FetchDataComponent;
