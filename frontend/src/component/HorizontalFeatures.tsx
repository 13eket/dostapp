import { handleBookingEmbedded } from "@/utils/routing";

import { HorizontalFeatureColumn } from "../feature/HorizontalFeatureColumn";
import { Section } from "../layout/Section";

const HorizontalFeatures = () => {
  return (
    <Section>
      <Section
        title="Как это Работает?"
        description="Ужин без хлопот. Мы всё организуем, вам остаётся только прийти!"
      >
        <></>
      </Section>
      <div className="flex space-x-4 overflow-x-auto p-6">
        <HorizontalFeatureColumn
          title="1. Пройдите наш короткий тест личности"
          description="Заполните короткий тест личности, и наш алгоритм сделает все остальное."
          image="https://dostapp.s3.eu-north-1.amazonaws.com/1_step.JPG"
          imageAlt="First feature alt text"
          color="rgba(245, 157, 36, 0.8)"
          isStep={true}
        />
        <HorizontalFeatureColumn
          title="2. Мы подберем вам 5 собеседников"
          description="Наш алгоритм подбирает 5 совместимых людей для увлекательного вечера и содержательных бесед."
          image="https://dostapp.s3.eu-north-1.amazonaws.com/2_step.HEIC"
          imageAlt="Second feature alt text"
          color="rgba(0, 160, 137, 0.8)"
          isStep={true}
        />
        <HorizontalFeatureColumn
          title="3. Мы бронируем и организуем"
          description="Мы предоставляем все необходимое для отличного вечера: информацию о вашей компании и детали ресторана."
          image="https://dostapp.s3.eu-north-1.amazonaws.com/3_step.JPG"
          imageAlt="Third feature alt text"
          color="rgba(255, 108, 122, 0.8)"
          isStep={true}
        />
        <HorizontalFeatureColumn
          title="4. Приходите и погрузитесь в уникальный опыт"
          description="Растопите лед с помощью нашей игры и заведите искренние знакомства с единомышленниками."
          image="https://dostapp.s3.eu-north-1.amazonaws.com/4_step.jpg"
          imageAlt="Fourth feature alt text"
          color="rgba(0, 128, 115, 0.8)"
          isStep={true}
        />
        <HorizontalFeatureColumn
          title="5. Обогатите Свою Социальную Жизнь"
          description="Наши еженедельные ужины предлагают удобный способ разнообразить ваше свободное время и провести его в приятной компании единомышленников." // Description: Our weekly dinners offer a convenient way to diversify your free time and spend it in pleasant company of like-minded people.
          image="https://dostapp.s3.eu-north-1.amazonaws.com/background.png"
          imageAlt="Fifth feature alt text"
          color="rgba(245, 157, 36, 0.8)"
          isStep={true}
        />
      </div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleBookingEmbedded}
          className="rounded-full bg-orange-500 px-8 py-3 font-sans font-bold text-white hover:bg-orange-700"
        >
          Зарегистрироваться
        </button>
      </div>
    </Section>
  );
};

export { HorizontalFeatures };
