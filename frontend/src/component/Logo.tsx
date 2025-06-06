import { AppConfig } from '../utils/AppConfig';

type ILogoProps = {
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  const fontStyle = props.xl
    ? 'font-semibold text-4xl md:text-4xl'
    : 'font-semibold text-2xl md:text-2xl';

  return (
    <span
      className={`inline-flex items-center font-sriracha text-black ${fontStyle}`}
    >
      {AppConfig.site_name}
    </span>
  );
};

export { Logo };
