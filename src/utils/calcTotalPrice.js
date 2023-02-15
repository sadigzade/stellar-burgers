export const calcTotalPrice = (bun, ingredients) => {
  return 2 * bun.price + ingredients.reduce((acc, item) => acc + item.price, 0);
};
