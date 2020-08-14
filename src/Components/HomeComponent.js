import React from "react";
import { Link } from "react-router-dom";
import {Spinner} from "react-bootstrap";
import {default as axios} from "axios";
import {API_URL} from "../config.json";

class RoomPreviewComponent extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  render() {
    const { data } = this.props;
    return (
      <Link className="row room-preview" to={"/rooms/"+data.id}>
        <div className="col-md-4">
          <img className="room-thumbnail" alt="Room thumbnail" src={data?.images[0]}/>
        </div>
        <div className="col-md-8 text-dark">
          <h4>{data.name}</h4>
          <div className="row">
            <div className="col-9">
              <div className="row text-black-50">
                <div className="col-12">
                  <i className="fas fa-house-user text-icon"/>
                  <span> {
                    data.type === "Dormitory"?"Kí túc xá":
                      data.type === "Apartment"?"Căn hộ":
                        data.type === "Shared"?"Phòng ở ghép":
                          "Phòng cho thuê"
                  }</span>
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
}
export class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: {}
    };
  }
  componentDidMount() {
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
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      document.title = "Fogo - Loading...";
      return (
        <div className="d-flex justify-content-center pt-5">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
    } else {
      document.title = "Fogo - Home";
      return (
        <div className="container-fluid">
          <div className="row pt-5">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <span><i className="fas fa-home text-fogo"/> Phòng cho thuê</span>
                </div>
                <div className="card-body">
                  {data.data.map(room => <div>
                    <RoomPreviewComponent data={room} />
                    <div className="border-top my-3"/>
                  </div>)}
                </div>
              </div>

            </div>
            <div className="col-md-4 pt-5 pt-md-0">
              <div className="card">
                <div className="card-header">
                  <span><i className="fas fa-user-friends text-fogo"/> Tìm bạn ở ghép</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
