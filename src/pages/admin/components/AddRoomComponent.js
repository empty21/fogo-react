import React from "react";
import api from "../../../services/api";
import { connect } from "react-redux";
import {mapStateToProps, mapDispatchToProps} from "../../../redux/store";
import pushNotify from "../../../utils/pushNotify";

const initialData = {
  "owner.name": "",
  "owner.phoneNumber": "",
  "address.city.code": "",
  "address.city.text": "",
  "address.district.code": "",
  "address.district.text": "",
  "address.ward.code": "",
  "address.ward.text": "",
  "address.street": "",
  "address.houseNumber": "",
  "details.name": "",
  "details.type": "Unshared",
  "details.note": "",
  "details.area": 0,
  "details.capacity": 0,
  "details.price.value": 0,
  "details.price.unit": "phòng",
  "details.deposit": "",
  "details.gender": "any",
  "details.additionalFee.electric.value": 0,
  "details.additionalFee.electric.unit": "số",
  "details.additionalFee.water.value": 0,
  "details.additionalFee.water.unit": "số",
  "details.additionalFee.other": "",
  "utils.airConditioner": false,
  "utils.bathroom": false,
  "utils.parkingArea": false,
  "utils.wifi": false,
  "utils.liveWithOwner": true,
  "utils.fridge": false,
  "utils.washingMachine": false,
  "utils.waterHeater": false,
  "utils.bed": false,
  "utils.closet": false,
  "utils.petsAllowed": false,
  "utils.television": false,
  "utils.cookingAllowed": false,
  "utils.garret": false,
  "utils.window": false,
  "utils.balcony": false,
  "status": "",
  "images": []
};
class AddRoomComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      locationList: {
        city: [{code: 2, name: "Hà Nội"}],
        district: [],
        ward: []
      },
      roomData: {
        ...initialData
      },
    }
  }
  componentDidMount() {

  }
  handleAdd = (e) => {
    this.props.setLoading();
    const { roomData } = this.state;
    const data = {
      "owner": {
        "name": roomData["owner.name"],
        "phoneNumber": roomData["owner.phoneNumber"]
      },
      "address": {
        "city": {
          "code": roomData["address.city.code"],
          "text": roomData["address.city.text"]
        },
        "district": {
          "code": roomData["address.district.code"],
          "text": roomData["address.district.text"]
        },
        "ward": {
          "code": roomData["address.ward.code"],
          "text": roomData["address.ward.text"]
        },
        "street": roomData["address.street"],
        "houseNumber": roomData["address.houseNumber"]
      },
      "details": {
        "name": roomData["details.name"],
        "type": roomData["details.type"],
        "note": roomData["details.note"],
        "area": roomData["details.area"],
        "capacity": roomData["details.capacity"],
        "price": {
          "value": roomData["details.price.value"],
          "unit": roomData["details.price.unit"]
        },
        "deposit": roomData["details.deposit"],
        "additionalFee": {
          "electric": {
            "value": roomData["details.additionalFee.electric.value"],
            "unit": roomData["details.additionalFee.electric.unit"]
          },
          "water": {
            "value": roomData["details.additionalFee.water.value"],
            "unit": roomData["details.additionalFee.water.unit"]
          },
          "other": roomData["details.additionalFee.other"]
        },
        "gender": roomData["details.gender"]
      },
      "utils": {
        "airConditioner": roomData["utils.airConditioner"],
        "bathroom": roomData["utils.bathroom"],
        "parkingArea": roomData["utils.parkingArea"],
        "wifi": roomData["utils.wifi"],
        "liveWithOwner": roomData["utils.liveWithOwner"],
        "fridge": roomData["utils.fridge"],
        "washingMachine": roomData["utils.washingMachine"],
        "waterHeater": roomData["utils.waterHeater"],
        "bed": roomData["utils.bed"],
        "closet": roomData["utils.closet"],
        "petsAllowed": roomData["utils.petsAllowed"],
        "television": roomData["utils.television"],
        "cookingAllowed": roomData["utils.cookingAllowed"],
        "garret": roomData["utils.garret"],
        "window": roomData["utils.window"],
        "balcony": roomData["utils.balcony"]
      },
      "images": roomData["images"],
      "status": roomData["status"]
    }
    this.props.setLoading();
    api.post("/rooms", data)
      .then(data => {
        pushNotify({title: Error, message: data.messages});
        this.setState({...this.state, roomData: {...initialData}});
        this.props.clearUi();
      }).catch(e => {
        pushNotify({title: Error, message: "Adding fail", type: "danger"})
        this.props.clearUi();
    })
  }
  handleChange = (e) => {
    const { target } = e;
    const value = target.type === "checkbox" ? !this.state.roomData[target.id] : target.value;
    this.setState(state => {
      switch (target.id) {
        case "address.city.code":
          state.roomData["address.city.text"] = target.options[target.selectedIndex].text;
          break;
        case "address.district.code":
          state.roomData["address.district.text"] = target.options[target.selectedIndex].text;
          break;
        case "address.ward.code":
          state.roomData["address.ward.text"] = target.options[target.selectedIndex].text;
          break;
        default:
          break;
      }
      state.roomData[target.id] = value;
      return state
    });
  }
  handleUpload = async (e) => {
    this.props.setLoading();
    const { files } = this.state;
    for(let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("image", files[i], files[i].name);
      await api.uploadFile(formData)
        .then(data => this.setState(state => {
          state.roomData.images.push(data.path);
          return state;
        }))
        .catch(e => console.log(e));
    }
    this.setState({
      ...this.state,
      files: []
    })
    this.props.clearUi();
  }

  render() {
    const { roomData, locationList } = this.state;
    return(
      <div className="container-fluid">
        <div className="card mt-3">
          <div className="card-header">
            Add room
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <label className="col-form-label">Tên chủ:</label>
                <input id="owner.name" className="form-control"
                       value={roomData["owner.name"]} onChange={this.handleChange}/>
              </div>
              <div className="col-6">
                <label className="col-form-label">Số điện thoại chủ:</label>
                <input id="owner.phoneNumber" className="form-control"
                       value={roomData["owner.phoneNumber"]} onChange={this.handleChange}/>
              </div>
              <div className="col-4">
                <label className="col-form-label">Thành phố/Tỉnh:</label>
                <select id="address.city.code" className="form-control"
                        value={roomData["address.city.code"]}
                        onChange={(e) => {
                          this.handleChange(e);
                          api.get("/locations/district/"+e.target.value)
                            .then(data => this.setState(state => {
                              state.locationList.district = data;
                              return state;
                            }));
                        }}>
                  <option value="" disabled={true}>Chọn</option>
                  {locationList.city.map(city => <option key={city.code} value={city.code}>{city.name}</option> )}
                </select>
              </div>
              <div className="col-4">
                <label className="col-form-label">Quận/Huyện:</label>
                <select id="address.district.code" className="form-control"
                        value={roomData["address.district.code"]}
                        onChange={(e) => {
                          this.handleChange(e);
                          api.get("/locations/ward/"+e.target.value)
                            .then(data => this.setState(state => {
                              state.locationList.ward = data;
                              return state;
                            }));
                        }}>
                  <option value="" disabled={true}>Chọn</option>
                  {locationList.district.map(district => <option key={district.code} value={district.code}>{district.name}</option> )}
                </select>
              </div>
              <div className="col-4">
                <label className="col-form-label">Phường/Xã:</label>
                <select id="address.ward.code" className="form-control"
                        value={roomData["address.ward.code"]} onChange={this.handleChange}>
                  <option value="" disabled={true}>Chọn</option>
                  {locationList.ward.map(ward => <option key={ward.code} value={ward.code}>{ward.name}</option> )}
                </select>
              </div>
              <div className="col-2">
                <label className="col-form-label">Số nhà:</label>
                <input id="address.houseNumber" className="form-control"
                       value={roomData["address.houseNumber"]} onChange={this.handleChange}/>
              </div>
              <div className="col-4">
                <label className="col-form-label">Đường:</label>
                <input id="address.street" className="form-control"
                       value={roomData["address.street"]} onChange={this.handleChange}/>
              </div>
              <div className="col-6">
                <label className="col-form-label">Tên phòng:</label>
                <input id="details.name" className="form-control"
                       value={roomData["details.name"]} onChange={this.handleChange}/>
              </div>
              <div className="col-3">
                <label className="col-form-label">Loại phòng:</label>
                <select id="details.type" className="form-control"
                        value={roomData["details.type"]} onChange={this.handleChange}>
                  <option value="Unshared">Phòng cho thuê</option>
                  <option value="Shared">Phòng ở ghép</option>
                  <option value="Apartment">Căn hộ</option>
                  <option value="Dormitory">Kí túc xá/Homestay</option>
                </select>
              </div>
              <div className="col-3">
                <label className="col-form-label">Diện tích:</label>
                <div className="input-group">
                  <input type="number" id="details.area" className="form-control"
                         value={roomData["details.area"]} onChange={this.handleChange}/>
                  <input value="m²" className="form-control" disabled={true} />
                </div>
              </div>
              <div className="col-3">
                <label className="col-form-label">Sức chứa:</label>
                <div className="input-group">
                  <input type="number" id="details.capacity" className="form-control"
                         value={roomData["details.capacity"]} onChange={this.handleChange}/>
                  <select id="details.gender" className="form-control"
                          value={roomData["details.gender"]} onChange={this.handleChange}>
                    <option value="any">nam hoặc nữ</option>
                    <option value="male">nam</option>
                    <option value="female">nữ</option>
                  </select>
                </div>
              </div>
              <div className="col-3">
                <label className="col-form-label">Trạng thái:</label>
                <input type="text" id="status" className="form-control"
                       value={roomData["status"]} onChange={this.handleChange} />
              </div>
              <div className="col-3">
                <label className="col-form-label">Giá phòng:</label>
                <div className="input-group">
                  <input type="number" id="details.price.value" className="form-control"
                         value={roomData["details.price.value"]} onChange={this.handleChange} />
                  <select id="details.price.unit" className="form-control"
                          value={roomData["details.price.unit"]} onChange={this.handleChange}>
                    <option value="phòng">tr/phòng</option>
                    <option value="người">tr/người</option>
                  </select>
                </div>
              </div>
              <div className="col-3">
                <label className="col-form-label">Đặt cọc:</label>
                <div className="input-group">
                  <input type="text" id="details.deposit" className="form-control"
                         value={roomData["details.deposit"]} onChange={this.handleChange}/>
                </div>
              </div>
              <div className="col-2">
                <label className="col-form-label">Tiền điện:</label>
                <div className="input-group">
                  <input type="number" id="details.additionalFee.electric.value"  className="form-control"
                         value={roomData["details.additionalFee.electric.value"]} onChange={this.handleChange}/>
                  <select id="details.additionalFee.electric.unit" className="form-control"
                          value={roomData["details.additionalFee.electric.unit"]} onChange={this.handleChange}>
                    <option value="số">k/số</option>
                    <option value="người">k/người</option>
                  </select>
                </div>
              </div>
              <div className="col-2">
                <label className="col-form-label">Tiền nước:</label>
                <div className="input-group">
                  <input type="number" id="details.additionalFee.water.value"  className="form-control"
                         value={roomData["details.additionalFee.water.value"]} onChange={this.handleChange}/>
                  <select id="details.additionalFee.water.unit" className="form-control"
                          value={roomData["details.additionalFee.water.unit"]} onChange={this.handleChange}>
                    <option value="số">k/số</option>
                    <option value="người">k/người</option>
                  </select>
                </div>
              </div>
              <div className="col-2">
                <label className="col-form-label">Chi phí khác:</label>
                <input id="details.additionalFee.other" className="form-control"
                       value={roomData["details.additionalFee.other"]} onChange={this.handleChange}/>
              </div>
              <div className="col-12 form-group">
                <label className="col-form-label">Mô tả chi tiết:</label>
                <textarea id="details.note" className="form-control"
                       value={roomData["details.note"]} onChange={this.handleChange}/>
              </div>
              <div className="col-12 form-group">
                Tiện ích:
                <div className="row">
                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.airConditioner"
                           checked={roomData["utils.airConditioner"]} onChange={this.handleChange}/>
                    <label className="form-check-label">
                      <i className="fas fa-fan text-main mr-1"/>
                      <span>Điều hòa</span>
                    </label>
                  </div>
                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.balcony"
                           checked={roomData["utils.balcony"]} onChange={this.handleChange}/>
                    <label className="form-check-label">
                      <i className="fas fa-kaaba text-main mr-1"/>
                      <span>Ban công</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.closet"
                           checked={roomData["utils.closet"]} onChange={this.handleChange}/>
                    <label className="form-check-label">
                      <i className="fas fa-box text-main mr-1"/>
                      <span>Tủ đồ</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.bed"
                           checked={roomData["utils.bed"]} onChange={this.handleChange}/>
                    <label className="form-check-label">
                      <i className="fas fa-bed text-main mr-1"/>
                      <span>Giường</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.bathroom"
                           checked={roomData["utils.bathroom"]} onChange={this.handleChange}/>
                    <label className="form-check-label">
                      <i className="fas fa-shower text-main mr-1"/>
                      <span>Phòng tắm</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.cookingAllowed"
                           checked={roomData["utils.cookingAllowed"]} onChange={this.handleChange}/>
                    <label className="form-check-label">
                      <i className="fas fa-utensils text-main mr-1"/>
                      <span>Nấu ăn</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.fridge"
                           checked={roomData["utils.fridge"]} onChange={this.handleChange}/>
                    <label className="form-check-label">
                      <i className="fas fa-door-open text-main mr-1"/>
                      <span>Tủ lạnh</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.garret"
                           checked={roomData["utils.garret"]} onChange={this.handleChange}/>
                    <label className="form-check-label">
                      <i className="fas fa-warehouse text-main mr-1"/>
                      <span>Gác xép</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.parkingArea"
                           checked={roomData["utils.parkingArea"]} onChange={this.handleChange}/>
                    <label className="form-check-label">
                      <i className="fas fa-bicycle text-main mr-1"/>
                      <span>Gửi xe</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.liveWithOwner"
                           checked={!roomData["utils.liveWithOwner"]} onChange={this.handleChange}/>
                    <label className="form-check-label">
                      <i className="fas fa-key text-main mr-1"/>
                      <span>Tự do</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.petsAllowed"
                           checked={roomData["utils.petsAllowed"]} onChange={this.handleChange}/>
                    <label className="form-check-label">
                      <i className="fas fa-paw text-main mr-1"/>
                      <span>Thú cưng</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.television"
                           checked={roomData["utils.television"]} onChange={this.handleChange}/>
                    <label className="form-check-label">
                      <i className="fas fa-tv text-main mr-1"/>
                      <span>Tivi</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.washingMachine"
                           checked={roomData["utils.washingMachine"]} onChange={this.handleChange}/>
                    <label className="form-check-label">
                      <i className="fas fa-dumpster text-main mr-1"/>
                      <span>Máy giặt</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.waterHeater"
                           checked={roomData["utils.waterHeater"]} onChange={this.handleChange}/>
                    <label className="form-check-label">
                      <i className="fas fa-dumpster-fire text-main mr-1"/>
                      <span>Máy nóng lạnh</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.wifi"
                           checked={roomData["utils.wifi"]} onChange={this.handleChange}/>
                    <label className="form-check-label">
                      <i className="fas fa-wifi text-main mr-1"/>
                      <span>Wifi</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.window"
                           checked={roomData["utils.window"]} onChange={this.handleChange}/>
                    <label className="form-check-label">
                      <i className="fas fa-columns text-main mr-1"/>
                      <span>Cửa sổ</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-12 text-center">
                <div className="form-group">
                  <label className="col-sm-3 control-label">
                    Upload images
                  </label>
                  <span className="btn btn-light">
                      <input type="file" className="form-control-file" multiple
                             data-show-upload="true" data-show-caption="true"
                             onChange={e => this.setState({...this.state, files: e.target.files})}
                      />
                  </span>
                  <button className="btn btn-success" disabled={this.props.ui.loading} onClick={this.handleUpload}>Upload to Server</button>
                </div>
                <div className="col-12">
                  <div className="row">
                    {roomData.images.map(image =>
                      <img className="thumbnail p-1 border border-primary" alt="" src={image} />
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="text-right">
              <div className="container">
                <button className="btn btn-danger mr-2"
                        onClick={()=>this.setState({...this.state, roomData: {...initialData}})}>
                  Clear
                </button>
                <button disabled={this.props.ui.loading} className="btn btn-primary" onClick={this.handleAdd}>Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddRoomComponent);