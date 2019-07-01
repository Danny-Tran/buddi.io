import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

class Main extends React.Component {

	render(){
  	return ( 
  		
  		<div className="appContainer">
        <div className="nav-bar">
        <a><img className="logo-img" src="https://getgreenline.co/wp-content/uploads/2018/08/Buddi_logo_blue_green.png"/></a>
        </div>
        
  				
					<div class='table'>
							<div class='cell'>
									<form id="login" action="index.html">
										<h2>Welcome Page</h2>
										<Link to="/main">Create Room</Link>
									</form>
							</div>
					</div>
				

        </div>
  		)
	}
}

export default Main;