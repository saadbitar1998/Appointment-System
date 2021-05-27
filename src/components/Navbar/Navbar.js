import React, { useState } from 'react';
import './Navbar.css';
import { MenuItems } from './MenuItems';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import Cookie from "js-cookie";

const Navbar = (props) => {

    console.log(props);

    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    }

    return (
        <nav className="NavbarItems">
            <h1 className="navbar-logo">Appointment</h1>
            <div className="menu-icon" onClick={handleClick}>
                <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link className={item.cName} to={item.url}>{item.title}</Link>
                        </li>
                    )
                })}
            </ul>

            {
                Cookie.get("token") ?
            
                    <div className="authentication-buttons">
                        <Button
                            onClick={() => {
                                Cookie.remove('token')
                                props.history.push('/login')
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                    :

                    <div className="authentication-buttons">
                        <Button
                            onClick={() => props.history.push('/login')}
                        >
                            Login
                        </Button>

                        <Button
                            onClick={() => props.history.push('/signup')}
                        >
                            Sign Up
                        </Button>
                    </div>

            }

        </nav>
    )

}


export default Navbar;