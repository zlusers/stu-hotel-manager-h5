//rfce
import React, { useState } from 'react'
import SearchFrom from './components/searchFrom';
import Table from './containes/table';
import AddMadal from './components/addModale';
import TableTile from 'src/components/TableTile';

/**
 * 
 * @returns  pms报表
 */

const Index: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const openModal = () => {
      setIsVisible(true);
    };
    const cleanModal = () => {
      setIsVisible(false);
    };
    return (
       <div>
        <SearchFrom onAdd={openModal}/>
        <TableTile title='PMS报表数据列表' />
        <Table />
        <AddMadal  visible={isVisible} onCancel={cleanModal} onOk={openModal}/>
       </div>
    )
}

export default Index; 
