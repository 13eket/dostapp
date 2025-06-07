import className from "classnames";
import React from "react";

type IButtonProps = {
  xl?: boolean;
  children: string;
  onClick?: (e: React.MouseEvent) => void;
  href?: string; // Optional href for link-like behavior
};

const Button = (props: IButtonProps) => {
  const btnClass = className({
    btn: true,
    "btn-xl": props.xl,
    "btn-base": !props.xl,
    "btn-primary": true,
  });

  // If href is provided, render as an anchor tag
  if (props.href) {
    return (
      <a
        className={btnClass}
        href={props.href}
        onClick={props.onClick}
        role="button"
      >
        {props.children}
        <style jsx>{`
          .btn {
            @apply inline-block rounded-md text-center;
          }
          .btn-base {
            @apply text-lg font-semibold py-2 px-4;
          }
          .btn-xl {
            @apply font-extrabold text-xl py-4 px-6;
          }
          .btn-primary {
            @apply text-white bg-primary-500;
          }
          .btn-primary:hover {
            @apply bg-primary-600;
          }
        `}</style>
      </a>
    );
  }

  // Default button rendering
  return (
    <div className={btnClass} onClick={props.onClick} role="button">
      {props.children}
      <style jsx>{`
        .btn {
          @apply inline-block rounded-md text-center cursor-pointer;
        }
        .btn-base {
          @apply text-lg font-semibold py-2 px-4;
        }
        .btn-xl {
          @apply font-extrabold text-xl py-4 px-6;
        }
        .btn-primary {
          @apply text-white bg-primary-500;
        }
        .btn-primary:hover {
          @apply bg-primary-600;
        }
      `}</style>
    </div>
  );
};

export { Button };
