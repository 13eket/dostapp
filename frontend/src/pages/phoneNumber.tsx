"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useFormContext } from "@/context/FormContext";
import { formatPhoneNumber } from "@/utils/numberFormats";

import ProtectedRoute from "../component/ProtectedRoute";

const PhoneNumber = () => {
  const { formData, setFormData } = useFormContext();
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fullPhoneNumber = `+7${phoneNumber}`;
    const updatedFormData = {
      ...formData,
      phoneNumber: fullPhoneNumber,
    };
    setFormData(updatedFormData);
    router.push("/dinnerPreferences");
  };

  const isPhoneComplete = phoneNumber.length >= 10;

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-[#FDF1DE]">
        {/* Account Header with Separator */}
        <div className="w-full pt-4">
          <div className="text-center">
            <h1 className="font-dinner text-sm font-bold italic">АККАУНТ</h1>
          </div>
          <div className="my-4 border-t border-black"></div>
          <h2 className="mb-10 text-center font-dinner text-xl font-bold leading-tight">
            ВАШ НОМЕР{" "}
            <span className="font-dinner font-medium italic">ТЕЛЕФОНА</span>?
          </h2>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col items-center px-4 pt-6">
          <form className="w-full max-w-[360px]" onSubmit={handleSubmit}>
            {/* Phone Input */}
            <div className="mb-8 w-full">
              <div className="flex items-center rounded-xl bg-white px-4 py-3">
                <div className="flex items-center pr-2">
                  <span className="mr-2 text-2xl">🇰🇿</span>
                  <span className="text-lg font-medium text-gray-500">+7</span>
                </div>
                <input
                  type="tel"
                  value={formatPhoneNumber(phoneNumber)}
                  onChange={(e) =>
                    setPhoneNumber(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="XXX XXX XX XX"
                  className="flex-1 text-lg outline-none placeholder:text-gray-400"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  required
                />
              </div>
            </div>
          </form>
        </div>

        {/* Fixed Bottom Button */}
        <div className="fixed inset-x-0 bottom-0 border-t border-gray-200 p-4">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!isPhoneComplete}
            className={`mx-auto block w-full max-w-[360px] rounded-xl py-4 text-lg font-semibold text-white transition-colors ${
              isPhoneComplete
                ? "bg-orange-500 hover:bg-orange-600"
                : "cursor-not-allowed bg-gray-300"
            }`}
          >
            Подтвердить
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PhoneNumber;
