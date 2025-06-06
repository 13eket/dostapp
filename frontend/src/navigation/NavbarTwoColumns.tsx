import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Logo } from '@/component/Logo';
import { handleBookingEmbedded } from '@/utils/routing';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fixedButtonWidth = isMobile ? 'w-28' : 'w-32';

  return (
    <div className="flex h-16 flex-col items-center justify-between border-b border-black bg-[#FDF5EA] md:flex-row">
      <nav className="flex size-full items-center">
        <ul className="font-sm flex size-full flex-row items-stretch space-x-0 text-base text-black">
          <li
            className={`flex w-16 items-center justify-center border-r border-black`}
          >
            <Link
              href="https://www.instagram.com/dostapp_kz"
              className="flex h-full items-center"
            >
              <img
                src="/assets/images/instagram-logo.png"
                alt="Instagram Logo"
                className="size-5"
              />
            </Link>
          </li>
          <li className="flex grow items-center justify-center">
            <div className="transform-origin-center sm:scale-80 flex h-full scale-90 items-center sm:transform-none">
              <Link href="/" className="flex h-full items-center">
                <div className="flex h-full items-center whitespace-nowrap text-sm font-bold md:text-xl">
                  <Logo xl={!isMobile} />
                </div>
              </Link>
            </div>
          </li>
          <li
            className={`flex items-center justify-center border-x border-black bg-dostappDarkOrange ${fixedButtonWidth}`}
          >
            <button
              onClick={handleBookingEmbedded}
              className="flex h-full items-center px-4 text-sm md:text-base"
            >
              Регистрация
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export { Navbar };
