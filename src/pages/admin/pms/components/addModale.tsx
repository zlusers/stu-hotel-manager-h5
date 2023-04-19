import React, { useCallback, useEffect, useState } from 'react';

import { DatePicker, Form,  Modal, Select} from 'antd';
import { monthFormat, PayMethod, PayType } from 'src/utils/utils';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';



import Upload from 'src/components/Upload'
import cls from './addModale.module.scss'
import { getDate } from 'src/utils/display';

/**
 * 
 * @returns  新增支付方式
 */
dayjs.extend(customParseFormat);
interface ModalProps {
    visible: boolean;
    onCancel: () => void;
    onOk: () => void;
}
const AddMadal: React.FC<ModalProps> = ({
    visible, onCancel, onOk
}) => {
    const [fileList, setFileList] = useState<any[]>([]);
  

    const [form] = Form.useForm();
    const onFinish = useCallback(() => {
        console.log(fileList,'===fileList')
        form.validateFields()
            .then((values) => {
                console.log(values, '===values')
            })
    }, [form,fileList])

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
    useEffect(() => {
        form.resetFields()
        setFileList([])
    }, [visible, form])
    const fileinputChange=useCallback((e:any)=>{
        const list:string[]=[...fileList]
        if(e.target.value){
            list.push(e.target.value)
            setFileList(list)
        }
    },[fileList])
    const onDelete=useCallback((index:any)=>{
        let list =[...fileList]
        list.splice(index, 1)
        setFileList(list)
    },[fileList])
  
   
    return (
        <>
            <Modal
                title="上传PMS报表"
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
                        initialValues={{

                        }}
                    >

                        <Form.Item name="phone" label="支付类型" rules={[{ required: true,message:'请选择支付类型' }]}>
                            <Select getPopupContainer={(triggerNode: any) => triggerNode.parentNode} >
                                {Object.keys(PayType).map((item: string) => (
                                    <Select.Option value={item} key={item}>
                                        {PayType[item]}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="zffs" label="支付方式"  rules={[{ required: true,message:'请选择支付方式'  }]}>
                            <Select getPopupContainer={(triggerNode: any) => triggerNode.parentNode} defaultValue=''>
                                <Select.Option value="">全部</Select.Option>
                                {Object.keys(PayMethod).map((item: string) => (
                                    <Select.Option value={item} key={item}>
                                        {PayMethod[item]}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="ssqj" label="所属区间"  rules={[{ required: true,message:'请选择所属区间'  }]}>
                           <DatePicker defaultValue={dayjs(getDate(), monthFormat)} format={monthFormat} picker="month" />
                       </Form.Item>
                        <Form.Item  label="选择文件" >
                            <Upload fileinputChange={(event:any)=>fileinputChange(event)}/>
                            {fileList&&fileList?.map((item,index)=>{
                                return (
                                    <div key={index}>
                                        <span className={cls.view}>{item} <span className={cls.deleteBut} onClick={()=>onDelete(index)}>删除</span></span>
                                    </div>
                                )
                            })}
                        </Form.Item>
                    </Form>
                </div>

            </Modal>
        </>

    )
}

export default AddMadal;
