import { useState, useEffect } from 'react';

const CustomerNameSelector = ({customers, customerName,setCustomerName,setCustomerID}) => {
    const [filteredCustomers, setFilteredCustomers] = useState([]);

    useEffect(() => {
        if (customerName) {
          const filtered = customers.filter(customer =>
            customer.companyName.toLowerCase().includes(customerName.toLowerCase())
          );
          setFilteredCustomers(filtered);
    
          const exactMatch = customers.find(customer => customer.companyName.toLowerCase() === customerName.toLowerCase());
          if (exactMatch) {
            setCustomerID(exactMatch.customerID);
          }
        } else {
          setFilteredCustomers(customers);
          setCustomerID("");
        }
    }, [customerName, customers]);

    const handleCustomerNameChange = (event) => {
        setCustomerName(event.target.value);
    };

    const handleCustomerSelect = (customer) => {
        setCustomerName(customer.companyName);
        setCustomerID(customer.customerID);
    };

    return (
        <>
            <input
                type="text"
                value={customerName}
                onChange={handleCustomerNameChange}
                placeholder="Type to search..."
                list="customer-names"
            />
            <datalist id="customer-names">
                {filteredCustomers.map((customer) => (
                    <option
                        key={customer.customerID}
                        value={customer.companyName}
                        onClick={() => handleCustomerSelect(customer)}
                    >
                        {customer.companyName}
                    </option>
                ))}
            </datalist>
        </>
    )
}

export default CustomerNameSelector