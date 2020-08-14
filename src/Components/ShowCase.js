import React from "react";

export class ShowCase extends React.Component {
  render() {
    return(
      <div className="showcase">
        <div className="showcase-share">
          <div className="d-flex justify-content-center h-100">
            <div id="search-box" className="col-md-6 mt-5">
              <i className="fas fa-map-marker-alt"/>
              <input type="text" placeholder="Tìm kiếm phòng theo phường, quận,..."/>
                <span className="inline-search">
                  <button id="search-btn" type="submit" value="Search"><i className="fa fa-search"/></button>
                </span>
            </div>
          </div>
        </div>
        <div className="showcase-slogan">
          <h1>Fogo</h1>
          <h3>Ứng dụng tìm kiếm phòng trọ!</h3>
        </div>
      </div>
    );
  }
}