// import React from 'react';
// import './App.less';
// import LoginRegister from "./Components/Login";
// import HouseUpload from "./Components/HouseUpload";
// // import ForgotPassword from "./Components/ForgotPassword";
//
// const App = () => (
//     <div className="App">
//         {/*<LoginRegister/>*/}
//         <HouseUpload/>
//         {/*<ForgotPassword/>*/}
//     </div>
// );

// export default App;





import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.less'
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Blogs from "./Pages/Blogs";
import Contact from "./Pages/Contact";
import NoPage from "./Pages/NoPage";
import AddHouseData from "./Pages/AddHouseData";

const App = () =>
    (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="blogs" element={<Blogs />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="addHouseData" element={<AddHouseData />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );


export default  App