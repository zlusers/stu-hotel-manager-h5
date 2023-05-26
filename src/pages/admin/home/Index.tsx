//rfce
import React, { useCallback, useEffect, useState } from 'react'

import TableView from './containes/table';
import cls from  './index.module.scss';
import LeftCard from './components/leftCard';
import {querygetPayTypeList} from 'src/services/apis';

/**
 * 
 * @returns  pms报表
 */
const Index: React.FC = () => {
    const [homeData,setHomeData]=useState<{ payWay: number,
        varianceMoney: number,
        underseparationMoney: number}[]>([])
    const [type,setType]=useState(4)
    const getList=useCallback((v:any)=>{
        setType(v)
        querygetPayTypeList({type:Number(v)})
        .then((res)=>{
            setHomeData(res)
        })
    },[])
    useEffect(()=>{
        getList(4)
    },[getList])

    return (
       <div className={cls.page}>
        <LeftCard onDelete={()=>getList(type)}/>
        <TableView  homeData={homeData} onSearchClick={(v)=>getList(v)}/>
       </div>
    )
}

export default Index; 
