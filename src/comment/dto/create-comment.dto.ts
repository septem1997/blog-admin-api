import { Pageable } from '../../common/pageable';

export class CreateCommentDto extends Pageable{
  id:number;
  username:string;
  content:string;
  articleTitle:string;
}
