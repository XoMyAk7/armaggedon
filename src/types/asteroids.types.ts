export interface IAsteroid {
  close_approach_data: {
    close_approach_date: string;
    miss_distance: {
      lunar: string;
      kilometers: string;
    };
  }[];
  estimated_diameter: {
    kilometers: {
      estimated_diameter_max: number;
      estimated_diameter_min: number;
    };
    meters: {
      estimated_diameter_max: number;
      estimated_diameter_min: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  name: string;
  id: string;
  links: {
    self: string;
  };
}
