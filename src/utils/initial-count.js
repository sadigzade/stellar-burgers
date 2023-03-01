export const initialCount = (ingredients) => {
  return ingredients.map((ingredient) => ({ ...ingredient, count: 0 }));
};
