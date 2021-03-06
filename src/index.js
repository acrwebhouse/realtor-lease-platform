import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import HousesList from "./Components/HousesList";
import HouseDetail from "./Components/HouseDetail";
import HouseUpload from "./Components/HouseUpload";
import MyHousesList from "./Components/MyHousesList";
import MemberList from "./Components/MemberList";
import MemberInfo from "./Components/MemberInfo";
import HouseDetailOwner from "./Components/HouseDetailOwner";
import HouseDetailOwnerEdit from "./Components/HouseDetailOwnerEdit";
import HouseImage from "./Components/HouseImage";
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from "./Components/Main";
// ReactDOM.render(
//     <App />,
//   document.getElementById('root')
// );
ReactDOM.render(

  <BrowserRouter>

      <Routes>

          {/* <Route path="/" component={App}/> */}
          {/* <Route path="/" element={<App />} /> */}
          <Route path="/" element={<Main />} />
          <Route path="/HousesList" element={<HousesList/>}/>
          <Route path="/HouseUpload" element={<HouseUpload/>}/>
          <Route path="/MyHousesList" element={<MyHousesList/>}/>
          <Route path="/MemberList" element={<MemberList/>}/>
          <Route path="/MemberInfo" element={<MemberInfo/>}/>
          <Route path="/HouseDetail/:id" element={<HouseDetail/>}/>
          <Route path="/HouseDetailOwner/:id/:owner" element={<HouseDetailOwner/>}/>
          <Route path="/HouseDetailOwnerEdit/:id/:owner" element={<HouseDetailOwnerEdit/>}/>
          {/* <Route path="/test" element={<HouseImage size='200' image='https://en.pimg.jp/075/623/884/1/75623884.jpg' />}/> */}

          {/* <Route path="/test" element={<HouseImage size='200' image='https://www.mymypic.net/data/attachment/forum/201811/12/1611513h85bq8vg1uq51uv.jpg' />}/> */}

          <Route path="/test" element={<HouseImage size='300' image='http://34.81.209.11:5000/resource/627d0f5bfbc8a6001fadbc81/photo/1.jpeg' />}/>
          
      </Routes>

  </BrowserRouter>

, document.getElementById('root'));

// ReactDOM.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
//     document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




