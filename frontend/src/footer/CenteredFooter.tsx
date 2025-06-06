import Link from 'next/link';
import type { ReactNode } from 'react';

import { FooterCopyright } from './FooterCopyright';
import { FooterIconList } from './FooterIconList';

type ICenteredFooterProps = {
  logo: ReactNode;
  iconList: ReactNode;
  children: ReactNode;
};

const CenteredFooter = (props: ICenteredFooterProps) => (
  <div className="text-center">
    {props.logo}

    <nav>
      <ul className="navbar mt-5 flex flex-row justify-center text-xl font-medium text-gray-800">
        {props.children}
      </ul>
    </nav>

    <div className="mt-8 flex justify-center">
      <FooterIconList>{props.iconList}</FooterIconList>
    </div>

    <div className="mt-8 flex items-center justify-center space-x-4 text-sm">
      <FooterCopyright />
      <img
        src="https://dostapp.s3.eu-north-1.amazonaws.com/visa-mastercard.png"
        alt="VisaMastercard"
        className="h-16"
      />
    </div>

    <div className="mt-5 text-sm">
      <ul className="flex justify-center space-x-4">
        <li>
          <Link
            href="/public-offer"
            className="text-blue-600 hover:text-blue-800"
          >
            Публичная оферта
          </Link>
        </li>
        <li>
          <Link
            href="/privacy-policy"
            className="text-blue-600 hover:text-blue-800"
          >
            Политика конфиденциальности
          </Link>
        </li>
        <li>
          <Link
            href="/contact-us"
            className="text-blue-600 hover:text-blue-800"
          >
            Свяжитесь с нами
          </Link>
        </li>
      </ul>
    </div>

    <style jsx>
      {`
        .navbar :global(li) {
          @apply mx-4;
        }
      `}
    </style>
  </div>
);

export { CenteredFooter };
