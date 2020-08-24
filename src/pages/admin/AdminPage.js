import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {Switch} from "react-router";
import AddRoomComponent from "./components/AddRoomComponent";
import { mapStateToProps } from "../../redux/store";
import AuthRoute from "../../utils/authRoute";

class AdminPage extends React.Component {
  render() {
    return(<div>
      <Switch>
        <AuthRoute RequireRole={2} exact={true} path="/admin/room/add" component={AddRoomComponent}/>
        <AuthRoute RequireRole={2} path="/admin"><Redirect to="/admin/room/add"/></AuthRoute>
      </Switch>
    </div>);
  }
}


export default connect(mapStateToProps)(AdminPage);