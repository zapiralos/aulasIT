import { IsDecimal, IsInt, IsNotEmpty } from 'class-validator';
import { Mode } from '../../modes/mode.entity';

export class CreateCourseDTO {
  @IsDecimal()
  @IsNotEmpty()
    price: number;

  @IsInt()
  @IsNotEmpty()
    mode: Mode;

  @IsInt()
  @IsNotEmpty()
    categoryId: number;

  @IsInt()
  @IsNotEmpty()
    teacherId: number;

  @IsInt()
  @IsNotEmpty()
    subjectId: number;
}
