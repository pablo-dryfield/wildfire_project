import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [month, setMonth] = useState('JAN');
  const [year, setYear] = useState('2022');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setError(null);
      const response = await axios.get(`http://localhost:3000/wildfires?month=${month}&year=${year}`);
      setData(response.data);
    } catch (err) {
      setError('Failed to fetch data');
      setData(null);
    }
  };

  return (
    <div>
      <select onChange={e => setMonth(e.target.value)}>
        <option value='JAN'>January</option>
        <option value='FEB'>February</option>
        <option value='MAR'>March</option>
        <option value='APR'>April</option>
        <option value='MAY'>May</option>
        <option value='JUN'>June</option>
        <option value='JUL'>July</option>
        <option value='AUG'>August</option>
        <option value='SEP'>September</option>
        <option value='OCT'>October</option>
        <option value='NOV'>November</option>
        <option value='DEC'>December</option>
      </select>

      <input type="number" value={year} onChange={e => setYear(e.target.value)} />

      <button onClick={fetchData}>Get Wildfires</button>

      {error && <p>{error}</p>}
      
      {data === null ? <p>Oh No!</p> : (
        Array.isArray(data.features) && data.features.sort((a, b) => a.properties.title.localeCompare(b.properties.title))
            .map(event => <p key={event.properties.id}>{event.properties.title}</p>)
      )}
    </div>
  );
}

export default App;