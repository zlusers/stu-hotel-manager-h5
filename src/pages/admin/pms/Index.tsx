//rfce
import React, { useCallback, useEffect, useState } from 'react'
import SearchFrom from './components/searchFrom';
import Table from './containes/table';
import AddMadal from './components/addModale';
import TableTile from 'src/components/TableTile';
import { queryGetPmsList, queryPmsUpload } from 'src/services/apis';
import { getDate } from 'src/utils/display';
import useAllPayWay from 'src/hook/usePaywary';
import { message } from 'antd';
/**
 * 
 * @returns  pms报表
 */

const Index =() => {
  const {data} =useAllPayWay()
    const [isVisible, setIsVisible] = useState(false);
    const [searchData, setSearchData] = useState<API.Search>({
      payWay:'',
      type:'',
      rangeTime:getDate(),
      createTime:'',
    });
    const [PsmData,setPsmData]=useState<API.PmsItem[]>([])

    const [isState, setIsState] = useState(true);
    const getList=useCallback(()=>{
      queryGetPmsList(searchData).then((res)=>{
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
    const onSearch=useCallback((data:API.Search)=>{
        setSearchData(data)
    },[])
    const onAddTable=useCallback((data:API.Upload)=>{
      if(isState){
        setIsState(false)
        queryPmsUpload(data).then((res)=>{
          setIsState(true)
          if(res.status===200){
            message.success(res.message)
            setIsVisible(false);
            getList()
          }else {
            message.error(res.message)
          }
        })
      }
     
    },[getList,isState])
    return (
       <div>
        <SearchFrom onAdd={openModal}payTypedata={data} onSearch={onSearch} key={'pms'}/>
        <TableTile title='PMS报表数据列表' />
        <Table  PmsData={PsmData}  payTypedata={data}/>
        <AddMadal  visible={isVisible} onCancel={cleanModal} onOk={onAddTable} payTypedata={data}/>
       </div>
    )
}

export default Index; 


