import React, { useState, useEffect } from 'react';

function ProductTypeSelector({ products, productType, setProductType, setCategory }) {
  const [filteredProducts, setFilteredProducts] = useState([]);

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

  const handleProductTypeChange = (event) => {
    setProductType(event.target.value);
  };

  const handleProductTypeSelect = (product) => {
    setProductType(product.productType);
    setCategory(product.category);
  };

  return (
    <>
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
    </>
  );
}

export default ProductTypeSelector;