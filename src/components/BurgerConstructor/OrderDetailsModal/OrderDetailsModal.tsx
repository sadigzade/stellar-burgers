import { FC } from "react";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type OrderDetailsModalProps = {
  orderNumber: number;
};

const OrderDetailsModal: FC<OrderDetailsModalProps> = ({ orderNumber }) => {
  return (
    <div className="flex flex-col items-center pt-30 pb-30">
      <h2 className="text text_type_digits-large text-shadow">{orderNumber}</h2>
      <span className="text text_type_main-medium mt-8">идентификатор заказа</span>
      <div className="flex items-center justify-center w-[120px] h-[120px] my-[15px] check-bg">
        <CheckMarkIcon type="primary" />
      </div>
      <span className="text text_type_main-default mb-2">Ваш заказ начали готовить</span>
      <span className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
};

export default OrderDetailsModal;
