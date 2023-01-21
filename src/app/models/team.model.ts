export interface Parameters {
  id: string;
}

export interface HighestRaceFinish {
  position: number;
  // eslint-disable-next-line id-blacklist
  number: number;
}

export interface Response {
  id: number;
  name: string;
  logo: string;
  base: string;
  first_team_entry: number;
  world_championships: number;
  highest_race_finish: HighestRaceFinish;
  pole_positions: number;
  fastest_laps: number;
  president: string;
  director: string;
  technical_manager: string;
  chassis: string;
  engine: string;
  tyres: string;
}

export interface TeamResponse {
  get: string;
  parameters: Parameters;
  errors: any[];
  results: number;
  response: Response[];
}
