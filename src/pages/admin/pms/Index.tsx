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
import LookMadal from './components/lookModal';
/**
 * 
 * @returns  pms报表
 */
const PMSKEYS = 'PMS_UPLOAD_NAME';
const PMSKEYSLocal = localStorage.getItem(PMSKEYS);
let pmsUploadListLocal: string[] = [];
// 本地缓存数据设置容错
try {
  pmsUploadListLocal = PMSKEYSLocal ? JSON.parse(PMSKEYSLocal) : [];
} catch (err) {
    console.error(err, PMSKEYSLocal);
}
const Index =() => {
  const {data} =useAllPayWay()
    const [isVisible, setIsVisible] = useState(false);
    const [isLookModal, setIsLookModal] = useState(false);
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
    const setLocal=useCallback((data:string)=>{
      pmsUploadListLocal.push(data);
      // 修改本地缓存
      localStorage.setItem(PMSKEYS, JSON.stringify(pmsUploadListLocal));
    },[])
    const onAddTable=useCallback((data:API.Upload)=>{
      if(isState){
        setIsState(false)
        queryPmsUpload(data).then((res)=>{
          setIsState(true)
          if(res.status===200){
            message.success(res.message)
            setIsVisible(false);
            setLocal(data.fileName)
            getList()
          }else {
            message.error(res.message)
          }
        })
      }
     
    },[getList,isState,setLocal])
  
    return (
       <div>
        <SearchFrom onAdd={openModal}payTypedata={data} onSearch={onSearch} key={'pms'} onLook={()=>setIsLookModal(true)}/>
        <TableTile title='PMS报表数据列表' />
        <Table  PmsData={PsmData}  payTypedata={data}/>
        <AddMadal  visible={isVisible} onCancel={cleanModal} onOk={onAddTable} payTypedata={data}/>
        <LookMadal  visible={isLookModal} onOk={()=>setIsLookModal(false)} data={pmsUploadListLocal}/>
       </div>
    )
}

export default Index; 


