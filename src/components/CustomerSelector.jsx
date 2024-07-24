import React from 'react';
import '../styles/CustomerSelector.css';

function CustomerSelector({ searchTerm, setSearchTerm, filteredCustomers, selectedCustomer, setSelectedCustomer }) {
  return (
    <div className="table-wrapper">
      <table className="fl-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Customer ID</th>
            <th>Brand</th>
            <th>Product type</th>
            <th>Category</th>
            <th>Deal Range</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="dropdown-container">
                <input
                  type="text"
                  placeholder="Search customer name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                  size={filteredCustomers.length}
                >
                  {filteredCustomers.map((customer) => (
                    <option key={customer.customerID} value={customer.companyName}>
                      {customer.companyName}
                    </option>
                  ))}
                </select>
              </div>
            </td>
            <td>
            <div className="dropdown-container">
              <input
               type="text"
                placeholder="Search Customer ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                size={filteredCustomers.length}
              >
                {filteredCustomers.map((customer) => (
                  <option key={customer.customerID} value={customer.customerID}>
                    {customer.customerID}
                  </option>
                ))}
              </select>
              </div>
            </td>
            <td>Editables</td>
            <td>Editables</td>
            <td></td>
            <td>Editables</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CustomerSelector;