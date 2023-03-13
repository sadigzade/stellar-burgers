import React from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import IngredientDetails from "../BurgerIngredients/IngredientCategory/Ingredient/IngredientDetails/IngredientDetails";
import { ingredientModalClose } from "../../services/ingredientModal/action";
import Modal from "../Modal/Modal";

const ModalSwitch = ({ background }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleModalClose = () => {
    dispatch(ingredientModalClose());
    navigate("/");
  };

  return (
    <>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

ModalSwitch.propTypes = {
  background: PropTypes.bool.isRequired,
};

export default ModalSwitch;
