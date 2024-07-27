import React from 'react'
import { useState, useEffect } from 'react';
import '../../App.css'
import DetailTable from '../DetailTable';
import PricingTable from '../PricingTable';
import ScreenshotButton from '../ScreenshotButton';

const SingleCalculator = () => {
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
      const [deliveryAmount, setDeliveryAmount] = useState('0.00');
      const [recentlyChanged, setRecentlyChanged] = useState(null);
      const [kickbacksPercent, setKickbacksPercent] = useState('0.00');
      const [marginPercent, setMarginPercent] = useState('0.00');
      const [vatRate, setVatRate] = useState(defaultVatRate);
    
      const purchaseAmountNumber = parseFloat(purchaseAmount) || 0;
      const deliveryPercentNumber = parseFloat(deliveryPercent) || 0;
      const deliveryAmountNumber = parseFloat(deliveryAmount) || 0;
      const kickbacksPercentNumber = parseFloat(kickbacksPercent) || 0;
      const marginPercentNumber = parseFloat(marginPercent) || 0;
      const vatPercentNumber = vatRate ? parseFloat(vatRate) : 0;
    
      useEffect(() => {
        if (recentlyChanged === 'percent') {
          const newDeliveryAmount = (purchaseAmountNumber * deliveryPercentNumber) / 100;
          setDeliveryAmount(newDeliveryAmount.toFixed(2));
        }
      }, [deliveryPercent, purchaseAmountNumber]);
    
      useEffect(() => {
        if (recentlyChanged === 'amount') {
          const newDeliveryPercent = (parseFloat(deliveryAmountNumber) * 100) / purchaseAmountNumber;
          setDeliveryPercent(newDeliveryPercent.toFixed(2));
        }
      }, [deliveryAmountNumber, purchaseAmountNumber]);
    
    
      const kickbacksAmount = (purchaseAmountNumber * kickbacksPercentNumber) / 100;
      const minimumSellingPrice = (purchaseAmountNumber + deliveryAmountNumber) - kickbacksAmount;
      const marginAmount = (minimumSellingPrice * marginPercentNumber) / (100 - marginPercentNumber);
      const sellingPriceExclVat = minimumSellingPrice + marginAmount;
      const vatAmount = (sellingPriceExclVat * vatPercentNumber) / 100;
      const sellingPriceInclVat = sellingPriceExclVat + vatAmount;
    
      return (
        <div className="app-container">
          <h2>B2B Calculator</h2>
    
          <DetailTable/>
    
          <PricingTable
            purchaseAmount={purchaseAmount}
            setPurchaseAmount={setPurchaseAmount}
            deliveryPercent={deliveryPercent}
            setDeliveryPercent={setDeliveryPercent}
            deliveryAmount={deliveryAmount}
            setDeliveryAmount={setDeliveryAmount}
            setRecentlyChanged={setRecentlyChanged}
            kickbacksPercent={kickbacksPercent}
            setKickbacksPercent={setKickbacksPercent}
            marginPercent={marginPercent}
            setMarginPercent={setMarginPercent}
            vatRate={vatRate}
            setVatRate={setVatRate}
            vatRates={vatRates}
            kickbacksAmount={kickbacksAmount}
            minimumSellingPrice={minimumSellingPrice}
            marginAmount={marginAmount}
            sellingPriceExclVat={sellingPriceExclVat}
            vatAmount={vatAmount}
            sellingPriceInclVat={sellingPriceInclVat}
          />
    
          <ScreenshotButton />
        </div>
      );
}

export default SingleCalculator