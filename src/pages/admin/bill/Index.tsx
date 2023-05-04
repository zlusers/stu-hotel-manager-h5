//rfce
import React, { useCallback, useEffect, useState } from 'react'
import SearchFrom from './components/searchFrom';
import Table from './containes/table';
import AddMadal from './components/addModale';
import TableTile from 'src/components/TableTile';
import { queryGetBillList, querybillUpload } from 'src/services/apis';
import { getDate } from 'src/utils/display';
import useAllPayWay from 'src/hook/usePaywary';
import { message } from 'antd';
/**
 * 
 * @returns  对账单报表
 */

const Index =() => {
  const {data} =useAllPayWay()
    const [isVisible, setIsVisible] = useState(false);
    const [searchData, setSearchData] = useState({
      payWay:'',
      type:'',
      rangeTime:getDate(),
      createTime:'',
    });
    const [isState, setIsState] = useState(true);
    const [PsmData,setPsmData]=useState<API.PmsItem[]>([])


    const getList=useCallback(()=>{
      queryGetBillList(searchData).then((res)=>{
        setPsmData(res)
      },)
    },[searchData])
    useEffect(()=>{
      getList()
    },[getList])
   
    const openModal = () => {
      setIsVisible(true);
      setIsState(true)
    };
    const cleanModal = () => {
      setIsVisible(false);
      setIsState(true)
    };
    const onSearch=useCallback((data:{payWay:string,
      type:string,
      rangeTime:string,
      createTime:string,})=>{
        setSearchData(data)
    },[])
    const onAddTable=useCallback((data:API.Upload)=>{
      if(isState){
        setIsState(false)
        querybillUpload(data).then((res)=>{
          setIsState(true)
          if(res.status===200){
            message.success(res.message)
            getList()
            setIsVisible(false);
          }else {
            message.error(res.message)
          }
        })
      }
    },[getList,isState])
    return (
       <div>
        <SearchFrom onAdd={openModal} data={searchData} payTypedata={data} onSearch={onSearch}/>
        <TableTile title='对账单数据列表' />
        <Table  PmsData={PsmData}  payTypedata={data}/>
        <AddMadal  visible={isVisible} onCancel={cleanModal} onOk={onAddTable} payTypedata={data}/>
       </div>
    )
}

export default Index; 


