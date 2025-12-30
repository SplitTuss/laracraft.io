'use client';

import { useState } from 'react';
import Header from '../components/header';
import { SearchBar } from '../components/searchBar';
import ProductCard from '@/components/productCard';

export default function Home() {
  const [searchInput, setSearchInput] = useState('');

  return (
    <>
      <Header />
      <div className="mt-2">
        <SearchBar onSearchChange={setSearchInput} />
      </div>
      <ul>
        <ProductCard price={25} title="x" description="hallooooo" />

        <ProductCard price={20} title="y" description="hier" />

        <ProductCard price={15} title="z" description="sup" />
      </ul>
    </>
  );
}
