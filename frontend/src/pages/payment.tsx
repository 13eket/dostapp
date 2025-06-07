import React, { useState } from "react";

import { Footer } from "@/component/Footer";

import { getNextWednesdaysAsStrings } from "../utils/date";
import ProtectedRoute from "@/component/ProtectedRoute";

const HEADER_CONTENT = {
  subscription: {
    image:
      "bg-[url('https://dostapp.s3.eu-north-1.amazonaws.com/payment_dinner.jpg')]",
    title: "НЕОГРАНИЧЕННЫЙ ДОСТУП",
    subtitle: "Все ужины, каждую среду",
  },
  ticket: {
    image:
      "bg-[url('https://dostapp.s3.eu-north-1.amazonaws.com/7742faabf1684a4e3d241d555b685715.jpg')]",
    title: "РАЗОВЫЙ БИЛЕТ",
    subtitle: "Один ужин на выбранную дату",
  },
};

const TopImageSection = ({ isTicket = false }: { isTicket?: boolean }) => {
  const content = HEADER_CONTENT[isTicket ? "ticket" : "subscription"];

  return (
    <div
      className={`relative h-[200px] ${content.image} flex flex-col items-center justify-center rounded-none bg-cover bg-center text-center transition-all duration-300 before:absolute before:inset-0 before:bg-black/50 before:content-['']`}
    >
      <div className="z-10 mb-2 font-dinner text-xl font-bold italic text-white md:text-3xl">
        {content.title}
      </div>
      <div className="z-10 text-lg text-white">{content.subtitle}</div>
    </div>
  );
};

