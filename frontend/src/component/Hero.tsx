import React, { useEffect, useState } from 'react';

import { handleBookingEmbedded } from '@/utils/routing';

import { Background } from '../background/Background';
import { Section } from '../layout/Section';
import Countdown from './Countdown';

const Hero = () => {
  const [city, setCity] = useState('Алматы'); // Default to Алматы

  useEffect(() => {
    const fetchCity = async (latitude: any, longitude: any) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=ru`,
        );
        const data = await response.json();
        if (data.address && data.address.city) {
          setCity(data.address.city);
        }
      } catch (error) {
        console.error('Ошибка получения города:', error);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchCity(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Ошибка определения местоположения:', error);
        },
      );
    }
  }, []);

  return (
    <Background>
      <Section yPadding="pt-32 pb-32 h-full">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="mb-4 self-center">
            <div
              className="flex items-center rounded-full border border-black px-3 py-1"
              style={{ margin: '5px' }}
            >
              <span
                role="img"
                aria-label="Location Pin"
                className="mr-1 text-xl"
                style={{ lineHeight: '1' }}
              >
                📍
              </span>
              <p className="font-mono text-xs font-semibold text-black">
                {city}
              </p>
            </div>
          </div>
          <div className="text-center">
            <h2 className="mb-1 font-wednesday text-xl font-medium leading-tight">
              КАЖДУЮ СРЕДУ
            </h2>
            <h1 className="mb-10 font-dinner text-2xl font-bold italic leading-snug">
              УЖИН,
              <br />С КОТОРОГО НАЧИНАЕТСЯ ДРУЖБА. BEKET
            </h1>
            <p className="mb-8 font-body text-base">
              Забронируйте место сейчас и{' '}
              <span className="font-bold">
                проведите вечер в живом общении с людьми
              </span>
              ,<br />
              которых подобрал наш алгоритм.
            </p>
            <button
              onClick={handleBookingEmbedded}
              className="rounded-full border border-black bg-dostappDarkOrange px-8 py-3 font-sans font-semibold text-black"
            >
              Забронировать Место
            </button>
          </div>
          <div className="mt-8">
            <Countdown />
          </div>
        </div>
      </Section>
    </Background>
  );
};

export { Hero };
