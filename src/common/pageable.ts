export class Pageable {
  private _pageNum:number;
  private _pageSize:number;

  get pageNum(): number {
    return this._pageNum;
  }

  set pageNum(value: number) {
    this._pageNum = value;
  }

  get pageSize(): number {
    console.log('获取size')
    return this._pageSize;
  }

  set pageSize(value: number) {
    this._pageSize = value;
  }
}
