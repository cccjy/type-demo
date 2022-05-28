import React from 'react';
import { Navigate,Route,Routes } from "react-router";
import {BrowserRouter as Router} from 'react-router-dom';
import Scroll from '../navTopScroll/navBgScroll';
import Investment from '../Investment/index'
import Thindex from  '../th/index'
function RouterIndex() {
  return (
    <Router>
      < Routes>
        {/*  一定要添加 exact */}
        <Route path={'/'} element={<Scroll/>}></Route>
        <Route path={'/thredux'} element={<Thindex/>}></Route>
        <Route path={'/investment'} element={<Investment/>}  exact/>
        <Route path="*" element={<Navigate to="/" replace={true}/>} />
      </ Routes>
    </Router>
  );
}
export default RouterIndex;