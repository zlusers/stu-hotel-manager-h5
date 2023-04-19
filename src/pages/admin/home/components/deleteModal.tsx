import React, { useCallback, useEffect } from 'react';
import {DatePicker, Form, Modal, Select } from 'antd';
/**
 * 
 * @returns  删除对账
 */
interface ModalProps {
    visible: boolean;
    onCancel: () => void;
    onOk: () => void;
  }
const DeleteMadal: React.FC<ModalProps> = ({
    visible, onCancel, onOk 
}) => {
    const [form] = Form.useForm();
    const onFinish =useCallback(()=>{
        form.validateFields()
        .then((values) => {
            console.log(values,'===values')
        })
    },[form])
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
                title="清理对账"
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

                        <Form.Item name="note" label="操作日期" rules={[{ required: true }]}>
                          <DatePicker />
                        </Form.Item>
                        <Form.Item name="note1" label="所属区间" rules={[{ required: true }]}>
                          <DatePicker picker="month" />
                        </Form.Item>
                        <Form.Item name="zffs" label="报表类型" >
                        <Select getPopupContainer={(triggerNode: any) => triggerNode.parentNode}>
                            <Select.Option value="">全部</Select.Option>
                            <Select.Option value={'1'} key={'pms'}>Pms</Select.Option>
                            <Select.Option value={'2'} key={'dzd'}>对账单</Select.Option>
                        </Select>
                    </Form.Item>

                    </Form>
                </div>

            </Modal>
        </>

    )
}

export default DeleteMadal; 
