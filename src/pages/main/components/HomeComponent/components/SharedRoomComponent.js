import React, {useEffect, useState} from "react";
import api from "../../../../../services/api";
import Skeleton from "react-loading-skeleton";
import LazyLoad from "react-lazyload";
import { Card } from "react-bootstrap";
import SharedRoomItem from "./SharedRoomItem";
import pushNotify from "../../../../../utils/pushNotify";
import {Link} from "react-router-dom";

function SharedRoomComponent() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    api.post("/rooms/search", {type: ["Shared"], limit: 5})
      .then(res => {
        setData(res.data)
      }).catch(()=> {
      pushNotify({ title: "Lỗi", message: "Lấy data thất bại", type: "danger"});
    }).finally(() => {
      setLoading(false)
    });
  },[]);
  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <span><i className="fas fa-user-friends text-fogo mr-1"/>Tìm bạn ở ghép</span>
        </Card.Header>
        <Card.Body>
          {loading ?
            <Skeleton count={3}/> :
            data && data.length > 0 ?
              data.map(room =>
                <LazyLoad key={room._id} height={150}>
                  <SharedRoomItem data={room}/>
                  <div className="border-top my-3"/>
                </LazyLoad>
              ) :
              <p className="text-center">
                Chưa có phòng ở ghép nào, bạn có thể đăng phòng tại <Link to="/rooms/add">đây</Link>
              </p>
          }
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}
export default SharedRoomComponent;