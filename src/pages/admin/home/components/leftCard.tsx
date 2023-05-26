import React, { useCallback, useState } from 'react';
import cls from './leftCard.module.scss';
import logo from '../../../../images/home.png';
import { Button, message } from 'antd';
import AddPayMadal from './addPayModal';
import DeleteMadal from './deleteModal';
import { queryNewPayWay, queryRemoveList } from 'src/services/apis';
/**
 * 
 * @returns  左边卡片
 */
interface Props {
  onDelete: () => void;
}
const LeftCard: React.FC<Props> = ({onDelete}) => {
    const [open, setOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

  const showModal =useCallback((value:string)=>{
    queryNewPayWay({
      payWay:value
    }).then((res)=>{
      if(res?.data){
        setOpen(false);
      }
    })
  },[]);
  const hideModal = () => {
    setOpen(false);
  };
 
  const openModal = () => {
    setIsVisible(true);
  };
  const cleanModal = () => {
    setIsVisible(false);
  };
  const onRemever=useCallback((data:any)=>{
    queryRemoveList({
      rangeTime:data?.rangeTime,
      createTime:data?.createTime,
      pmsOrBill:data?.pmsOrBill,
      type:data?.type
    }).then((res)=>{
      if(res.status===200){
        message.success('删除成功')
        setIsVisible(false);
        onDelete()
      }else {
        message.error(res?.message)
      }
    })
  },[onDelete])
    return (
    <>
     <div className={cls.leftCard}>
            <img src={logo} alt='' className={cls.img}/>
            <div className={cls.but}>
             <Button size={'large'} shape={'round'} onClick={()=>setOpen(true)}>新增支付方式</Button>
            </div>
            <div className={cls.but}>
             <Button size={'large'} shape={'round'} onClick={openModal} >清理对账</Button>
            </div>
        </div>
        <AddPayMadal  visible={open} onCancel={hideModal} onOk={showModal}/>
        <DeleteMadal  visible={isVisible} onCancel={cleanModal} onOk={onRemever}/>
    </>
       
    )
}

export default LeftCard; 
