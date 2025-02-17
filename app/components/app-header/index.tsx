'use client';

import Image from 'next/image';
import Link from 'next/link';

import AppSearch from '@/app/components/app-search';

import './styles.scss';

function AppHeader() {
  return (
    <nav className="navbar">
      <div className="navbar__layout">
        <Link className="navbar__brand" href="/movie">
          <Image src="/images/logo.webp" alt="Logo" height={62} width={225} />
        </Link>

        <AppSearch />

        <ul className="nav">
          <li className="nav__link">
            <Image src="/icons/movie.svg" alt="Icon" height={20} width={20} />
            <span>Categories</span>
          </li>

          <li className="nav__link">Movies</li>
          <li className="nav__link">TV Shows</li>
          <li className="nav__link">Login</li>
        </ul>
      </div>
    </nav>
  );
}

export default AppHeader;
