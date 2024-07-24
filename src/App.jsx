import { useState, useEffect } from 'react';
import './App.css';
import html2canvas from 'html2canvas';
import CustomerSelector from './components/CustomerSelector';
import PricingTable from './components/PricingTable';
import ScreenshotButton from './components/ScreenshotButton';

// Update this path according to the actual location of your JSON file
const CUSTOMER_DATA_URL = '/data/customers.json';

function App() {

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


  const defaultVatRate = vatRates["Switzerland"]["non-food"]; 
  const [purchaseAmount, setPurchaseAmount] = useState('0.00');
  const [deliveryPercent, setDeliveryPercent] = useState('0.00');
  const [kickbacksPercent, setKickbacksPercent] = useState('0.00');
  const [marginPercent, setMarginPercent] = useState('0.00');
  const [vatRate, setVatRate] = useState(defaultVatRate);
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
    <div className="app-container">
      <h2>B2B Calculator</h2>

      <CustomerSelector
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredCustomers={filteredCustomers}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
      />

      <PricingTable
        purchaseAmount={purchaseAmount}
        setPurchaseAmount={setPurchaseAmount}
        deliveryPercent={deliveryPercent}
        setDeliveryPercent={setDeliveryPercent}
        kickbacksPercent={kickbacksPercent}
        setKickbacksPercent={setKickbacksPercent}
        marginPercent={marginPercent}
        setMarginPercent={setMarginPercent}
        vatRate={vatRate}
        setVatRate={setVatRate}
        vatRates={vatRates}
        deliveryAmount={deliveryAmount}
        kickbacksAmount={kickbacksAmount}
        minimumSellingPrice={minimumSellingPrice}
        marginAmount={marginAmount}
        sellingPriceExclVat={sellingPriceExclVat}
        vatAmount={vatAmount}
        sellingPriceInclVat={sellingPriceInclVat}
      />

      <ScreenshotButton takeScreenshot={takeScreenshot} />
    </div>
  );
}

export default App;

