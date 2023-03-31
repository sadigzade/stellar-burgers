import React from "react";
import { useLocation } from "react-router-dom";
import OrderCard from "./OrderCard/OrderCard";

const Historys = () => {
  const { pathname } = useLocation();
  const hAuto = pathname === "/feed" ? "h-auto-188" : "h-auto-128";

  return (
    <div className={`flex flex-col gap-y-6 overflow-y-scroll ${hAuto} scrollbar pr-4 w-full`}>
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
    </div>
  );
};

export default Historys;
