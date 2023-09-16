import { IsDecimal, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCourseDTO {
  @IsNotEmpty({ message: 'El precio no puede estar vacío.' })
  @IsDecimal({ decimal_digits: '2' })
    price: number;

  @IsInt()
  @IsOptional()
    modeId: number | null;

  @IsInt()
  @IsOptional()
    categoryId: number | null;

  @IsInt()
  @IsOptional()
    teacherId: number | null;

  @IsInt()
  @IsOptional()
    subjectId: number | null;
}
