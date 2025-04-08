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
  created_at: Date;
  updated_at: Date;
  rating: number | null;
}

export interface WorkPlaceRatingInterface {
  id: string;
  work_place_id: string;
  user_id: number;
  rating: number;
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
