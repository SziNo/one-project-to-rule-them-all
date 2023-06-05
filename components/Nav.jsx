'use client';

import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { navLinks } from '@utils/constants';

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [isActive, setIsActive] = useState(null);

  useEffect(() => {
    const setNewProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setNewProviders();
  }, []);

  const handleMobileLogoutClick = () => {
    signOut();
    setToggleDropdown(false);
  };

  const handleIsActiveClick = (e) => {
    setIsActive(e.target.name);
  };

  return (
    <nav className="flex flex-between w-full py-2">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/gimli-cartoon.png"
          alt="Gimli Logo"
          width={60}
          height={60}
          className="object-contain"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="md:flex hidden gap-2">
        {navLinks.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className={`custom_btn ${
              isActive === item.title.toLowerCase()
                ? 'bg-white text-black'
                : 'bg-black text-white'
            }`}
            name={item.title.toLowerCase()}
            onClick={handleIsActiveClick}
          >
            {item.title}
          </Link>
        ))}

        {session?.user ? (
          <div className="flex gap-2">
            <Link
              href="/favorites"
              className={`custom_btn ${
                isActive === 'favorites'
                  ? 'bg-white text-black'
                  : 'bg-black text-white'
              }`}
              name="favorites"
              onClick={handleIsActiveClick}
            >
              Favorites
            </Link>

            <button type="button" onClick={signOut} className="black_btn">
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
      <div className="md:hidden flex relative">
        <div className="flex">
          <Image
            src={`${
              toggleDropdown
                ? '/assets/icons/close.png'
                : '/assets/icons/menu.png'
            }`}
            alt="Hamburger Menu Icon"
            width={30}
            height={30}
            className="object-contain"
            onClick={() => setToggleDropdown((prev) => !prev)}
          />
        </div>

        {toggleDropdown && (
          <div className="dropdown" onClick={() => setToggleDropdown(false)}>
            {navLinks.map((item, idx) => (
              <Link key={idx} href={item.href} className="dropdown_link">
                {item.title}
              </Link>
            ))}

            {session?.user ? (
              <>
                <Link
                  href="/favorites"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Favorites
                </Link>

                <button
                  type="button"
                  onClick={handleMobileLogoutClick}
                  className="black_btn"
                >
                  Sign Out
                </button>
              </>
            ) : (
              providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
