import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { FaSortDown } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { accountActions } from '../../slices/account-slice';
import { useSelector } from 'react-redux';
import { logoutReq } from '../../actions/account';


export const Header = () => {

    const account = useSelector(state => state.account);

    const dispatch = useDispatch();

    // const logoutReq = async () => { 
    //     dispatch(accountActions.fetch());   
    //     await fetch(`http://localhost:3000/account/logout`, {
    //         method: 'GET',
    //         credentials: 'include'
    //     })
    //     .then(res => res.json())
    //     .then(json => {
    //         if (!json.type){
    //             dispatch(accountActions.fetch_error(json.message));
    //         }else{
    //             dispatch(accountActions.fetch_logout_success(json.message));
    //         }
    //     })
    //     .catch(err => dispatch(accountActions.fetch_error(err.message)));
    // };

    return (
        <header className="header">
            <Link to="/" className="logo">PANDORA</Link>

            {
                account.loggedIn? 
                <nav className="nav">
                <ul className="nav__header">
                    <li className="list list--dropDown">
                        <Link to="/cuisine">CUISINE</Link>
                    </li>

                    <li className="list">
                        <Link to="/contact">RESTAURANT</Link>
                    </li>

                    <li className="list">
                        <Link to="/user"><FaUser/></Link>
                    </li>

                    <li className="list">
                        <Link to="/cart"><FaShoppingCart/></Link>
                    </li>

                    <li className="list">
                        <RiLogoutBoxRFill onClick={()=> logoutReq(dispatch)}/>
                    </li>

                </ul>
            </nav>:null
            
        
            }
        </header>
    )
}