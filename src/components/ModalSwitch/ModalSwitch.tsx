import { FC } from "react";
import { useDispatch } from "../../hooks/hooks";
import { Route, Routes, useNavigate } from "react-router-dom";
import IngredientDetails from "../BurgerIngredients/IngredientCategory/Ingredient/IngredientDetails/IngredientDetails";
import { ingredientModalClose } from "../../services/actions/ingredientModal";
import Modal from "../Modal/Modal";
import FeedOrderDetails from "../HistoryOrders/FeedOrderDetails/FeedOrderDetails";

type LocationState = {
  pathname: string;
  state: null | LocationState;
};

type ModalSwitchProps = {
  background: null | LocationState;
};

const ModalSwitch: FC<ModalSwitchProps> = ({ background }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleModalClose = () => {
    dispatch(ingredientModalClose());
    document.body.style.overflow = "";

    if (background) {
      navigate(background?.pathname);
    }
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
          <Route
            path="/feed/:id"
            element={
              <Modal onClose={handleModalClose}>
                <FeedOrderDetails />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <Modal onClose={handleModalClose}>
                <FeedOrderDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default ModalSwitch;
