export interface WorkPlaceInterface {
  id: number;
  name: string;
  type: string;
  spot_id: number;
  submitted_by: number;
  creator_name: string;
  adress: string;
  image_link: string;
  latitude: number;
  longitude: number;
  created_at: Date;
  updated_at: Date;
  rating: number | null;
}

export interface WorkPlaceRatingInterface {
  id: number;
  work_place_id: number;
  user_id: number;
  rating: number;
}

export interface CreateWorkPlaceData {
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
