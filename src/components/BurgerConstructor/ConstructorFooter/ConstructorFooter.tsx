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
    <div className="fixed lg:sticky bottom-0 left-0 flex items-center justify-end gap-x-4 w-full px-2 lg:px-0 py-4 lg:py-0 bg-[#1C1C21] lg:bg-transparent rounded-t-2xl lg:mt-10">
      <div className="flex items-center gap-x-2">
        <span className="font-iceland text-[22px] lg:text-[48px] leading-6 lg:leading-9">
          {totalPrice}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <div className="lg:hidden">
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
      </div>
      <div className="hidden lg:block mr-4">
        <Button htmlType="button" type="primary" size="large" onClick={handleOrderClick}>
          Оформить заказ
        </Button>
      </div>
      {status && (
        <Modal onClose={handleModalClose}>
          <OrderDetailsModal orderNumber={order?.number} />
        </Modal>
      )}
    </div>
  );
};

export default ConstructorFooter;
