import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateLikeDto {
    @IsNumber()
    @IsNotEmpty()
    public user_id: number;
  
    @IsNumber()
    @IsNotEmpty()
    public spot_id: number;
  }