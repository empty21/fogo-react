import React from "react";
import api from "../../../../../services/api";
import Skeleton from "react-loading-skeleton";
import LazyLoad from "react-lazyload";
import SharedRoomItem from "./SharedRoomItem";
import pushNotify from "../../../../../utils/pushNotify";

class SharedRoomComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: false
    }
  }
  componentDidMount() {
    this.setState({
      ...this.state,
      isLoading: true
    });
    api.post("/rooms/search", {type: "Shared", limit: 5})
    .then(res => {
      this.setState({
        ...this.state,
        data: res.data
      });
    }).catch(()=> {
        pushNotify({ title: "Lỗi", message: "Lấy data thất bại", type: "danger"});
    }).finally(() => {
        this.setState({
          ...this.state,
          isLoading: false
        });
    });
  }

  render() {
    const { isLoading, data } = this.state;
    return (
      <div className="col-md-4 pt-5 pt-md-0">
        <div className="card">
          <div className="card-header">
            <span><i className="fas fa-user-friends text-fogo mr-1"/>Tìm bạn ở ghép</span>
          </div>
          <div className="card-body">
            {isLoading ?
              <Skeleton count={3}/> :
              data ?
                data.map(room =>
                  <LazyLoad key={room.id} height={150}>
                    <SharedRoomItem data={room}/>
                    <div className="border-top my-3"/>
                  </LazyLoad>
                ) :
                <p className="text-center">Không tìm thấy kết quả nào</p>
            }
          </div>
        </div>
      </div>
    );
  }
}
export default SharedRoomComponent;