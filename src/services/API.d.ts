declare namespace API {
  export interface APIResult<T> {
    data: T;
    errmsg: string;
    status: number;
  }
  export interface PaginationInput {
    pageNum?: number;
    pageSize?: number;
  }
  export interface PayWay {
    id: number;
		payWay:string;
  }
  export interface Upload {
    fileName:string;
    type:number;
    payWay:string;
    rangeTime:string;
  }
  export interface Search {
    payWay?:string,
    type?:string,
    rangeTime?:string,
    createTime?:string,
  }
  export interface Isearch extends Search {
    poStatus?:number|string,
    status?:number|string,
  }
  export interface BillItem {
    id:number;
		payWay:number;
		pmsNum:string;
		crsNum:string;
		checkinName:string;
		payMoney:string;
		checkinTime:string;
		checkOutTime:string;
		createTime:string;
		rangeTime:string;
		type:number;
  }
  export interface PmsItem {
    id:number;
		payWay:number;
		pmsNum:string;
		crsNum:string;
		checkinName:string;
		payMoney:string;
		checkinTime:string;
		checkOutTime:string;
		createTime:string;
		rangeTime:string;
		type:number;
    inCoinTime:string;
    diffSum:string;
    poStatus:string;
    memo:string;
  }

}
