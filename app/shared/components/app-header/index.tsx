'use client';

import cc from 'classcat';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import AppSearch from '@/app/shared/components/app-search';

import './styles.scss';

type AppHeaderProps = {
  transparent?: boolean;
};

function AppHeader({ transparent }: AppHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <nav
      className={cc([
        'navbar',
        {
          'navbar--transparent': transparent,
          'navbar--active': scrolled,
        },
      ])}
    >
      <div className="navbar__layout">
        <Link className="navbar__brand" href="/movie">
          <Image
            src="/images/logo.webp"
            alt="Logo"
            height={62}
            width={225}
            priority
          />
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
