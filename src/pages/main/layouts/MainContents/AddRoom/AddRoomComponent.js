import React, {useEffect, useState} from "react";
import api from "../../../../../services/api";
import {MDBContainer, MDBCard, MDBCardBody, MDBCol, MDBRow} from "mdbreact";
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import pushNotify from "../../../../../utils/pushNotify";
import {mapDispatchToProps, mapStateToProps} from "../../../../../redux/store";

function AddRoomComponent(props) {
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("")
  const cityList = [{code: 2, name: "Hà Nội"}];
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [files, setFiles] = useState([]);
  const {register, handleSubmit} = useForm();

  useEffect(() => {
    window.$(document).ready(function() {
      window.$('.mdb-select').materialSelect();
    });
  }, [])

  const handleCreate = (data) => {
    data.address.city.text = city;
    data.address.district.text = district;
    data.address.ward.text = ward;
    props.setLoading();
    handleUploadImage().then(images => {
      data.images = images.map(file => file?.value?.path || undefined);
      data.details.note = data.details.note.replace(/\n/g,"\\n");

      if(data.images?.length === 0) {
        pushNotify({title: "Thất bại", message: "Cần ít nhất 1 ảnh", type: "danger"});

      } else {
        return api.post("/rooms", data)
          .then(data => {
            pushNotify({title: "Thành công", message: "Bạn sẽ được chuyển đến xem phòng"});
            props.history.push("/rooms/"+data.id);
          }).catch(() => {
          pushNotify({title: "Lỗi", message: "Thêm phòng thất bại.\nVui lòng liên hệ quản trị viên", type: "danger"});
        });
      }
    }).finally(()=>{
      props.clearUi();
    });
  }
  const handleUploadImage = () => {
    return Promise.allSettled(
      files.map(file => {
        const formData = new FormData();
        formData.append("image", file, file.name);
        return api.uploadFile(formData);
      })
    );
  }
  return (
    <MDBContainer className="py-5 my-5">
      <MDBCard>
      <MDBCardBody>
        <MDBContainer className="text-icon">
          <h1 className="text-primary font-weight-bold">Đăng phòng</h1>
          <span>* Trước khi duyệt, chúng tôi sẽ liên hệ với bạn để xác nhận cơ sở vật chất</span>
          <form onSubmit={handleSubmit(handleCreate)} id="room-info">
            <MDBRow className="mt-4 pl-1 pl-md-5">
              <MDBCol size="12" md="6">
                <MDBRow>
                  <MDBCol size="12">
                    <div className="md-form my-1">
                      <input type="text" name="details.name" id="details.name" className="form-control"
                             ref={register({
                               required: true
                             })}
                      />
                      <label htmlFor="details.name">Tên phòng</label>
                    </div>
                  </MDBCol>
                  <MDBCol size="4">
                    <select className="md-form mdb-select my-1" searchable="Tìm kiếm.." defaultValue=""
                            name="address.city.code"
                            onChange={e => {
                              setCity(e.target.options[e.target.selectedIndex].text);
                              api.get("/locations/district/"+e.target.value)
                                .then(data => setDistrictList(data));
                            }}
                            ref={register({
                              required: true
                            })}
                    >
                      <option value="" disabled>Thành phố / Tỉnh</option>
                      {cityList.map(item => <option key={item.code} value={item.code}>{item.name}</option> )}
                    </select>
                  </MDBCol>
                  <MDBCol size="4">
                    <select className="md-form mdb-select my-1" searchable="Tìm kiếm.." defaultValue=""
                            name="address.district.code"
                            onChange={e => {
                              setDistrict(e.target.options[e.target.selectedIndex].text);
                              api.get("/locations/ward/"+e.target.value)
                                .then(data => setWardList(data));
                            }}
                            ref={register({
                              required: true
                            })}
                    >
                      <option value="" disabled>Quận / Huyện</option>
                      {districtList.map(item => <option key={item.code} value={item.code}>{item.name}</option> )}
                    </select>
                  </MDBCol>
                  <MDBCol size="4">
                    <select className="md-form mdb-select my-1" searchable="Tìm kiếm.." defaultValue=""
                            name="address.ward.code"
                            ref={register({
                              required: true
                            })}
                            onChange={e => setWard(e.target.options[e.target.selectedIndex].text)}
                    >
                      <option value="" disabled>Phường / Xã</option>
                      {wardList.map(item => <option key={item.code} value={item.code}>{item.name}</option> )}
                    </select>
                  </MDBCol>
                  <MDBCol size="6">
                    <div className="md-form my-1">
                      <input type="text" name="address.houseNumber" id="address.houseNumber" className="form-control"
                             ref={register({
                               required: true
                             })}
                      />
                      <label htmlFor="address.houseNumber">Số nhà</label>
                    </div>
                  </MDBCol>
                  <MDBCol size="6">
                    <div className="md-form my-1">
                      <input type="text" name="address.street" id="address.street" className="form-control"
                             ref={register({
                               required: true
                             })}
                      />
                      <label htmlFor="address.street">Tên đường</label>
                    </div>
                  </MDBCol>
                  <MDBCol size="6">
                    <div className="md-form my-1">
                      <select className="mdb-select" defaultValue=""
                              name="details.type"
                              ref={register({
                                required: true
                              })}
                      >
                        <option value="" disabled>Loại phòng</option>
                        <option value="Shared">Phòng ở ghép</option>
                        <option value="Unshared">Phòng cho thuê</option>
                        <option value="Apartment">Căn hộ</option>
                        <option value="Dormitory">Kí túc xá / Home Stay</option>
                      </select>
                    </div>
                  </MDBCol>
                  <MDBCol size="6">
                    <div className="md-form input-group my-1">
                      <input type="text" name="details.area" id="details.area" className="form-control"
                             ref={register({
                               required: true
                             })}
                      />
                      <label htmlFor="details.area">Diện tích</label>
                      <div className="input-group-append">
                        <span className="input-group-text md-addon">m²</span>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol size="6">
                    <MDBRow>
                      <MDBCol size="6">
                        <div className="md-form my-1">
                          <input type="text" name="details.capacity" id="details.capacity" className="form-control"
                                 ref={register({
                                   required: true
                                 })}
                          />
                          <label htmlFor="details.capacity">Sức chứa</label>
                        </div>
                      </MDBCol>
                      <MDBCol size="6" >
                        <div className="md-form my-1">
                          <select className="mdb-select" defaultValue="any" name="details.gender"
                                  ref={register({
                                    required: true
                                  })}
                          >
                            <option value="any">nam/nữ</option>
                            <option value="male">nam</option>
                            <option value="female">nữ</option>
                          </select>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                  <MDBCol size="6">
                    <div className="md-form my-1">
                      <input type="text" name="status" id="status" className="form-control"
                             ref={register({
                               required: true
                             })}
                      />
                      <label htmlFor="status">Tình trạng phòng</label>
                    </div>
                  </MDBCol>
                  <MDBCol size="12">
                    <div className="md-form my-1">
                      <textarea name="details.note" id="details.note" className="md-textarea form-control" rows="2"
                                ref={register({
                                  required: true
                                })}
                      />
                      <label htmlFor="details.note">Mô tả phòng</label>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
              <MDBCol size="12" md="6">
                <MDBRow>
                  <MDBCol size="6">
                    <MDBRow>
                      <MDBCol size="6">
                        <div className="md-form my-1">
                          <input type="number"
                                 name="details.price.value" id="details.price.value"
                                 min="0" step="0.1"
                                 className="form-control"
                                 ref={register({
                                   required: true
                                 })}
                          />
                          <label htmlFor="details.price.value">Giá phòng</label>
                        </div>
                      </MDBCol>
                      <MDBCol size="6">
                        <div className="md-form my-1">
                          <select className="mdb-select" defaultValue="người"
                                  name="details.price.unit"
                                  ref={register({
                                    required: true
                                  })}
                          >
                            <option value="người">tr/nguời</option>
                            <option value="phòng">tr/phòng</option>
                          </select>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                  <MDBCol size="6">
                    <div className="md-form my-1">
                      <input type="text"
                             name="details.deposit" id="details.deposit"
                             ref={register({
                               required: true
                             })}
                             className="form-control"
                      />
                      <label htmlFor="details.deposit">Đặt cọc</label>
                    </div>
                  </MDBCol>
                  <MDBCol size="6">
                    <MDBRow>
                      <MDBCol size="6">
                        <div className="md-form my-1">
                          <input type="number"
                                 name="details.additionalFee.electric.value" id="details.additionalFee.electric.value"
                                 min="0" step="0.1"
                                 className="form-control"
                                 ref={register({
                                   required: true
                                 })}
                          />
                          <label htmlFor="details.additionalFee.electric.value">Tiền điện</label>
                        </div>
                      </MDBCol>
                      <MDBCol size="6">
                        <div className="md-form my-1">
                          <select className="mdb-select" defaultValue="số"
                                  name="details.additionalFee.electric.unit"
                                  ref={register({
                                    required: true
                                  })}
                          >
                            <option value="số">k/số</option>
                            <option value="người">k/người</option>
                          </select>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                  <MDBCol size="6">
                    <MDBRow>
                      <MDBCol size="6">
                        <div className="md-form my-1">
                          <input type="number"
                                 name="details.additionalFee.water.value" id="details.additionalFee.water.value"
                                 min="0" step="0.1"
                                 className="form-control"
                                 ref={register({
                                   required: true
                                 })}
                          />
                          <label htmlFor="details.additionalFee.water.value">Tiền nước</label>
                        </div>
                      </MDBCol>
                      <MDBCol size="6">
                        <div className="md-form my-1">
                          <select className="mdb-select" defaultValue="số"
                                  name="details.additionalFee.water.unit"
                                  ref={register({
                                    required: true
                                  })}
                          >
                            <option value="số">k/số</option>
                            <option value="người">k/người</option>
                          </select>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                  <MDBCol size="6">
                    <div className="md-form my-1">
                      <input type="text"
                             name="details.additionalFee.other" id="details.additionalFee.other"
                             className="form-control"
                             ref={register({
                               required: true
                             })}
                      />
                      <label htmlFor="details.additionalFee.other">Chi phí khác</label>
                    </div>
                  </MDBCol>
                  <MDBCol size="12" className="mb-2">
                    <h3 className="text-primary font-weight-bold">Tiện ích</h3>
                    <MDBRow className="small">
                      <MDBCol size="3">
                        <div className="form-check pl-0">
                          <input type="checkbox" className="form-check-input"
                                 id="utils.airConditioner"
                                 name="utils.airConditioner"
                                 ref={register}
                          />
                          <label className="form-check-label" htmlFor="utils.airConditioner">Điều hoà</label>
                        </div>
                      </MDBCol>
                      <MDBCol size="3">
                        <div className="form-check pl-0">
                          <input type="checkbox" className="form-check-input"
                                 id="utils.balcony"
                                 name="utils.balcony"
                                 ref={register}
                          />
                          <label className="form-check-label" htmlFor="utils.balcony">Ban công</label>
                        </div>
                      </MDBCol>
                      <MDBCol size="3">
                        <div className="form-check pl-0">
                          <input type="checkbox" className="form-check-input"
                                 id="utils.closet"
                                 name="utils.closet"
                                 ref={register}
                          />
                          <label className="form-check-label" htmlFor="utils.closet">Tủ đồ</label>
                        </div>
                      </MDBCol>
                      <MDBCol size="3">
                        <div className="form-check pl-0">
                          <input type="checkbox" className="form-check-input"
                                 id="utils.bed"
                                 name="utils.bed"
                                 ref={register}
                          />
                          <label className="form-check-label" htmlFor="utils.bed">Giường</label>
                        </div>
                      </MDBCol>
                      <MDBCol size="3">
                        <div className="form-check pl-0">
                          <input type="checkbox" className="form-check-input"
                                 id="utils.bathroom"
                                 name="utils.bathroom"
                                 ref={register}
                          />
                          <label className="form-check-label" htmlFor="utils.bathroom">Phòng tắm</label>
                        </div>
                      </MDBCol>
                      <MDBCol size="3">
                        <div className="form-check pl-0">
                          <input type="checkbox" className="form-check-input"
                                 id="utils.cookingAllowed"
                                 name="utils.cookingAllowed"
                                 ref={register}
                          />
                          <label className="form-check-label" htmlFor="utils.cookingAllowed">Nấu ăn</label>
                        </div>
                      </MDBCol>
                      <MDBCol size="3">
                        <div className="form-check pl-0">
                          <input type="checkbox" className="form-check-input"
                                 id="utils.fridge"
                                 name="utils.fridge"
                                 ref={register}
                          />
                          <label className="form-check-label" htmlFor="utils.fridge">Tủ lạnh</label>
                        </div>
                      </MDBCol>
                      <MDBCol size="3">
                        <div className="form-check pl-0">
                          <input type="checkbox" className="form-check-input"
                                 id="utils.garret"
                                 name="utils.garret"
                                 ref={register}
                          />
                          <label className="form-check-label" htmlFor="utils.garret">Gác xép</label>
                        </div>
                      </MDBCol>
                      <MDBCol size="3">
                        <div className="form-check pl-0">
                          <input type="checkbox" className="form-check-input"
                                 id="utils.parkingArea"
                                 name="utils.parkingArea"
                                 ref={register}
                          />
                          <label className="form-check-label" htmlFor="utils.parkingArea">Gửi xe</label>
                        </div>
                      </MDBCol>
                      <MDBCol size="3">
                        <div className="form-check pl-0">
                          <input type="checkbox" className="form-check-input"
                                 id="utils.liveWithOwner"
                                 name="utils.liveWithOwner"
                                 ref={register}
                          />
                          <label className="form-check-label" htmlFor="utils.liveWithOwner">Chung chủ</label>
                        </div>
                      </MDBCol>
                      <MDBCol size="3">
                        <div className="form-check pl-0">
                          <input type="checkbox" className="form-check-input"
                                 id="utils.petsAllowed"
                                 name="utils.petsAllowed"
                                 ref={register}
                          />
                          <label className="form-check-label" htmlFor="utils.petsAllowed">Thú cưng</label>
                        </div>
                      </MDBCol>
                      <MDBCol size="3">
                        <div className="form-check pl-0">
                          <input type="checkbox" className="form-check-input"
                                 id="utils.television"
                                 name="utils.television"
                                 ref={register}
                          />
                          <label className="form-check-label" htmlFor="utils.television">Tivi</label>
                        </div>
                      </MDBCol>
                      <MDBCol size="3">
                        <div className="form-check pl-0">
                          <input type="checkbox" className="form-check-input"
                                 id="utils.washingMachine"
                                 name="utils.washingMachine"
                                 ref={register}
                          />
                          <label className="form-check-label" htmlFor="utils.washingMachine">Máy giặt</label>
                        </div>
                      </MDBCol>
                      <MDBCol size="3">
                        <div className="form-check pl-0">
                          <input type="checkbox" className="form-check-input"
                                 id="utils.waterHeater"
                                 name="utils.waterHeater"
                                 ref={register}
                          />
                          <label className="form-check-label" htmlFor="utils.waterHeater">Nóng lạnh</label>
                        </div>
                      </MDBCol>
                      <MDBCol size="3">
                        <div className="form-check pl-0">
                          <input type="checkbox" className="form-check-input"
                                 id="utils.wifi"
                                 name="utils.wifi"
                                 ref={register}
                          />
                          <label className="form-check-label" htmlFor="utils.wifi">Wifi</label>
                        </div>
                      </MDBCol>
                      <MDBCol size="3">
                        <div className="form-check pl-0">
                          <input type="checkbox" className="form-check-input"
                                 id="utils.window"
                                 name="utils.window"
                                 ref={register}
                          />
                          <label className="form-check-label" htmlFor="utils.window">Cửa sổ</label>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                  {props.userInfo.role > 0 &&
                    <React.Fragment>
                      <MDBCol size="6">
                        <div className="md-form my-1">
                          <input type="text"
                                 name="owner.name" id="owner.name"
                                 className="form-control"
                                 ref={register({
                                   required: true
                                 })}
                          />
                          <label htmlFor="owner.name">Tên chủ phòng</label>
                        </div>
                      </MDBCol>
                      <MDBCol size="6">
                        <div className="md-form my-1">
                          <input type="text"
                                 name="owner.phoneNumber" id="owner.phoneNumber"
                                 className="form-control"
                                 ref={register({
                                   required: true
                                 })}
                          />
                          <label htmlFor="owner.phoneNumber"> SĐT chủ phòng</label>
                        </div>
                      </MDBCol>
                    </React.Fragment>
                  }
                </MDBRow>
              </MDBCol>
              <MDBCol size="12" md="6">
                <div className="md-form">
                  <div className="file-field">
                    <div className="btn btn-primary btn-sm float-left">
                      <span>Choose file</span>
                      <input type="file" multiple
                             accept=".jpg, .jpeg, .png"
                             onChange={e => {
                               setFiles([...e.target.files])
                             }}
                      />
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text" placeholder="Upload your file" disabled/>
                    </div>
                  </div>
                </div>
              </MDBCol>
              <MDBCol size="12" md="6">
                {files.map((image, index) =>
                  <img key={index} className="preview m-1" alt=""
                       src={URL.createObjectURL(image)} />
                )}
              </MDBCol>
              <MDBCol size="12" md="12" className="clearfix">
                <button type="submit" className="btn float-right ml-3 btn-sm btn-primary"
                        disabled={props.loading} form="room-info"
                >
                  Đăng phòng
                </button>
                <button type="reset" className="btn float-right btn-sm btn-mdb-color"
                        form="room-info"
                >
                  Clear
                </button>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBContainer>
      </MDBCardBody>
      {props.loading &&
        <div className="progress md-progress primary-color">
          <div className="indeterminate"/>
        </div>
      }
    </MDBCard>
    </MDBContainer>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRoomComponent);