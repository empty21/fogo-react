import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps} from "../../../../../redux/store";
import {
  MDBCard, MDBCardBody, MDBContainer
} from "mdbreact";
import RoomCommonInfo from "./components/RoomCommonInfo";
import RoomDetailsTab from "./components/RoomDetailsTab";
import api from "../../../../../services/api";
import pushNotify from "../../../../../utils/pushNotify";
import Skeleton from "react-loading-skeleton";
import {Helmet} from "react-helmet";

function RoomDetailsComponent(props) {
  const roomId = props.match.params.id;
  const { setLoading, clearUi, history } = props;
  const [room, setRoom] = useState(null);
  useEffect(() => {
    setLoading();
    api.get(`/rooms/${roomId}`)
      .then(data => {
        setRoom(data);
      }).catch((err) => {
      pushNotify({title: "Lỗi", message: err.messages, type: "danger"});
      history.push("/404");
    }).finally(() => {
      clearUi();
    })
  }, [roomId, setLoading, clearUi, history]);
  return (
    <section id="room-details" className="mt-5 py-5">
      {room ?
      <Helmet>
        <title>{room.details.name} - Fogo Viet Nam</title>
        <meta property="og:title" content={room.details.name+" - Fogo Viet Nam"}/>
        <meta property="og:type" content="article" />
        <meta property="og:url" content={"https://fogovietnam.me/rooms/"+room._id} />
        <meta property="og:image" content={room.images[0]} />
        <meta property="og:description" content={room.details.note} />
        <meta name="description"
              content={room.details.note}
        />
      </Helmet> :
      <Helmet>
        <title>Loading... - Fogo Viet Nam</title>
      </Helmet>
      }
      <MDBContainer>
        <MDBCard>
          <MDBCardBody className="p-sm-5">
            {room ?
              <React.Fragment>
                <RoomCommonInfo data={room} />
                <RoomDetailsTab data={room} />
              </React.Fragment> :
              <Skeleton circle count="10" />
            }
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </section>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(RoomDetailsComponent);