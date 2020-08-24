import React from "react";
import SharedRoomComponent from "./components/SharedRoomComponent";
import SearchedRoomComponent from "./components/SearchedRoomComponent";


class HomeComponent extends React.Component {
  async componentDidMount() {
    document.title = "Fogo - Ứng dụng tìm phòng trọ miễn phí";
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row pt-5">
          <SearchedRoomComponent query={{}}/>
          <SharedRoomComponent />
        </div>
      </div>
    );
  }
}
export default HomeComponent;
