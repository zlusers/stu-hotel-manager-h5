import React, { useCallback, useEffect, useState } from 'react';

import { DatePicker, Form,  Modal, Select, message} from 'antd';
import { monthFormat, PayType } from 'src/utils/utils';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';



import Upload from 'src/components/Upload'
import cls from './addModale.module.scss'
import { getDate1 } from 'src/utils/display';

/**
 * 
 * @returns  新增支付方式
 */
dayjs.extend(customParseFormat);
interface ModalProps {
    visible: boolean;
    onCancel: () => void;
    onOk: (data:API.Upload) => void;
    payTypedata:API.PayWay[]|null
}
const AddMadal: React.FC<ModalProps> = ({
    visible, onCancel, onOk,payTypedata
}) => {
    const [fileList, setFileList] = useState<any[]>([]);
    

    const [form] = Form.useForm();
    const onFinish = useCallback(() => {
        form.validateFields()
            .then((values) => {
                let data =values
                const rangeTime = values['rangeTime'];
                data.rangeTime=rangeTime?rangeTime.format("YYYYMM"):''
                if(fileList&&fileList.length>0){
                    data.fileName=fileList.join(';');
                    onOk(data)
                }else {
                    message.error( '清选择文件');
                }

            })
    }, [form,fileList,onOk])

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
        if(e.target?.files[0]?.name){
            list.push(e.target.files[0].name)
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
                title="上传对账单列表"
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
                            fileName : "",    // 多个上传以 ; 隔开 
                            type : '',    
                            payWay : '',
                            rangeTime : dayjs(getDate1(), monthFormat)
                        }}
                    >

                        <Form.Item name="type" label="支付类型" rules={[{ required: true,message:'请选择支付类型' }]}>
                            <Select getPopupContainer={(triggerNode: any) => triggerNode.parentNode} >
                                {Object.keys(PayType).map((item: string) => (
                                    <Select.Option value={item} key={item}>
                                        {PayType[item]}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="payWay" label="支付方式"  rules={[{ required: true,message:'请选择支付方式'  }]}>
                            <Select getPopupContainer={(triggerNode: any) => triggerNode.parentNode} defaultValue=''>
                                {payTypedata?.map((item:API.PayWay) => (
                                <Select.Option value={item.id} key={item.id}>
                                    {item.payWay}
                                </Select.Option>
                               ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="rangeTime" label="所属区间"  rules={[{ required: true,message:'请选择所属区间'  }]}>
                           <DatePicker  format={monthFormat} picker="month" />
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
