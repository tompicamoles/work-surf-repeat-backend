import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateSpotDto {
  @IsString()
  public name: string;

  @IsNumber()
  public country_id: number;

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
  public latitude: number;

  @IsNumber()
  public longitude: number;
} 

