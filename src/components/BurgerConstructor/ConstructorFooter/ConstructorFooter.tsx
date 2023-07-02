import { FC, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../Modal/Modal";
import OrderDetailsModal from "../OrderDetailsModal/OrderDetailsModal";
import { useDispatch, useSelector } from "../../../hooks/hooks";
import { orderNumberRequestAsync, orderNumberReset } from "../../../services/actions/orderModal";

type ConstructorFooterProps = {
  constructorVisible: boolean;
  onConstructorVisible: () => void;
};

const ConstructorFooter: FC<ConstructorFooterProps> = ({
  constructorVisible,
  onConstructorVisible,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.user);
  const order = useSelector((state) => state.orderModal.order);
  const status = useSelector((state) => state.orderModal.status);
  const bun = useSelector((state) => state.constructorIngredients.bun);
  const ingredients = useSelector((state) => state.constructorIngredients.ingredients);
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleClick = () => {
    setPreviewOpen(!previewOpen);

    if (previewOpen) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  const totalPrice = useMemo(() => {
    const bunPrice = bun?.price ? bun?.price : 0;
    const ingredientsPrice = ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
    return 2 * bunPrice + ingredientsPrice;
  }, [bun?.price, ingredients]);

  const handleModalClose = () => {
    dispatch(orderNumberReset());
  };

  const handleOrderClick = () => {
    if (user) {
      const ingredientsId = ingredients.reduce(
        (res, ingredient) => [...res, ingredient._id],
        [bun?._id],
      );
      ingredientsId.push(bun?._id);
      dispatch(orderNumberRequestAsync(ingredientsId));
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 flex items-center justify-end gap-x-4 w-full px-2 py-4 bg-[#1C1C21] rounded-t-2xl">
      <div className="flex items-center gap-x-2">
        <span className="font-iceland text-[22px] leading-6">{totalPrice}</span>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        htmlType="button"
        type="primary"
        size="small"
        disabled={constructorVisible && (!bun || !ingredients.length)}
        onClick={constructorVisible ? handleOrderClick : onConstructorVisible}
        extraClass="w-[196px]"
      >
        {constructorVisible ? "Заказать" : "Cмотреть заказ"}
      </Button>
      {/* <Button
        id={"checkout"}
        htmlType="button"
        type="primary"
        disabled={!bun || !ingredients.length}
        size="medium"
        onClick={handleClick}
        extraClass="hidden"
      >
        Оформить заказ
      </Button> */}
      {status && (
        <Modal onClose={handleModalClose}>
          <OrderDetailsModal orderNumber={order?.number} />
        </Modal>
      )}
    </div>
  );
};

export default ConstructorFooter;
