import { useTypedSelector } from "./useTypedSelector";

export const useBacket = () => {
  const basket = useTypedSelector(state => state.basket);

  return basket;
};
