import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Button, Col, DatePicker, Form, Row, Select } from 'antd';

import { PayMethod, PayType,HxType,jgType, monthFormat } from 'src/utils/utils';
import { getDate } from 'src/utils/display';
/**
 * 
 * @returns  
 */
dayjs.extend(customParseFormat);
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: {
        span: 16,
        offset: 0,

    },

};
interface Props {
    outClick?:()=>void
    exportClick?:()=>void
}
const SearchFrom: React.FC<Props> = ({outClick,exportClick}) => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
   

    return (
        <Form
            {...layout}
            onFinish={onFinish}
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
            layout="horizontal"
            initialValues={{
                zflx:'',
                zffs:'',
                ssqj:dayjs(getDate(), monthFormat),
                hx:''
            }}
        >
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item name="zflx" label="支付类型" {...tailLayout}>
                        <Select getPopupContainer={(triggerNode: any) => triggerNode.parentNode}>
                            <Select.Option value="">全部</Select.Option>
                            {Object.keys(PayType).map((item: string) => (
                                <Select.Option value={item} key={item}>
                                    {PayType[item]}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="zffs" label="支付方式" {...tailLayout}>
                        <Select getPopupContainer={(triggerNode: any) => triggerNode.parentNode}>
                            <Select.Option value="">全部</Select.Option>
                            {Object.keys(PayMethod).map((item: string) => (
                                <Select.Option value={item} key={item}>
                                    {PayMethod[item]}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="czrq" label="操作日期"  {...tailLayout}>
                        <DatePicker />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
            <Col span={8}>
                <Form.Item name="hx" label="结果状态" {...tailLayout}>
                        <Select getPopupContainer={(triggerNode: any) => triggerNode.parentNode}>
                            <Select.Option value="">全部</Select.Option>
                            {Object.keys(jgType).map((item: string) => (
                                <Select.Option value={item} key={item}>
                                    {jgType[item]}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                
                <Col span={8}>
                <Form.Item name="hx" label="核销状态" {...tailLayout}>
                        <Select getPopupContainer={(triggerNode: any) => triggerNode.parentNode}>
                            <Select.Option value="">全部</Select.Option>
                            {Object.keys(HxType).map((item: string) => (
                                <Select.Option value={item} key={item}>
                                    {HxType[item]}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="ssqj" label="所属区间"  {...tailLayout}>
                        <DatePicker  picker="month"/>
                    </Form.Item>
                </Col>


            </Row>
            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        查询
                    </Button>
                    <Button
                        style={{ margin: '0 8px' }}
                        onClick={exportClick}
                    >
                        导出文件
                    </Button>
                    <Button
                        style={{ margin: '0 8px' }}
                        onClick={outClick}
                    >
                        核销
                    </Button>
                </Col>
            </Row>





        </Form>
    )
}

export default SearchFrom; 
