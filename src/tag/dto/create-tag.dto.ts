import { Pageable } from '../../common/pageable';

export class CreateTagDto extends Pageable{
  id:number;
  name:string;
  articleTitle:string
}
