import React, { useCallback,useMemo} from 'react';
import cls from './table.module.scss';
import {Table } from 'antd';
import SearchFrom from './searchFrom';
import UsePaywary from 'src/hook/usePaywary';
/**
 * 
 * @returns  左边卡片
 */
interface Props {
    onSearchClick: (ret:any) => void;
    homeData: {
        payWay: number;
        varianceMoney: number;
        underseparationMoney: number;
    }[] | undefined
  }
const TableView: React.FC<Props> = ({onSearchClick,homeData}) => {
    const {data} =UsePaywary()
    const  dataListMemo =useMemo(()=>{
        let data=homeData
        if(data&&data.length>0){
            let list=data.map((item,index)=>{
                return {
                    ...item,
                    key:index+1
                }
            })
           
            return list.filter((item)=>{
                return item.underseparationMoney !==0 ||item.varianceMoney!==0
            })
        }
        return []

    },[homeData])
    const getPayType=(id:number)=>{
        if(data){
            return  data.filter((item)=>item?.id===id)[0]?.payWay
        }
        return id
    }
    const columns = [
        {
            title: '支付方式',
            dataIndex: 'payWay',
            key: 'payWay',
            width: 30,
            render: (text:number) => <div>{getPayType(text)}</div>,
        },
        {
            title: '欠离金额',
            dataIndex: 'underseparationMoney',
            key: 'underseparationMoney',
            width: 30,
        },
        {
            title: '差异金额',
            dataIndex: 'varianceMoney',
            key: 'varianceMoney',
            width: 30,
        },
    ];

const onSearch=useCallback((values:any)=>{
    onSearchClick(values?.type)
},[onSearchClick])
    return (
        <div className={cls.page}>
            <SearchFrom  onOk={(values)=>onSearch(values)} />
            <div className={cls.tableView}>
                <Table dataSource={dataListMemo} columns={columns}
                    summary={(pageData) => {
                        let totalBorrow = 0;
                        let totalRepayment = 0;

                        pageData.forEach(({ underseparationMoney, varianceMoney }) => {
                            totalBorrow += varianceMoney*100;
                            totalRepayment += underseparationMoney*100;
                        });
                        return (
                            <Table.Summary fixed>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0}><div style={{fontWeight:'bold'}}>合计</div></Table.Summary.Cell>
                                    <Table.Summary.Cell index={1}>{totalRepayment/100}</Table.Summary.Cell>
                                    <Table.Summary.Cell index={1}>{totalBorrow/100}</Table.Summary.Cell>
                                </Table.Summary.Row>
                            </Table.Summary>
                        )
                    }


                    } />
            </div>

        </div>
    )
}

export default TableView; 
