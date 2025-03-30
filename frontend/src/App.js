import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import LoginPage from "./authPages/loginPage/LoginPage";
import RegisterPage from "./authPages/registerPage/RegisterPage";
import DashBoard from "./dashBoard/DashBoard";
import './App.css';
import AlertNotification from "./shared/components/AlertNotification";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/dashboard" element={<DashBoard />} />
                    <Route path="*" element={<Navigate replace to="/dashboard" />} />
                </Routes>
            </Router>
            <AlertNotification />
        </div>
    );
}

export default App;
