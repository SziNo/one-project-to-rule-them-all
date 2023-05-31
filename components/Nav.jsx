'use client';

import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { navLinks } from '@utils/constants';

const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setNewProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setNewProviders();
  }, []);

  return (
    <nav className="flex flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/gimli-cartoon.png"
          alt="Gimli Logo"
          width={60}
          height={60}
          className="object-contain"
        />
        <p className="logo_text">The One</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden gap-2">
        {navLinks.map((item, idx) => (
          <Link key={idx} href={item.href} className="black_btn">
            {item.title}
          </Link>
        ))}

        {isUserLoggedIn ? (
          <div className="flex gap-2">
            <Link href="/favorites" className="black_btn">
              Favorites
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
    </nav>
  );
};

export default Nav;
