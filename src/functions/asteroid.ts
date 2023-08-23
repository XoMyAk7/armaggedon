export function getName(name: string) {
  const start_pos = name.indexOf("(") + 1;
  const end_pos = name.indexOf(")", start_pos);
  const name_to_get = name.substring(start_pos, end_pos);
  return name_to_get;
}
