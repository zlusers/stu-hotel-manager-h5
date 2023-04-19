import React, { useState } from 'react';
import cls from './leftCard.module.scss';
import logo from '../../../../images/home.png';
import { Button } from 'antd';
import AddPayMadal from './addPayModal';
import DeleteMadal from './deleteModal';
/**
 * 
 * @returns  左边卡片
 */
const LeftCard = () => {
    const [open, setOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setIsVisible(true);
  };
  const cleanModal = () => {
    setIsVisible(false);
  };

    return (
    <>
     <div className={cls.leftCard}>
            <img src={logo} alt='' className={cls.img}/>
            <div className={cls.but}>
             <Button size={'large'} shape={'round'} onClick={showModal}>新增支付方式</Button>
            </div>
            <div className={cls.but}>
             <Button size={'large'} shape={'round'} onClick={openModal} >清理对账</Button>
            </div>
        </div>
        <AddPayMadal  visible={open} onCancel={hideModal} onOk={showModal}/>
        <DeleteMadal  visible={isVisible} onCancel={cleanModal} onOk={openModal}/>
    </>
       
    )
}

export default LeftCard; 
