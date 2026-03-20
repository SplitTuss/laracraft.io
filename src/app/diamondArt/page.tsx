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

  const filteredDiamondArt = products.filter((diamondArt) =>
    diamondArt.title.toLowerCase().includes(searchInput.toLowerCase()),
  );

  const handleLoadDiamondArt = async () => {
    const result = await fetch('/api/diamondArt');

    if (!result.ok) {
      console.log('products not ok');
      return;
    }

    const data = await result.json();
    setProducts(data);
  };

  useEffect(() => {
    handleLoadDiamondArt();
  }, []);

  return (
    <>
      <Header />
      <div className="m-4">
        <SearchBar onSearchChange={setSearchInput} />
      </div>
      <div className="flex justify-center text-primary/70">
        These items are not for sale. I am only showcasing some of my finished projects.
      </div>
      <div className="flex justify-center">
        <ul className="m-2">
          {filteredDiamondArt.map((diamondArt) => (
            <DiamondArtComponent
              key={diamondArt.id}
              imageUrl={diamondArt.imageUrl}
              title={diamondArt.title}
              description={diamondArt.description}
              notes={diamondArt.notes}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
