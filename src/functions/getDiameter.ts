import { IDiameter } from "../types/asteroids.types";
import { diameterIsKm } from "./diameterIsKm";

interface IMiddleDiameter {
  estimated_diameter_max: number;
  estimated_diameter_min: number;
}

const diameterRound = (diameter: IMiddleDiameter) =>
  Math.round(
    (diameter.estimated_diameter_max + diameter.estimated_diameter_min) / 2
  );

export const getDiameter = (asteroidDiameter: IDiameter) => {
  return diameterIsKm(asteroidDiameter)
    ? (asteroidDiameter.kilometers.estimated_diameter_max +
        asteroidDiameter.kilometers.estimated_diameter_min) /
        2 <
      10
      ? Math.round(
          ((asteroidDiameter.kilometers.estimated_diameter_max +
            asteroidDiameter.kilometers.estimated_diameter_min) *
            10) /
            2
        ) / 10
      : diameterRound(asteroidDiameter.kilometers)
    : diameterRound(asteroidDiameter.meters);
};
