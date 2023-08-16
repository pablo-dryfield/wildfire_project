import React, { useState, useEffect} from 'react';
import { Header } from './components/Header';
import { MonthYearSelector } from './components/MonthYearSelector';
import { WildfireList } from './components/WildfireList';

const App = () => {
  const [month, setMonth] = useState('Select Month');
  const [year, setYear] = useState('Select Year');
  const [wildfires, setWildfires] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(year !== 0 && month !== '' && month !== 'Select Month' && year !== 'Select Year'){
      setIsLoading(true);
      fetch(`http://localhost:3000/wildfires?month=${month}&year=${year}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          setIsLoading(false);
          return response.json();
        })
        .then((data) => {
          setIsLoading(false);
          setWildfires(data);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
          setIsLoading(false);
          setError(error);
        });
    }
  }, [month, year]);

  return (
    <div>
      <Header />
      <MonthYearSelector 
        month={month} 
        year={year} 
        onMonthChange={(e) => setMonth(e.target.value)} 
        onYearChange={(e) => setYear(e.target.value)} 
      />
      {error ? <p>Error loading data</p> : <WildfireList wildfires={wildfires} month={month} year={year} isLoading={isLoading}/>}
    </div>
  );
}

export default App;