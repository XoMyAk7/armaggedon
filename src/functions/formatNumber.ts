export const formatNumber = (distance: string) => {
  return new Intl.NumberFormat("ru-RU")
    .format(Math.round(Number(distance)))
    .toString();
};
