import logo from './logo.svg';
import { useSelector } from 'react-redux';
import './App.css';
import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from 'react-router-dom';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import { Login } from './pages/Login/Login';

function App() {

  const account = useSelector(state => state.account);
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/' element={account.loggedIn? <Home/>: <Login/>} />
      </Routes>
    </Router>
      // true? <Home /> : <Login/>
  );
}

export default App;
