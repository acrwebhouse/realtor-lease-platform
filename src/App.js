import React from 'react';
import './App.less';
import LoginRegister from "./Components/Login";
import HouseUpload from "./Components/HouseUpload";
// import ForgotPassword from "./Components/ForgotPassword";

const App = () => (
    <div className="App">
        <LoginRegister/>
        <HouseUpload/>
        {/*<ForgotPassword/>*/}
    </div>
);


export default App;
