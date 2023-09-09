import { type BaseEntity } from '../../entities/base.entity';
import { type User } from '../../entities/user.entity';

export interface IResult {
  statusCode: number
  message: string
  entity?: BaseEntity | null
  resultKeys: string[]
}

export interface ILoginDataResult {
  statusCode: number
  message: string
  token: string | null
  entity: User | null
  resultKeys: string[]
}

export const RESULT_OK = 'ok';
export const NOT_FOUND = 'not-found';
