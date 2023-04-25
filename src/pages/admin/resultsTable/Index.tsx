//rfce
import React, { useCallback, useMemo, useState } from 'react'
import SearchFrom from './components/searchFrom';
import Table from './containes/table';
import TableTile from 'src/components/TableTile';
import useAllPayWay from 'src/hook/usePaywary';
import { getDate } from 'src/utils/display';
import { queryOutFile, queryUpdateOffRes, useQueryGetBillResList } from 'src/services/apis';
import { message } from 'antd';

/**
 * 
 * @returns  pms报表
 */

const Index: React.FC = () => {
    const {data} =useAllPayWay()
    const [searchData, setSearchData] = useState<API.Isearch>({
      payWay:'',
      type:'',
      rangeTime:getDate(),
      createTime:'',
      poStatus:'',
      status:'',

    });
    const {data:dataList}=useQueryGetBillResList(searchData)
   
    const onSearch=useCallback((data:API.Isearch)=>{
        setSearchData(data)
    },[])
    const exportClick =useCallback(()=>{
        queryOutFile(searchData).then((res)=>{
            console.log(res,'===res')
            if(res.status===200){
                message.success(res?.data)
              }else {
                message.error(res?.message)
              }
        })
    },[searchData])

    const outClick=useCallback(()=>{
        queryUpdateOffRes({posStatus:2}).then((res)=>{
            if(res.status===200){
                message.success(res?.data)
              }else {
                message.error(res?.message)
              }
        })
    },[])

    return (
       <div>
        <SearchFrom payTypedata={data} onSearch={onSearch} exportClick={()=>exportClick()} 
         outClick={()=>outClick}/>
        <TableTile title='对账结果数据列表' />
        <Table  dataList={dataList} payTypedata={data}/>
       </div>
    )
}

export default Index; 
