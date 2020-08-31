import React from "react";
import {connect} from "react-redux";
import {Switch} from "react-router";
import { mapStateToProps } from "../../redux/store";

class AdminPage extends React.Component {
  render() {
    return(<React.Fragment>
      <Switch>
      </Switch>
    </React.Fragment>);
  }
}


export default connect(mapStateToProps)(AdminPage);