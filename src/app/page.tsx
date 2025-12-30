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
      <ul className="grid grid-cols-5">
        <ProductCard
          image={{
            imageSource:
              'https://s3.us-east-1.amazonaws.com/laracraft.io/crochetItems/DogPillow2.jpg',
            alt: 'Dog Pillow',
          }}
          price={25}
          title="Dog Pillow"
          description="crochet dog pillow made with chenille yarn"
        />

        <ProductCard
          image={{
            imageSource:
              'https://s3.us-east-1.amazonaws.com/laracraft.io/crochetItems/GreenPotato.jpg',
            alt: 'Green Potato',
          }}
          price={25}
          title="Green Potato"
          description="crochet potato made with chenille yarn"
        />

        <ProductCard
          image={{
            imageSource:
              'https://s3.us-east-1.amazonaws.com/laracraft.io/crochetItems/YellowPotato.jpg ',
            alt: 'Yellow Potato',
          }}
          price={25}
          title="Yellow Potato"
          description="crochet potato made with chenille yarn"
        />

        <ProductCard
          image={{
            imageSource: 'https://s3.us-east-1.amazonaws.com/laracraft.io/crochetItems/Heart.jpg',
            alt: 'Heart',
          }}
          price={25}
          title="Heart"
          description="crochet heart made with chenille yarn"
        />

        <ProductCard
          image={{
            imageSource:
              'https://s3.us-east-1.amazonaws.com/laracraft.io/crochetItems/PinkBunny.jpg',
            alt: 'Pink Bunny',
          }}
          price={25}
          title="Pink Bunny"
          description="crochet bunny made with chenille yarn"
        />

        <ProductCard
          image={{
            imageSource:
              'https://s3.us-east-1.amazonaws.com/laracraft.io/crochetItems/PinkSeal.jpg',
            alt: 'Pink Seal',
          }}
          price={25}
          title="Pink Seal"
          description="crochet seal made with chenille yarn"
        />

        <ProductCard
          image={{
            imageSource:
              'https://s3.us-east-1.amazonaws.com/laracraft.io/crochetItems/SmallPinkBunny.jpg',
            alt: 'Small Pink Bunny',
          }}
          price={25}
          title="Small Pink Bunny"
          description="crochet bunny"
        />

        <ProductCard
          image={{
            imageSource: 'https://s3.us-east-1.amazonaws.com/laracraft.io/crochetItems/TinyHat.jpg',
            alt: 'Tiny Hat',
          }}
          price={25}
          title="Tiny Hat"
          description="crochet hat with faux fur brim"
        />

        <ProductCard
          image={{
            imageSource:
              'https://s3.us-east-1.amazonaws.com/laracraft.io/crochetItems/YellowBunny.jpg',
            alt: 'Yellow Bunny',
          }}
          price={25}
          title="Yellow Bunny"
          description="crochet bunny made with chenille yarn"
        />
      </ul>
    </>
  );
}
