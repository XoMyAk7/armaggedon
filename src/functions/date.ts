export function getToDay() {
  const d = new Date();
  let month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function getNextDay(day: string) {
  let d = new Date(day);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().substring(0, 10);
}

export function getDay(day: string) {
  const month = [
    "янв",
    "фев",
    "март",
    "апр",
    "май",
    "июнь",
    "июль",
    "авг",
    "сент",
    "окт",
    "нояб",
    "дек",
  ];
  const date = day.split("-");
  const convertDate =
    Number(date[2]).toString() + ' ' + month[Number(date[1]) - 1] + ' ' + date[0];
  return convertDate;
}
