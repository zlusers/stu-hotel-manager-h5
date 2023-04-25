//rfce
import React from 'react'

import TableView from './containes/table';
import cls from  './index.module.scss';
import LeftCard from './components/leftCard';


/**
 * 
 * @returns  pms报表
 */
const Index: React.FC = () => {

    return (
       <div className={cls.page}>
        <LeftCard/>
        <TableView />
       </div>
    )
}

export default Index; 
