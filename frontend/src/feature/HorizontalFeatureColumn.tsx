import className from "classnames";

type IHorizontalFeatureColumnProps = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  isStep?: boolean;
  color?: string;
};

const HorizontalFeatureColumn = (props: IHorizontalFeatureColumnProps) => {
  const horizontalFeatureClass = className(
    "relative",
    "rounded-lg",
    "shadow-md",
    "p-2.5",
    "w-72",
    "h-96",
    "flex-shrink-0",
    "flex",
    "flex-col",
    "items-center",
  );

  return (
    <div
      className={horizontalFeatureClass}
      style={{
        backgroundImage: `url('${props.image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="relative z-0 flex flex-col items-center justify-center rounded-lg border border-black p-4"
        style={{ backgroundColor: props.color || "#f0f0f0", height: "220px" }}
      >
        {props.isStep && (
          <div
            className="absolute top-0 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-black text-white"
            style={{ backgroundColor: props.color || "orange" }}
          >
            {props.title.split(".")[0]}
          </div>
        )}
        <h3 className="mt-6 text-center text-lg font-semibold">
          {props.title.split(". ")[1]}
        </h3>
        <div className="mt-2 text-center text-sm ">{props.description}</div>
      </div>
    </div>
  );
};

export { HorizontalFeatureColumn };
