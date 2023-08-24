import { useTypedSelector } from "./useTypedSelector";

export const useDistance = () => {
  const distance = useTypedSelector(state => state.distance);

  return distance;
};
