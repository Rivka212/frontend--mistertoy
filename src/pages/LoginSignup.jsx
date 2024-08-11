
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, TextField } from '@mui/material';
import { login, logout, signup } from '../store/actions/user.actions.js';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';

export function LoginSignup() {
    const user = useSelector(state => state.userModule.user);
    const [isLogin, setIsLogin] = useState(true);
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' });

    function handleChange(event) {
        const { name, value } = event.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(ev) {
        ev.preventDefault();

        try {
            if (isLogin) {   
                delete credentials.fullname
                await login(credentials)
                showSuccessMsg('Logged in successfully')
            } else {
                await signup(credentials)
                showSuccessMsg('Signed up successfully')
            }
        } catch (error) {
            console.error(error)
            showErrorMsg('There was a problem')
        }
    }

    async function handleLogout() {
        try {
            await logout()
            showSuccessMsg('Logged out successfully')
        } catch (error) {
            showErrorMsg('There was a problem')
        }
    }

    // if (user) {
    //     return (
    //         <section className="main-user-loggedin">
    //             <h3>{user.fullname} logged in</h3>
    //             <Button className='user-button' variant='outlined' onClick={handleLogout}>Logout</Button>
    //         </section>
    //     )
    // }
	// .login-form,
	// .signup-form
    // .admin-toggle
    return (
        <section className="login-form">
            <form onSubmit={handleSubmit}>
                <TextField
                    name="username"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={credentials.username}
                    onChange={handleChange}
                />
                <TextField
                    name="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={credentials.password}
                    onChange={handleChange}
                />
                {!isLogin && (
                    <TextField
                        name="fullname"
                        label="Fullname"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={credentials.fullname}
                        onChange={handleChange}
                    />
                )}
                <Button className="user-log"
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '16px' , backgroundColor:' rgb(232, 59, 25)', color:'black', width:'130px', marginLeft:'60px'}}
                >
                    {isLogin ? 'Login' : 'Signup'}
                </Button>
            </form>
            <h4>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <span className="user-log" onClick={() => setIsLogin(!isLogin)}>
                   <button className='admin-toggle'> {isLogin ? ' SIGNUP' : ' LOGIN'}</button>
                </span>
            </h4>
        </section>
    )
}
