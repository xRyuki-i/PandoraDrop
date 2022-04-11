import { accountActions } from '../slices/account-slice';

const fetchFromAccount = ({ endpoint, options, SUCCESS_TYPE, dispatch })  => {
    dispatch(accountActions.fetch()); 

    return fetch(`http://localhost:3000/account/${endpoint}`, options)
    .then(res => res.json())
        .then(json => {
            if (json.type === 'error'){
                dispatch(accountActions.fetch_error(json.message));
            }else{
                dispatch(accountActions[SUCCESS_TYPE](json.message));
            }
        })
        .catch(err => dispatch(accountActions.fetch_error(err.message)));
}

export const signupReq = ( register, dispatch ) => fetchFromAccount({
    endpoint: 'signup',
    options:  {
        method: 'POST',
        body: JSON.stringify( register ),
        headers: { 'Content-Type' : 'application/json'},
        credentials: 'include'
    },
    SUCCESS_TYPE: 'fetch_success',
    dispatch: dispatch
});

export const loginReq = (login, dispatch) => fetchFromAccount({
    endpoint: 'login',
    options: {
        method: 'POST',
        body: JSON.stringify( login ),
        headers: { 'Content-Type' : 'application/json'},
        credentials: 'include'
    },
    SUCCESS_TYPE: 'fetch_success',
    dispatch: dispatch
});

export const logoutReq = ( dispatch ) => fetchFromAccount({
    endpoint: 'logout',
    options: {
        credentials: 'include'
    },
    SUCCESS_TYPE: 'fetch_logout_success',
    dispatch: dispatch
});

export const fetchAuthenticated = (dispatch) => fetchFromAccount({
    endpoint: 'authenticated',
    options: {
        credentials: 'include'
    },
    SUCCESS_TYPE: 'fetch_authenticated_success',
    dispatch: dispatch
});