import React from 'react'
interface ModalProps {
  fileinputChange: (event:any) => void;
}
const Upload : React.FC<ModalProps> = ({
  fileinputChange
}) => {
  // 触发选择文件模拟点击事件
 const getFilds = () =>{
    const filedom = document.getElementById('file');
    filedom?.click()
  } 

  
    return (
      <>
      <div>
        <input id="file" type="file" accept=".xls,.xlsx"
         	style={{ display:"none", }}
         	onChange={fileinputChange}
        />
        <button onClick={getFilds} style={{backgroundColor:"#fff",border:'1px solid #d9d9d9',height:'30px',width:'150px',borderRadius:'4px',color:"rgba(0, 0, 0, 0.88)"}}>选择文件</button>
      </div>
     
      </>
      
    )
  
}


export default Upload;
