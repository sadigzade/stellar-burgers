import classNames from "classnames";
import React from "react";

const IngredientView = ({ item, index }) => {
  const cls = classNames(
    "relative",
    "h-16",
    "w-16",
    "overflow-hidden",
    "rounded-full",
    "b-2",
    "b-solid",
    "bg-[#131317]",
    {
      "z-0": index === 5,
      "z-10": index === 4,
      "z-20": index === 3,
      "z-30": index === 2,
      "z-40": index === 1,
      "z-50": index === 0,
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
      <img src={item.image} className="absolute h-14 top-1/2 left-1/2 transform-50" alt="" />
      {index === 5 && (
        <>
          <div className="absolute h-full w-full bg-[#1C1C21]/60"></div>
          <span className="text text_type_main-default absolute top-1/2 left-1/2 transform-50">
            +1
          </span>
        </>
      )}
    </div>
  );
};

export default IngredientView;
