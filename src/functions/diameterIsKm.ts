import { IDiameter } from "../types/asteroids.types";

export const diameterIsKm = (asteroidDiameter: IDiameter) => 
  asteroidDiameter.kilometers.estimated_diameter_max +
        asteroidDiameter.kilometers.estimated_diameter_min / 2 >=
      1
