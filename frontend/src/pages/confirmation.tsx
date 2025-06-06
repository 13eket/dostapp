import Link from 'next/link';
import React from 'react';

const Confirmation: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-md">
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Бронирование подтверждено
          </h1>

          <div className="mb-8 mt-6">
            <p className="mb-4 text-gray-600">
              Спасибо! Ваше бронирование успешно подтверждено. Мы скоро свяжемся
              с вами.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="flex items-center justify-center rounded-md border border-gray-300 bg-dostappDarkOrange px-5 py-3 text-base font-medium text-white transition-colors hover:bg-dostappDarkOrange/90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
