import React from 'react';

import { Button,Modal} from 'antd';

/**
 * 已上传文件
 * @returns
 */
interface ModalProps {
    visible: boolean;
    onOk: () => void;
    data:string[]
}
const LookMadal: React.FC<ModalProps> = ({
    visible, onOk,data
}) => {
  
 
    return (
        <>
            <Modal
                title="已上传文件"
                open={visible}
                onCancel={onOk}
                footer={[
                    <Button key="back" onClick={onOk}>
                     关闭
                    </Button>
                    ]
                }
            >
                <div style={{ padding: '20px' }}>
                {data?.map((name:string)=><p>{name}</p>)}
                </div>

            </Modal>
        </>

    )
}

export default LookMadal;
