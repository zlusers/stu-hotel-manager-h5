import React, { useCallback, useEffect } from 'react';
import {DatePicker, Form, Modal, Select } from 'antd';
/**
 * 
 * @returns  删除对账
 */
interface ModalProps {
    visible: boolean;
    onCancel: () => void;
    onOk: (data:any) => void;
  }
const DeleteMadal: React.FC<ModalProps> = ({
    visible, onCancel, onOk 
}) => {
    const [form] = Form.useForm();
    const onFinish =useCallback(()=>{
        form.validateFields()
        .then((values) => {
            console.log(values,'===values')
            const createTime = values['createTime'];
            const rangeTime = values['rangeTime'];
            let parDate =values
            parDate.rangeTime=rangeTime?rangeTime.format("YYYYMM"):''
            parDate.createTime=createTime?createTime.format("YYYYMMDD"):''
            console.log('parDate: ',parDate);
            onOk(parDate)
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

                        <Form.Item name="createTime" label="操作日期" rules={[{ required: true }]}>
                          <DatePicker />
                        </Form.Item>
                        <Form.Item name="rangeTime" label="所属区间" rules={[{ required: true }]}>
                          <DatePicker picker="month" />
                        </Form.Item>
                        <Form.Item name="pmsOrBill" label="报表类型" >
                        <Select getPopupContainer={(triggerNode: any) => triggerNode.parentNode}>
                            <Select.Option value="">全部</Select.Option>
                            <Select.Option value={'1'} key={'pms'}>Pms</Select.Option>
                            <Select.Option value={'2'} key={'对账单'}>对账单</Select.Option>
                        </Select>
                    </Form.Item>

                    </Form>
                </div>

            </Modal>
        </>

    )
}

export default DeleteMadal; 
