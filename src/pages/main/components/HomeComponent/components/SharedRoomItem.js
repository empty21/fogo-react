import React, {useState} from "react";
import {Link} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {mapStateToProps} from "../../../../../redux/store";
import { connect } from "react-redux";
import api from "../../../../../services/api";
import pushNotify from "../../../../../utils/pushNotify";

function SharedRoomItem(props) {
  const { data } = props;
  const [isFollowed, setIsFollowed] = useState(props.data.isFollowed);
  const [followers, setFollowers] = useState(props.data.followers);
  const handleFollow = (e) => {
    e.preventDefault();
    api.post("/rooms/"+props.data._id+"/follow")
      .then(() => {
        if(isFollowed) {
          pushNotify({title: "Success", message: "Đã huỷ quan tâm phòng"});
        } else {
          pushNotify({title: "Success", message: "Đã thêm phòng vào danh sách quan tâm"});
        }
        setIsFollowed(!isFollowed);
        setFollowers(isFollowed ? followers-1 : followers+1);
      }).catch(e => {
      pushNotify({title: "Error", message: "Lỗi khi thêm phòng vào danh sách quan tâm", type: "danger"});
    });
  }
  return (
    <React.Fragment>
      <Link className="text-decoration-none" to={"/rooms/"+data._id}>
        <Row as="div" className="room-preview">
          <Col xs={6}>
            <img className="room-thumbnail shared-room" alt="Room thumbnail" src={data?.images[0]}/>
          </Col>
          <Col xs={6} className="text-center text-fogo">
            <h3>{(data.details.price.value).toLocaleString("vi-VN")}</h3>
            <p className="small">tr/{data.details.price.unit}</p>
            {props.isAuthenticated &&
            <span className={`h3`} onClick={handleFollow}>
              <i className={`fas fa-eye mr-1 ${isFollowed ? "text-fogo" : "text-secondary"}`}/>
              <sub className="text-secondary">{followers}</sub>
            </span>
            }
          </Col>
          <Container fluid={true}>
            <Row xs={1} className="text-black-50">
              <Col>
                <i className="fas fa-house-user text-icon mr-2"/>
                <span>
                  {
                    data.details.type === "Dormitory"?"Kí túc xá":
                      data.details.type === "Apartment"?"Căn hộ":
                        data.details.type === "Shared"?"Phòng ở ghép":
                          "Phòng cho thuê"
                  }
                </span>
              </Col>
              <Col>
                <i className="fas fa-ruler text-icon mr-2"/>
                <span>{data.details.area} m²</span>
              </Col>
              <Col>
                <i className="fas fa-venus-mars text-icon mr-2"/>
                <span>{
                  data.details.gender === "any" ? "Nam hoặc nữ":
                    data.details.gender === "male" ? "Nam" : "Nữ"
                }</span>
              </Col>
              <Col>
                <i className="fas fa-map-marker-alt text-icon mr-2"/>
                <span>{`${data.address.street}, ${data.address.ward.text}, ${data.address.district.text}, ${data.address.city.text}`}</span>
              </Col>
            </Row>
          </Container>
        </Row>
      </Link>
    </React.Fragment>
  );
}
export default connect(mapStateToProps)(SharedRoomItem);