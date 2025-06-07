import type { ReactNode } from "react";

type IBackgroundProps = {
  children: ReactNode;
  passedColor?: string;
};

const Background = ({ children, passedColor }: IBackgroundProps) => {
  if (passedColor) {
    return <div className={passedColor}>{children}</div>;
  }

  return (
    <div className="relative min-h-0 bg-cover bg-fixed bg-center bg-no-repeat">
      {children}
    </div>
  );
};

export { Background };
