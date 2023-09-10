import { IsDecimal, IsInt, IsNotEmpty } from 'class-validator';

export class CreateCourseDTO {
  @IsDecimal()
  @IsNotEmpty()
    price: number;

  @IsInt()
  @IsNotEmpty()
    modeId: number;

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
