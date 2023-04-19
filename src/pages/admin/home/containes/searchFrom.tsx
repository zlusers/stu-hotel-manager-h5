import React from 'react';

import { Button, Col, Form, Row, Select } from 'antd';
import { PayType } from 'src/utils/utils';
/**
 * 
 * @returns  左边卡片
 */
const searchFrom: React.FC = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    return (
        <Form
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12}}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
        >    <Row>
            <Col span={12}>
                <Form.Item name="phone"
                    label="支付类型">
                    <Select getPopupContainer={(triggerNode: any) => triggerNode.parentNode} defaultValue=''>
                        <Select.Option value="">全部</Select.Option>
                        {Object.keys(PayType).map((item:string) => (
                        <Select.Option value={item} key={item}>
                            {PayType[item]}
                        </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>
           
           
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        查询
                    </Button>
                </Col>
            </Row>

        </Form>
    )
}

export default searchFrom; 
