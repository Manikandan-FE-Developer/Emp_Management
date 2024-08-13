import './App.css';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import EmpList from './pages/EmpList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateEmp from './pages/CreateEmp';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({ firstname: '', lastname: '', email: '', password: '' });

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        setAuthenticated(true);
        setUser(user);
    }
  }, []);

  const handleLogin = (firstname, lastname, email, password) => {
    setAuthenticated(true);
    const user = { firstname, lastname, email, password };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    toast.success('Logout Successful');
    localStorage.removeItem("user");
    setAuthenticated(false);
    setUser({ firstname: '', lastname: '', email: '', password: '' });
  };
  
  return (
    <div className="App">
      <Router>
        <ToastContainer className="toaster" theme='dark' position="top-center" autoClose={2000}/>
        <Header authenticated={authenticated} handleLogout={handleLogout} firstname={user.firstname}/>
        <Routes>
          <Route path="/" element={<Home authenticated={authenticated} user={user}/>}/>
          <Route path='/empList' element={<EmpList/>}/>
          <Route path='/createemp' element={<CreateEmp/>}/>
          <Route path='/login' element={<Login handleLogin={handleLogin}/>}/>
          <Route path='/signup' element={<Signup handleLogin={handleLogin}/>}/>
          <Route/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;