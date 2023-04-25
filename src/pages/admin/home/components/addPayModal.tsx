import React, { useCallback, useEffect } from 'react';

import {Form, Input, Modal} from 'antd';

/**
 * 
 * @returns  新增支付方式
 */

interface ModalProps {
    visible: boolean;
    onCancel: () => void;
    onOk: (data:string) => void;
}
const AddPayMadal: React.FC<ModalProps> = ({
    visible, onCancel, onOk
}) => {

    const [form] = Form.useForm();
    const onFinish =useCallback(()=>{
        form.validateFields()
        .then((values) => {
            console.log(values,'===values')
            onOk(values?.payWay)
        })
    },[form,onOk])
        
    
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
    };
    useEffect(()=>{
        form.resetFields()
    },[visible, form])
    return (
        <>
            <Modal
                title="新增支付方式"
                open={visible}
                onOk={onFinish}
                onCancel={onCancel}
                okText="确认"
                cancelText="取消"
            >
                <div style={{ padding: '20px' }}>
                    <Form
                        {...layout}
                        form={form}
                        name="control-hooks"
                        style={{ maxWidth: 600 }}
                        preserve={false} 
                    >

                        <Form.Item name="payWay" label="支付方式" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                    </Form>
                </div>

            </Modal>
        </>

    )
}

export default AddPayMadal; 
