// IMPORT PACKAGE REFERENCES

import React from 'react';
import { NavLink } from 'react-router-dom';

// COMPONENT

export const Header = () => (
    <header>
        <div className="center-wrapper">
            <a href="#">
                <div className="logo-wrapper">
                    <div className="logo1"/>
                    <div className="logo2">dMarsLand</div>
                    <div className="clear"/>
                </div>
            </a>
            <nav className="main-nav">
                <div className="menu-wrapper">
                    <NavLink to='/'>
                        <button className="colored raise home">Home</button>
                    </NavLink>
                    <NavLink to='/buy'>
                        <button className="colored raise buy">Buy land</button>
                    </NavLink>
                    <NavLink to='/my'>
                        <button className="colored raise my">My lands</button>
                    </NavLink>
                    <NavLink to='/contact'>
                        <button className="colored raise contact">Contact</button>
                    </NavLink>
                </div>
            </nav>
        </div>
    </header>
);