import React from "react";
import {Link} from "react-router-dom";
import {mapStateToProps} from "../../../../../redux/store";
import { connect } from "react-redux";
import api from "../../../../../services/api";
import pushNotify from "../../../../../utils/pushNotify";

class SharedRoomItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    }
  }
  handleFollow = (e) => {
    e.preventDefault();
    api.post("/rooms/"+this.state.data.id+"/follow")
      .then(() => {
        this.setState(state => {
          state.data.isFollowed = !state.data.isFollowed;
          return state;
        });
        if(this.state.data.isFollowed) {
          pushNotify({title: "Success", message: "Đã thêm phòng vào danh sách quan tâm"});
        } else {
          pushNotify({title: "Success", message: "Đã huỷ quan tâm phòng"});
        }

      }).catch(e => {
      pushNotify({title: "Error", message: "Lỗi khi thêm phòng vào danh sách quan tâm", type: "danger"});
    });
  }
  render() {
    const { data } = this.props;
    return (
      <div key={"shared-"+data.id}>
        <Link className="row room-preview" to={"/rooms/"+data.id}>
          <div className="col-6">
            <img className="room-thumbnail shared-room" alt="Room thumbnail" src={data?.images[0]}/>
          </div>
          <div className="col-6 text-center text-fogo">
            <h3>{(data.price.value).toLocaleString("vi-VN")}</h3>
            <p className="small">tr/{data.price.unit}</p>
            {this.props.isAuthenticated &&
              <span className={`h3 ${data.isFollowed ? "text-fogo" : "text-secondary"}`} onClick={this.handleFollow}>
                <i className={`fas fa-eye mr-1`}/> ({data.nOFollowers})
              </span>
            }
          </div>
            <div className="container-fluid">
              <div className="row text-black-50">
                <div className="col-12">
                  <i className="fas fa-house-user text-icon mr-2"/>
                  <span>
                  {
                    data.type === "Dormitory"?"Kí túc xá":
                      data.type === "Apartment"?"Căn hộ":
                        data.type === "Shared"?"Phòng ở ghép":
                          "Phòng cho thuê"
                  }
                </span>
                </div>
                <div className="col-md-6">
                  <i className="fas fa-ruler text-icon mr-2"/>
                  <span>{data.area} m²</span>
                </div>
                <div className="col-12">
                  <i className="fas fa-venus-mars text-icon mr-2"/>
                  <span>{
                    data.gender === "any" ? "Nam hoặc nữ":
                      data.gender === "male" ? "Nam" : "Nữ"
                  }</span>
                </div>
                <div className="col-12">
                  <i className="fas fa-map-marker-alt text-icon mr-2"/>
                  <span>{data.address}</span>
                </div>
              </div>
            </div>
        </Link>
      </div>
    );
  }
}
export default connect(mapStateToProps)(SharedRoomItem);