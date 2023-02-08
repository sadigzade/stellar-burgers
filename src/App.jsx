import React from "react";
import "./App.css";
import { products } from "./utils/data";
import AppHeader from "./components/AppHeader/AppHeader";
import AppMain from "./components/AppMain/AppMain";
import BurgerIngredients from "./components/AppMain/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "./components/AppMain/BurgerConstructor/BurgerConstructor";

const buns = products.filter((product) => product.type === "bun");
const sauces = products.filter((product) => product.type === "sauce");
const mains = products.filter((product) => product.type === "main");

const constructorIngredients = [
  {
    _id: "60666c42cc7b410027a1a9b9",
    text: "Соус традиционный галактический",
    price: 30,
    thumbnail: "https://code.s3.yandex.net/react/code/sauce-03.png",
  },
  {
    _id: "60666c42cc7b410027a1a9b4",
    text: "Мясо бессмертных моллюсков Protostomia",
    price: 300,
    thumbnail: "https://code.s3.yandex.net/react/code/meat-02.png",
  },
  {
    _id: "60666c42cc7b410027a1a9bc",
    text: "Плоды Фалленианского дерева",
    price: 80,
    thumbnail: "https://code.s3.yandex.net/react/code/sp_1.png",
  },
  {
    _id: "60666c42cc7b410027a1a9bb",
    text: "Хрустящие минеральные кольца",
    price: 80,
    thumbnail: "https://code.s3.yandex.net/react/code/mineral_rings.png",
  },
  {
    _id: "60666c42cc7b410027a1a9bb",
    text: "Хрустящие минеральные кольца",
    price: 80,
    thumbnail: "https://code.s3.yandex.net/react/code/mineral_rings.png",
  },
];

const ingredients = [
  { value: "bun", text: "Булки", data: buns },
  { value: "sauce", text: "Соусы", data: sauces },
  { value: "main", text: "Начинки", data: mains },
];

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <AppMain>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor constructorIngredients={constructorIngredients} />
        </AppMain>
      </div>
    );
  }
}

export default App;
