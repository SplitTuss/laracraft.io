'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/header';
import { SearchBar } from '@/components/searchBar';
import DiamondArtComponent from '@/components/diamondArtComponent';

export type ProductData = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  notes: string;
};

export default function DiamondArt() {
  const [searchInput, setSearchInput] = useState('');
  const [products, setProducts] = useState<Array<ProductData>>([]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchInput.toLowerCase()),
  );

  const handleLoadProducts = async () => {
    const result = await fetch('/api/diamondArt');

    if (!result.ok) {
      console.log('products not ok');
      return;
    }

    const data = await result.json();
    setProducts(data);
  };

  useEffect(() => {
    handleLoadProducts();
  }, []);

  return (
    <>
      <Header />
      <div className="m-4">
        <SearchBar onSearchChange={setSearchInput} />
      </div>
      <div className="flex justify-center">
        <ul className="grid sm:grid-cols-3 grid-cols-2 m-2">
          {filteredProducts.map((product) => (
            <DiamondArtComponent
              key={product.id}
              productId={product.id}
              imageUrl={product.imageUrl}
              title={product.title}
              description={product.description}
              notes={product.notes}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
