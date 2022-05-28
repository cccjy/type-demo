import React from 'react';
import {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { loadData } from '../store/features/movieSlice';
import {increment,asyncIncrement} from '../store/features/counterSlice';
export default function Thindex() {
    const {count} = useSelector((state)=>state.counter);
    const dispatch= useDispatch()
    const {list} = useSelector(state => state.movie)
    useEffect(()=>{
       dispatch(loadData())// 获取影片数据
    },[])
  return (
    <div>
        txt
        <button
         onClick={()=>{
             dispatch(increment({step:2}))
         }}
        >
            {count}
        </button>
        <br/>
        <button
         onClick={()=>{
             dispatch(asyncIncrement({step:1}))
         }}
        >
            {count}
        </button>
        <br/>
        <ul>
           {list.map(item=><li key={item.tvId}>{item.name}</li>)} 
        </ul>
    </div>
  )
}
