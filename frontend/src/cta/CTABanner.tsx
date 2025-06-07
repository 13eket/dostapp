import type { ReactNode } from "react";

type ICTABannerProps = {
  title: string;
  subtitle: string;
  button: ReactNode;
};

const CTABanner = (props: ICTABannerProps) => (
  <div className="flex flex-col rounded-md p-4 text-center sm:flex-row sm:items-center sm:justify-between sm:p-12 sm:text-left">
    <div className="text-lg font-semibold">
      <div className="text-primary-400">{props.title}</div>
      <div className="text-gray-800">{props.subtitle}</div>
    </div>

    <div className="whitespace-no-wrap mt-3 sm:ml-2 sm:mt-0">
      {props.button}
    </div>
  </div>
);

export { CTABanner };
