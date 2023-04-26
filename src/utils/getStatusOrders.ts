import { TWSOrders, TWSOrdersStatus } from "../services/types/data";

export const getStatusOrders = (orders: ReadonlyArray<TWSOrders>, status: TWSOrdersStatus) => {
  const res = [];

  for (let i = 0; i < orders.length; i++) {
    if (res.length !== 10) {
      if (orders[i].status === status) {
        res.push({ id: orders[i]._id, number: orders[i].number });
      }

      continue;
    }

    break;
  }

  return res;
};
