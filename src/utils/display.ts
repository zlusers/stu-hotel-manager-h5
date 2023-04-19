/**
 * 获取当前时间
 */
export const getDate=()=> {
 let date= new Date()
 let year =date.getFullYear()
 let month= date.getMonth() + 1;
 return `${year}/${(month > 9) ? month : ("0" + month)}`
}