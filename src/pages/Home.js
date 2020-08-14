import React from "react";
import { Route, Switch } from "react-router-dom";
import { Header, Footer, ShowCase, HomeComponent, RoomDetail, } from "../Components";
import MessengerChat from "react-messenger-customer-chat";

export class Home extends React.Component {
  render() {
    return(
      <div>
        <Header />
        <MessengerChat
          pageId="117709253256395"
          appId="121019348627722"
          />
        <ShowCase />
        <Switch>
          <Route exact path="/" component={HomeComponent}/>
          <Route path="/rooms/:id" component={RoomDetail}/>
        </Switch>
        <Footer />
      </div>
    );
  }
}