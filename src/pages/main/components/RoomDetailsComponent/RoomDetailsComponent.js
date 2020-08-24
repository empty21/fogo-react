import React from "react";
import {  Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../../../services/api";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Skeleton from "react-loading-skeleton";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps} from "../../../../redux/store";
import pushNotify from "../../../../utils/pushNotify";

export class RoomDetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
      isLoaded: false,
      lightBoxOpen: false,
      room: null
    };
  }
  componentDidMount() {
    const roomId = this.props.match.params.id;
    this.props.setLoading();
    api.get(`/rooms/${roomId}`)
      .then(data => {
        this.setState({
          ...this.state,
          room: data,
          lightBoxOpen: false
        })
        this.props.clearUi();
      }).catch(() => {
        this.props.clearUi();
        pushNotify({title: "Lỗi", message: "Lấy dữ liệu thất bại", type: "danger"});
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
  handleFollow = (e) => {
    e.preventDefault();
    api.post("/rooms/"+this.state.room._id+"/follow")
    .then(() => {
      this.setState(state => {
        if(state.room.isFollowed) {
          state.room.isFollowed = false;
          state.room.nOFollowers--;
          pushNotify({title: "Success", message: "Đã huỷ quan tâm phòng"});
        } else {
          state.room.isFollowed = true;
          state.room.nOFollowers++;
          pushNotify({title: "Success", message: "Đã thêm phòng vào danh sách quan tâm"});
        }
        return state;
      });
    }).catch(e => {
      pushNotify({title: "Error", message: "Lỗi khi thêm phòng vào danh sách quan tâm", type: "danger"});
    });
  }
  render() {
    const {room, photoIndex, lightBoxOpen } = this.state;
    const { ui } = this.props;
    document.title = room ? "Fogo - "+room.details.name : "Fogo - Loading...";
    return (
      <div className="main">
        <div className="container-fluid">
          {ui.loading && <Skeleton/>}
          {room &&
          <Breadcrumb className="pt-5">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="#">{room.address.district.text}</Link></li>
            <li className="breadcrumb-item"><Link to="#">{room.address.ward.text}</Link></li>
            <li className="breadcrumb-item active">{room.details.name}</li>
          </Breadcrumb>
          }

          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <span className="mr-auto"><i className="fas fa-edit text-fogo"/> Thông tin phòng</span>
                  {room &&
                    <span className={`h3 float-right`}
                          onClick={this.handleFollow}>
                      <i className={`fas fa-eye mr-1 ${room.isFollowed ? "text-fogo" : "text-secondary"}`}/>
                      ({room.nOFollowers})
                    </span>
                  }
                </div>
                <div className="card-body">
                  {ui.loading && <Skeleton/>}
                  {room &&
                  <div className="row">
                    <div className="col-6 col-md-3">
                      <div className="lead text-muted">Giá phòng</div>
                      {room.details.price.value.toLocaleString("en-US")}
                      tr/
                      {room.details.price.unit}
                    </div>
                    <div className="col-6 col-md-3">
                      <div className="lead text-muted">Diện tích</div>
                      {room.details.area} m²
                    </div>
                    <div className="col-6 col-md-3">
                      <div className="lead text-muted">Đặt cọc</div>
                      {room.details.deposit}
                    </div>
                    <div className="col-6 col-md-3">
                      <div className="lead text-muted">Sức chứa</div>
                      <span>{room.details?.capacity}
                      {room.details.gender === "any" ? "nam hoặc nữ" :
                        room.details.gender === "male" ? "nam" : "nữ"}</span>
                    </div>
                    <div className="col-6 col-md-3">
                      <div className="lead text-muted">Điện</div>
                      {room.details.additionalFee.electric.value}
                      k/
                      {room.details.additionalFee.electric.unit}
                    </div>
                    <div className="col-6 col-md-3">
                      <div className="lead text-muted">Nước</div>
                      {room.details.additionalFee.water.value}
                      k/
                      {room.details.additionalFee.water.unit}
                    </div>
                    <div className="col-6 col-md-3">
                      <div className="lead text-muted">Phí khác</div>
                      {room.details.additionalFee.other || "Không có"}
                    </div>
                    <div className="col-12">
                      <div className="lead text-muted">Địa chỉ</div>
                      {room.address.street + ", " +
                      room.address.ward.text + ", " +
                      room.address.district.text + ", " +
                      room.address.city.text}
                    </div>
                  </div>
                  }


                </div>
              </div>
              <div className="card mt-3">
                <div className="card-header">
                  <span><i className="fas fa-star text-fogo"/> Tiện ích</span>
                </div>
                <div className="card-body">
                  {ui.loading && <Skeleton/>}
                  {room &&
                    <div className="row">
                      {room.utils?.airConditioner &&
                      <div className="col-6 col-md-3 lead mr-1">
                        <i className="fas fa-fan text-main"/>
                        <span>Điều hòa</span>
                      </div>
                      }
                      {room.utils?.balcony &&
                      <div className="col-6 col-md-3 lead mr-1">
                        <i className="fas fa-kaaba text-main"/>
                        <span>Ban công</span>
                      </div>
                      }
                      {room.utils?.closet &&
                      <div className="col-6 col-md-3 lead mr-1">
                        <i className="fas fa-box text-main"/>
                        <span>Tủ đồ</span>
                      </div>
                      }
                      {room.utils?.bed &&
                      <div className="col-6 col-md-3 lead mr-1">
                        <i className="fas fa-bed text-main"/>
                        <span>Giường</span>
                      </div>
                      }
                      {room.utils?.bathroom &&
                      <div className="col-6 col-md-3 lead mr-1">
                        <i className="fas fa-shower text-main"/>
                        <span>Phòng tắm</span>
                      </div>
                      }
                      {room.utils?.cookingAllowed &&
                      <div className="col-6 col-md-3 lead mr-1">
                        <i className="fas fa-utensils text-main"/>
                        <span>Nấu ăn</span>
                      </div>
                      }
                      {room.utils?.fridge &&
                      <div className="col-6 col-md-3 lead mr-1">
                        <i className="fas fa-door-open text-main"/>
                        <span>Tủ lạnh</span>
                      </div>
                      }
                      {room.utils?.garret &&
                      <div className="col-6 col-md-3 lead">
                        <i className="fas fa-warehouse text-main"/>
                        <span>Gác xép</span>
                      </div>
                      }
                      {room.utils?.parkingArea &&
                      <div className="col-6 col-md-3 lead mr-1">
                        <i className="fas fa-bicycle text-main"/>
                        <span>Gửi xe</span>
                      </div>
                      }
                      {!room.utils?.liveWithOwner &&
                      <div className="col-6 col-md-3 lead mr-1">
                        <i className="fas fa-key text-main"/>
                        <span>Tự do</span>
                      </div>
                      }
                      {room.utils?.petsAllowed &&
                      <div className="col-6 col-md-3 lead mr-1">
                        <i className="fas fa-paw text-main"/>
                        <span>Thú cưng</span>
                      </div>
                      }
                      {room.utils?.television &&
                      <div className="col-6 col-md-3 lead mr-1">
                        <i className="fas fa-tv text-main"/>
                        <span>Tivi</span>
                      </div>
                      }
                      {room.utils?.washingMachine &&
                      <div className="col-6 col-md-3 lead mr-1">
                        <i className="fas fa-dumpster text-main"/>
                        <span>Máy giặt</span>
                      </div>
                      }
                      {room.utils?.waterHeater &&
                      <div className="col-6 col-md-3 lead mr-1">
                        <i className="fas fa-dumpster-fire text-main"/>
                        <span>Máy nóng lạnh</span>
                      </div>
                      }
                      {room.utils?.wifi &&
                      <div className="col-6 col-md-3 lead mr-1">
                        <i className="fas fa-wifi text-main"/>
                        <span>Wifi</span>
                      </div>
                      }
                      {room.utils?.window &&
                      <div className="col-6 col-md-3 lead mr-1">
                        <i className="fas fa-columns text-main"/>
                        <span>Cửa sổ</span>
                      </div>
                      }
                    </div>
                  }
                </div>
              </div>
              <div className="card mt-3">
                <div className="card-header">
                  <span><i className="fas fa-info-circle text-fogo"/> Mô tả chi tiết</span>
                </div>
                <div className="card-body">
                  {ui.loading && Skeleton}
                  {room &&
                    <p>{room.details.note}</p>
                  }
                </div>
              </div>
            </div>
            <div className="col-md-4 pt-3 pt-md-0">
              <div className="card">
                <div className="card-header">
                  <span><i className="fas fa-images text-fogo"/> Hình ảnh</span>
                </div>
                <div className="card-body">


                  {room&&<div className="row">
                    {room.images.map((url, i) =>
                      <Link to="#" title={"Image " + i}>
                        <img className="thumbnail p-1" alt="" id={"image-" + i}
                             src={url} onClick={this.openLightBox}/>
                      </Link>
                    )}
                  </div>}
                </div>
              </div>
              <div className="card mt-3">
                <div className="card-header">
                  <span><i className="fas fa-exclamation text-fogo"/> Một số lưu ý</span>
                </div>
                <div className="card-body">
                  {ui.loading && <Skeleton/>}
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          lightBoxOpen &&
          <Lightbox
            mainSrc={room.images[photoIndex]}
            nextSrc={room.images[(photoIndex + 1) % room.images.length]}
            prevSrc={room.images[(photoIndex + room.images.length - 1) % room.images.length]}
            onCloseRequest={this.closeLightBox}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + room.images.length - 1) % room.images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % room.images.length,
              })
            }
            enableZoom={false}
          />
        }
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RoomDetailsComponent);