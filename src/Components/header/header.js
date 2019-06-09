import React from 'react';
import './header.css';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import SideNavigation from './SideNav/sidenav'
const Header=(props)=>{
    // console.log(props)
    const navBars=()=>{
        return (
            <div className="bars">
                <FontAwesome name="bars" 
                onClick={props.onOpenNav}
                style={{
                    color:'#dfdfdf',
                    padding:'15px',
                    border:'3px',
                    cursor:'pointer'
                }}
                ></FontAwesome>
            </div>
        )
    }
    const logo=()=>{
        return(
            <Link to="/" className="logo">
                <img alt = "IPL logo"
                src = "http://www.myfreebucks.com/upload/company_logo/221220151450764997.png" / >
            </Link>
        )
    }
    return(
        <div className="header">
        <SideNavigation {...props}/>
        <div className="headerOpt">

            {navBars()}
            {logo()}
        </div>

        </div>
    )
}
export default Header;