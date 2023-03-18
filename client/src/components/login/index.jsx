import React, { useState, useEffect } from 'react';
import { useLoginMutation, usePostSignUpMutation } from '../../state/api';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUserName, setPwd }) => {
    const [username, setUsername] = useState('');
    const [secret, setSecret] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [trigerSignup, signupResponse] = usePostSignUpMutation();
    const [login, response] = useLoginMutation();

    const handleRegister = () => {
        setIsRegister(prev => (!prev));
    };

    const handleSignup = () => {
        console.log(username, secret);
        trigerSignup({ username, secret });
        if (signupResponse.data) {
            setIsRegister(false);
        }

    };

    const handleLogin = () => {
        login({ username, secret });

    };

    const navigate = useNavigate();

    useEffect(() => {
        if (response.data?.response) {
            console.log('login success');
            setUserName(username);
            setPwd(secret);
            navigate("/chat");
        }
    }, [response.data]);



    return (
        <div className='login-page'>
            <div className='login-container'>
                <h2>CHATGPT APP</h2>
                <p className='register-change' onClick={handleRegister}>
                    {isRegister ? 'New user?' : 'Already a user'}
                </p>
                <div>
                    <input
                        className='login-input'
                        type='text'
                        placeholder='User Name'
                        value={username}
                        onChange={(e) => { setUsername(e.target.value); }}
                    />
                </div>
                <div>
                    <input
                        className='login-input'
                        type='password'
                        placeholder='Password'
                        value={secret}
                        onChange={(e) => { setSecret(e.target.value); }}
                    />
                </div>
                <div className='login-actions'>
                    {isRegister
                        ? <button onClick={handleSignup}>sign up</button>
                        : <button onClick={handleLogin}>login</button>}

                </div>
            </div>

        </div>
    );
};

export default Login;
