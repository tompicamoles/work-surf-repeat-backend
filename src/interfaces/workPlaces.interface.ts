export interface WorkPlace {
  id: number;
  name: string;
  type: string;
  spot_id: number;
  creator_user_id: number;
  adress: string;
  image_link: string;
  latitude: number;
  longitude: number;
  created_at: Date;
  updated_at: Date;
  rating: number | null;
}

export interface WorkPlaceRating {
  id: number;
  work_place_id: number;
  user_id: number;
  rating: number;
}
