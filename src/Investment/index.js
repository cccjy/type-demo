import React ,{ useState, useEffect }from 'react';
import { Button, Modal } from 'antd';

function Investment({max=60}) {
    const [count,setCount] = useState(max)
    const [investment,setInvestment]=useState('去投资')
    const [isModalVisible, setIsModalVisible] = useState(false);
    // 倒计时逻辑
    useEffect(()=>{
      let timer = null;
      if(count>0){
        timer = setTimeout(()=>{
          setCount(count-1)
        },1000)
      }
      return ()=>{
        clearTimeout(timer)
      }
    })
     
    // 重置计数
    useEffect(()=>{
      setCount(max)
    },[max])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setInvestment('去投资')
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setInvestment('去投资')
  };
  useEffect(()=>{

  })
  const goInvestment =()=>{
    setInvestment('投资成功')
  }
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        投资倒计时 {count}
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Button type="primary" onClick={goInvestment}>{investment}</Button>
      </Modal>
    </div>
     
  )
}
export default  Investment;