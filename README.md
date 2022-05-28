<!-- 
  redux toolkit 的安装和使用
   安装下依赖
 -->
 <!-- npm i @reduxjs/toolkit  react-redux
 <!--redux开发工具 -->
 <!-- npm i redux-devtools -D --> -->


<!-- 把所有的reducer数据类似切片的处理， createSlice 
 name 相当于一个命名空间的概念,
 initialState 类似于一个初始值的概念
  reducers 就是reducer
  接受两个参数 state，和action
  然后导出定义的reducers 
  counterSlice.actions和定义的reducers是一一对应的
  export const {increment,decrement}= counterSlice.actions
  。然后作默认导出
  export default couterSlice.reducer;


  然后在index.js 中 configureStore 来一个引入
  import {configureStore} from '@reduxjs/toolkit'
  configureStore可以把多个合并成一个
  import counterSlice from './features/counterSlice';
  export defalut configureStore({
    reducer:{
      counter:counterSlice
    }
  })


  然后在入口文件中，index 中引入 store
  import store from './store'
  要想在项目中使用 就要引入
  import {Provider} from 'react-redux'
  ReactDOM.render(
    <Provider store={store}>
    <App/>
    </Provider>
  )

 最基础的配置就有了


 // 然后可以配置好路由在文件中使用。比如在入口文件。APP.js中
 可以
 import {useSelector,useDispatch} from  'react-redux';
 import {increment} from ' ./store/features/counterSlice'
 funcation App(){
   const {count} = useSelector(state=>state.counter);
   const dispatch  = useDispatch();
   return (
     <div>
      <button
        onClick={()=>{
          dispatch(increment({step:2}))
        }}
      >{count}</button>
     </div>
   )
 }

 //可以 在counterSlice 中增加异步的操作
  export const asyncIncrement =（payload）=>dispatch=>{
    setTimeout(()=>{
        dispatch(increment(payload))
    },2000)
  }
  然后在文件中使用 
  import {increment,asyncIncrement} from ' ./store/features/counterSlice'

  <button
        onClick={()=>{
          dispatch(asyncIncrement({step:2}))
        }}
  >
  {count}
  </button>

-->

<!--  然后再创建一个movieSlice  -->
import {createSlice} from '@reduxjs/toolkit'
export const movieSlice =createSlice({
  name:'movie',
  initialState:{
    list:[],
    total:0,
  },
  reducers:{
    loadDataEnd(state,{payload}){
      state.list= payload;
      state.totals= payload.length;
    },
  },
});
export const { loadDataEnd} = movieSlice.actions;
export defalut movieSlice.reducer;

//然后在index.js中引入
import  movieSlice  from './features/movieSlice'
export default configureStore({
  movie:movieSlice
})

// 对两个reducer 做一个关联。让movie改变另一个count也跟着变

在movieSlice  中引入countSlice 的方法
import {increment} from './counterSlice'
加入 
// 可以额外的触发其他的slice中的数据关联改变
extraReducers:{
  [increment](state,payload){
    state.list.push(1);
    state.totals +=1;
  }
}

<!-- 
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
createAsyncThunk 创建一个异步的action。这个方法被触发的时候有三个状态
// pending fulfilled rejected


// 在movie 中做一个 发起网络请求获取数据的操作
 const loadMoviesAPI = ()=>{
   fetch(
      'http://'
   ).then((res)=>res.json());
 }

 // 对返回的异步结果做一个处理
 //这个action 是可以直接调用的，用来处理异步操做获取数据
  export const loadData = createAsyncThunk
  （'movie/loadData',async()=>{
     const res= await loadMoviesAPI ()
     return res
      // 此处的返回结果会在.fulfilled 中作为payload的值
  })

  extraReducers:{
  [increment](state,payload){
    state.list.push(1);
    state.totals +=1;
  },
  [loadData.fulfilled](state,{payload}){
    state.list = payload.data.list
  },
  [loadData.rejected](state,{payload}){
    console.log(err)
  },
  [loadData.pedding](state,{payload}){
    console.log('进行中')
  },
}


// 然后使用它
 在 使用的中引入 
   import {loadData} from './store/features/movieSlice'
   import {useEffect} from 'react'
   const {list} =useSelector((state)=>state.movie)
     useEffect(()=>{
     dispatch(loadData())// 获取影片数据
     })
   然后对list进行map展示
 -->

  <!-- react-router  v6  -->
