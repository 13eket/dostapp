import { useEffect, useState } from "react";

import { Button } from "@/button/Button";
import { handleBookingEmbedded } from "@/utils/routing";

import { CTABanner } from "../cta/CTABanner";
import { Section } from "../layout/Section";

const Banner = () => {
  const [surveyUrl, setSurveyUrl] = useState("");

  useEffect(() => {
    // Dynamically set the survey URL on the client side
    setSurveyUrl(`${window.location.origin}/survey`);
  }, []);

  return (
    <Section>
      <CTABanner
        title="Перестань ждать! Начни общаться!"
        subtitle="Запишись прямо сейчас. Мы организовываем последние пару столиков до конца месяца!"
        button={
          <Button onClick={handleBookingEmbedded} href={surveyUrl}>
            Записаться
          </Button>
        }
      />
    </Section>
  );
};

export { Banner };
