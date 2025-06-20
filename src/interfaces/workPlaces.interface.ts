export interface WorkPlaceInterface {
  id: string;
  name: string;
  type: string;
  spot_id: number;
  submitted_by: number;
  creator_name: string;
  adress: string;
  image_link: string;
  latitude: number;
  longitude: number;
  created_at?: Date;
  updated_at?: Date;
  total_ratings: number;
  average_rating: number;
  ratings: WorkPlaceRatingInterface[] | [];
}

export interface WorkPlaceRatingInterface {
  work_place_id: string;
  user_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface CreateWorkPlaceData {
  id: string;
  name: string;
  type: string;
  spot_id: number;
  submitted_by: number;
  creator_name: string;
  adress: string;
  image_link?: string;
  latitude: number;
  longitude: number;
}
