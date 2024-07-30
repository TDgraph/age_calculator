import React, { useState } from 'react';
import './AgeCalculator.css';

const AgeCalculator = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState(null);

  const handleDateChange = (event) => setDay(event.target.value);
  const handleMonthChange = (event) => setMonth(event.target.value);
  const handleYearChange = (event) => setYear(event.target.value);

  const calculateAge = () => {
    if (!day || !month || !year) return;

    const birthDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    let ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageInMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageInDays = currentDate.getDate() - birthDate.getDate();

    if (ageInDays < 0) {
      ageInMonths -= 1;
      const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
      ageInDays += previousMonth.getDate();
    }

    if (ageInMonths < 0) {
      ageInYears -= 1;
      ageInMonths += 12;
    }

    setAge({
      years: ageInYears,
      months: ageInMonths,
      days: ageInDays,
    });
  };

  return (
    <div className='age-calculator'>
      <h1 className='heading'>Age Calculator</h1>
      <div className='body'>
        <label>
          Date
          <input type="number" value={day} onChange={handleDateChange} placeholder="DD" min="1" max="31" />
        </label>
        <label>
          Month
          <input type="number" value={month} onChange={handleMonthChange} placeholder="MM" min="1" max="12" />
        </label>
        <label>
          Year
          <input type="number" value={year} onChange={handleYearChange} placeholder="YYYY" min="1900" />
        </label>
      </div>
      <button onClick={calculateAge}>Submit</button>
      {age && (
        <div className='age-display'>
          <h2>
            Your Age is {age.years} Years {age.months} Months {age.days} Days
          </h2>
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;
