import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import MessengerChat from "react-messenger-customer-chat";
import "./MainPage.scss";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import HomeComponent from "./components/HomeComponent/HomeComponent";
import RoomDetailsComponent from "./components/RoomDetailsComponent/RoomDetailsComponent";
import AuthRoute from "../../utils/authRoute";
import FirstVisitPopupComponent from "./components/FirstVisitPopupComponent";
import AddRoomComponent from "./components/AddRoomComponent/AddRoomComponent";
import SearchComponent from "./components/SearchComponent/SearchComponent";

function MainPage() {
  return(
    <React.Fragment>
      <FirstVisitPopupComponent />
      <HeaderComponent />
      <MessengerChat
        pageId="117709253256395"
        appId="121019348627722"
      />
      <Switch>
        <Route exact path="/" component={HomeComponent}/>
        <Route path="/search/:searchText" component={SearchComponent}  />
        <AuthRoute exact path="/rooms/add" component={AddRoomComponent}/>
        <Route path="/rooms/:id" component={RoomDetailsComponent}/>
        <AuthRoute exact path="/me/followed" component={AddRoomComponent} />
        <AuthRoute exact path="/me/rooms" component={AddRoomComponent} />
        <Route path="*"><Redirect to="/404"/></Route>
      </Switch>
      <FooterComponent />
    </React.Fragment>
  );
}
export default MainPage;