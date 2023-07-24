import { FC } from "react";
import classNames from "classnames";
import styles from "./IngredientImage.module.css";

type IngredientImageProps = {
  image: string | undefined;
  count: number;
  index: number;
};

const IngredientImage: FC<IngredientImageProps> = ({ image, count, index }) => {
  const ingredientimage_cls = classNames(
    styles.ingredientimage,
    {
      [styles["z-0"]]: index === 5,
      [styles["z-1"]]: index === 4,
      [styles["z-2"]]: index === 3,
      [styles["z-3"]]: index === 2,
      [styles["z-4"]]: index === 1,
      [styles["z-5"]]: index === 0,
    },
    {
      [styles["left-0"]]: index === 0,
      [styles["left-1"]]: index === 1,
      [styles["left-2"]]: index === 2,
      [styles["left-3"]]: index === 3,
      [styles["left-4"]]: index === 4,
      [styles["left-5"]]: index === 5,
    },
  );

  return (
    <div className={ingredientimage_cls}>
      <div className={styles.ingredientimage__body}>
        <img src={image} className={styles.ingredientimage__image} alt={image} />
        {index === 5 && (
          <>
            <div className={styles.ingredientimage__bg} />
            <span className={styles.ingredientimage__count}>+{count}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default IngredientImage;
