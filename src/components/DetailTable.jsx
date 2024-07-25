import React, { useState, useEffect } from 'react';
import '../styles/DetailSelector.css';
import CustomerNameSelector from './CustomerNameSelector';
import CustomerIDSelector from './CustomerIDSelector';
import BrandSelector from './BrandSelector';
import DealRangeSelector from './DealRangeSelector';
import ProductTypeSelector from './ProductTypeSelector';
import CategorySelector from './CategorySelector';

const CUSTOMER_DATA_URL = '/data/customers.json';
const PRODUCT_DATA_URL = '/data/products.json';

function DetailTable() {
  const [customers, setCustomers] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [products, setProducts] = useState([]);
  const [productType, setProductType] = useState("");
  const [category, setCategory] = useState("");
  const [dealRange, setDealRange] = useState("");

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

  const handleDealRangeChange = (event) => {
    setDealRange(event.target.value);
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
              <DealRangeSelector
                dealRange={dealRange}
                onDealRangeChange={handleDealRangeChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DetailTable;




