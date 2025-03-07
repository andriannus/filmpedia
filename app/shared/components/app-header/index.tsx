'use client';

import cc from 'classcat';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import AppSearch from '@/app/shared/components/app-search';
import { useGenreMovie } from '@/app/shared/hooks/use-genre-movie';

import './styles.scss';

function AppHeader() {
  const { genreOptions } = useGenreMovie();

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
          <li className="nav__item dropdown">
            <Image src="/icons/grid.svg" alt="Icon" height={20} width={20} />
            <span>Categories</span>

            {genreOptions.length > 0 && (
              <ul className="dropdown__menu">
                {genreOptions.map((option) => {
                  return (
                    <li key={option.value} className="dropdown__item">
                      <Link
                        className="dropdown__link"
                        href={{
                          pathname: '/movie',
                          query: { genre: option.value },
                        }}
                      >
                        {option.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>

          <li className="nav__item">
            <Link className="nav__link" href="/movie">
              Movies
            </Link>
          </li>

          <li className="nav__item">
            <Link className="nav__link" href="/movie">
              TV Shows
            </Link>
          </li>

          <li className="nav__item">
            <Link className="nav__link" href="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default AppHeader;
