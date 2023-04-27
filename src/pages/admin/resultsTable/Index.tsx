//rfce
import React, { useCallback, useEffect,useState } from 'react'
import SearchFrom from './components/searchFrom';
import Table from './containes/table';
import TableTile from 'src/components/TableTile';
import useAllPayWay from 'src/hook/usePaywary';
import { getDate } from 'src/utils/display';
import { queryOutFile, queryUpdateOffRes, querygetBillResList } from 'src/services/apis';
import { message } from 'antd';

/**
 * 
 * @returns  pms报表
 */

const Index: React.FC = () => {
  const [selectObj,setSelectObj]=useState<any[]>([])
  const [dataList,setDataList]=useState<any[]>([])
    const {data} =useAllPayWay()
    const [searchData, setSearchData] = useState<API.Isearch>({
      payWay:'',
      type:'',
      rangeTime:getDate(),
      createTime:'',
      poStatus:'',
      status:'',

    });
    const getList=useCallback(()=>{
      querygetBillResList(searchData).then((res)=>{
        setDataList(res)
      },)
    },[searchData])
    useEffect(()=>{
      getList()
    },[getList])
    const onSearch=useCallback((data:API.Isearch)=>{
        setSearchData(data)
    },[])
    const exportClick =useCallback(()=>{
        queryOutFile(searchData).then((res)=>{
            
            if(res.status===200){
                getList()
                message.success(res?.data)
              }else {
                message.error(res?.message)
              }
        })
    },[searchData,getList])

    const outClick=useCallback(()=>{
      if(selectObj && selectObj.length>0){
        let bid = selectObj?.map(x => x.bId);
        let pid = selectObj?.map(x => x.pId);
        let bids = bid?.filter(function (s) {
          return s && s.trim(); 
       });
       let pids = pid?.filter(function (s) {
        return s && s.trim(); 
     });
        queryUpdateOffRes({poStatus:1,bids:bids,pids:pids}).then((res)=>{
            if(res.status===200){
                message.success('核销成功')
                getList()
              }else {
                message.error(res?.message)
              }
        })
      }
      
    },[selectObj,getList])
    const onCancel=useCallback((e:any)=>{
    
      let bids =[e.bId] ;
      let pids =[e.pId] ;
      queryUpdateOffRes({poStatus:2,bids:bids,pids:pids}).then((res)=>{
          if(res.status===200){
              message.success('撤销核销成功')
              getList()
            }else {
              message.error(res?.message)
            }
      })
  },[getList])

    return (
       <div>
        <SearchFrom payTypedata={data} onSearch={onSearch} exportClick={()=>exportClick()} 
         outClick={()=>outClick()}/>
        <TableTile title='对账结果数据列表' />
        <Table  dataList={dataList} payTypedata={data} onSeChange={(e)=>setSelectObj(e)} onCancel={(e)=>onCancel(e)}/>
       </div>
    )
}

export default Index; 
