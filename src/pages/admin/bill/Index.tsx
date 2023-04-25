//rfce
import React, { useCallback, useState } from 'react'
import SearchFrom from './components/searchFrom';
import Table from './containes/table';
import AddMadal from './components/addModale';
import TableTile from 'src/components/TableTile';
import { querybillUpload, useQuerygetBillList } from 'src/services/apis';
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
    const {data:PsmData}=useQuerygetBillList(searchData)
    const openModal = () => {
      setIsVisible(true);
    };
    const cleanModal = () => {
      setIsVisible(false);
    };
    const onSearch=useCallback((data:{payWay:string,
      type:string,
      rangeTime:string,
      createTime:string,})=>{
        setSearchData(data)
    },[])
    const onAddTable=useCallback((data:API.Upload)=>{
      querybillUpload(data).then((res)=>{
        if(res.status===200){
          message.success('上传成功')
          setIsVisible(false);

        }else {
          message.error('上传失败')
        }
      })
    },[])
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


