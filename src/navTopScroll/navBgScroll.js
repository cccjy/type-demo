import React, {useEffect } from 'react'
import './scroll.css'
// import styled from 'styled-components'
function Nav(){
  useEffect(()=>{
    window.addEventListener('scroll', handleScroll) // 监听页面滚动
    return ()=>{
      console.log('组件卸载')
      window.removeEventListener('scroll',handleScroll)
    }
  },[])
  function handleScroll(){
      let scrollTop = document.documentElement.scrollTop
      let txt = document.querySelector('#txt')
      console.log(`rgba(19, 23, 130,
        ${scrollTop / (scrollTop +90)}`)
      // 设置背景颜色的透明度
     if (scrollTop) {
       txt.style.backgroundColor=`rgba(19, 23, 130,
           ${(scrollTop /scrollTop+90 )}` // scrollTop + 多少根据自己的需求设置
     } else if(scrollTop === 0) {
        txt.style.backgroundColor='transparent'// 设置回到顶部时，背景颜色为透明
        } 
     }
     
    return (
         <div
         id='txt'
         style={{marginBottom:'20px'}}
         >
           头部导航
         </div>
    )

  }
export default function Effect() {
  return (
    <div>
      <Nav
      />
        {[...('.'.repeat(100))].map((item,index)=>{
           return <div key={index}>页面内容</div>
        })}
    </div>
  )
}



// const Wrap = styled.div({
//   position:'sticky',
//   top: 10+'px',
//  });