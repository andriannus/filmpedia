"use client";

import Image from 'next/image';

import './styles.scss';

function AppSearch() {
  return (
    <>
      <div className="search">
        <Image src="/icons/movie.svg" alt="Icon" height={20} width={20} />

        <input
          className="search__input"
          placeholder="Find movie"
          type="text"
        />

        <Image src="/icons/search.svg" alt="Icon" height={20} width={20} />
      </div>

      <button className="search__button">
        <Image src="/icons/search.svg" alt="Icon" height={20} width={20} />
      </button>
    </>
  );
}

export default AppSearch;
