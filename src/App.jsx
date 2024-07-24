import { useState, useEffect } from 'react';
import './App.css';
import html2canvas from 'html2canvas';
const CUSTOMER_DATA_URL = '../public/data/customers.json';

function App() {
  const [purchaseAmount, setPurchaseAmount] = useState('0.00');
  const [deliveryPercent, setDeliveryPercent] = useState('0.00');
  const [kickbacksPercent, setKickbacksPercent] = useState('0.00');
  const [marginPercent, setMarginPercent] = useState('0.00');
  const [vatRate, setVatRate] = useState('');

  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');

  // Fetch customer data from API
  useEffect(() => {
    fetch(CUSTOMER_DATA_URL)
      .then(response => response.json())
      .then(data => {
        setCustomers(data);
        setFilteredCustomers(data); // Initialize filteredCustomers with fetched data
      })
      .catch(error => console.error('Error fetching customer data:', error));
  }, []);

  // Filter customers based on search term
  useEffect(() => {
    const results = customers.filter(customer =>
      customer.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(results);
  }, [searchTerm, customers]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
  };

  const vatRates = {
    "Switzerland": {
      "food": 2.5,
      "non-food": 8.1
    },
    "Germany": {
      "food": 7,
      "non-food": 19
    }
  };

  const purchaseAmountNumber = parseFloat(purchaseAmount) || 0;
  const deliveryPercentNumber = parseFloat(deliveryPercent) || 0;
  const kickbacksPercentNumber = parseFloat(kickbacksPercent) || 0;
  const marginPercentNumber = parseFloat(marginPercent) || 0;
  const vatPercentNumber = vatRate ? parseFloat(vatRate) : 0;

  const deliveryAmount = (purchaseAmountNumber * deliveryPercentNumber) / 100;
  const kickbacksAmount = (purchaseAmountNumber * kickbacksPercentNumber) / 100;
  const minimumSellingPrice = purchaseAmountNumber + deliveryAmount - kickbacksAmount;
  const marginAmount = (minimumSellingPrice * marginPercentNumber) / (100 - marginPercentNumber);
  const sellingPriceExclVat = minimumSellingPrice + marginAmount;
  const vatAmount = (sellingPriceExclVat * vatPercentNumber) / 100;
  const sellingPriceInclVat = sellingPriceExclVat + vatAmount;

  const takeScreenshot = () => {
    html2canvas(document.querySelector(".table-wrapper-two")).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = 'screenshot.png';
      link.click();
    });
  };

  return (
    <div className="table-wrapper-two">
      <h2>B2B Calculator</h2>

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
                    placeholder="Search for a customer..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <select
                    value={selectedCustomer}
                    onChange={handleCustomerChange}
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

              </td>
              <td>Editables</td>
              <td>Editables</td>
              <td></td>
              <td>Editables</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="table-wrapper">
        <table className="fl-table">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>%</th>
              <th>Amount in currency</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>Purchase price / stock value (excl. VAT)</td>
              <td></td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>+</td>
              <td>Delivery surcharge</td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  value={deliveryPercent}
                  onChange={(e) => setDeliveryPercent(e.target.value)}
                />
              </td>
              <td>{deliveryAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td>-</td>
              <td>Kickbacks</td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  value={kickbacksPercent}
                  onChange={(e) => setKickbacksPercent(e.target.value)}
                />
              </td>
              <td>{kickbacksAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td>=</td>
              <td>Minimum selling price (excl. VAT)</td>
              <td></td>
              <td>{minimumSellingPrice.toFixed(2)}</td>
            </tr>
            <tr>
              <td>+</td>
              <td>Margin (Editable)</td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  value={marginPercent}
                  onChange={(e) => setMarginPercent(e.target.value)}
                />
              </td>
              <td>{marginAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td>=</td>
              <td>Selling price (excl. VAT)</td>
              <td></td>
              <td>{sellingPriceExclVat.toFixed(2)}</td>
            </tr>
            <tr>
              <td>+</td>
              <td>VAT</td>
              <td>
                <select
                  value={vatRate}
                  onChange={(e) => setVatRate(e.target.value)}
                >
                  <option value="">Select VAT Rate</option>
                  <optgroup label="Switzerland">
                    <option value={vatRates.Switzerland.food}>Food (2.5%)</option>
                    <option value={vatRates.Switzerland["non-food"]}>Non-Food (8.1%)</option>
                  </optgroup>
                  <optgroup label="Germany">
                    <option value={vatRates.Germany.food}>Food (7%)</option>
                    <option value={vatRates.Germany["non-food"]}>Non-Food (19%)</option>
                  </optgroup>
                </select>
              </td>
              <td>{vatAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td>=</td>
              <td>Selling price (incl. VAT)</td>
              <td></td>
              <td className='sellingpricetotal'>{sellingPriceInclVat.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button onClick={takeScreenshot}>Take Screenshot</button>
    </div>
  );
}

export default App;