<!-- npm install react-router-dom -->

  在 React router 中通常使用的组件有三种：路由组件（作为根组件）: BrowserRouter（history模式） 和 HashRouter（hash模式）路径匹配组件: Route 和 Switch导航组件: Link 和 NavLink关于路由组件，如果我们的应用有服务器响应web的请求，建议使用<BrowserRouter>组件; 如果使用静态文件服务器，建议使用<HashRouter>组件


Switch
渲染与该地址匹配的第一个子节点 <Route> 或者 <Redirect>。

类似于选项卡，只是匹配到第一个路由后，就不再继续匹配：

 render： 通过写render函数返回具体的dom
 <Route path='/about' exact render={() => (<div>about</div>)}></Route>
 render 也可以直接返回 About 组件，像下面：
<Route path='/about' exact render={() => <About /> }></Route>

但是，这样写的好处是，不仅可以通过 render 方法传递 props 属性，并且可以传递自定义属性：

<Route path='/about' exact render={(props) => {
    return <About {...props} name={'cedric'} />
}}></Route>

然后，就可在 About 组件中获取 props 和 name 属性：
componentDidMount() {
    console.log(this.props) 
}



// this.props：
// history: {length: 9, action: "POP", location: {…}, createHref: ƒ, push: ƒ, …}
// location: {pathname: "/home", search: "", hash: "", state: undefined, key: "ad7bco"}
// match: {path: "/home", url: "/home", isExact: true, params: {…}}
// name: "cedric"

render 方法也可用来进行权限认证：
<Route path='/user' exact render={(props) => {
    // isLogin 从 redux 中拿到, 判断用户是否登录
    return isLogin ? <User {...props} name={'cedric'} /> : <div>请先登录</div>
}}></Route>

<!-- <Redirect> 常在用户是否登录： -->

  class Center extends PureComponent {
    render() {
        const { loginStatus } = this.props;
        if (loginStatus) {
            return (
                <div>个人中心</div>
            )
        } else {
            return <Redirect to='/login' />
        }
    }
}

<!-- withRouter
withRouter 可以将一个非路由组件包裹为路由组件，使这个非路由组件也能访问到当前路由的match, location, history对象。 -->
import { withRouter } from 'react-router-dom';

class Detail extends Component {
    render() {
        ··· ···
    } 
}
 
const mapStateToProps = (state) => {
    return {
        ··· ···
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ··· ···
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail));

 <!-- 编程式导航 - history 对象 -->
 点击img进入登录页

 class Home extends PureComponent {

    goHome = () => {
        console.log(this.props);
        
        this.props.history.push({
            pathname: '/login',
            state: {
                identityId: 1
            }
        })
    }

    render() {
        return (
            <img className='banner-img' alt='' src="img.png" onClick={this.goHome} />
        )
    } 
}
只有通过 Route 组件渲染的组件，才能在 this.props 上找到 history 对象
如果想在路由组件的子组件中使用 history ，需要使用 withRouter 包裹:

import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

class 子组件 extends PureComponent {

    goHome = () => {
        this.props.history.push('/home')
    }


    render() {
        console.log(this.props)
        return (
            <div onClick={this.goHome}>子组件</div>
        )
    }
}

export default withRouter(子组件);

 <!-- 路由过渡动画 -->
 import { TransitionGroup, CSSTransition } from "react-transition-group";

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Fragment> 
          <BrowserRouter>
            <div>
              <Header />
              
              {/* 最外部的<Route></Route>不进行任何路由匹配，仅仅是用来传递 location */}
              
              <Route render={({location}) => {
                console.log(location);
                return (
                  <TransitionGroup>
                    <CSSTransition
                      key={location.key}
                      classNames='fade'
                      timeout={300}
                    >
                      <Switch>
                        <Redirect exact from='/' to='/home' />
                        <Route path='/home' exact component={Home}></Route>
                        <Route path='/login' exact component={Login}></Route>
                        <Route path='/write' exact component={Write}></Route>
                        <Route path='/detail/:id' exact component={Detail}></Route>
                        <Route render={() => <div>Not Found</div>} />
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                )
              }}>
              </Route>
            </div>
          </BrowserRouter>
        </Fragment>
      </Provider>
    )
  }
}


