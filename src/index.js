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
import Collect from "./Components/Collect";
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ResetPassword from "./Components/ResetPassword";
import VerifyUser from "./Components/VerifyUser";
import Main from "./Components/Main";
import Link from "./Components/Link";
import CompanyHouseDetail from "./Components/CompanyHouseDetail";

// ReactDOM.render(
//     <App />,
//   document.getElementById('root')
// );
ReactDOM.render(

  <BrowserRouter>

      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:page" element={<Main />} />
          <Route path="/:page/:info" element={<Main />} />
          <Route path="/HousesList" element={<HousesList/>}/>
          <Route path="/HouseUpload" element={<HouseUpload/>}/>
          <Route path="/MyHousesList" element={<MyHousesList/>}/>
          <Route path="/MemberList" element={<MemberList/>}/>
          <Route path="/MemberInfo" element={<MemberInfo/>}/>
          <Route path="/HouseDetail/:id" element={<HouseDetail/>}/>
          <Route path="/HouseDetailOwner/:id/:owner" element={<HouseDetailOwner/>}/>
          <Route path="/HouseDetailOwnerEdit/:id/:owner" element={<HouseDetailOwnerEdit/>}/>
          <Route path="/CompanyHouseDetail/:id" element={<CompanyHouseDetail/>}/>
          <Route path="/Collect" element={<Collect/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
          <Route path="/verifyUser" element={<VerifyUser/>}/>
          <Route path="/link" element={<Link/>}/>
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
// to log results (for example: reportWebVitals(//concole.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




