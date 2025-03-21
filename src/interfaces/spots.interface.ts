export interface Spot {
  id: number;
  name: string;
  country: number;
  image_link: string;
  has_coworking: boolean;
  has_coliving: boolean;
  latitude: string;
  longitude: string;
  submitted_by: string;
  wifi_quality: number;
  country_code: string;
  continent: string;
  surf_season: string;
  good_weather_season: string;
  timezone: string;
  life_cost: number;
}

export interface SpotLike {
  id: number;
  user_id: number;
  spot_id: number;
}
