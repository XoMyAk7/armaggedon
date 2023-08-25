export const endingCountLunar = (count: number) => {
  if (count % 10 === 1 && count % 100 !== 11) return "лунная орбита";
  if (
    count % 10 < 5 &&
    count % 10 > 0 &&
    (count % 100 < 11 ||
    count % 100 > 14)
  )
    return "лунные орбиты";
  return "лунных орбит";
};