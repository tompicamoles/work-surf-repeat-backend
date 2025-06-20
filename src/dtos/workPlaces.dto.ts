import { IsString, IsNumber, IsOptional, IsUrl, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateWorkPlaceDto {
  @IsString()
  @IsNotEmpty()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public type: string;

  @IsNumber()
  @IsNotEmpty()
  public spot_id: number;

  @IsString()
  @IsNotEmpty()
  public adress: string;

  @IsUrl()
  @IsOptional()
  public image_link?: string;

  @IsNumber()
  @IsNotEmpty()
  public latitude: number;

  @IsNumber()
  @IsNotEmpty()
  public longitude: number;

  @IsNumber()
  @IsOptional()
  public rating: number;

  @IsString()
  @IsOptional()
  public comment: string;
}

export class CreateWorkPlaceRatingDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  public rating: number;

  @IsString()
  @IsOptional()
  public comment: string;
}
