import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Button, Col, DatePicker, Form, Row, Select } from 'antd';

import { PayType,HxType,jgType, monthFormat } from 'src/utils/utils';
import { getDate1 } from 'src/utils/display';
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
    payTypedata:API.PayWay[]|null;
    outClick:()=>void
    exportClick?:()=>void
    onSearch:(data:API.Isearch)=>void
}
const SearchFrom: React.FC<Props> = ({outClick,exportClick,payTypedata,onSearch}) => {
    const onFinish = (values: any) => {
        const createTime = values['createTime'];
        const rangeTime = values['rangeTime'];
        let parDate =values
        parDate.rangeTime=rangeTime?rangeTime.format("YYYYMM"):''
        parDate.createTime=createTime?createTime.format("YYYYMMDD"):''
        onSearch(parDate)
    };
   

    return (
        <Form
            {...layout}
            onFinish={onFinish}
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
            layout="horizontal"
            initialValues={{
                payWay:'',
                type:'',
                rangeTime:dayjs(getDate1(), monthFormat), 
                status:'',
                poStatus:''
            }}
        >
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item name="type" label="支付类型" {...tailLayout}>
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
                    <Form.Item name="payWay" label="支付方式" {...tailLayout}>
                        <Select getPopupContainer={(triggerNode: any) => triggerNode.parentNode}>
                            <Select.Option value="">全部</Select.Option>
                            {payTypedata?.map((item:API.PayWay) => (
                                <Select.Option value={item.id} key={item.id}>
                                    {item.payWay}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="createTime" label="操作日期"  {...tailLayout}>
                        <DatePicker />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
            <Col span={8}>
                <Form.Item name="status" label="结果状态" {...tailLayout}>
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
                <Form.Item name="poStatus" label="核销状态" {...tailLayout}>
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
                    <Form.Item name="rangeTime" label="所属区间"  {...tailLayout}>
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
