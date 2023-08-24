import { useTypedSelector } from "./useTypedSelector";

export const useSize = () => {
  const size = useTypedSelector(state => state.size);

  return size;
};
