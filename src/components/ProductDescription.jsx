import React, { useState } from 'react';

function ProductDescription({ description, onDescriptionChange }) {
  return (
    <div>
      <input
        type="text"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="Enter product description"
      />
    </div>
  );
}

export default ProductDescription;