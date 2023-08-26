interface IMiddleDiameter {
  estimated_diameter_max: number;
  estimated_diameter_min: number;
}

export const getDiameter = (diameter: IMiddleDiameter) =>
  Math.round(
    (diameter.estimated_diameter_max + diameter.estimated_diameter_min) / 2
  );
