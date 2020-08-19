import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import pushNotify from "../../utils/pushNotify";
import {Switch, Route} from "react-router";
import AddRoomComponent from "./components/AddRoomComponent";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(<div>
      {this.props.isAuthenticated ?
        this.props.role === 2 ?
          <Switch>
            <Route exact={true} path="/admin/room/add" component={AddRoomComponent}/>
            <Route path="/admin"><Redirect to="/admin/room/add"/></Route>
          </Switch>:
        <Redirect to="/" />: //Role != admin
        <Redirect to="/auth/login" /> //UnAuth
      }
    </div>);

  }
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    isAuthenticated: state.user.isAuthenticated,
    role: +localStorage.getItem("role")
  }
}
export default connect(mapStateToProps)(AdminPage);