import React from 'react';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PayMethod } from 'src/utils/utils';
/**
 * 
 * @returns  左边卡片
 */
interface DataType {
    key: React.Key;
    zffs: string;
    pmsddh: string;
    crsddh: string;
    rzsj:string;
    rzrxm:string;
    zfje:number;
    rzdate:string;
    ldsj:string;
    bz:string;
  }
const table: React.FC = () => {
 
    const columns: ColumnsType<DataType>  = [
        {
            title: '支付方式',
            dataIndex: 'zffs',
            key: 'zffs',
            width: 60,
            align:"center",
            ellipsis:true,
            render: (text) => <div>{PayMethod[text]}</div>,
        },
        {
            title: 'PMS订单号',
            dataIndex: 'pmsddh',
            key: 'pmsddh',
            width: 80,
            align:"center",
            ellipsis:true,
        },
        {
            title: 'CRS订单号',
            dataIndex: 'crsddh',
            key: 'crsddh',
            width: 80,
            align:"center",
            ellipsis:true,
        },
        {
            title: '入账时间',
            dataIndex: 'rzsj',
            key: 'rzsj',
            width: 80,
            align:"center",
            ellipsis:true,
        },
        {
            title: '入住人姓名',
            dataIndex: 'rzrxm',
            key: 'rzrxm',
            width: 80,
            align:"center",
            ellipsis:true,
        },
        {
            title: '支付金额',
            dataIndex: 'zfje',
            key: 'zfje',
            width: 60,
            align:'center',
            ellipsis:true,
        },
        {
            title: '入住时间',
            dataIndex: 'rzdate',
            key: 'rzdate',
            width: 80,
            align:"center",
            ellipsis:true,
        },
        {
            title: '离店时间',
            dataIndex: 'ldsj',
            key: 'ldsj',
            width: 80,
            align:"center",
            ellipsis:true,
        },
        {
            title: '备注',
            dataIndex: 'bz',
            key: 'bz',
            width: 80,
            align:"center",
            ellipsis:true,
        },
    ];
    const data: DataType[] = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: `${i%14+1}`,
        zffs: `${i%14+1}`,
        pmsddh: `20998376365535${i}`,
        crsddh: `20998376365535${i}`,
        rzsj:'2022-09-09',
        rzrxm:`张伞${i}`,
        zfje:i*23,
        rzdate:'2022-09-09',
        ldsj:'2022-09-09',
        bz:`London Park no. ${i}`
      });
    }

    return (
        <div>
             <Table dataSource={data} columns={columns}  size={'middle'}
              summary={(pageData) => {
                let totalBorrow = 0;
                pageData.forEach(({ zfje }) => {
                    totalBorrow += zfje;
                    
                });
                return (
                    <Table.Summary fixed>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0} align={'center'}>合计</Table.Summary.Cell>
                            <Table.Summary.Cell index={1}></Table.Summary.Cell>
                            <Table.Summary.Cell index={2}></Table.Summary.Cell>
                            <Table.Summary.Cell index={3}></Table.Summary.Cell>
                            <Table.Summary.Cell index={4}></Table.Summary.Cell>
                            <Table.Summary.Cell index={5} align={'center'}>{totalBorrow}</Table.Summary.Cell>
                            <Table.Summary.Cell index={6}></Table.Summary.Cell>
                            <Table.Summary.Cell index={7}></Table.Summary.Cell>
                            <Table.Summary.Cell index={8}></Table.Summary.Cell>
                          
                           
                        </Table.Summary.Row>
                    </Table.Summary>
                )
            }}/>
        </div>
       

    )
}

export default table; 
