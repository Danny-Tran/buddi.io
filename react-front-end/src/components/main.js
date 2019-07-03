import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

class Main extends React.Component {

	render(){
  	return ( 
  		
  		<div className="appContainer">
        <div className="nav-bar">
        <a><img className="logo-together" src={require('../together.png')}/></a>
        <a><img className="logo-img" src={require('../buddi.png')}/></a>
        <Link to="/main"><button className="login-button">Login</button></Link>
        </div>
        
  				
					<div class='table'>
							<div class='cell'>
									<form id="login" action="index.html">
									<div class="typewriter">
											<h2>Welcome to Buddi.Watch </h2>
											<span  className='spann'> Watch together </span>
											| 
											<span> chill together</span>
									</div>
									
										<Link to="/main"><button className="button	">Create Your	Room</button></Link>

										
									</form>
							</div>
					</div>
							<footer className='footer-main'>
									<p className='ptag'>Contributed by: Peter, Danny, Gagan</p>
									
							</footer>
				

        </div>
  		)
	}
}

export default Main;