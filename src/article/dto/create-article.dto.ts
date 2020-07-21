import { Pageable } from '../../common/pageable';

export class CreateArticleDto extends Pageable{
  id:number;
  title:string;
  content:string;
  createTime:number;

}
