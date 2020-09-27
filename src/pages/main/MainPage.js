import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import MessengerChat from "react-messenger-customer-chat";
import HeaderComponent from "./layouts/Header";
import Footer from "./layouts/Footer";
import HomeComponent from "./layouts/MainContents/Home/HomeComponent";
import RoomDetailsComponent from "./layouts/MainContents/RoomDetails/RoomDetailsComponent";
import SearchResultComponent from "./layouts/MainContents/SearchResult/SearchResultComponent";
import {Helmet} from "react-helmet";
import AuthRoute from "../../utils/authRoute";
import AddRoomComponent from "./layouts/MainContents/AddRoom/AddRoomComponent";

function MainPage() {
  return(
    <React.Fragment>
      <Helmet>
        <title>Fogo - Giải pháp tìm phòng trọ miễn phí</title>
        <meta property="og:title" content="Fogo - Giải pháp tìm phòng trọ miễn phí"/>
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://fogovietnam.me" />
        <meta property="og:image" content="https://fogovietnam.me/img/logo.jpg" />
        <meta property="og:description" content="Ứng dụng tìm phòng trọ miễn phí cho sinh viên" />
        <meta name="description" content="Ứng dụng tìm phòng trọ miễn phí cho sinh viên"/>
      </Helmet>
      <HeaderComponent />
      <MessengerChat
        pageId="117709253256395"
        appId="121019348627722"
      />
      <div id="content">
        <Switch>
          <Route exact path="/" component={HomeComponent} />
          <AuthRoute exact path="/rooms/add/" component={AddRoomComponent} />
          <Route path="/rooms/:id" component={RoomDetailsComponent} />
          <Route path="/search" component={SearchResultComponent} />
          <Route path="*"><Redirect to="/404"/></Route>
        </Switch>
      </div>
      <Footer />
    </React.Fragment>
  );
}
export default MainPage;
