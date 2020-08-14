import React from "react";
import { Spinner, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { default as axios } from "axios";
import { API_URL } from "../config.json";
import Lightbox from "react-image-lightbox";

export class RoomDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      photoIndex: 0,
      isLoaded: false,
      lightBoxOpen: false,
      data: {}
    };
  }
  componentDidMount() {
    const roomId = this.props.match.params.id;
    axios.get(`${API_URL}/rooms/${roomId}`)
      .then(res => {
        this.setState({
          ...this.state,
          data: res.data,
          isLoaded: true,
          lightBoxOpen: false
        })
      }).catch(() => {
      this.setState({
        ...this.state,
        isLoaded: true,
        err: "Unable find this room id"
      })
    });
  }
  openLightBox = (e) => {
    const id = e.target.id.split("-")[1];
    this.setState({
      ...this.state,
      photoIndex: id,
      lightBoxOpen: true
    })
  }
  closeLightBox = () => {
    this.setState({
      ...this.state,
      lightBoxOpen: false
    })
  }
  render() {
    const { error, isLoaded, data, lightBoxOpen, photoIndex } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      document.title = "Fogo - Loading...";
      return <div className="d-flex justify-content-center pt-5">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>;
    } else {
      document.title = "Fogo - "+data.details.name;
      return (
        <div className="main">
          <div className="container-fluid">
            <Breadcrumb className="pt-5">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item"><Link to="#">{data.address.district.text}</Link></li>
              <li className="breadcrumb-item"><Link to="#">{data.address.ward.text}</Link></li>
              <li className="breadcrumb-item active">{data.details.name}</li>

            </Breadcrumb>
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <span><i className="fas fa-edit text-fogo"/> Thông tin phòng</span>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6 col-md-3">
                        <div className="lead text-muted">Giá phòng</div>
                        {data.details.price.toLocaleString("en-US")} /tháng
                      </div>
                      <div className="col-6 col-md-3">
                        <div className="lead text-muted">Diện tích</div>
                        {data.details.area} m²
                      </div>
                      <div className="col-6 col-md-3">
                        <div className="lead text-muted">Đặt cọc</div>
                        {data.details.deposit}
                      </div>
                      <div className="col-6 col-md-3">
                        <div className="lead text-muted">Sức chứa</div>
                        {data.details?.capacy||"3"} {
                          (!data.details?.gender || data.details.gender === "any")? "Nam hoặc nữ":
                            data.details.gender === "male"?"Nam":"Nữ"
                        }
                      </div>
                      <div className="col-6 col-md-3">
                        <div className="lead text-muted">Điện</div>
                        {data.details.additional_fee.electric}
                      </div>
                      <div className="col-6 col-md-3">
                        <div className="lead text-muted">Nước</div>
                        {data.details.additional_fee.water}
                      </div>
                      <div className="col-6 col-md-3">
                        <div className="lead text-muted">Phí khác</div>
                        {data.details.additional_fee.other||"Không có"}
                      </div>
                      <div className="col-12">
                        <div className="lead text-muted">Địa chỉ</div>
                        {data.address.street+", "+
                        data.address.ward.text+", "+
                        data.address.district.text+", "+
                        data.address.city.text}
                      </div>
                    </div>

                  </div>
                </div>
                <div className="card mt-3">
                  <div className="card-header">
                    <span><i className="fas fa-star text-fogo"/> Tiện ích</span>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {data.utils?.air_conditional &&
                        <div className="col-6 col-md-3 lead">
                          <i className="fas fa-fan text-main"/>
                          <span>Điều hòa</span>
                        </div>
                      }
                      {data.utils?.balcony &&
                      <div className="col-6 col-md-3 lead">
                          <i className="fas fa-kaaba text-main"/>
                          <span>Ban công</span>
                        </div>
                      }
                      {data.utils?.closet &&
                        <div id="room-closet" className="col-6 col-md-3 lead">
                          <i className="fas fa-box text-main"/>
                          <span>Tủ đồ</span>
                        </div>
                      }
                      {data.utils?.bed &&
                        <div className="col-6 col-md-3 lead">
                          <i className="fas fa-bed text-main"/>
                          <span>Giường</span>
                        </div>
                      }
                      {data.utils?.bathroom &&
                        <div className="col-6 col-md-3 lead">
                          <i className="fas fa-shower text-main"/>
                          <span>Phòng tắm</span>
                        </div>
                      }
                      {data.utils?.cooking_allowed &&
                        <div className="col-6 col-md-3 lead">
                          <i className="fas fa-utensils text-main"/>
                          <span>Nấu ăn</span>
                        </div>
                      }
                      {data.utils?.fridge &&
                        <div className="col-6 col-md-3 lead">
                          <i className="fas fa-door-open text-main"/>
                          <span>Tủ lạnh</span>
                        </div>
                      }
                      {data.utils?.garret &&
                        <div className="col-6 col-md-3 lead">
                          <i className="fas fa-warehouse text-main"/>
                          <span>Gác xép</span>
                        </div>
                      }
                      {data.utils?.parking_area &&
                        <div className="col-6 col-md-3 lead">
                          <i className="fas fa-bicycle text-main"/>
                          <span>Gửi xe</span>
                        </div>
                      }
                      {!data.utils?.owner_living &&
                        <div id="room-owner_living" className="col-6 col-md-3 lead">
                          <i className="fas fa-key text-main"/>
                          <span>Tự do</span>
                        </div>
                      }
                      {data.utils?.pet_allowed &&
                        <div id="pet_allowed" className="col-6 col-md-3 lead">
                          <i className="fas fa-paw text-main"/>
                          <span>Thú cưng</span>
                        </div>
                      }
                      {data.utils?.television &&
                        <div className="col-6 col-md-3 lead">
                          <i className="fas fa-tv text-main"/>
                          <span>Tivi</span>
                        </div>
                      }
                      {data.utils?.washing_machine &&
                        <div className="col-6 col-md-3 lead">
                          <i className="fas fa-dumpster text-main"/>
                          <span>Máy giặt</span>
                        </div>
                      }
                      {data.utils?.water_heater &&
                        <div className="col-6 col-md-3 lead">
                          <i className="fas fa-dumpster-fire text-main"/>
                          <span>Máy nóng lạnh</span>
                        </div>
                      }
                      {data.utils?.wifi &&
                        <div className="col-6 col-md-3 lead">
                          <i className="fas fa-wifi text-main"/>
                          <span>Wifi</span>
                        </div>
                      }
                      {data.utils?.window &&
                        <div className="col-6 col-md-3 lead">
                          <i className="fas fa-columns text-main"/>
                          <span>Cửa sổ</span>
                        </div>
                      }
                    </div>
                  </div>
                </div>
                <div className="card mt-3">
                  <div className="card-header">
                    <span><i className="fas fa-info-circle text-fogo"/> Mô tả chi tiết</span>
                  </div>
                  <div className="card-body">
                    <p>{data.details.note}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 pt-3 pt-md-0">
                <div className="card">
                  <div className="card-header">
                    <span><i className="fas fa-images text-fogo"/> Hình ảnh</span>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {data.images.map((url,i)=>
                        <Link to="#" title={"Image "+i}>
                          <img className="thumbnail p-1" alt="" id={"image-"+i}
                               src={url} onClick={this.openLightBox}/>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <div className="card mt-3">
                  <div className="card-header">
                    <span><i className="fas fa-exclamation text-fogo"/> Một số lưu ý</span>
                  </div>
                  <div className="card-body">

                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            lightBoxOpen &&
            <Lightbox
              mainSrc={data.images[photoIndex]}
              nextSrc={data.images[(photoIndex + 1) % data.images.length]}
              prevSrc={data.images[(photoIndex + data.images.length - 1) % data.images.length]}
              onCloseRequest={this.closeLightBox}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + data.images.length - 1) % data.images.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % data.images.length,
                })
              }
              enableZoom={false}
            />
          }
        </div>
      );
    }
  }
}