import React, { useState } from "react";

const GettingStarted: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText("https://dostapp.org/survey")
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(() => {
        setCopyError(true);
        setTimeout(() => setCopyError(false), 3000);
      });
  };

  const getButtonText = () => {
    if (copied) return "Скопировано!";
    if (copyError) return "Ошибка";
    return "Скопировать ссылку";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-2xl font-bold text-gray-900">
          Следуйте этим шагам:
        </h1>

        <div className="space-y-4 text-lg text-gray-700">
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-dostappDarkOrange font-bold text-white">
              1
            </span>
            Нажмите «Скопировать ссылку»
          </div>
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-dostappDarkOrange font-bold text-white">
              2
            </span>
            Выйдите из Instagram
          </div>
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-dostappDarkOrange font-bold text-white">
              3
            </span>
            Вставьте ссылку в браузер и откройте
          </div>
        </div>

        <button
          onClick={copyToClipboard}
          className="mt-6 flex w-full items-center justify-center rounded-md bg-dostappDarkOrange px-5 py-3 text-lg font-medium text-white transition hover:bg-dostappDarkOrange/90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 size-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
          {getButtonText()}
        </button>
      </div>
    </div>
  );
};

export default GettingStarted;
