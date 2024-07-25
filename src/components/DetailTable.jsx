import { useState, useEffect } from 'react';
import '../styles/CustomerSelector.css';
import CustomerNameSelector from './CustomerNameSelector';
import CustomerIDSelector from './CustomerIDSelector';

// Update these paths according to the actual location of your JSON files
const CUSTOMER_DATA_URL = '/data/customers.json';
const BRAND_DATA_URL = '/data/brands.json';
const PRODUCT_DATA_URL = '/data/products.json';

function DetailTable() {
  const [customers, setCustomers] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [brands, setBrands] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [productType, setProductType] = useState("");
  const [category, setCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [dealRange, setDealRange] = useState("");

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

  // Fetch customer data from API
  useEffect(() => {
    fetch(CUSTOMER_DATA_URL)
      .then(response => response.json())
      .then(data => {
        setCustomers(data);
      })
      .catch(error => console.error('Error fetching customer data:', error));
  }, []);

  // Fetch brand data from API
  useEffect(() => {
    fetch(BRAND_DATA_URL)
      .then(response => response.json())
      .then(data => {
        setBrands(data);
      })
      .catch(error => console.error('Error fetching brand data:', error));
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

  useEffect(() => {
    if (brandName) {
      const filtered = brands.filter(brand =>
        brand.manufacturer.toLowerCase().includes(brandName.toLowerCase())
      );
      setFilteredBrands(filtered);
    } else {
      setFilteredBrands(brands);
    }
  }, [brandName, brands]);

  useEffect(() => {
    if (productType) {
      const filtered = products.filter(product =>
        product.productType.toLowerCase().includes(productType.toLowerCase())
      );
      setFilteredProducts(filtered);

      const exactMatch = products.find(product => product.productType.toLowerCase() === productType.toLowerCase());
      if (exactMatch) {
        setCategory(exactMatch.category);
      } else {
        setCategory("");
      }
    } else {
      setFilteredProducts(products);
      setCategory("");
    }
  }, [productType, products]);

  const handleBrandNameChange = (event) => {
    setBrandName(event.target.value);
  };

  const handleProductTypeChange = (event) => {
    setProductType(event.target.value);
  };

  const handleDealRangeChange = (event) => {
    setDealRange(event.target.value);
  };

  const handleBrandSelect = (brand) => {
    setBrandName(brand.manufacturer);
  };

  const handleProductTypeSelect = (product) => {
    setProductType(product.productType);
    setCategory(product.category);
  };

  return (
    <div className="table-wrapper">
      <table className="fl-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Customer ID</th>
            <th>Brand</th>
            <th>Product Type</th>
            <th>Category</th>
            <th>Deal Range</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <CustomerNameSelector 
                customers={customers}
                customerName={customerName}
                setCustomerName={setCustomerName}
                setCustomerID={setCustomerID}
              />
            </td>
            <td>
              <CustomerIDSelector
                customers={customers}
                customerID={customerID}
                setCustomerID={setCustomerID}
                setCustomerName={setCustomerName}
              />
            </td>
            <td>
              <input
                type="text"
                value={brandName}
                onChange={handleBrandNameChange}
                placeholder="Type to search..."
                list="brand-names"
              />
              <datalist id="brand-names">
                {filteredBrands.map((brand) => (
                  <option
                    key={brand.manufacturer}
                    value={brand.manufacturer}
                    onClick={() => handleBrandSelect(brand)}
                  >
                    {brand.manufacturer}
                  </option>
                ))}
              </datalist>
            </td>
            <td>
              <input
                type="text"
                value={productType}
                onChange={handleProductTypeChange}
                placeholder="Type to search..."
                list="product-types"
              />
              <datalist id="product-types">
                {filteredProducts.map((product) => (
                  <option
                    key={product.productType}
                    value={product.productType}
                    onClick={() => handleProductTypeSelect(product)}
                  >
                    {product.productType}
                  </option>
                ))}
              </datalist>
            </td>
            <td>
              <input className="category"
                type="text"
                value={category}
                placeholder="Category"
                readOnly
              />
            </td>
            <td>
              <select className="select" value={dealRange} onChange={handleDealRangeChange}>
                <option value=""></option>
                {dealRanges.map((range, index) => (
                  <option key={index} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DetailTable;


