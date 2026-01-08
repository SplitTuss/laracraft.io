'use client';

import { useEffect, useState } from 'react';
import Header from '../components/header';
import { SearchBar } from '../components/searchBar';
import ProductCard from '@/components/productCard';

export type ProductData = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  description: string;
};

export default function Home() {
  const [searchInput, setSearchInput] = useState('');
  const [products, setProducts] = useState<Array<ProductData>>([]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchInput.toLowerCase()),
  );

  const handleLoadProducts = async () => {
    const result = await fetch('/api/products');

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
      <ul className="grid sm:grid-cols-5 grid-cols-2 m-2">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            productId={product.id}
            imageUrl={product.imageUrl}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </>
  );
}
