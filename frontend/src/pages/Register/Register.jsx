import React from 'react'
import './register.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import swal from 'sweetalert';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Header } from '../../components/Header/Header'
import { useNavigate } from 'react-router-dom';
import { signupReq } from '../../actions/account';

const Register = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [register, setRegister] = useState({username: '', password:'', userRole:''});

//   const signupRequest = async ( register ) => { 
//     dispatch(accountActions.fetch());   
//     await fetch(`http://localhost:3000/account/signup`, {
//         method: 'POST',
//         body: JSON.stringify( register ),
//         headers: { 'Content-Type' : 'application/json'},
//         credentials: 'include'
//     })
//     .then(res => res.json())
//     .then(json => {
//         if (json.type === 'error'){
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
    setRegister({ ...register, [name]: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    // signupRequest(register);
    signupReq(register, dispatch);
  }

  return (
    <>
        <Header/>

        <form className="register__form" onSubmit={handleClick}>

          <label htmlFor="Register" className="register--title">Register</label>

            <hr />

              <label htmlFor="Username">Username :</label>
                <input 
                    className="register__text"
                    type="text" 
                    name="username"
                    value={register.username}
                    onChange={handleChange}/>

                <label htmlFor="Password">Password :</label>
                  <input 
                    className="register__text"
                    type="password" 
                    name="password"
                    value={register.password}
                    onChange={handleChange}/>

                <label htmlFor="userRole">Role :</label>

                <select  className="register__text" name="userRole" onChange={handleChange}>
                  <option value="">...</option>
                  <option value="Customer">Customer</option>
                  <option value="Restaurant">Restaurant</option>
                </select>                   

                <button className="register__submit" onClick={handleClick}>Sign Up</button>

                <hr></hr>

                <Link to="/"><button className="register__submit">Login</button></Link>
        </form>
    </>
  )
}

export default Register;