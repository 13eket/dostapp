"use client";

import "survey-core/survey-core.css";
import "survey-core/survey.i18n";

import { useRouter } from "next/router";
import { ThreeDimensionalLight } from "survey-core/themes";
import { Model, Survey } from "survey-react-ui";

import { useFormContext } from "@/context/FormContext";

const surveyJson = {
  showProgressBar: true,
  progressBarType: "pages",
  progressBarShowPageNumbers: true,
  autoAdvanceEnabled: true,
  locale: "ru",
  pages: [
    {
      elements: [
        {
          name: "fullName",
          title: "Введите ваше имя и фамилию:",
          type: "text",
          isRequired: true,
        },
      ],
    },
    // {
    //   elements: [
    //     {
    //       name: 'city',
    //       title: 'Вы живете в:',
    //       type: 'radiogroup',
    //       choices: ['Алматы', 'Астана'],
    //       isRequired: true,
    //     },
    //   ],
    // },
    // {
    //   elements: [
    //     {
    //       name: 'logic',
    //       title: 'Обычно ваши мнения основываются на:',
    //       type: 'radiogroup',
    //       choices: ['Логике и фактах', 'Эмоциях и чувствах'],
    //       isRequired: true,
    //     },
    //   ],
    // },
    // {
    //   elements: [
    //     {
    //       name: 'preference',
    //       title: 'Вы считаете себя больше:',
    //       type: 'radiogroup',
    //       choices: [
    //         'Энтузиастом авторского кино',
    //         'Любителем массовых блокбастеров',
    //       ],
    //       isRequired: true,
    //     },
    //   ],
    // },
    // {
    //   elements: [
    //     {
    //       name: 'personality',
    //       title: 'Вы считаете себя больше:',
    //       type: 'radiogroup',
    //       choices: ['Умным человеком', 'Смешным человеком'],
    //       isRequired: true,
    //     },
    //   ],
    // },
    // {
    //   elements: [
    //     {
    //       name: 'lifestyle',
    //       title:
    //         'Если бы ваша жизнь была модным заявлением, какой она была бы:',
    //       type: 'radiogroup',
    //       choices: ['Классической и вечной', 'Модной и выразительной'],
    //       isRequired: true,
    //     },
    //   ],
    // },
    // {
    //   elements: [
    //     {
    //       name: 'music',
    //       title: 'Что бы вы предпочли слушать:',
    //       type: 'radiogroup',
    //       choices: ['Рэп', 'Рок', 'Ничего из этого'],
    //       isRequired: true,
    //     },
    //   ],
    // },
    // {
    //   elements: [
    //     {
    //       name: 'evening',
    //       title: 'Что лучше всего описывает идеальный вечер?',
    //       type: 'radiogroup',
    //       choices: [
    //         'Хорошо спланированный заранее',
    //         'Спонтанный и импровизированный',
    //       ],
    //       isRequired: true,
    //     },
    //   ],
    // },
    // {
    //   elements: [
    //     {
    //       name: 'introvert',
    //       title: 'Я интроверт',
    //       type: 'rating',
    //       rateMin: 0,
    //       rateMax: 10,
    //       minRateDescription: 'Совсем не согласен',
    //       maxRateDescription: 'Полностью согласен',
    //       displayMode: 'buttons',
    //       rateDescriptionLocation: 'topBottom',
    //       isRequired: true,
    //     },
    //   ],
    // },
    // {
    //   elements: [
    //     {
    //       name: 'creative',
    //       title: 'Я — творческий человек',
    //       type: 'rating',
    //       rateMin: 0,
    //       rateMax: 10,
    //       minRateDescription: 'Совсем не согласен',
    //       maxRateDescription: 'Полностью согласен',
    //       displayMode: 'buttons',
    //       rateDescriptionLocation: 'topBottom',
    //       isRequired: true,
    //     },
    //   ],
    // },
    // {
    //   elements: [
    //     {
    //       name: 'stress',
    //       title: 'Я — человек, склонный к стрессу',
    //       type: 'rating',
    //       rateMin: 0,
    //       rateMax: 10,
    //       minRateDescription: 'Совсем не согласен',
    //       maxRateDescription: 'Полностью согласен',
    //       displayMode: 'buttons',
    //       rateDescriptionLocation: 'topBottom',
    //       isRequired: true,
    //     },
    //   ],
    // },
    // {
    //   elements: [
    //     {
    //       name: 'selfMotivated',
    //       title: 'Я — самомотивированный человек',
    //       type: 'rating',
    //       rateMin: 0,
    //       rateMax: 10,
    //       minRateDescription: 'Совсем не согласен',
    //       maxRateDescription: 'Полностью согласен',
    //       displayMode: 'buttons',
    //       rateDescriptionLocation: 'topBottom',
    //       isRequired: true,
    //     },
    //   ],
    // },
    // {
    //   elements: [
    //     {
    //       name: 'job',
    //       title: 'У меня потрясающая работа',
    //       type: 'rating',
    //       rateMin: 0,
    //       rateMax: 10,
    //       minRateDescription: 'Совсем не согласен',
    //       maxRateDescription: 'Полностью согласен',
    //       displayMode: 'buttons',
    //       rateDescriptionLocation: 'topBottom',
    //       isRequired: true,
    //     },
    //   ],
    // },
    // {
    //   elements: [
    //     {
    //       name: 'spirituality',
    //       title: 'Насколько важна для вас духовность?',
    //       type: 'rating',
    //       rateMin: 0,
    //       rateMax: 10,
    //       minRateDescription: 'Не имеет значения',
    //       maxRateDescription: 'Очень важно',
    //       displayMode: 'buttons',
    //       rateDescriptionLocation: 'topBottom',
    //       isRequired: true,
    //     },
    //   ],
    // },
    // {
    //   elements: [
    //     {
    //       name: 'family',
    //       title: 'Насколько важна для вас семья?',
    //       type: 'rating',
    //       rateMin: 0,
    //       rateMax: 10,
    //       minRateDescription: 'Не имеет значения',
    //       maxRateDescription: 'Очень важно',
    //       displayMode: 'buttons',
    //       rateDescriptionLocation: 'topBottom',
    //       isRequired: true,
    //     },
    //   ],
    // },
    // {
    //   elements: [
    //     {
    //       name: 'humor',
    //       title: 'Насколько важен для вас юмор?',
    //       type: 'rating',
    //       rateMin: 0,
    //       rateMax: 10,
    //       minRateDescription: 'Не имеет значения',
    //       maxRateDescription: 'Очень важно',
    //       displayMode: 'buttons',
    //       rateDescriptionLocation: 'topBottom',
    //       isRequired: true,
    //     },
    //   ],
    // },
    // {
    //   elements: [
    //     {
    //       name: 'loneliness',
    //       title: 'Как часто вы чувствуете себя одиноким?',
    //       type: 'radiogroup',
    //       choices: [
    //         'Никогда',
    //         'Каждый день',
    //         'Мне нравится выходить с друзьями',
    //       ],
    //       isRequired: true,
    //     },
    //   ],
    // },
    // {
    //   elements: [
    //     {
    //       name: 'sports',
    //       title: 'Мне нравится заниматься спортом',
    //       type: 'radiogroup',
    //       choices: ['Редко', 'Регулярно'],
    //       isRequired: true,
    //     },
    //   ],
    // },
    // {
    //   elements: [
    //     {
    //       name: 'academics',
    //       title: 'Важен ли для вас академический успех?',
    //       type: 'radiogroup',
    //       choices: ['Мне всё равно', 'Всё, что я знаю — это учеба'],
    //       isRequired: true,
    //     },
    //   ],
    // },
    // {
    //   elements: [
    //     {
    //       name: 'leisure',
    //       title: 'Мне нравится проводить время больше…',
    //       type: 'radiogroup',
    //       choices: ['На природе', 'В городе'],
    //       isRequired: true,
    //     },
    //   ],
    // },
    // {
    //   elements: [
    //     {
    //       name: 'politicalHumor',
    //       title: 'Мне нравится политически некорректный юмор',
    //       type: 'rating',
    //       rateMin: 0,
    //       rateMax: 10,
    //       minRateDescription: 'Совсем не согласен',
    //       maxRateDescription: 'Полностью согласен',
    //       displayMode: 'buttons',
    //       rateDescriptionLocation: 'topBottom',
    //       isRequired: true,
    //     },
    //   ],
    // },
    // {
    //   elements: [
    //     {
    //       name: 'newsDiscussion',
    //       title: 'Мне нравится обсуждать политику/новости',
    //       type: 'rating',
    //       rateMin: 0,
    //       rateMax: 10,
    //       minRateDescription: 'Совсем не согласен',
    //       maxRateDescription: 'Полностью согласен',
    //       displayMode: 'buttons',
    //       rateDescriptionLocation: 'topBottom',
    //       isRequired: true,
    //     },
    //   ],
    // },
    // {
    //   elements: [
    //     {
    //       name: 'selfIdentification',
    //       title: 'Кем вы себя определяете?',
    //       type: 'radiogroup',
    //       choices: ['Женщина', 'Мужчина', 'Небинарная личность'],
    //       isRequired: true,
    //     },
    //   ],
    // },
    // TODO: Add relationship status, children, and industry questions ONLY AFTER COMPLIANCE
    // {
    //   elements: [
    //     {
    //       name: 'relationshipStatus',
    //       title: 'Каков ваш семейный статус?',
    //       type: 'radiogroup',
    //       choices: [
    //         'Не в отношениях',
    //         'Женат / Замужем',
    //         'Всё сложно',
    //         'В отношениях',
    //         'Предпочитаю не отвечать',
    //       ],
    //       isRequired: true,
    //     },
    //   ],
    // },
    // {
    //   elements: [
    //     {
    //       name: 'children',
    //       title: 'У вас есть дети?',
    //       type: 'radiogroup',
    //       choices: ['Да', 'Нет', 'Предпочитаю не отвечать'],
    //       isRequired: true,
    //     },
    //   ],
    // },
    // {
    //   elements: [
    //     {
    //       name: 'industry',
    //       title: 'Если вы работаете, в какой отрасли вы заняты?',
    //       type: 'radiogroup',
    //       choices: [
    //         'Не работаю',
    //         'Здравоохранение',
    //         'Технологии',
    //         'Физический труд',
    //         'Розничная торговля',
    //         'Пищевая промышленность',
    //         'Сфера услуг',
    //         'Искусство',
    //         'Политика',
    //       ],
    //       isRequired: true,
    //     },
    //   ],
    // },
    // {
    //   elements: [
    //     {
    //       name: 'birthday',
    //       title: 'Когда у вас день рождения?',
    //       type: 'text',
    //       inputType: 'date',
    //       isRequired: true,
    //       validators: [
    //         {
    //           type: 'expression',
    //           expression: 'age({birthday}) >= 18',
    //           text: 'Вам должно быть больше 18 лет',
    //         },
    //       ],
    //     },
    //   ],
    // },
  ],
};

export default function SurveyComponent() {
  const { setFormData } = useFormContext();
  const router = useRouter();
  const survey = new Model(surveyJson);
  survey.applyTheme(ThreeDimensionalLight);

  survey.onComplete.add((result) => {
    setFormData((prev) => ({ ...prev, surveyAnswers: result.data }));
    router.push("/signup");
  });

  // User can access survey without a token, but will be redirected to signup page after completion
  return (
    <div className="bg-white-100 flex h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-6xl rounded-lg px-4 py-8">
        <Survey model={survey} />
      </div>
    </div>
  );
}
