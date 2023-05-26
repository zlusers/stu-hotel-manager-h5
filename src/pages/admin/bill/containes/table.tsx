import React, { useMemo } from 'react';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getDateStr, getPayType } from 'src/utils/display';
/**
 * 
 * @returns  左边卡片
 */

interface Props {
    PmsData:API.BillItem[] |undefined
    payTypedata:API.PayWay[]| null
}
const PmSTable: React.FC<Props> = ({PmsData,payTypedata}) => {
    const  dataListMemo =useMemo(()=>{
        if(PmsData&&PmsData.length>0){
            return PmsData.map((item,index)=>{
                return {
                    ...item,
                    key:index+1
                }
            })
        }
        return []

    },[PmsData])
   
    const columns: ColumnsType<API.BillItem>  = [
        {
            title: '支付方式',
            dataIndex: 'payWay',
            key: 'payWay',
            width: 60,
            align:"center",
            ellipsis:true,
            render: (text) => <div>{getPayType(payTypedata,text)}</div>,
        },
        {
            title: 'PMS订单号',
            dataIndex: 'pmsNum',
            key: 'pmsNum',
            width: 80,
            align:"center",
            ellipsis:true,
        },
        {
            title: 'CRS订单号',
            dataIndex: 'crsNum',
            key: 'crsNum',
            width: 80,
            align:"center",
            ellipsis:true,
        },
        {
            title: '入住人姓名',
            dataIndex: 'checkinName',
            key: 'checkinName',
            width: 80,
            align:"center",
            ellipsis:true,
        },
        {
            title: '支付金额',
            dataIndex: 'payMoney',
            key: 'payMoney',
            width: 60,
            align:'center',
            ellipsis:true,
        },
        {
            title: '入住时间',
            dataIndex: 'checkinTime',
            key: 'checkinTime',
            width: 80,
            align:"center",
            ellipsis:true,
            render: (text) => <div>{getDateStr(text)}</div>,
        },
        {
            title: '离店时间',
            dataIndex: 'checkOutTime',
            key: 'checkOutTime',
            width: 80,
            align:"center",
            ellipsis:true,
            render: (text) => <div>{getDateStr(text)}</div>,
        },
        
    ];
    const  payMoney=useMemo(()=>{
        if(PmsData){
            let totalBorrow = 0;
            PmsData.forEach(({ payMoney }) => {
                totalBorrow += Number(payMoney)*100;
            });
            return totalBorrow
        }
        return 0
    },[PmsData])
    return (
        <div>
             <Table dataSource={dataListMemo} columns={columns}  size={'middle'}
              summary={() => {
                
                return (
                    <Table.Summary fixed>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0} align={'center'}><div style={{fontWeight:'bold'}}>合计</div></Table.Summary.Cell>
                            <Table.Summary.Cell index={1}></Table.Summary.Cell>
                            <Table.Summary.Cell index={2}></Table.Summary.Cell>
                            <Table.Summary.Cell index={3}></Table.Summary.Cell>
                            <Table.Summary.Cell index={5} align={'center'}>{payMoney/100}</Table.Summary.Cell>
                            <Table.Summary.Cell index={6}></Table.Summary.Cell>
                            <Table.Summary.Cell index={7}></Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                )
            }}/>
        </div>
       

    )
}

export default PmSTable; 
