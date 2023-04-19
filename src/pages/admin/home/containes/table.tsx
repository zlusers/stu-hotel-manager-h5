import React from 'react';
import cls from './table.module.scss';
import {Table } from 'antd';
import SearchFrom from './searchFrom';
/**
 * 
 * @returns  左边卡片
 */
const table: React.FC = () => {
    const dataSource = [
        {
            key: '1',
            name: '微信',
            age: 32,
            address: 12,
        },
        {
            key: '2',
            name: '支付宝',
            age: 42,
            address: 87,
        },
    ];

    const columns = [
        {
            title: '支付方式',
            dataIndex: 'name',
            key: 'name',
            width: 30,
        },
        {
            title: '欠离金额',
            dataIndex: 'age',
            key: 'age',
            width: 30,
        },
        {
            title: '差异金额',
            dataIndex: 'address',
            key: 'address',
            width: 30,
        },
    ];


    return (
        <div className={cls.page}>
            <SearchFrom />
            <div className={cls.tableView}>
                <Table dataSource={dataSource} columns={columns} pagination={false}
                    summary={(pageData) => {
                        let totalBorrow = 0;
                        let totalRepayment = 0;

                        pageData.forEach(({ age, address }) => {
                            totalBorrow += address;
                            totalRepayment += age;
                        });
                        return (
                            <Table.Summary fixed>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0}>合计</Table.Summary.Cell>
                                    <Table.Summary.Cell index={1}>{totalRepayment}</Table.Summary.Cell>
                                    <Table.Summary.Cell index={1}>{totalBorrow}</Table.Summary.Cell>
                                </Table.Summary.Row>
                            </Table.Summary>
                        )
                    }


                    } />
            </div>

        </div>
    )
}

export default table; 
