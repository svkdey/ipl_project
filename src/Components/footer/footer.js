import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
const Footer=()=>{
    let CURRENT_YEAR = (new Date()).getFullYear();
    return(
        <div className="footer">
            <Link to="/" className="logo">
                {/* <img alt = "nba logo" src = "http://www.myfreebucks.com/upload/company_logo/221220151450764997.png" / > */}
              <div className="right1">
                @KKR{CURRENT_YEAR} All rights reserved.
            </div>
            </Link>
          
        </div>
    )
}
export default Footer;