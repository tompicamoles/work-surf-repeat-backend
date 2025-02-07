import { IsString, IsNumber, IsOptional, IsUrl, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateWorkPlaceDto {
  @IsString()
  public name: string;

  @IsString()
  public type: string;

  @IsNumber()
  public spot_id: number;

  @IsNumber()
  public creator_user_id: number;

  @IsString()
  public adress: string;

  @IsUrl()
  @IsOptional()
  public image_link?: string;

  @IsNumber()
  public latitude: number;

  @IsNumber()
  public longitude: number;

  @IsNumber()
  public rating: number;
}

export class CreateWorkPlaceRatingDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  public rating: number;
} 