import React from "react";
import {Link} from "react-router-dom";
import {mapStateToProps} from "../../../../../redux/store";
import { connect } from "react-redux";

class SharedRoomItem extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div key={"shared-"+data.id}>
        <Link className="row room-preview" to={"/rooms/"+data.id}>
          <div className="col-6">
            <img className="room-thumbnail" alt="Room thumbnail" src={data?.images[0]}/>
          </div>
          <div className="col-6 text-center text-fogo">
            <h3>{(data.price.value).toLocaleString()}</h3>
            <p className="small">tr/{data.price.unit}</p>
            {this.props.isAuthenticated &&
            <i className={`fas fa-eye h3 ${data.isFollowed ? "text-fogo" : "text-secondary"}`}
               onClick={this.handleFollow}/>}
          </div>
        </Link>
      </div>
    );
  }
}
export default connect(mapStateToProps)(SharedRoomItem);