import ProfileCard from '../feature/ProfileCard';
import { Section } from '../layout/Section';

const HorizontalProfileCards = () => {
  return (
    <Section>
      <div className="p-6">
        <div className="mb-8 text-center">
          <h2 className="mb-10 font-dinner text-2xl font-bold italic leading-snug">
            НЕЗАБЫВАЕМЫЕ
            <br />
            ВСТРЕЧИ ЖДУТ ВАС
          </h2>
        </div>
        <div className="flex justify-start space-x-4 overflow-x-auto">
          <ProfileCard
            name="Бекет"
            age={26}
            description="Любит настольные игры, говорит на 5 языках"
            image="https://dostapp.s3.eu-north-1.amazonaws.com/beket-image.jpg"
            zodiac="Водолей"
          />
          <ProfileCard
            name="Вера"
            age={71}
            description="Пенсионерка-путешественница посетила 23 страны."
            image="https://dostapp.s3.eu-north-1.amazonaws.com/photo_6147888545264685735_x.jpg"
            zodiac="Дева"
          />
          <ProfileCard
            name="Рауан"
            age={27}
            description="Инженер, прожил 5 лет в Южной Корее"
            image="https://dostapp.s3.eu-north-1.amazonaws.com/rauan-image.jpg"
            zodiac="Стрелец"
          />
          <ProfileCard
            name="Фатима"
            age={26}
            description="Программист и молодая мама в одном лице"
            image="https://dostapp.s3.eu-north-1.amazonaws.com/fatima-image.jpg"
            zodiac="Телец"
          />
          <ProfileCard
            name="Томи"
            age={23}
            description="Магистрант, 10 лет занималась народными танцами"
            image="https://dostapp.s3.eu-north-1.amazonaws.com/tomi-image.jpg"
            zodiac="Телец"
          />
          <ProfileCard
            name="Санжар"
            age={28}
            description="Любит историю, экс-танцор"
            image="https://dostapp.s3.eu-north-1.amazonaws.com/sanzhar-image.jpg"
            zodiac="Близнецы"
          />
        </div>
      </div>
    </Section>
  );
};

export { HorizontalProfileCards };
