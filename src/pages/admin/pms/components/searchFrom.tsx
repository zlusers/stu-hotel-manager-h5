import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { Button, Col, DatePicker, Form, Row, Select } from 'antd';
import { monthFormat, PayMethod, PayType } from 'src/utils/utils';
import { getDate } from 'src/utils/display';
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
    onAdd: () => void;
}
const SearchFrom: React.FC<Props> = ({onAdd}) => {
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
                ssqj:dayjs(getDate(), monthFormat)
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
                    <Form.Item name="ssqj" label="所属区间"  {...tailLayout}>
                        <DatePicker picker="month"/>
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
