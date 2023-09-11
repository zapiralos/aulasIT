import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

import { capitalizeFirstLetter } from '../../utils/functions';

export class CreateSectorDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  @Transform(({ value }) => {
    value.trim();
    value = capitalizeFirstLetter(value);
    return value;
  })
    sectorName: string;
}

export class UpdateSectorDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  @Transform(({ value }) => {
    value.trim();
    value = capitalizeFirstLetter(value);
    return value;
  })
    sectorName: string;
}
