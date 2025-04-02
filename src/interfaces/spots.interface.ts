export interface Spot {
  id: number;
  name: string;
  country: string;
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
  creator_name: string;
  like_user_ids: number[];
  total_likes: number;
}

export interface SpotLike {
  id: number;
  user_id: number;
  spot_id: number;
}

// Input type for creating a spot in the database
export interface CreateSpotData {
  name: string;
  country: string;
  image_link?: string;
  has_coworking?: boolean;
  has_coliving?: boolean;
  latitude: string | number;
  longitude: string | number;
  submitted_by: string | number;
  wifi_quality: number;
  creator_name: string;
}
