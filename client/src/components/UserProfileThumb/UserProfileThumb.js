import React from "react";
import "./UserProfileThumb.css"
// import goblin from "../../assets/cards/goblinCard.png";
// import ctrice from "../../assets/cards/ctriceCard.png";
// import robo from "../../assets/cards/roboCard.png";
// import rat from "../../assets/cards/ratCard.png";
// import gnome from "../../assets/cards/gnomeCard.png";
// import archer from "../../assets/cards/archerCard.png";
// import undead from "../../assets/cards/undeadCard.png";
// import naga from "../../assets/cards/nagaCard.png";
// import medusa from "../../assets/cards/medusaCard.png";
// import bear from "../../assets/cards/bearCard.png";



const UserProfileThumb = props => {

			return (<div className="col s6 right UserProfileScroll" onClick={props.scroll}>
					<img src={props.cardSrc} alt={props.cardSrc} className="userThumbCard"/>
			</div>
			)

}

export default UserProfileThumb;
