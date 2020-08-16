import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import LazyLoad from "react-lazyload";
import axios from "axios";
import {API_URL} from "../../../../config.json";


function RoomSearchPreview(props) {
  const { data } = props;
  return (
    <Link className="row room-preview" to={"/rooms/"+data.id}>
      <div className="col-md-4">
        <LazyLoad height={150}>
          <img className="room-thumbnail" alt="Room thumbnail" src={data?.images[0]}/>
        </LazyLoad>
      </div>
      <div className="col-md-8 text-dark">
        <h4>{data.name}</h4>
        <div className="row">
          <div className="col-9">
            <div className="row text-black-50">
              <div className="col-12">
                <i className="fas fa-house-user text-icon"/>
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
                <i className="fas fa-ruler text-icon"/>
                <span> {data.area} m²</span>
              </div>
              <div className="col-12">
                <i className="fas fa-venus-mars text-icon"/>
                <span> {
                  (!data?.gender || data.gender === "any")? "Nam hoặc nữ":
                    data.gender === "male"?"Nam":"Nữ"
                }</span>
              </div>
              <div className="col-12">
                <i className="fas fa-map-marker-alt text-icon"/>
                <span> {data.address}</span>
              </div>
            </div>
          </div>
          <div className="col-3 text-center text-fogo">
            <h2>{(data.price/1000000).toLocaleString("vi-VN")}</h2>
            <span className="small">tr/tháng</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
// eslint-disable-next-line no-unused-vars
function SharedRoomPreview(props) {

}
class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: {}
    };
  }
  componentDidMount() {
    document.title = "Fogo - Ứng dụng tìm phòng trọ miễn phí";
    axios.post(`${API_URL}/rooms/search`)
      .then(res => {
        this.setState({
          ...this.state,
          data: res.data,
          isLoaded: true
        })
      }).catch(() => {
      this.setState({
        ...this.state,
        isLoaded: true,
        err: "Unable find this room id"
      })
    });
  }
  render() {
    const { error, isLoaded, data } = this.state;

    return (
      <div className="container-fluid">
        <div className="row pt-5">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <span><i className="fas fa-home text-fogo mr-1"/> Phòng cho thuê</span>
              </div>
              <div className="card-body">
                {!isLoaded ?
                  <Skeleton /> : error ?
                    <div>Error Load Data</div> :
                      data.data.map(room =>
                        <div>
                          <LazyLoad height={150}>
                            <RoomSearchPreview data={room} />
                            <div className="border-top my-3"/>
                          </LazyLoad>
                        </div>
                      )
                }
              </div>
            </div>
          </div>
          <div className="col-md-4 pt-5 pt-md-0">
            <div className="card">
              <div className="card-header">
                <span><i className="fas fa-user-friends text-fogo mr-1"/> Tìm bạn ở ghép</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default HomeComponent;