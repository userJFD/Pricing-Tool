import { useState, useEffect } from 'react';

const BRAND_DATA_URL = '/data/brands.json';

function BrandSelector() {
    const [brands, setBrands] = useState([]);
    const [brandName, setBrandName] = useState("");
    const [filteredBrands, setFilteredBrands] = useState([]);
  
    useEffect(() => {
        fetch(BRAND_DATA_URL)
        .then(response => response.json())
        .then(data => {
            setBrands(data);
        })
        .catch(error => console.error('Error fetching brand data:', error));
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

    const handleBrandSelect = (brand) => {
        setBrandName(brand.manufacturer);
    };

    const handleBrandNameChange = (event) => {
        setBrandName(event.target.value);
    };

    return (
        <>  <input
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
        </>
    )
}

export default BrandSelector;