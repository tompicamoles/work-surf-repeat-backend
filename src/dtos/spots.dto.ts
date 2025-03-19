import { IsString, IsNumber, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateSpotDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public country: string;

  @IsString()
  @IsOptional()
  public image_link?: string;

  @IsBoolean()
  @IsOptional()
  public has_coworking?: boolean;

  @IsBoolean()
  @IsOptional()
  public has_coliving?: boolean;

  @IsNumber()
  @IsNotEmpty()
  public latitude: number;

  @IsNumber()
  @IsNotEmpty()
  public longitude: number;

  // @IsString()
  // @IsNotEmpty()
  // public submitted_by: string;

  @IsNumber()
  @IsNotEmpty()
  public wifi_quality: number;
}
