import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Header } from '../../components/Header/Header';
import { accountActions } from '../../slices/account-slice';
import { useSelector } from 'react-redux';
import { loginReq } from '../../actions/account';

export const Login = () => {

    const account = useSelector(state => state.account);

    const dispatch = useDispatch();

    const [login, setLogin] = useState({username: '',password:''});

    // const loginRequest = async ( login ) => { 
    //     dispatch(accountActions.fetch());   
    //     await fetch(`http://localhost:3000/account/login`, {
    //         method: 'POST',
    //         body: JSON.stringify( login ),
    //         headers: { 'Content-Type' : 'application/json'},
    //         credentials: 'include'
    //     })
    //     .then(res => res.json())
    //     .then(json => {
    //         if (!json.type){
    //             dispatch(accountActions.fetch_error(json.message));
    //         }else{
    //             dispatch(accountActions.fetch_success(json.message));
    //         }
    //     })
    //     .catch(err => dispatch(accountActions.fetch_error(err.message)));
    // };
    

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLogin({ ...login, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginReq(login, dispatch);
    }

  return (
    <div className="login">
            <Header />

            <form className="login__form" onSubmit={handleSubmit}>

                <label htmlFor="Contact us" className="login--title">Login</label>

                <hr />

                    <label htmlFor="Email">Email :</label>
                    <input 
                        className="login__text"
                        type="text" 
                        name="username"
                        value={login.username}
                        onChange={handleChange}/>

                    <label htmlFor="Password">Password :</label>
                    <input 
                        className="login__text"
                        type="password" 
                        name="password"
                        value={login.password}
                        onChange={handleChange}/>

                    <button className="login__submit" type="submit">Login</button>

                    <hr></hr>

                    <Link to="/register"><button className="login__submit">Sign Up</button></Link>
            </form>

           
        </div>
  )
}
