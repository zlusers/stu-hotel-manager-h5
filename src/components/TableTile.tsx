import React from 'react';
import cls from 'src/pages/admin/index.module.scss'
interface ModalProps {
  title:string
}
const TableTile : React.FC<ModalProps> = ({
    title
}) => {

  
    return (
      <div className={cls.tableTitle}>{title}</div>
    )
  
}


export default TableTile;
