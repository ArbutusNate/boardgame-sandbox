import React, { Component } from 'react';
import "./Dashboard.css";
import Axios from "axios";
import Gamelist from "../Gamelist";
import Newsfeed from "../Newsfeed";
import HoverButtons from "../HoverButtons";
import Background from "../Background"
import logo from "../../assets/img/logo.png"
import LevelBar from "../LevelBar";
import UserProfile from "../UserProfile";
import UserProfileThumb from "../UserProfileThumb";
import Friendspace from "../FriendSpace";
import PopFriendSpace from "../PopFriendSpace";
import GroupSpace from "../GroupSpace";
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast } from 'react-toastify';
import scrollToComponent from 'react-scroll-to-component';
import {SideNav, SideNavItem, Button, Collapsible, CollapsibleItem} from 'react-materialize';
import openSocket from 'socket.io-client';
const socket = openSocket();

class Dashboard extends Component {
  state = {
    // state will be passed into hoverbuttons component as prop to render correct material-icon based on if user has notifications
    notifications:[],
    friends: [],
    groups: [],
    cardNum: 0
  }

  // cardGraphic = [goblin, ctrice, robo, rat, gnome, archer, undead, naga, medusa, bear];

  getNotifications = () => {
    console.log(this.props.uID);
    Axios.get(`api/user/${this.props.uID}/notifications`)
      .then(res => {
        this.setState({notifications: res.data})
      }).catch(error => {
        console.error(error);
      })
  }

  componentWillMount(){
    document.body.id = "db-scroll";
  }

  getLvl = () => {
    this.props.updateLvl(this.props.uID);
  }

  scrollToUserProfile = () => {
    scrollToComponent(this.UserProfile, { offset: 0, align: 'top', duration: 1500})
  }

  componentDidMount() {
    //if modal exists from splash page login screen, remove it
    const elem = document.querySelector(".modal-overlay")
    if(elem) elem.remove();
    this.getNotifications();
    this.setState({...this.props})
    // this.getFriends();
    socket.on(this.props.uID, thingToUpdate => {
      if (thingToUpdate === "notifications"){
        this.getNotifications();
        this.notify("New notification!");
      }

      if (thingToUpdate === "friends"){
        this.getNotifications();
        this.getFriends();
        this.notify("New friend added! How nice! +50xp");
        this.props.increaseExp(50);
      }

      if (thingToUpdate === "exp"){
        this.getLvl();
      }
    })
  };

  // openNav() {
  //  sideNav('show');
  // }


  notify = text => toast(text);

  render (props) {
    return (
       <Background backgroundName="dash-background">
        <div className="center mainContainer">
          <div className="loggedIn col s6 right">Logged in as {this.props.userName}
            {/* <UserProfileThumb cardSrc={this.props.cardGraphic} cardNum={this.props.cardNum} scroll={this.scrollToUserProfile}/> */}
          </div>
          <img src={logo} className="siteLogoDash" alt="logo" /><h1 className="logoH1Dash">GameVault</h1>
        </div>
      <div className="container dashContainer">
              <div className="row dashRow">
                <Gamelist games={this.state.games} wishlist={this.props.wishlist} uID={this.props.uID} notification={this.notify} setAppState={this.props.setAppState} increaseExp={this.props.increaseExp} />
              </div>

              <Button data-activates={'my-side-nav'}>test button</Button>
              <SideNav
                trigger={<button id="">needs a trigger</button>}
                options={{ closeOnClick: false }}
                id="my-side-nav"
                >
                <SideNavItem userView
                  user={{
                    background:this.props.cardGraphic
                  }}
                />
                <Collapsible id="popup-collapse">
                  <CollapsibleItem header="Friends" >
                    <PopFriendSpace uID={this.props.uID} friends={this.state.friends}>
                    </PopFriendSpace>
                  </CollapsibleItem>
                </Collapsible>
                {/* <SideNavItem divider />
                <SideNavItem href='#!second'>Groups</SideNavItem> */}
              </SideNav>

              <div className="row dashRow">
                <GroupSpace
                  uID={this.props.uID}
                  groups={this.props.groups}
                  games={this.props.games}
                />
              </div>

              <div className="row dashRow">
                <section className='UserProfile' ref={(section) => { this.UserProfile = section; }}>
                  <UserProfile cardSrc={this.props.cardGraphic}level={this.props.level} userName={this.props.userName} cardNum={this.props.cardNum}/>
                </section>
              </div>

              <div className="row dashRow">
                <Friendspace uID={this.props.uID} friends={this.props.friends}/>
              </div>

              <div className="row dashRow">
                <Newsfeed />
              </div>

          <LevelBar exp={this.props.exp} toNextLevel={this.props.toNextLevel}/>
          <HoverButtons uID={this.props.uID} notifications={this.state.notifications} getNotifications={this.getNotifications}/>
          <ToastContainer
          position="top-right"
          type="default"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          />

        </div>
        </Background>
    )
  }
}

export default Dashboard;