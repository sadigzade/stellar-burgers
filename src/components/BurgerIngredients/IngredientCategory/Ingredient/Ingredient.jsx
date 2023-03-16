import React from "react";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";

import { dataPropTypes } from "../../../../utils/prop-types";
import { ingredientModalOpen } from "../../../../services/ingredientModal/action";
import { DNDTypes } from "../../../../services/dnd-types";

import styles from "./Ingredient.module.css";
import { Link, useLocation } from "react-router-dom";

function Ingredient({ ingredient }) {
  const { _id, image, name, price, type, count } = ingredient;
  const dispatch = useDispatch();
  const location = useLocation();

  const [{ opacity }, dragRef] = useDrag({
    type: type === DNDTypes.BUN ? type : DNDTypes.INGREDIENT,
    item: { ...ingredient },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const handleOpenModal = () => {
    dispatch(ingredientModalOpen(ingredient));
  };

  return (
    <Link key={_id} to={`/ingredients/${_id}`} state={{ background: location }}>
      <div className={styles.Ingredient} style={{ opacity }} onClick={handleOpenModal}>
        <img ref={dragRef} className={styles.IngredientImage} src={image} alt={name} />
        <div className={`${styles.IngredientPrice} mt-1 mb-1`}>
          <span className="text text_type_digits-default mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={styles.IngredientTitle}>{name}</p>
        {count ? <Counter count={count} size="default" extraClass="m-1" /> : null}
      </div>
    </Link>
  );
}

Ingredient.propTypes = {
  ingredient: dataPropTypes.isRequired,
};

export default Ingredient;
