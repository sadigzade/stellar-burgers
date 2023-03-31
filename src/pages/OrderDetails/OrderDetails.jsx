import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderDetailsPage = () => {
  return (
    <section className="flex justify-center mt-30">
      <div className="flex flex-col w-[640px]">
        <div className="flex flex-col mb-15">
          <span className="text text_type_digits-default self-center mb-10">#034533</span>
          <h1 className="text text_type_main-medium mb-3">Black Hole Singularity острый бургер</h1>
          <span className="text text_type_main-default text_color_success">Выполнен</span>
        </div>
        <span className="text text_type_main-medium mb-6">Состав:</span>
        <div className="flex flex-col gap-y-4 max-h-[304px] overflow-y-scroll scrollbar pr-8 mb-10">
          <div className="flex items-center justify-between gap-x-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-solid bg-[#131317]">
              <img
                src="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
                className="absolute h-14 top-1/2 left-1/2 transform-50"
                alt=""
              />
            </div>
            <span className="text text_type_main-default grow">Флюоресцентная булка R2-D3</span>
            <div className="flex items-center gap-x-2">
              <span className="text text_type_digits-default">2 x 20</span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
          <div className="flex items-center justify-between gap-x-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-solid bg-[#131317]">
              <img
                src="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
                className="absolute h-14 top-1/2 left-1/2 transform-50"
                alt=""
              />
            </div>
            <span className="text text_type_main-default grow">Флюоресцентная булка R2-D3</span>
            <div className="flex items-center gap-x-2">
              <span className="text text_type_digits-default">2 x 20</span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
          <div className="flex items-center justify-between gap-x-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-solid bg-[#131317]">
              <img
                src="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
                className="absolute h-14 top-1/2 left-1/2 transform-50"
                alt=""
              />
            </div>
            <span className="text text_type_main-default grow">Флюоресцентная булка R2-D3</span>
            <div className="flex items-center gap-x-2">
              <span className="text text_type_digits-default">2 x 20</span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
          <div className="flex items-center justify-between gap-x-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-solid bg-[#131317]">
              <img
                src="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
                className="absolute h-14 top-1/2 left-1/2 transform-50"
                alt=""
              />
            </div>
            <span className="text text_type_main-default grow">Флюоресцентная булка R2-D3</span>
            <div className="flex items-center gap-x-2">
              <span className="text text_type_digits-default">2 x 20</span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
          <div className="flex items-center justify-between gap-x-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-solid bg-[#131317]">
              <img
                src="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
                className="absolute h-14 top-1/2 left-1/2 transform-50"
                alt=""
              />
            </div>
            <span className="text text_type_main-default grow">Флюоресцентная булка R2-D3</span>
            <div className="flex items-center gap-x-2">
              <span className="text text_type_digits-default">2 x 20</span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text text_type_main-default text_color_inactive">Вчера, 13:50</span>
          <div className="flex items-center gap-x-2">
            <span className="text text_type_digits-default">510</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </section>
  );
};
