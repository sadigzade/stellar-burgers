export const getFormatDate = (createdAt: string) => {
  let result = "";

  const date = new Date(createdAt);
  const currentDate = new Date();

  const hours = +date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = +date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  const day = date.getDate();

  if (+currentDate.getDate() - +day > 2) {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    result = `${day}/${month}/${year}, ${hours}:${minutes}`;
  } else if (+currentDate.getDate() - +day === 2) {
    result = `2 дня назад, ${hours}:${minutes}`;
  } else if (+currentDate.getDate() - +day === 1) {
    result = `Вчера, ${hours}:${minutes}`;
  } else {
    const min =
      +currentDate.getHours() * 60 +
      +currentDate.getMinutes() -
      (+date.getHours() * 60 + +date.getMinutes());

    if (min < 60) {
      result = `${min} минут назад`;
    } else {
      result = `Сегодня, ${hours}:${minutes}`;
    }
  }

  return result;
};
