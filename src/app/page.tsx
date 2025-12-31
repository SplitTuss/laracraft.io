'use client';

import { useState } from 'react';
import Header from '../components/header';
import { SearchBar } from '../components/searchBar';
import ProductCard from '@/components/productCard';
import { PRODUCTS } from '@/components/products';

export default function Home() {
  const [searchInput, setSearchInput] = useState('');

  const filteredProducts = PRODUCTS.filter((product) =>
    product.title.toLowerCase().includes(searchInput.toLowerCase()),
  );

  return (
    <>
      <Header />
      <div className="mt-2">
        <SearchBar onSearchChange={setSearchInput} />
      </div>
      <ul className="grid sm:grid-cols-5 grid-cols-2 m-2">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.title}
            imageUrl={product.imageUrl}
            imageAlt={product.imageAlt}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </>
  );
}
