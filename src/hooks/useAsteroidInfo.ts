import { useTypedSelector } from "./useTypedSelector";

export const useAsteroidInfo = () => {
  const asteroidInfo = useTypedSelector(state => state.asteroid);

  return asteroidInfo;
};
