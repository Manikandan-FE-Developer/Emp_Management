import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ authenticated, handleLogout, firstname }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return(
        <nav className="navbar row">
            <div className="col-12 col-md-1  navLogo">
                <div className="navbar-brand">
                    <Link to="/">
                        <img src="/images/logo.png" alt="logo" />
                    </Link>
                </div>
            </div>
            {authenticated ? (
                <>
                    <div className="col-12 col-md-7 mt-4 mt-md-0 text-left navEmpList">
                        <Link to={"/emplist"}>
                            <p className=""><i class="fa-solid fa-address-book"></i> Employee List</p>
                        </Link>
                    </div>
                    <div className="col-12 col-md-2 mt-4 mt-md-0 text-right navEmpName">
                        <p><i class="fa-solid fa-user"></i> {firstname}</p>
                    </div>
                    <div className="col-12 col-md-2 mt-4 mt-md-0 text-left navLogout">
                        <Link to={'/'}>
                            <button className="logoutBtn" onClick={handleLogout}><i className="fa fa-sign-out"></i> Logout</button>
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    <div className="col-12 col-md-9 mt-4 mt-md-0 text-right navLogin">
                        <Link to={"/login"}>
                            <button className="loginBtn"><i className="fa fa-sign-in"></i> Login</button>
                        </Link>
                    </div>
                    <div className="col-12 col-md-1 mt-4 mt-md-0 text-center navSignup">
                        <Link to={"/signup"}>
                            <button className="signupBtn"><i className="fa fa-user-plus"></i> Signup</button>
                        </Link>
                    </div>
                </>
            )}
            <div className="col-12 col-md navMenu">
                <div className="menuIcon">
                    {menuOpen ? (
                        <i id="menuIcon" className="fa fa-times" onClick={toggleMenu}></i>
                    ) : (
                        <i id="menuIcon" className="fa fa-bars" onClick={toggleMenu}></i>
                    )}
                </div>
                <div className={`menuItems ${menuOpen ? 'open' : ''}`}>
                    {authenticated ? (
                        <>
                            <Link to="#" onClick={() => { closeMenu(); }}><i class="fa-solid fa-user"></i> {firstname}</Link>
                            <Link to="/empList" onClick={() => { closeMenu(); }}><i class="fa-solid fa-address-book"></i> Employee List</Link>
                            <Link to="#" onClick={() => { closeMenu(); handleLogout(); }}><i class="fa fa-sign-out"></i> Logout</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={closeMenu}><i className="fa fa-sign-in"></i> Login</Link>
                            <Link to="/signup" onClick={closeMenu}><i className="fa fa-user-plus"></i> Signup</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}