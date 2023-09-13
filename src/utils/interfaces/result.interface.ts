import { type BaseEntity } from '../../base/base.entity';
import { type User } from '../../users/user.entity';

export interface IResult {
  statusCode: number
  message: string
  entity?: BaseEntity | null
  entities?: BaseEntity[] | null
  resultKeys: string[]
}

export interface ILoginDataResult extends IResult {
  token: string | null
  entity: User | null
}

export const RESULT_OK = 'ok';
export const NOT_FOUND = 'not-found';
