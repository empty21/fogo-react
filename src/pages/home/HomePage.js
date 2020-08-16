import React from "react";
import { Route, Switch } from "react-router-dom";
import MessengerChat from "react-messenger-customer-chat";
import "./HomePage.scss";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import ShowCaseComponent from "./components/ShowCaseComponent";
import HomeComponent from "./components/HomeComponent/HomeComponent";
import RoomDetailsComponent from "./components/RoomDetailsComponent/RoomDetailsComponent";
import AuthRoute from "../../utils/authRoute";

export class HomePage extends React.Component {
  render() {
    return(
      <div>
        <HeaderComponent />
        <MessengerChat
          pageId="117709253256395"
          appId="121019348627722"
        />
        <ShowCaseComponent />
        <Switch>
          <Route exact path="/" component={HomeComponent}/>
          <AuthRoute errMessage="Bạn cần đăng nhập để xem phòng" path="/rooms/:id" component={RoomDetailsComponent}/>
        </Switch>
        <FooterComponent />
      </div>
    );
  }
}
export default HomePage;