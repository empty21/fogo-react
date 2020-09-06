import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SharedRoomComponent from "./components/SharedRoomComponent";
import SearchedRoomComponent from "./components/SearchedRoomComponent";
import ShowCaseComponent from "../ShowCaseComponent";


function HomeComponent() {
  document.title = "Fogo - Ứng dụng tìm phòng trọ miễn phí";
  return (
    <React.Fragment>
      <ShowCaseComponent />
      <Container fluid={true}>
        <Row className="pt-5">
          <Col md={8}>
            <SearchedRoomComponent tabName="Phòng cho thuê" query={{type: ["Unshared", "Apartment", "Dormitory"]}}/>
          </Col>
          <Col md={4}>
            <SharedRoomComponent />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
export default HomeComponent;
