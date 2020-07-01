import { Pageable } from '../../common/pageable';

export class CreateAdminDto extends Pageable{
  username: string;
  password: string;
}
