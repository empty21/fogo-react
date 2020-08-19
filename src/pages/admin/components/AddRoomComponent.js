import React from "react";

class AddRoomComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      isAdding: false,
      roomData: {
        owner: {
          name: "",
          phoneNumber: ""
        },
        address: {
          city: {
            code: "",
            text: "",
          },
          district: {
            code: "",
            text: "",
            cityCode: ""
          },
          ward: {
            code: "",
            text: "",
            districtCode: ""
          },
          street: "",
          houseNumber: ""
        },
        details: {
          name: "",
          type: "Unshared",
          note: "",
          area: 0,
          capacity: "",
          price: {
            value: 0,
            unit: "phòng/tháng"
          },
          deposit: {
            value: 0,
            unit: "phòng/tháng"
          },
          gender: "any",
          additionalFee: {
            electric: {
              value: 0,
              unit: "số"
            },
            water: {
              value: 0,
              unit: "số"
            },
            other: ""
          }
        },
        utils: {
          airConditioner: false,
          bathroom: false,
          parkingArea: false,
          wifi: false,
          liveWithOwner: true,
          fridge: false,
          washingMachine: false,
          waterHeater: false,
          bed: false,
          closet: false,
          petsAllowed: false,
          television: false,
          cookingAllowed: false,
          garret: false,
          window: false,
          balcony: false
        },
        amount: {
          available: 0,
          summary: 0
        }
      },
    }
  }
  componentDidMount() {

  }
  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState(state => {
      state.roomData[id] = value;
      return state;
    });
    console.log(this.state);
  }

  render() {
    const { isAdding, roomData } = this.state;
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
                       value={roomData.owner.name} onChange={this.handleChange}/>
              </div>
              <div className="col-6">
                <label className="col-form-label">Số điện thoại chủ:</label>
                <input id="owner.phoneNumber" className="form-control"
                       value={roomData.owner.phoneNumber} />
              </div>
              <div className="col-4">
                <label className="col-form-label">Thành phố/Tỉnh:</label>
                <select id="address.city" className="form-control" value={roomData.address.city.code}>
                  <option value="" disabled={true}>Chọn</option>
                  <option value="2">Hà Nội</option>
                </select>
              </div>
              <div className="col-4">
                <label className="col-form-label">Quận/Huyện:</label>
                <select id="address.city" className="form-control" value={roomData.address.district.code}>
                  <option value="" disabled={true}>Chọn</option>
                </select>
              </div>
              <div className="col-4">
                <label className="col-form-label">Phường/Xã:</label>
                <select id="address.city" className="form-control" value={roomData.address.ward.code}>
                  <option value="" disabled={true}>Chọn</option>
                </select>
              </div>
              <div className="col-2">
                <label className="col-form-label">Số nhà:</label>
                <input id="address.houseNumber" className="form-control"
                       value={roomData.address.houseNumber} />
              </div>
              <div className="col-4">
                <label className="col-form-label">Đường:</label>
                <input id="address.street" className="form-control"
                       value={roomData.address.street} />
              </div>
              <div className="col-6">
                <label className="col-form-label">Tên phòng:</label>
                <input id="details.name" className="form-control"
                       value={roomData.details.name} />
              </div>
              <div className="col-3">
                <label className="col-form-label">Loại phòng:</label>
                <select id="details.type" className="form-control" value={roomData.details.type}>
                  <option value="Unshared">Phòng cho thuê</option>
                  <option value="Shared">Phòng ở ghép</option>
                  <option value="Apartment">Căn hộ</option>
                  <option value="Dormitory">Kí túc xá/Homestay</option>
                </select>
              </div>
              <div className="col-3">
                <label className="col-form-label">Diện tích:</label>
                <div className="input-group">
                  <input type="number" id="details.area" value={roomData.details.area} className="form-control" />
                  <input value="m²" className="form-control" disabled={true} />
                </div>
              </div>
              <div className="col-3">
                <label className="col-form-label">Sức chứa:</label>
                <div className="input-group">
                  <input type="number" id="details.capacity" value={roomData.details.capacity} className="form-control" />
                  <select id="details.gender" className="form-control" value={roomData.details.gender} >
                    <option value="any">nam hoặc nữ</option>
                    <option value="male">nam</option>
                    <option value="female">nữ</option>
                  </select>
                </div>
              </div>
              <div className="col-3">
                <label className="col-form-label">Trạng thái:</label>
                <div className="input-group">
                  <input type="number" id="amount.available" value={roomData.amount.available} className="form-control" />
                  /
                  <input type="number" id="amount.summary" value={roomData.amount.summary} className="form-control" />
                </div>
              </div>
              <div className="col-3">
                <label className="col-form-label">Giá phòng:</label>
                <div className="input-group">
                  <input type="number" id="details.price.value" value={roomData.details.price.value} className="form-control" />
                  <select id="details.price.unit" className="form-control" value={roomData.details.price.unit}>
                    <option value="phòng/tháng">đ/phòng</option>
                    <option value="người/tháng">đ/người</option>
                  </select>
                </div>
              </div>
              <div className="col-3">
                <label className="col-form-label">Đặt cọc:</label>
                <div className="input-group">
                  <input type="number" id="details.deposit.value" value={roomData.details.deposit.value} className="form-control" />
                  <select id="details.deposit.unit" className="form-control" value={roomData.details.deposit.unit}>
                    <option value="phòng/tháng">đ</option>
                    <option value="người/tháng">tháng</option>
                  </select>
                </div>
              </div>
              <div className="col-2">
                <label className="col-form-label">Tiền điện:</label>
                <div className="input-group">
                  <input type="number" id="details.additionalFee.electric.value" value={roomData.details.additionalFee.electric.value} className="form-control" />
                  <select id="details.additionalFee.electric.unit" className="form-control" value={roomData.details.additionalFee.electric.unit} >
                    <option value="số">/số</option>
                    <option value="người/tháng">/người/tháng</option>
                  </select>
                </div>
              </div>
              <div className="col-2">
                <label className="col-form-label">Tiền nước:</label>
                <div className="input-group">
                  <input type="number" id="details.additionalFee.water.value" value={roomData.details.additionalFee.water.value} className="form-control" />
                  <select id="details.additionalFee.water.unit" className="form-control" value={roomData.details.additionalFee.water.unit} >
                    <option value="số">/số</option>
                    <option value="người/tháng">/người/tháng</option>
                  </select>
                </div>
              </div>
              <div className="col-2">
                <label className="col-form-label">Chi phí khác:</label>
                <input id="details.additionalFee.other" value={roomData.details.additionalFee.other} className="form-control" />
              </div>
              <div className="col-12 form-group">
                Tiện ích:
                <div className="row">
                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.airConditioner" checked={roomData.utils.airConditioner}/>
                    <label className="form-check-label">
                      <i className="fas fa-fan text-main mr-1"/>
                      <span>Điều hòa</span>
                    </label>
                  </div>
                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.balcony" checked={roomData.utils.balcony}/>
                    <label className="form-check-label">
                      <i className="fas fa-kaaba text-main mr-1"/>
                      <span>Ban công</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.closet" checked={roomData.utils.closet}/>
                    <label className="form-check-label">
                      <i className="fas fa-box text-main mr-1"/>
                      <span>Tủ đồ</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.bed" checked={roomData.utils.bed}/>
                    <label className="form-check-label">
                      <i className="fas fa-bed text-main mr-1"/>
                      <span>Giường</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.bathroom" checked={roomData.utils.bathroom}/>
                    <label className="form-check-label">
                      <i className="fas fa-shower text-main mr-1"/>
                      <span>Phòng tắm</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.cookingAllowed" checked={roomData.utils.cookingAllowed}/>
                    <label className="form-check-label">
                      <i className="fas fa-utensils text-main mr-1"/>
                      <span>Nấu ăn</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.fridge" checked={roomData.utils.fridge}/>
                    <label className="form-check-label">
                      <i className="fas fa-door-open text-main mr-1"/>
                      <span>Tủ lạnh</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.garret" checked={roomData.utils.garret}/>
                    <label className="form-check-label">
                      <i className="fas fa-warehouse text-main mr-1"/>
                      <span>Gác xép</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.parkingArea" checked={roomData.utils.parkingArea}/>
                    <label className="form-check-label">
                      <i className="fas fa-bicycle text-main mr-1"/>
                      <span>Gửi xe</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.liveWithOwner" checked={!roomData.utils.liveWithOwner}/>
                    <label className="form-check-label">
                      <i className="fas fa-key text-main mr-1"/>
                      <span>Tự do</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.petsAllowed" checked={roomData.utils.petsAllowed}/>
                    <label className="form-check-label">
                      <i className="fas fa-paw text-main mr-1"/>
                      <span>Thú cưng</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.television" checked={roomData.utils.television}/>
                    <label className="form-check-label">
                      <i className="fas fa-tv text-main mr-1"/>
                      <span>Tivi</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.washingMachine" checked={roomData.utils.washingMachine}/>
                    <label className="form-check-label">
                      <i className="fas fa-dumpster text-main mr-1"/>
                      <span>Máy giặt</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.waterHeater" checked={roomData.utils.waterHeater}/>
                    <label className="form-check-label">
                      <i className="fas fa-dumpster-fire text-main mr-1"/>
                      <span>Máy nóng lạnh</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.wifi" checked={roomData.utils.wifi}/>
                    <label className="form-check-label">
                      <i className="fas fa-wifi text-main mr-1"/>
                      <span>Wifi</span>
                    </label>
                  </div>

                  <div className="col-2 form-check">
                    <input type="checkbox" className="form-check-input" id="utils.window" checked={roomData.utils.window}/>
                    <label className="form-check-label">
                      <i className="fas fa-columns text-main mr-1"/>
                      <span>Cửa sổ</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="text-right">
              <div className="container">
                <button className="btn btn-danger mr-2">Clear</button>
                <button className="btn btn-primary">Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default AddRoomComponent;