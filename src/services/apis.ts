import useSWR from 'swr';
import { AxiosResponse } from 'axios';
import { urls } from 'src/services/url';
import request from 'src/utils/request';
import { requestFormData } from 'src/utils/requestfromData';

function defaultResultParse(res: AxiosResponse<any>) {
  try {
    const content = res.data;
    return content;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
// 1、获取支付方式列表
export async function queryGetAllPayWay(): Promise<API.PayWay[]> {
  return request.post(urls.getAllPayWay, {})
  .then(defaultResultParse)
  .then((res)=>{
    return res?.data||[]
  });
}

export function useQuerygetAllPayWay({ type=true }: { type:boolean}) {
  const swrResult = useSWR(
    () => (type ? ['queryGetAllPayWay', type] : null),
    () => queryGetAllPayWay()
  );
  return {
    ...swrResult,
    loading: !swrResult.data && !swrResult.error,
  };
}
// 获取首页列表
export async function querygetPayTypeList({type}:{type:number|string}): Promise<{
  payWay: number,
	varianceMoney: number,
	underseparationMoney: number
}[]> {
  return request.post(urls.getPayTypeList, {type:type===4?'':type})
  .then(defaultResultParse)
  .then((res)=>{return res.data
  });
}

export function useQuerygetPayTypeList({ type }: { type:number|string}) {
  const swrResult = useSWR(
    () => (type ? ['querygetPayTypeList', type] : null),
    () => querygetPayTypeList({type})
  );
  return {
    ...swrResult,
    loading: !swrResult.data && !swrResult.error,
  };
}

// 新增支付方式
export async function queryNewPayWay({payWay}:{payWay:string}): Promise<any> {
  return requestFormData(urls.newPayWay, {payWay},)
  .then((res)=>{return res});
}

export async function queryRemoveList({rangeTime,createTime,pmsOrBill}:{rangeTime:string,createTime:string,pmsOrBill:string}): Promise<any> {
  return request.post(urls.removeList, {rangeTime,createTime,pmsOrBill})
  .then(defaultResultParse)
  .then((res)=>{return res?.data});
}

// getPmsList

export async function queryGetPmsList(parms: { payWay?:string,
  type?:string,
  rangeTime?:string,
  createTime?:string,}): Promise<API.PmsItem[]> {
  return request.post(urls.getPmsList, parms)
  .then(defaultResultParse)
  .then((res)=>{return res.data || []});
}

export function useQueryGetPmsList({ 
  payWay,
  type,       // 1:中介  2：如家  3：华住
  rangeTime,
  createTime
 }: { payWay?:string,
  type?:string,
  rangeTime?:string,
  createTime?:string,}) {
  const swrResult = useSWR(
    () => (['queryGetPmsList', payWay,type,rangeTime,createTime]),
    () => queryGetPmsList({payWay,type,rangeTime,createTime})
  );
  return {
    ...swrResult,
    loading: !swrResult.data && !swrResult.error,
  };
}
//pmsUpload 
export async function queryPmsUpload(parms:API.Upload): Promise<any> {
  return request.post(urls.pmsUpload, parms)
  .then(defaultResultParse)
  .then((res)=>{return res});
}

// 对账单
//pmsUpload 
export async function querybillUpload(parms:API.Upload): Promise<any> {
  return request.post(urls.billUpload, parms)
  .then(defaultResultParse)
  .then((res)=>{return res});
}
export async function queryGetBillList(parms: { payWay?:string,
  type?:string,
  rangeTime?:string,
  createTime?:string,}): Promise<API.PmsItem[]> {
  return request.post(urls.getBillList, parms)
  .then(defaultResultParse)
  .then((res)=>{return res.data || []});
}
export function useQuerygetBillList({ 
  payWay,
  type,       // 1:中介  2：如家  3：华住
  rangeTime,
  createTime
 }: { payWay?:string,
  type?:string,
  rangeTime?:string,
  createTime?:string,}) {
  const swrResult = useSWR(
    () => (['getBillList', payWay,type,rangeTime,createTime]),
    () => queryGetBillList({payWay,type,rangeTime,createTime})
  );
  return {
    ...swrResult,
    loading: !swrResult.data && !swrResult.error,
  };
}
// getBillResList
export async function querygetBillResList(parms: { payWay?:string,
  type?:string,
  rangeTime?:string,
  createTime?:string,poStatus?:string|number,status?:string|number}): Promise<any[]> {
  return request.post(urls.getBillResList, parms)
  .then(defaultResultParse)
  .then((res)=>{return res.data || []});
}
export function useQueryGetBillResList({ 
  payWay,
  type,       // 1:中介  2：如家  3：华住
  rangeTime,
  createTime,
  poStatus,status
 }: { payWay?:string,
  type?:string,
  rangeTime?:string,
  createTime?:string,poStatus?:string|number,status?:string|number}) {
  const swrResult = useSWR(
    () => (['getBillResList', payWay,type,rangeTime,createTime,poStatus,status]),
    () => querygetBillResList({payWay,type,rangeTime,createTime,poStatus,status})
  );
  return {
    ...swrResult,
    loading: !swrResult.data && !swrResult.error,
  };
}
// 
export async function queryOutFile(parms: { payWay?:string,
  type?:string,
  rangeTime?:string,
  createTime?:string,poStatus?:string|number,status?:string|number}): Promise<any> {
  return request.post(urls.outFile, parms)
  .then(defaultResultParse)
  .then((res)=>{return res});
}
export async function queryUpdateOffRes(parms: {posStatus:number }): Promise<any> {
  return request.post(urls.updateOffRes, parms)
  .then(defaultResultParse)
  .then((res)=>{return res});
}