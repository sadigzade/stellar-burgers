import { FC } from "react";
import classNames from "classnames";

type IngredientImageProps = {
  image: string | undefined;
  count: number;
  index: number;
};

const IngredientImage: FC<IngredientImageProps> = ({ image, count, index }) => {
  const cls = classNames(
    "relative",
    "h-[68px]",
    "w-[68px]",
    "overflow-hidden",
    "rounded-full",
    "bg-gradient",
    "flex",
    "justify-center",
    "items-center",
    {
      "z-0": index === 5,
      "z-[1]": index === 4,
      "z-[2]": index === 3,
      "z-[3]": index === 2,
      "z-[4]": index === 1,
      "z-[5]": index === 0,
    },
    {
      "right-0": index === 0,
      "right-4": index === 1,
      "right-8": index === 2,
      "right-12": index === 3,
      "right-16": index === 4,
      "right-20": index === 5,
    },
  );

  return (
    <div className={cls}>
      <div className="h-16 w-16 bg-[#1C1C21] rounded-full">
        <img src={image} className="absolute h-14 top-1/2 left-1/2 transform-50" alt={image} />
        {index === 5 && (
          <>
            <div className="absolute h-full w-full top-0 left-0 bg-[#1C1C21]/60"></div>
            <span className="text text_type_main-default absolute top-1/2 left-1/2 transform-50">
              +{count}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default IngredientImage;