interface SubscriptionCardProps {
  type: string;
  price: string;
  save?: string;
  isSelected: boolean;
  onClick: () => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  type,
  price,
  save = "Discover",
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col border ${isSelected ? "border-2 border-black" : "border-gray-300"} mx-1 h-[200px] flex-1 cursor-pointer rounded-[15px] bg-white px-4 pb-4 pt-14 transition-all hover:shadow-md`}
    >
      <div
        className={`absolute inset-x-0 top-0 ${isSelected ? "bg-[#F64100]" : "bg-gray-200"} flex h-14 flex-col justify-end rounded-t-[13px] px-4 pb-2`}
      >
        <div
          className={`font-bold ${isSelected ? "text-white" : "text-black"} pt-1 text-xs`}
        >
          {save}
        </div>
      </div>
      <div className="flex grow flex-col items-center justify-center">
        <div className="mb-2 text-sm font-bold">{type}</div>
        <div className="text-xs font-bold text-gray-800">{price}</div>
      </div>
    </div>
  );
};

interface PaymentOptionTabsProps {
  selectedTab: "subscription" | "ticket";
  onTabChange: (tab: "subscription" | "ticket") => void;
}

const PaymentOptionTabs: React.FC<PaymentOptionTabsProps> = ({
  selectedTab,
  onTabChange,
}) => {
  return (
    <div className="mx-auto mt-5 flex w-full max-w-[380px] rounded-[25px] border border-gray-200 bg-white p-1 shadow-sm">
      <button
        className={`mx-[2px] w-[180px] cursor-pointer rounded-[20px] px-5 py-2.5 font-bold transition-all duration-200 ${
          selectedTab === "subscription"
            ? "bg-black text-white shadow-md"
            : "bg-transparent text-black hover:bg-gray-100"
        }`}
        onClick={() => onTabChange("subscription")}
      >
        Подписка
      </button>
      <button
        className={`mx-[2px] w-[180px] cursor-pointer rounded-[20px] px-5 py-2.5 font-bold transition-all duration-200 ${
          selectedTab === "ticket"
            ? "bg-black text-white shadow-md"
            : "bg-transparent text-black hover:bg-gray-100"
        }`}
        onClick={() => onTabChange("ticket")}
      >
        Разовый билет
      </button>
    </div>
  );
};

interface TicketDetailsCardProps {
  date: string;
  city: string;
  price: string;
  onDateChange: (date: string) => void;
  onCityChange: (city: string) => void;
}

const TicketDetailsCard: React.FC<TicketDetailsCardProps> = ({
  date,
  city,
  price,
  onDateChange,
  onCityChange,
}) => {
  return (
    <div className="mt-5 rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Дата
        </label>
        <select
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
        >
          {getNextWednesdaysAsStrings().map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Город
        </label>
        <select
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
        >
          <option value="Astana">Астана</option>
          <option value="Almaty">Алматы</option>
        </select>
      </div>
      <div className="rounded-lg bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Итого:</span>
          <span className="text-lg font-bold text-gray-900">{price}</span>
        </div>
      </div>
    </div>
  );
};

const paymentTypeMap: Record<string, { label: string; payload: string }> = {
  "1 Month": { label: "Подписка 1 месяц за 7,000 ₸", payload: "basic" },
  "3 Months": { label: "Подписка 3 месяца за 16,800 ₸", payload: "economy20" },
  "6 Months": { label: "Подписка 6 месяцев за 25,200 ₸", payload: "economy40" },
};

const PaymentsPage = () => {
  const [selectedTab, setSelectedTab] = useState<"subscription" | "ticket">(
    "subscription",
  );
  const [selectedCard, setSelectedCard] = useState<string>("3 Months");
  const [ticketDate, setTicketDate] = useState<string>(
    getNextWednesdaysAsStrings()[0] ?? "",
  );
  const [ticketCity, setTicketCity] = useState<string>("Астана");

  const handleTabChange = (tab: "subscription" | "ticket") => {
    setSelectedTab(tab);
  };

  const handleCardClick = (cardType: string) => {
    setSelectedCard(cardType);
    localStorage.setItem("subscription_type", cardType);
  };

  const handleDateChange = (date: string) => {
    setTicketDate(date);
  };

  const handleCityChange = (city: string) => {
    setTicketCity(city);
  };

  const handlePaymentRedirect = async (paymentType: string) => {
    try {
      const res = await fetch(
        "https://l6f6z8o5ck.execute-api.eu-north-1.amazonaws.com/init-payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payment_type: paymentType }),
        },
      );
      if (!res.ok) throw new Error("Network response was not ok");
      const url = await res.text();
      window.location.href = url;
    } catch (error) {
      alert("Ошибка при оплате. Попробуйте еще раз.");
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-[#FDF1DE]">
        <TopImageSection isTicket={selectedTab === "ticket"} />
        <div className="mx-auto max-w-[600px] p-0 font-sans">
          <PaymentOptionTabs
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />

          {selectedTab === "subscription" ? (
            <div className="mt-5 flex justify-between">
              <SubscriptionCard
                type="1 Месяц"
                price="7,000 ₸/мес"
                save="Базовый"
                isSelected={selectedCard === "1 Month"}
                onClick={() => handleCardClick("1 Month")}
              />
              <SubscriptionCard
                type="3 Месяца"
                price="5,600 ₸/мес"
                save="Сэкономьте 20%"
                isSelected={selectedCard === "3 Months"}
                onClick={() => handleCardClick("3 Months")}
              />
              <SubscriptionCard
                type="6 Месяцев"
                price="4,200 ₸/мес"
                save="Сэкономьте 40%"
                isSelected={selectedCard === "6 Months"}
                onClick={() => handleCardClick("6 Months")}
              />
            </div>
          ) : (
            <TicketDetailsCard
              date={ticketDate}
              city={ticketCity}
              price="5,000 ₸"
              onDateChange={handleDateChange}
              onCityChange={handleCityChange}
            />
          )}

          {selectedTab === "subscription" ? (
            <>
              {Object.entries(paymentTypeMap).map(
                ([key, { label, payload }]) =>
                  selectedCard === key && (
                    <button
                      key={key}
                      onClick={() => handlePaymentRedirect(payload)}
                      className="mt-5 w-full rounded-xl border-none bg-[#F64100] px-5 py-3 font-bold text-white transition-colors hover:bg-[#E53900]"
                    >
                      {label}
                    </button>
                  ),
              )}
            </>
          ) : (
            <button
              onClick={() => handlePaymentRedirect("one-time")}
              className="mt-5 w-full rounded-xl border-none bg-[#F64100] px-5 py-3 font-bold text-white transition-colors hover:bg-[#E53900]"
            >
              Разовый билет за 5,000 ₸
            </button>
          )}
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default PaymentsPage;
