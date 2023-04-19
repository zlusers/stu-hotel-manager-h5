import React, { useCallback, useState } from 'react';
import { Modal, Table } from 'antd';
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
    cyje:number;
    
  }

const TableList= () => {
    const [selectObj,setSelectObj]=useState<DataType[]>([])
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
        bz:`London Park no. ${i}`,
        cyje:i,
      });
    }
    const onCancel=useCallback((e:any)=>{
        Modal.confirm({
            title: `撤销`,
            content: `确定要撤销核销吗？`,
            onOk() {
              console.log('撤销')
            },
          });
    },[])
    const columns: ColumnsType<DataType>  = [
        {
            title: '支付方式',
            dataIndex: 'zffs',
            key: 'zffs',
            width: 80,
            align:"center",
            ellipsis:true,
            fixed:'left',
            render: (text) => PayMethod[text],
        },
        {
            title: 'PMS订单号',
            dataIndex: 'pmsddh',
            key: 'pmsddh',
            width: 80,
            align:"center",
            fixed:'left',
            ellipsis:true,
        },
        {
            title: 'CRS订单号',
            dataIndex: 'crsddh',
            key: 'crsddh',
            width: 80,
            align:"center",
            fixed:'left',
            ellipsis:true,
        },
        {
            title: 'PMS',
            children: [
              
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
            ]
        },
        {
            title: '对账单',
            children: [
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
            ]
        },
        {
            title: '差异金额',
            dataIndex: 'cyje',
            key: 'cyje',
            width: 80,
            align:"center",
            fixed:'right',
            ellipsis:true,
        },
        {
            title: '操作',
            width: 80,
            key:"action",
            align:"center",
            fixed:'right',
            ellipsis:true,
            render:(record: DataType) => (
                <div onClick={(record)=>onCancel(record)} style={{color:"red"}}>撤销核销</div>
            )
    
        }
    ];
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          setSelectObj(selectedRows)
        },
        getCheckboxProps: (record: DataType) => ({
          disabled: record.zffs === '3', // Column configuration not to be checked
          name: record.zffs,
        }),
      };

    return (
        <div>
            {
            selectObj&&selectObj.length>0&& (<div style={{height:'25px',lineHeight:'25px',fontSize:'16px'}}>
            合计：PMS支付金额：222，对账单支付金额：123
              </div>)}
             <Table dataSource={data} columns={columns} bordered  size={'middle'}  rowSelection={{
          type: 'checkbox',
          hideSelectAll:true,
          fixed:"left",
          ...rowSelection,
        }}  scroll={{ x: '2000px',}}
        summary={(pageData) => {
            let totalBorrow = 0;
            let totalRepayment = 0;

            pageData.forEach(({ zfje, cyje }) => {
                totalBorrow += zfje;
                totalRepayment += cyje;
            });
            return (
                <Table.Summary fixed>
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0} align={'center'}>合计</Table.Summary.Cell>
                        <Table.Summary.Cell index={1}></Table.Summary.Cell>
                        <Table.Summary.Cell index={2}></Table.Summary.Cell>
                        <Table.Summary.Cell index={3}></Table.Summary.Cell>
                        <Table.Summary.Cell index={4}></Table.Summary.Cell>
                        <Table.Summary.Cell index={5}></Table.Summary.Cell>
                        <Table.Summary.Cell index={6} align={'center'}>{totalRepayment}</Table.Summary.Cell>
                        <Table.Summary.Cell index={7}></Table.Summary.Cell>
                        <Table.Summary.Cell index={8}></Table.Summary.Cell>
                        <Table.Summary.Cell index={9}></Table.Summary.Cell>
                        <Table.Summary.Cell index={10}></Table.Summary.Cell>
                        <Table.Summary.Cell index={11}></Table.Summary.Cell>
                        <Table.Summary.Cell index={12}></Table.Summary.Cell>
                        <Table.Summary.Cell index={13}></Table.Summary.Cell>
                        <Table.Summary.Cell index={14} align={'center'}>{totalRepayment}</Table.Summary.Cell>
                        <Table.Summary.Cell index={15}></Table.Summary.Cell>
                        <Table.Summary.Cell index={16}></Table.Summary.Cell>
                        <Table.Summary.Cell align={'center'} index={17}>{totalBorrow}</Table.Summary.Cell>
                        <Table.Summary.Cell index={18}></Table.Summary.Cell>
                    </Table.Summary.Row>
                </Table.Summary>
            )
        }


        }
        
        />
        </div>
       

    )
}

export default TableList; 
