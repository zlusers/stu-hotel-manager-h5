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
import LookMadal from './components/lookMadal';
/**
 * 
 * @returns  对账单报表
 */
const DZDKEYS = 'DZD_UPLOAD_NAME';
const DZDKEYSLocal = localStorage.getItem(DZDKEYS);
let dzdUploadListLocal: string[] = [];
// 本地缓存数据设置容错
try {
  dzdUploadListLocal = DZDKEYSLocal ? JSON.parse(DZDKEYSLocal) : [];
} catch (err) {
    console.error(err, DZDKEYSLocal);
}
const Index =() => {
  const {data} =useAllPayWay()
  const [isLookModal, setIsLookModal] = useState(false);
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
    const setLocal=useCallback((data:string)=>{
      dzdUploadListLocal.push(data);
      // 修改本地缓存
      localStorage.setItem(DZDKEYS, JSON.stringify(dzdUploadListLocal));
    },[])
    const onAddTable=useCallback((data:API.Upload)=>{
      if(isState){
        setIsState(false)
        querybillUpload(data).then((res)=>{
          setIsState(true)
          if(res.status===200){
            message.success(res.message)
            getList()
            setLocal(data.fileName);
            setIsVisible(false);
          }else {
            message.error(res.message)
          }
        })
      }
    },[getList,isState,setLocal])
    return (
       <div>
        <SearchFrom onAdd={openModal} data={searchData} payTypedata={data} onSearch={onSearch} onLook={()=>setIsLookModal(true)}/>
        <TableTile title='对账单数据列表' />
        <Table  PmsData={PsmData}  payTypedata={data}/>
        <AddMadal  visible={isVisible} onCancel={cleanModal} onOk={onAddTable} payTypedata={data}/>
        <LookMadal  visible={isLookModal} onOk={()=>setIsLookModal(false)} data={dzdUploadListLocal}/>
      
       </div>
    )
}

export default Index; 


