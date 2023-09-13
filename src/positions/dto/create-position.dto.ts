import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePositionDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
    positionName: string;
}
