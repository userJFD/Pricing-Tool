import { useState, useEffect } from 'react';
import '../styles/TableStyling.css';
import ProductDescription from './ProductDescription';
import BrandSelector from './BrandSelector';
import ProductTypeSelector from './ProductTypeSelector';
import CategorySelector from './CategorySelector';
import SupplierSelector from './SupplierSelector.jsx';
import UnitsInput from './UnitsSelector.jsx';
import Select from 'react-select';
import swissflag from '../../public/images/switzerland.png';
import germanyflag from '../../public/images/germany.png';

const CUSTOMER_DATA_URL = '/data/customers.json';
const PRODUCT_DATA_URL = '/data/products.json';

// Dummy VAT rates for demonstration; replace with actual data
const VAT_RATES = {
  "Switzerland": {
    "food": 2.5,
    "non-food": 8.1
  },
  "Germany": {
    "food": 7,
    "non-food": 19
  }
};

function MultiTable() {
  const defaultVatRate = VAT_RATES["Switzerland"]["non-food"];

  const [customers, setCustomers] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [dealRange, setDealRange] = useState("");
  const [products, setProducts] = useState([]);
  const [productType, setProductType] = useState("");
  const [category, setCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [supplierDescription, setSupplierDescription] = useState("");
  const [units, setUnits] = useState(0);


  const [purchaseAmount, setPurchaseAmount] = useState('0.00');
  const [deliveryAmount, setDeliveryAmount] = useState('0.00');
  const [kickbacksPercent, setKickbacksPercent] = useState('0.00');
  const [vatRate, setVatRate] = useState(defaultVatRate);
  const [marginPercent, setMarginPercent] = useState('0.00');


  const purchaseAmountNumber = parseFloat(purchaseAmount) || 0;
  const deliveryAmountNumber = parseFloat(deliveryAmount) || 0;
  const kickbacksPercentNumber = parseFloat(kickbacksPercent) || 0;
  const vatPercentNumber = vatRate ? parseFloat(vatRate) : 0;
  const marginPercentNumber = parseFloat(marginPercent) || 0;
  
  const kickbacksAmount = (purchaseAmountNumber * kickbacksPercentNumber) / 100;
  const minimumSellingPrice = (purchaseAmountNumber + deliveryAmountNumber) - kickbacksAmount;
  const marginAmount = (minimumSellingPrice * marginPercentNumber) / (100 - marginPercentNumber);
  const sellingPriceExclVat = minimumSellingPrice + marginAmount;
  const vatAmount = (sellingPriceExclVat * vatPercentNumber) / 100;
  const sellingPriceInclVat = sellingPriceExclVat + vatAmount;

  // Generate options array based on VAT_RATES and flag URLs
  const flagUrls = {
    "Switzerland": swissflag,
    "Germany": germanyflag,
  };

  const options = Object.keys(VAT_RATES).flatMap(country => {
    return Object.keys(VAT_RATES[country]).map(category => ({
      value: VAT_RATES[country][category],
      label: `${category === 'food' ? 'Food' : 'Non-Food'} (${VAT_RATES[country][category]}%)`,
      flag: flagUrls[country]
    }));
  });

  // Custom component for rendering selected item
  const customSingleValue = ({ data }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={data.flag} alt={data.label} style={{ width: '20px', height: '15px', marginRight: '8px' }} />
      {data.label}
    </div>
  );

  // Custom component for rendering options
  const customOption = (props) => (
    <div {...props.innerProps} style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
      <img src={props.data.flag} alt={props.data.label} style={{ width: '20px', height: '15px', marginRight: '8px' }} />
      {props.data.label}
    </div>
  );

  // Handle change event for VAT rate
  const handleVatRateChange = (selectedOption) => {
    setVatRate(selectedOption.value);
  };

  // Calculate Margin per Unit 
  const calculateMarginPerUnit = () => {
    if (purchaseAmount > 0 && marginPercent >= 0) {
      return (purchaseAmount * marginPercent) / 100;
    }
    return 0;
  }; 

  const handleChange = (selectedOption) => {
    setVatRate(selectedOption.value); // Set the VAT rate directly
  };
  
  // Fetch customer data from API
  useEffect(() => {
    fetch(CUSTOMER_DATA_URL)
      .then(response => response.json())
      .then(data => {
        setCustomers(data);
      })
      .catch(error => console.error('Error fetching customer data:', error));
  }, []);

  // Fetch product data from API
  useEffect(() => {
    fetch(PRODUCT_DATA_URL)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => console.error('Error fetching product data:', error));
  }, []);

  return (
    <div className="table-wrapper">
      <table className="fl-tabletwo">
        <thead>
          <tr>
            <th>Product Description</th>
            <th>Brand</th>
            <th>PT</th>
            <th>CAT</th>
            <th>Supplier</th>
            <th className="numberCol">Units</th>
            <th className="numberCol">EK <p className='thSubtitle'>(excl.VAT)</p> </th>
            <th className="numberCol">Delivery<br/> Surcharge</th>
            <th className="numberCol">Kickbacks <p className='thSubtitle'>in %</p></th>
            <th className="vatCol">VAT <p className='thSubtitle'> in %</p></th>
            <th>Recommended <br/> Margin</th>
            <th className="numberCol">Margin <p className='thSubtitle'>in %</p></th>
            <th>Margin <p className='thSubtitle'> per Unit</p></th>
            <th>VK <p className='thSubtitle'>(excl.VAT)</p></th>
            <th>VK <p className='thSubtitle'>(incl.VAT)</p></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ProductDescription
                description={productDescription}
                onDescriptionChange={setProductDescription}
              />
            </td>
            <td>
              <BrandSelector />
            </td>
            <td>
              <ProductTypeSelector
                products={products}
                productType={productType}
                setProductType={setProductType}
                setCategory={setCategory}
              />
            </td>
            <td>
              <CategorySelector category={category} />
            </td>
            <td>
              <SupplierSelector
                description={supplierDescription}
                onDescriptionChange={setSupplierDescription}
              />
            </td>
            <td>
              <UnitsInput
                units={units}
                onUnitsChange={setUnits}
              />
            </td>
            <td>
              <input
                className="numberCol"
                type="number"
                step="0.01"
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(parseFloat(e.target.value) || 0)}
                placeholder="Enter purchase amount"
              />
            </td>
            <td>
              <input
                className="numberCol"
                type="number"
                step="0.01"
                value={deliveryAmount}
                onChange={(e) => {
                  setDeliveryAmount(e.target.value);
                }}
              />
            </td>
            <td>
              <input
                className="numberCol"
                type="number"
                step="0.01"
                value={kickbacksPercent}
                onChange={(e) => setKickbacksPercent(e.target.value)}
              />
            </td>
            <td>
              <Select
                className="vatCol"
                value={options.find(option => option.value === vatRate)}
                onChange={handleChange}
                options={options}
                getOptionLabel={(option) => (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={option.flag} alt={option.label} style={{ width: '20px', height: '15px', marginRight: '8px' }} />
                    {option.label}
                  </div>
                )}
                components={{ SingleValue: customSingleValue, Option: customOption }}
              />
            </td>
            <td>
              <p>soon i will be good</p>
            </td>
            <td>
              <input
                className="numberCol"
                type="number"
                step="0.01"
                value={marginPercent}
                onChange={(e) => setMarginPercent(e.target.value)}
              />
            </td>
            <td>
              {calculateMarginPerUnit().toFixed(2)}
            </td>
            <td>{sellingPriceExclVat.toFixed(2)}</td>
            <td className='sellingpricetotal'>{sellingPriceInclVat.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MultiTable;


/* <td>
<Select
  value={options.find(option => option.value === vatRate)}
  onChange={handleVatRateChange}
  options={options}
  getOptionLabel={(option) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={option.flag} alt={option.label} style={{ width: '20px', height: '15px', marginRight: '8px' }} />
      {option.label}
    </div>
  )}
  components={{ SingleValue: customSingleValue, Option: customOption }}
/>
</td> */


/* <td>
              <input
                type="number"
                step="0.01"
                value={marginPercent}
                onChange={(e) => setMarginPercent(parseFloat(e.target.value) || 0)}
              />
            </td> */