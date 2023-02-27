import React from "react";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { dataPropTypes } from "../../../utils/prop-types";

import styles from "./ConstructorIngredients.module.css";

function ConstructorIngredients({ ingredient, index, onRemoveHandler, moveCard }) {
  const { _id, dragId, name, price, image } = ingredient;

  const ref = React.useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "component",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item) {
      if (!ref.current) return;
      if (item.index === index) return;

      moveCard(item.index, index);

      item.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "component",
    item: () => ({ index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  const preventDefault = (e) => e.preventDefault();

  return (
    <div
      ref={ref}
      style={{ opacity }}
      onDrop={preventDefault}
      className={styles.ConstructorBlock}
      data-handler-id={handlerId}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => onRemoveHandler(dragId, _id)}
      />
    </div>
  );
}

ConstructorIngredients.propTypes = {
  ingredient: dataPropTypes.isRequired,
  index: PropTypes.number.isRequired,
  onRemoveHandler: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
};

export default ConstructorIngredients;
