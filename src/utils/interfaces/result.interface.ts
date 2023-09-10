import { type BaseEntity } from '../../entities/base.entity';
import { type User } from '../../entities/user.entity';

export interface IResult {
  statusCode: number
  message: string
  entity?: BaseEntity | null
  resultKeys: string[]
}

export interface ILoginDataResult extends IResult {
  token: string | null
  entity: User | null
}

export const RESULT_OK = 'ok';
export const NOT_FOUND = 'not-found';
