import React from "react";
import { MDBContainer} from "mdbreact";
import Showcase from "./components/Showcase";
import UnsharedRoom from "./components/UnsharedRoom";
import SharedRoom from "./components/SharedRoom";


function HomeComponent() {
  document.title = "Fogo - Ứng dụng tìm phòng trọ miễn phí";
  return (
    <React.Fragment>
      <MDBContainer>
        <Showcase />
        <UnsharedRoom />
        <SharedRoom />
      </MDBContainer>
    </React.Fragment>
  );
}
export default HomeComponent;
