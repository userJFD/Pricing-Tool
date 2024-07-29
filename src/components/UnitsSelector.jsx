import React from 'react';

function UnitsInput({ units, onUnitsChange }) {
  const handleChange = (event) => {
    const value = event.target.value;
    
    if (value === '') {
      onUnitsChange('');
    } else if (!isNaN(value) && Number.isInteger(Number(value)) && Number(value) > 0) {
      onUnitsChange(Number(value));
    } else {
      onUnitsChange(0); 
    }
  };

  return (
    <div>
      <input
        className="numberCol"
        type="number"
        value={units === '' ? '' : units} 
        onChange={handleChange}
        placeholder="Enter units"
        step="1"
        min="1" 
      />
    </div>
  );
}

export default UnitsInput;

