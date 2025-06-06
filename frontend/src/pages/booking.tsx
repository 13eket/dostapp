'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getNextWednesdaysAsStrings } from '@/utils/date';

import { useAuth } from '../context/AuthContext';

export default function BookingPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [nextWednesdays, setNextWednesdays] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Enable when we launch
    // if (!token) {
    //   router.push('/');
    //   return;
    // }
    setNextWednesdays(getNextWednesdaysAsStrings());
  }, [token, router]);

  const formatDateDisplay = (dateString: string) => {
    const [weekday, monthDay, time] = dateString.split(', ');
    return { date: `${weekday}, ${monthDay}`, time };
  };

  return (
    <div className="relative min-h-screen bg-[url('https://dostapp.s3.eu-north-1.amazonaws.com/rauan-image.jpg')] text-black">
      {/* City name in circular container */}
      <div className="relative z-10 flex justify-center pt-12">
        <div className="flex size-32 items-center justify-center rounded-xl border-4 border-black bg-transparent">
          <h1 className="text-2xl font-bold text-black">АЛМАТЫ</h1>
        </div>
      </div>

      <div className="relative z-10 p-6">
        {/* Booking section */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-white">
            Забронируйте следующий ужин
          </h2>
          <p className="mt-2 text-gray-200">5 человек ждут вас</p>
        </div>

        {/* Date options */}
        <div className="space-y-4 rounded-2xl bg-white/90 p-6 backdrop-blur-sm">
          {nextWednesdays.map((dateString, index) => {
            const { date, time } = formatDateDisplay(dateString);
            return (
              <label
                key={index}
                className={`flex items-center justify-between rounded-xl border p-4 ${
                  selectedDate === dateString
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 hover:border-gray-400'
                } cursor-pointer transition-all`}
              >
                <div>
                  <h3 className="text-lg font-medium">{date}</h3>
                  <p className="text-gray-600">{time}</p>
                </div>
                <input
                  type="radio"
                  name="booking-date"
                  value={dateString}
                  checked={selectedDate === dateString}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="size-5 text-black focus:ring-black"
                />
              </label>
            );
          })}
        </div>

        {/* Book button */}
        <div className="mt-8">
          <button
            className="w-full rounded-full bg-orange-500 py-4 text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled={!selectedDate}
            onClick={() => {
              router.push('/dinnerPreferences');
            }}
          >
            Забронировать место
          </button>
        </div>
      </div>
    </div>
  );
}
