import { Background } from "../background/Background";
import { CenteredFooter } from "../footer/CenteredFooter";
import { Section } from "../layout/Section";
import { Logo } from "./Logo";

const Footer = () => (
  <Background>
    <Section>
      <CenteredFooter logo={<Logo />} iconList={<></>}>
        <></>
      </CenteredFooter>
    </Section>
  </Background>
);

export { Footer };
