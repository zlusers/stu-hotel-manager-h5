import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { Button, Col, DatePicker, Form, Row, Select } from 'antd';
import { monthFormat, PayType } from 'src/utils/utils';
import { getDate1 } from 'src/utils/display';

/**
 * 
 * @returns  左边卡片
 */

dayjs.extend(customParseFormat);
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: {
        span: 16,
        offset: 0,
    },

};
interface Props {
    data?:API.Search;
    onAdd: () => void;
    payTypedata:API.PayWay[]|null;
    onSearch:(data:API.Search) => void;
}
const SearchFrom: React.FC<Props> = ({onAdd,payTypedata,onSearch}) => {
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
            }}
        >
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item name="payWay" label="支付类型" {...tailLayout}>
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
                    <Form.Item name="type" label="支付方式" {...tailLayout}>
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
                        <DatePicker format={'YYYY-MM-DD'}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item name="rangeTime" label="所属区间"  {...tailLayout}>
                        <DatePicker picker="month" format={'YYYY-MM'}/>
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
                        onClick={onAdd}
                    >
                      上传文件
                    </Button>
                </Col>
            </Row>





        </Form>
    )
}

export default SearchFrom; 
