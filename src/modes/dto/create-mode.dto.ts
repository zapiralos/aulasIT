import { IsNotEmpty, IsString } from 'class-validator';

export class CreateModeDTO {
  @IsString()
  @IsNotEmpty()
    name: string;
}
