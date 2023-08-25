export interface IDiameter {
  kilometers: {
    estimated_diameter_max: number;
    estimated_diameter_min: number;
  };
  meters: {
    estimated_diameter_max: number;
    estimated_diameter_min: number;
  };
}

export interface IAsteroid {
  close_approach_data: {
    close_approach_date: string;
    miss_distance: {
      lunar: string;
      kilometers: string;
    };
  }[];
  estimated_diameter: IDiameter;
  is_potentially_hazardous_asteroid: boolean;
  name: string;
  id: string;
  links: {
    self: string;
  };
}

export interface IAsteroidInfo extends IAsteroid {
  close_approach_data: {
    close_approach_date: string;
    miss_distance: {
      lunar: string;
      kilometers: string;
    };
    orbiting_body: string;
    relative_velocity: {
      kilometers_per_hour: string;
    };
  }[];
}
