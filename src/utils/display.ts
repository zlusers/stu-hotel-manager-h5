/**
 * 获取当前时间
 */
export const getDate=()=> {
 let date= new Date()
 let year =date.getFullYear()
 let month= date.getMonth() + 1;
 return `${year}${(month > 9) ? month : ("0" + month)}`
}
export const getDate1=()=> {
    let date= new Date()
    let year =date.getFullYear()
    let month= date.getMonth() + 1;
    return `${year}/${(month > 9) ? month : ("0" + month)}`
   }

export const getPayType=(data:API.PayWay[]|null,id:number)=>{
    if(data){
        return  data.find((item)=>item?.id===id)?.payWay
    }
    return id
}

export const getDateStr=(str:string)=> {
    if(str){
        let date= str?.split('T')
        return date?.[0]
    }
    return '--'
}