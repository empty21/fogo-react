import React, {useState} from "react";
import {
  MDBCol,
  MDBIcon,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBRow,
  MDBTabContent,
  MDBTabPane, MDBView,
} from "mdbreact";
import Lightbox from "react-image-lightbox";
import {Link} from "react-router-dom";

function RoomDetailsTab(props) {
  const {data} = props;
  const [lightBoxOpen, setLightBoxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("1");

  const openLightBox = (e) => {
    console.log(e);
    const id = e.target.id.split("-")[1];
    setPhotoIndex(id);
    setLightBoxOpen(true);
  }
  const toggleItem = tab => () => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }
  return (
    <React.Fragment>
      <MDBNav tabs className="nav-justified bg-primary">
        <MDBNavItem>
          <MDBNavLink
            link
            to="#"
            active={activeTab === "1"}
            onClick={toggleItem("1")}
            role="tab"
          >
            <MDBIcon icon="edit" /> Thông tin phòng
          </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink
            link
            to="#"
            active={activeTab === "2"}
            onClick={toggleItem("2")}
            role="tab"
          >
            <MDBIcon icon="star" /> Tiện ích
          </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink
            link
            to="#"
            active={activeTab === "3"}
            onClick={toggleItem("3")}
            role="tab"
          >
            <MDBIcon icon="info-circle" /> Mô tả chi tiết
          </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink
            link
            to="#"
            active={activeTab === "4"}
            onClick={toggleItem("4")}
            role="tab"
          >
            <MDBIcon icon="images" /> Ảnh
          </MDBNavLink>
        </MDBNavItem>
      </MDBNav>
      <MDBTabContent
        className="card"
        activeItem={activeTab}
      >
        <MDBTabPane tabId="1" role="tabpanel">
          <MDBRow className="pt-3">
            <MDBCol lg="3" sm="4" size="6" className="pb-3">
              <h4>Giá phòng</h4>
              {data?.details?.price?.value?.toLocaleString("vi-VN")}
              {` triệu/${data?.details?.price?.unit}`}
            </MDBCol>
            <MDBCol lg="3" sm="4" size="6" className="pb-3">
              <h4>Diện tích</h4>
              {data?.details?.area} m²
            </MDBCol>
            <MDBCol lg="3" sm="4" size="6" className="pb-3">
              <h4>Đặt cọc</h4>
              {data?.details?.deposit}
            </MDBCol>
            <MDBCol lg="3" sm="4" size="6" className="pb-3">
              <h4>Sức chứa</h4>
              {data?.details?.capacity}
              {" " + (data?.details?.gender === "female" ? "nữ" :
                data?.details?.gender === "male" ? "nam" : "nam hoặc nữ")}
            </MDBCol>
            <MDBCol lg="3" sm="4" size="6" className="pb-3">
              <h4>Tiền điện</h4>
              {data?.details?.additionalFee?.electric?.value}
              {"k/" + data?.details?.additionalFee?.electric?.unit}
            </MDBCol>
            <MDBCol lg="3" sm="4" size="6" className="pb-3">
              <h4>Tiền nước</h4>
              {data?.details?.additionalFee?.water?.value}
              {"k/" + data?.details?.additionalFee?.water?.unit}
            </MDBCol>
            <MDBCol lg="3" sm="4" size="6" className="pb-3">
              <h4>Phí khác</h4>
              {data?.details?.additionalFee?.other?.split(",")?.map(line =>
                <React.Fragment key={line}>
                  {line}<br/>
                </React.Fragment>)
              || "Không có"}
            </MDBCol>
            <MDBCol lg="3" sm="4" size="6" className="pb-3">
              <h4>Trạng thái</h4>
              <span className="text-success">{data?.status}</span>
            </MDBCol>
            <MDBCol className="pb-3">
              <h4>Địa chỉ</h4>
              {data?.address?.houseNumber + " " +
              data?.address?.street + ", " +
              data?.address?.ward?.text + ", " +
              data?.address?.district?.text + ", " +
              data?.address?.city?.text}
            </MDBCol>
          </MDBRow>
        </MDBTabPane>
        <MDBTabPane tabId="2" role="tabpanel">
          <MDBRow className="p-3 h5 h5-responsive">
              {data?.utils?.airConditioner &&
              <MDBCol size="6" sm="4" md="3">
                <i className="fas fa-fan text-primary lead mr-2"/>
                <span className="text-secondary">Điều hòa</span>
              </MDBCol>
              }
              {data?.utils?.balcony &&
              <MDBCol size="6" sm="4" md="3">
                <i className="fas fa-kaaba text-primary lead mr-2"/>
                <span className="text-secondary">Ban công</span>
              </MDBCol>
              }
              {data?.utils?.closet &&
              <MDBCol size="6" sm="4" md="3">
                <i className="fas fa-box text-primary lead mr-2"/>
                <span className="text-secondary">Tủ đồ</span>
              </MDBCol>
              }
              {data?.utils?.bed &&
              <MDBCol size="6" sm="4" md="3">
                <i className="fas fa-bed text-primary lead mr-2"/>
                <span className="text-secondary">Giường</span>
              </MDBCol>
              }
              {data?.utils?.bathroom &&
              <MDBCol size="6" sm="4" md="3">
                <i className="fas fa-shower text-primary lead mr-2"/>
                <span className="text-secondary">Phòng tắm</span>
              </MDBCol>
              }
              {data?.utils?.cookingAllowed &&
              <MDBCol size="6" sm="4" md="3">
                <i className="fas fa-utensils text-primary lead mr-2"/>
                <span className="text-secondary">Nấu ăn</span>
              </MDBCol>
              }
              {data?.utils?.fridge &&
              <MDBCol size="6" sm="4" md="3">
                <i className="fas fa-door-open text-primary lead mr-2"/>
                <span className="text-secondary">Tủ lạnh</span>
              </MDBCol>
              }
              {data?.utils?.garret &&
              <MDBCol size="6" sm="4" md="3">
                <i className="fas fa-warehouse text-primary lead mr-2"/>
                <span className="text-secondary">Gác xép</span>
              </MDBCol>
              }
              {data?.utils?.parkingArea &&
              <MDBCol size="6" sm="4" md="3">
                <i className="fas fa-bicycle text-primary lead mr-2"/>
                <span className="text-secondary">Gửi xe</span>
              </MDBCol>
              }
              {!data?.utils?.liveWithOwner &&
              <MDBCol size="6" sm="4" md="3">
                <i className="fas fa-key text-primary lead mr-2"/>
                <span className="text-secondary">Tự do</span>
              </MDBCol>
              }
              {data?.utils?.petsAllowed &&
              <MDBCol size="6" sm="4" md="3">
                <i className="fas fa-paw text-primary lead mr-2"/>
                <span className="text-secondary">Thú cưng</span>
              </MDBCol>
              }
              {data?.utils?.television &&
              <MDBCol size="6" sm="4" md="3">
                <i className="fas fa-tv text-primary lead mr-2"/>
                <span className="text-secondary">Tivi</span>
              </MDBCol>
              }
              {data?.utils?.washingMachine &&
              <MDBCol size="6" sm="4" md="3">
                <i className="fas fa-dumpster text-primary lead mr-2"/>
                <span className="text-secondary">Máy giặt</span>
              </MDBCol>
              }
              {data?.utils?.waterHeater &&
              <MDBCol size="6" sm="4" md="3">
                <i className="fas fa-dumpster-fire text-primary lead mr-2"/>
                <span className="text-secondary">Máy nóng lạnh</span>
              </MDBCol>
              }
              {data?.utils?.wifi &&
              <MDBCol size="6" sm="4" md="3">
                <i className="fas fa-wifi text-primary lead mr-2"/>
                <span className="text-secondary">Wifi</span>
              </MDBCol>
              }
              {data?.utils?.window &&
              <MDBCol size="6" sm="4" md="3">
                <i className="fas fa-columns text-primary lead mr-2"/>
                <span className="text-secondary">Cửa sổ</span>
              </MDBCol>
              }
            </MDBRow>
        </MDBTabPane>
        <MDBTabPane tabId="3" role="tabpanel">
          <h5 className="h5-responsive pt-3 px-md-5 px-sm-2">
            {data?.details?.note?.split("\\n")?.map(line =>
              <React.Fragment key={line}>
                {line} <br/>
              </React.Fragment>)}
          </h5>
        </MDBTabPane>
        <MDBTabPane tabId="4" role="tabpanel">
          <MDBRow style={{height: "80vh", overflow: "scroll"}}>
            {data?.images?.map((img,i) =>
              <MDBCol md="6" className="py-2" key={"image-"+i}>
                <Link to="#">
                  <MDBView hover zoom>
                    <img className="img-fluid" alt="" id={"image-"+i}
                         style={{maxHeight: "40vh", width: "100%", objectFit: "cover"}}
                         src={[img?.slice(0,47),"q_auto:low",img?.slice(48)].join("/")}
                         onClick={openLightBox}
                    />
                  </MDBView>
                </Link>
              </MDBCol>
            )}

          </MDBRow>
        </MDBTabPane>
      </MDBTabContent>
      {lightBoxOpen &&
      <Lightbox
        mainSrc={data.images[photoIndex]}
        nextSrc={data.images[(photoIndex + 1) % data.images.length]}
        prevSrc={data.images[(photoIndex + data.images.length - 1) % data.images.length]}
        onCloseRequest={() => setLightBoxOpen(false)}
        onMovePrevRequest={() =>
          setPhotoIndex((photoIndex - 1) % data.images.length)
        }
        onMoveNextRequest={() =>
          setPhotoIndex((photoIndex + 1) % data.images.length)
        }
      />
      }
    </React.Fragment>
  );
}
export default RoomDetailsTab;