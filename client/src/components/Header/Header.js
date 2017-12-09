import React, { Component  } from 'react';
import {Navbar, NavItem, Icon, Button} from "react-materialize";
import "./Header.css";
import Axios from "axios";
import logo from "../../assets/img/logo.png"
import LevelBar from "../LevelBar";

class Header extends Component {
	state = {
		news: []
	}

	render () {
		return (
		<Navbar>
			<LevelBar exp={this.props.exp} toNextLevel={this.props.toNextLevel}/>
			<div className="headerLogo">
				<img src={logo} className="siteLogoHeader" alt="logo" /><h1 className="logoH1Header">GameVault</h1>
			</div>
			<Button small data-activates={'my-side-nav'} className={"settingsButton"}><Icon small className={"settingsIcon"}>settings</Icon></Button>
		</Navbar>
		)
	}
}

export default Header;