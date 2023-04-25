//rfce
import React, { useCallback, useState } from 'react'
import SearchFrom from './components/searchFrom';
import Table from './containes/table';
import AddMadal from './components/addModale';
import TableTile from 'src/components/TableTile';
import { queryPmsUpload, useQueryGetPmsList } from 'src/services/apis';
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
    const {data:PsmData}=useQueryGetPmsList(searchData)
    const openModal = () => {
      setIsVisible(true);
    };
    const cleanModal = () => {
      setIsVisible(false);
    };
    const onSearch=useCallback((data:API.Search)=>{
        setSearchData(data)
    },[])
    const onAddTable=useCallback((data:API.Upload)=>{
      queryPmsUpload(data).then((res)=>{
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
        <SearchFrom onAdd={openModal}payTypedata={data} onSearch={onSearch} key={'pms'}/>
        <TableTile title='PMS报表数据列表' />
        <Table  PmsData={PsmData}  payTypedata={data}/>
        <AddMadal  visible={isVisible} onCancel={cleanModal} onOk={onAddTable} payTypedata={data}/>
       </div>
    )
}

export default Index; 


