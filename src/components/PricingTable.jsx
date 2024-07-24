import React from 'react';
import '../styles/PricingTable.css';
import Select from 'react-select';
import swissflag from '../../public/images/switzerland.png';
import germanyflag from '../../public/images/germany.png';

function PricingTable({
  purchaseAmount,
  setPurchaseAmount,
  deliveryPercent,
  setDeliveryPercent,
  kickbacksPercent,
  setKickbacksPercent,
  marginPercent,
  setMarginPercent,
  vatRate,
  setVatRate,
  vatRates,
  deliveryAmount,
  kickbacksAmount,
  minimumSellingPrice,
  marginAmount,
  sellingPriceExclVat,
  vatAmount,
  sellingPriceInclVat
}) {

  const flagUrls  = {
    "Switzerland": swissflag,
    "Germany": germanyflag,
  };

  // Generate options array based on vatRates and flagUrls
  const options = Object.keys(vatRates).flatMap(country => {
    return Object.keys(vatRates[country]).map(category => ({
      value: vatRates[country][category], // Use the VAT rate directly as value
      label: `${category === 'food' ? 'Food' : 'Non-Food'} (${vatRates[country][category]}%)`,
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

  // Handle change event
  const handleChange = (selectedOption) => {
    setVatRate(selectedOption.value); // Set the VAT rate directly
  };

  return (
    <div className="table-wrapper">
      <table className="fl-table">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>%</th>
            <th>Amount in CHF/EUR</th>
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
          <tr className='rowTotal'>
            <td>=</td>
            <td>Minimum selling price (excl. VAT)</td>
            <td></td>
            <td>{minimumSellingPrice.toFixed(2)}</td>
          </tr>
          <tr>
            <td>+</td>
            <td>Margin</td>
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
          <tr className='rowTotal'>
            <td>=</td>
            <td>Selling price (excl. VAT)</td>
            <td></td>
            <td>{sellingPriceExclVat.toFixed(2)}</td>
          </tr>
          <tr>
            <td>+</td>
            <td>VAT</td>
            <td>
            <Select
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
            <td>{vatAmount.toFixed(2)}</td>
          </tr>
          <tr className='rowTotal'>
            <td>=</td>
            <td>Selling price (incl. VAT)</td>
            <td></td>
            <td className='sellingpricetotal'>{sellingPriceInclVat.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PricingTable;