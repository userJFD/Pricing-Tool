import React from 'react';
import '../styles/DetailSelector.css';

const DealRangeSelector = ({ dealRange, onDealRangeChange }) => {
  const dealRanges = [
    "<150k",
    "125k-150k",
    "100k-125k",
    "75k-100k",
    "50k-75k",
    "25k-50k",
    "20k-25k",
    "15k-20k",
    "10k-15k",
    "5k-10k",
    ">5k"
  ];

  return (
    <select className="select" value={dealRange} onChange={onDealRangeChange}>
      <option value=""></option>
      {dealRanges.map((range, index) => (
        <option key={index} value={range}>
          {range}
        </option>
      ))}
    </select>
  );
};

export default DealRangeSelector;