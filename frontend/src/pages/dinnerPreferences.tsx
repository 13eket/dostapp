import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useFormContext } from '@/context/FormContext';
import { publishToGoogleSheet } from '@/utils/googleSheetUtility';

const DinnerPreferences = () => {
  const { formData, setFormData } = useFormContext();
  const [selectedSpending, setSelectedSpending] = useState(
    formData.dinnerPreferences?.spending || '',
  );
  const [selectedMenuOptions, setSelectedMenuOptions] = useState<string[]>(
    formData.dinnerPreferences?.menuOptions || [],
  );
  const router = useRouter();

  const spendingOptions = ['$', '$$', '$$$'];
  const menuOptions = [
    'Я ем всё',
    'Вегетарианское',
    'Мясное',
    'Рыбное',
    'Веганское',
    'Халяль',
    'Кошерное',
    'Без глютена',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      dinnerPreferences: {
        spending: selectedSpending,
        menuOptions: selectedMenuOptions,
      },
    };
    setFormData(updatedFormData);
    publishToGoogleSheet(updatedFormData, 'DinnerPreferences');
    router.push('/payment');
  };

  const handleMenuSelect = (option: string) => {
    setSelectedMenuOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option],
    );
  };

  const isFormValid = selectedSpending && selectedMenuOptions.length > 0;

  return (
    <div className="flex min-h-screen flex-col bg-[#FDF1DE]">
      {/* "Your Dinner" Header with Separator */}
      <div className="w-full pt-4">
        {' '}
        {/* Reduced top padding */}
        <div className="text-center">
          <h1 className="font-dinner text-sm font-bold italic">ВАШ УЖИН</h1>
        </div>
        <div className="my-4 border-t border-black"></div>{' '}
      </div>

      <div className="ml-2.5">
        {/* Budget Selection */}
        <div className="mb-10">
          <h2 className="mb-4 text-xl font-semibold">
            Сколько вы готовы потратить на ужин? (Обязательно)
          </h2>
          <div className="space-y-3">
            {spendingOptions.map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-center space-x-3"
              >
                <input
                  type="radio"
                  name="spending"
                  checked={selectedSpending === option}
                  onChange={() => setSelectedSpending(option)}
                  className="form-radio size-5 border-2 border-gray-300 text-orange-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Menu Selection */}
        <div className="mb-10">
          <h2 className="mb-4 text-lg font-semibold">
            Какие варианты меню вы хотите видеть? (Обязательно)
          </h2>
          <p className="mb-6 text-gray-600">
            Мы учитываем ваши предпочтения и ограничения, чтобы обеспечить
            несколько доступных вариантов выбора.
          </p>
          <div className="space-y-3">
            {menuOptions.map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-center space-x-3"
              >
                <input
                  type="checkbox"
                  checked={selectedMenuOptions.includes(option)}
                  onChange={() => handleMenuSelect(option)}
                  className="form-checkbox size-5 rounded-sm border-2 border-gray-300 text-orange-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="inset-x-0 bottom-0 p-2.5">
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`mx-auto block w-full max-w-[360px] rounded-xl py-4 text-lg font-semibold text-white transition-colors ${
            isFormValid
              ? 'bg-orange-500 hover:bg-orange-600'
              : 'cursor-not-allowed bg-gray-300'
          }`}
        >
          Подтвердить
        </button>
      </div>
    </div>
  );
};

export default DinnerPreferences;
