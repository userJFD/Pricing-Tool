import React, { useState } from 'react';

function SupplierSelector({ description, onDescriptionChange }) {
  return (
    <div>
      <input
        type="text"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="Enter supplier here"
      />
    </div>
  );
}

export default SupplierSelector;