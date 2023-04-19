//rfce
import React from 'react'
import SearchFrom from './components/searchFrom';
import Table from './containes/table';
import TableTile from 'src/components/TableTile';

/**
 * 
 * @returns  pms报表
 */

const Index: React.FC = () => {
   
    return (
       <div>
        <SearchFrom/>
        <TableTile title='对账结果数据列表' />
        <Table />
       </div>
    )
}

export default Index; 
