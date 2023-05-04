import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getDateStr, getPayType } from 'src/utils/display';
/**
 * 
 * @returns  左边卡片
 */

interface Props {
    dataList:any[] |undefined
    payTypedata:API.PayWay[]| null
    onSeChange:(data:any[])=>void
    onCancel:(data:any)=>void
}
const TableList: React.FC<Props> = ({dataList,payTypedata,onSeChange,onCancel}) => {
    const [selectObj,setSelectObj]=useState<any[]>([])
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const start=useCallback(()=>{
        setTimeout(() => {
            setSelectObj([])
            setSelectedRowKeys([])
        }, 1000);
    },[])
    useEffect(()=>{
        start()
    },[dataList,start])

    const  dataListMemo =useMemo(()=>{
        if(dataList&&dataList.length>0){
            return dataList.map((item,index)=>{
                return {
                    ...item,
                    key:index+1
                }

            })
        }
        return []

    },[dataList])
    const columns: ColumnsType<any>  = [
        {
            title: '支付方式',
            dataIndex: 'pPayWay',
            key: 'pPayWay',
            width: 80,
            align:"center",
            ellipsis:true,
            fixed:'left',
            render: (text) => <div>{getPayType(payTypedata,text)}</div>,
        },
        {
            title: 'PMS订单号',
            dataIndex: 'pPmsNum',
            key: 'pPmsNum',
            width: 80,
            align:"center",
            fixed:'left',
            ellipsis:true,
        },
        {
            title: 'CRS订单号',
            dataIndex: 'pCrsNum',
            key: 'pCrsNum',
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
                    dataIndex: 'pInCoinTime',
                    key: 'rzpInCoinTimesj',
                    width: 80,
                    align:"center",
                    ellipsis:true,
                    render: (text) => <div>{getDateStr(text)}</div>,
                },
                {
                    title: '入住人姓名',
                    dataIndex: 'pCheckinName',
                    key: 'pCheckinName',
                    width: 80,
                    align:"center",
                    ellipsis:true,
                },
                {
                    title: '支付金额',
                    dataIndex: 'pPaymoney',
                    key: 'pPaymoney',
                    width: 60,
                    align:'center',
                    ellipsis:true,
                },
                {
                    title: '入住时间',
                    dataIndex: 'pCheckinTime',
                    key: 'pCheckinTime',
                    width: 80,
                    align:"center",
                    ellipsis:true,
                    render: (text) => <div>{getDateStr(text)}</div>,
                },
                {
                    title: '离店时间',
                    dataIndex: 'pCheckOutTime',
                    key: 'pCheckOutTime',
                    width: 80,
                    align:"center",
                    ellipsis:true,
                    render: (text) => <div>{getDateStr(text)}</div>,
                },
                {
                    title: '备注',
                    dataIndex: 'memo',
                    key: 'memo',
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
                    dataIndex: 'bPayWay',
                    key: 'bPayWay',
                    width: 60,
                    align:"center",
                    ellipsis:true,
                    render: (text) => <div>{getPayType(payTypedata,text)}</div>,
                },
                {
                    title: 'PMS订单号',
                    dataIndex: 'bPmsNum',
                    key: 'bPmsNum',
                    width: 80,
                    align:"center",
                    ellipsis:true,
                },
                {
                    title: 'CRS订单号',
                    dataIndex: 'bCrsNum',
                    key: 'bCrsNum',
                    width: 80,
                    align:"center",
                    ellipsis:true,
                },
                {
                    title: '入住人姓名',
                    dataIndex: 'bCheckinName',
                    key: 'bCheckinName',
                    width: 80,
                    align:"center",
                    ellipsis:true,
                },
                {
                    title: '支付金额',
                    dataIndex: 'bPaymoney',
                    key: 'bPaymoney',
                    width: 60,
                    align:'center',
                    ellipsis:true,
                },
                {
                    title: '入住时间',
                    dataIndex: 'bCheckinTime',
                    key: 'bCheckinTime',
                    width: 80,
                    align:"center",
                    ellipsis:true,
                    render: (text) => <div>{getDateStr(text)}</div>,
                },
                {
                    title: '离店时间',
                    dataIndex: 'bCheckOutTime',
                    key: 'bCheckOutTime',
                    width: 80,
                    align:"center",
                    ellipsis:true,
                    render: (text) => <div>{getDateStr(text)}</div>,
                }, 
            ]
        },
        {
            title: '差异金额',
            dataIndex: 'varianceAmount',
            key: 'varianceAmount',
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
            render:(record: any) => (
                record?.varianceAmount===0?'正常账单':
                record?.poStatus===1?
                <div onClick={()=>onCancel(record)} style={{color:"red"}}>撤销核销</div>:<div>未核销</div>

            )
    
        }
    ];
    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: React.Key[], selectedRows:any[]) => {
          setSelectObj(selectedRows)
          onSeChange(selectedRows)
          setSelectedRowKeys(newSelectedRowKeys);
        },
        getCheckboxProps: (record: any) => ({
          disabled: record.posStatus === 1, // Column configuration not to be checked
          name: record.posStatus,
        }),
      };
    const seData=useMemo(()=>{
        let bPaymoneyAll = 0;
        let pPaymoneyAll = 0;
        if(selectObj&&selectObj.length>0){
            selectObj.forEach(({bPaymoney, pPaymoney }) => {
                bPaymoneyAll += Number(bPaymoney);
                pPaymoneyAll += Number(pPaymoney);
            });
            return {
                bPaymoneyAll,pPaymoneyAll
            }
        }
        return {
            bPaymoneyAll,pPaymoneyAll
        }

    },[selectObj])
   
    const dataMemo=useMemo(()=>{
        let bPaymoneyAll = 0;
        let pPaymoneyAll = 0;
        let varianceAmountAll = 0;
        if(dataList&&dataList.length>0){
            dataList.forEach(({bPaymoney, pPaymoney,varianceAmount }) => {
                bPaymoneyAll += Number(bPaymoney);
                pPaymoneyAll += Number(pPaymoney);
                varianceAmountAll += Number(varianceAmount);
            });
            return {
                bPaymoneyAll,pPaymoneyAll,varianceAmountAll
            }
        }
        return {
            bPaymoneyAll,pPaymoneyAll,varianceAmountAll
        }

    },[dataList])
    return (
        <div>
            {
            selectObj&&selectObj.length>0&& (<div style={{height:'25px',lineHeight:'25px',fontSize:'16px'}}>
            合计：PMS支付金额：{seData?.pPaymoneyAll}，对账单支付金额：{seData?.bPaymoneyAll}
              </div>)}
             <Table dataSource={dataListMemo} columns={columns} bordered  size={'middle'}  rowSelection={{
          type: 'checkbox',
          hideSelectAll:true,
          fixed:"left",
          ...rowSelection,
        }}  scroll={{ x: '2000px',}}
        summary={() => {
            return (
                <Table.Summary fixed>
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0} align={'center'} >
                            <div style={{fontWeight:'bold'}}>合计</div></Table.Summary.Cell>
                        <Table.Summary.Cell index={1}></Table.Summary.Cell>
                        <Table.Summary.Cell index={2}></Table.Summary.Cell>
                        <Table.Summary.Cell index={3}></Table.Summary.Cell>
                        <Table.Summary.Cell index={4}></Table.Summary.Cell>
                        <Table.Summary.Cell index={5}></Table.Summary.Cell>
                        <Table.Summary.Cell index={6} align={'center'}>{dataMemo?.pPaymoneyAll}</Table.Summary.Cell>
                        <Table.Summary.Cell index={7}></Table.Summary.Cell>
                        <Table.Summary.Cell index={8}></Table.Summary.Cell>
                        <Table.Summary.Cell index={9}></Table.Summary.Cell>
                        <Table.Summary.Cell index={10}></Table.Summary.Cell>
                        <Table.Summary.Cell index={11}></Table.Summary.Cell>
                        <Table.Summary.Cell index={12}></Table.Summary.Cell>
                        <Table.Summary.Cell index={13}></Table.Summary.Cell>
                        <Table.Summary.Cell index={14} align={'center'}>{dataMemo?.bPaymoneyAll}</Table.Summary.Cell>
                        <Table.Summary.Cell index={15}></Table.Summary.Cell>
                        <Table.Summary.Cell index={16}></Table.Summary.Cell>
                        <Table.Summary.Cell align={'center'} index={17}>{dataMemo?.varianceAmountAll}</Table.Summary.Cell>
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
