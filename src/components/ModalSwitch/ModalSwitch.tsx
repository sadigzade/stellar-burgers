import { FC } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import IngredientDetails from "../BurgerIngredients/IngredientCategory/Ingredient/IngredientDetails/IngredientDetails";
import { ingredientModalClose } from "../../services/ingredientModal/action";
import Modal from "../Modal/Modal";

interface ILocationState {
  pathname: string;
  state: null | ILocationState;
}

interface IModalSwitchProps {
  background: null | ILocationState;
}

const ModalSwitch: FC<IModalSwitchProps> = ({ background }) => {
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

export default ModalSwitch;
