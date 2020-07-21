import { Pageable } from '../../common/pageable';

export class CreateUserDto extends Pageable{
  id:number;
  username:string;
}
