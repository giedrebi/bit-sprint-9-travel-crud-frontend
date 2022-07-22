import { Link } from "react-router-dom";
import logo from './logo.png';
import React from 'react';

function Header(){
    return (
        <nav className="navbar navbar-expand-xl navbar-expand-lg bg-dark">
            <Link className="navbar-brand" to="/">  <img src={logo} alt="logo" style={{width:200, border:"0px solid black", borderRadius:"5px", marginLeft:"10px"}}/> </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" 
                    data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item"><Link className="nav-link" to="/countries" style={{color:"orange"}}>Countries</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/towns" style={{color:"orange"}}>Towns</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/customers" style={{color:"orange"}}>Customers</Link></li>
                </ul>
            </div>
        </nav>)
}
export default Header;
