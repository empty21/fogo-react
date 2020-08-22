import React from 'react';

export class FooterComponent extends React.Component {
  render() {
    return(
      <footer>
        <div className="mt-5 bg-dark text-white">
          <div className="row pt-4 pb-4">
            <div className="col-md-3 pt-3 text-center">
              <div className="container-fluid">
                <div className="h2">
                  <img src="/img/logo.png" alt="Fogo logo" height="70px" width="70px"/>
                  <span className="ml-3">FOGO</span>
                </div>
                <div>
                  Ứng dụng tìm phòng trọ miễn phí!
                </div>
              </div>
            </div>
            <div className="col-6 col-md-5 mt-3">
              <div className="container-fluid">
                <h4>Contact us</h4>
                <p className="small">
                  Hỗ trợ chăm sóc khách hàng: 091195195 - 0868967660<br/>
                  Thiết kế website: 0865510025<br/>
                  Bộ phận kĩ thuật website: 0836968705 - 0376486030<br/>
                  Văn phòng: 62/131 Trần Phú - Hà Đông - Hà Nội<br/>
                </p>
              </div>
            </div>
            <div className="col-6 col-md-4 mt-3">
              <div className="container-fluid">
                <h4>Fogo Team</h4>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
export default FooterComponent;