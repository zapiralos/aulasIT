import { type baseEntity } from '../../entities/base.entity';

export interface IResult {
  statusCode: number
  message: string
  entity?: baseEntity | null
  resultKeys: string[]
}
