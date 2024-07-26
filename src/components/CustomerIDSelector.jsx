import { useEffect } from 'react';

const CustomerIDSelector = ({customers, customerID, setCustomerID, setCustomerName}) => {

    //need to pass customer name
    useEffect(() => {
        if (customerID) {
          const customer = customers.find(customer => customer.customerID === customerID);
          if (customer) {
            setCustomerName(customer.companyName);
          }
        } else {
          setCustomerName("");
        }
    }, [customerID, customers]);

    const handleCustomerIDChange = (event) => {
        setCustomerID(event.target.value);
    };

    return (
        <>
            <input
                type="text"
                value={customerID}
                onChange={handleCustomerIDChange}
                placeholder="Type to search..."
            />
        </>
    )
}

export default CustomerIDSelector
