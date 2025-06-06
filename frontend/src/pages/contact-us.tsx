import Link from 'next/link';
import React, { useEffect } from 'react';

import { Footer } from '@/component/Footer';

const COMPANY_EMAIL = 'bravomediagroup13@gmail.com';
const COMPANY_PHONE_RAW = '+7 (706) 639-50-62';
const COMPANY_PHONE_LINK = '77066395062';
const PUBLIC_OFFER_URL = 'https://dostapp.org/public-offer';
const COMPANY_NAME = 'ИП "Dostapp"';
const JURIDICAL_ADDRESS = 'г. Атырау, ул. Жарбосынова 71';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isPrimary?: boolean;
  isExternal?: boolean;
}

const NavLinkComponent: React.FC<NavLinkProps> = ({
  href,
  children,
  isPrimary = false,
  isExternal = false,
}) => {
  const primaryClasses =
    'text-blue-600 hover:text-blue-700 border border-blue-600';
  const defaultClasses = 'text-gray-600 hover:text-blue-600';
  const commonClasses =
    'px-3 py-2 rounded-md text-sm font-medium transition-colors';

  if (isExternal) {
    return (
      <a
        href={href}
        className={`${commonClasses} ${isPrimary ? primaryClasses : defaultClasses}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} legacyBehavior>
      <a
        className={`${commonClasses} ${isPrimary ? primaryClasses : defaultClasses}`}
      >
        {children}
      </a>
    </Link>
  );
};

const ContactUs: React.FC = () => {
  useEffect(() => {
    document.documentElement.lang = 'ru';
  }, []);

  return (
    <div className="font-inter flex min-h-screen flex-col bg-gray-100 text-gray-800">
      {' '}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="container mx-auto p-4 sm:px-6">
          <div className="flex items-center justify-between">
            <Link href="/" legacyBehavior>
              <a className="text-2xl font-bold text-blue-600">Dostapp</a>
            </Link>
            <div className="space-x-1 sm:space-x-2">
              <NavLinkComponent href="/">Главная</NavLinkComponent>
              <NavLinkComponent href={PUBLIC_OFFER_URL} isExternal={true}>
                Публичная оферта
              </NavLinkComponent>
              {/* Assuming a /contact route */}
            </div>
          </div>
        </nav>
      </header>
      {/* Main Content Area */}
      <main className="container mx-auto grow px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow-lg sm:p-8">
          <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            Свяжитесь с нами
          </h1>

          <p className="mb-10 text-center text-gray-600">
            Мы будем рады услышать вас! Если у вас есть вопрос о наших услугах,
            нужна помощь или вы просто хотите оставить отзыв, пожалуйста,
            свяжитесь с нами.
          </p>

          {/* Contact Information Section */}
          <div className="space-y-6">
            {/* Our Information Card */}
            <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
              <h2 className="mb-4 text-center text-xl font-semibold text-gray-800 sm:text-left">
                Наша информация
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong className="font-medium text-gray-900">
                    Название компании:
                  </strong>
                  <span className="ml-1">{COMPANY_NAME}</span>
                </p>
                <p>
                  <strong className="font-medium text-gray-900">
                    Электронная почта:
                  </strong>
                  <a
                    href={`mailto:${COMPANY_EMAIL}`}
                    className="ml-1 break-all text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    {COMPANY_EMAIL}
                  </a>
                </p>
                <p>
                  <strong className="font-medium text-gray-900">
                    Телефон (Whatsapp):
                  </strong>
                  <a
                    href={`https://wa.me/${COMPANY_PHONE_LINK}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    {COMPANY_PHONE_RAW}
                  </a>
                </p>
                <p>
                  <strong className="font-medium text-gray-900">
                    Юридический адрес:
                  </strong>
                  <span className="ml-1">{JURIDICAL_ADDRESS}</span>
                </p>
                <p>
                  <strong className="font-medium text-gray-900">
                    Публичная оферта:
                  </strong>
                  <a
                    href={PUBLIC_OFFER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Ознакомиться с Публичной офертой
                  </a>
                </p>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
              <h2 className="mb-3 text-center text-xl font-semibold text-gray-800 sm:text-left">
                Часы работы
              </h2>
              <p className="text-center text-gray-700 sm:text-left">
                Понедельник - Пятница: 9:00 - 18:00
                <br />
                Суббота - Воскресенье: Выходной
              </p>
              <p className="mt-2 text-center text-sm text-gray-500 sm:text-left">
                Обратите внимание, что время ответа может отличаться в нерабочее
                время.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
