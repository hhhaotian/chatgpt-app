import Chat from '../src/components/chat';
import Login from './components/login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';



function App () {

    const [userName, setUserName] = useState("");
    const [pwd, setPwd] = useState("");
    const isAuth = Boolean(userName) && Boolean(pwd);


    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    {/* <Route path='/' element={isAuth ? <Navigate to='/chat' /> : <Login setUserName={setUserName} setPwd={setPwd} />} /> */}
                    <Route path='/' element={<Login setUserName={setUserName} setPwd={setPwd} />} />
                    <Route path="/chat" element={isAuth ? <Chat username={userName} secret={pwd} /> : <Navigate to='/' />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
