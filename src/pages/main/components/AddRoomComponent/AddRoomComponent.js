import React from "react";
import {Container, Card, Row, Col, Form, InputGroup, Button, Breadcrumb} from "react-bootstrap";
import {mapStateToProps, mapDispatchToProps} from "../../../../redux/store";
import { connect } from "react-redux";
import api from "../../../../services/api";
import pushNotify from "../../../../utils/pushNotify";
import {Link, Redirect} from "react-router-dom";

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
  "details.type": "Shared",
  "details.note": "",
  "details.area": "",
  "details.capacity": "",
  "details.price.value": "",
  "details.price.unit": "người",
  "details.deposit": "",
  "details.gender": "any",
  "details.additionalFee.electric.value": "",
  "details.additionalFee.electric.unit": "số",
  "details.additionalFee.water.value": "",
  "details.additionalFee.water.unit": "số",
  "details.additionalFee.other": "",
  "utils.airConditioner": false,
  "utils.bathroom": false,
  "utils.parkingArea": false,
  "utils.wifi": false,
  "utils.liveWithOwner": false,
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
      nextPath: null,
      roomData: initialData,
      locationList: {
        city: [{code: 2, name: "Hà Nội"}],
        district: [],
        ward: []
      },
      files: []
    }
    document.title = "Fogo - Đăng phòng mới"
  }

  handleChange = (e) => {
    const { target } = e;
    const value = target.type === "checkbox" ? target.checked : target.value;
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
  handleSubmit = (e) => {
    e.preventDefault();
    const {roomData} = this.state;
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
      console.log(data);
      pushNotify({title: "Thành công", message: "Bạn sẽ được chuyển đến xem phòng"});
      this.setState({nextPath: "/rooms/"+data.id})
    }).catch(e => {
      pushNotify({title: "Lỗi", message: "Thêm phòng thất bại.\nVui lòng liên hệ quản trị viên", type: "danger"});
      console.log(e);
    }).finally(()=>{
      this.props.clearUi();
    })
  }
  handleUploadImage = () => {
    const { files } = this.state;
    this.props.setLoading();
    Promise.allSettled(
      files.map(file => {
        const formData = new FormData();
        formData.append("image", file, file.name);
        return api.uploadFile(formData);
      })
    ).then(data => {
      const images = [...data.map(file => file.value.path)];
      this.setState(state => {
        state.roomData.images = images;
        return state;
      });
      this.props.clearUi();
    })
  }
  render() {
    const { roomData, locationList, files, nextPath } = this.state;
    return (
      <Container className="mt-5">
        {nextPath && <Redirect to={nextPath} />}
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}} >Home</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{to: "#"}} >Đăng phòng</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Body>
            <Container className="text-icon">
              <h1 className="text-fogo font-weight-bold">Đăng phòng</h1>
              <span>* Trước khi duyệt, chúng tôi sẽ liên hệ với bạn để xác nhận cơ sở vật chất</span>
              <Row as={Form} md={2}  xs={1} className="mt-4 pl-1 pl-md-5"
                   id="roomInfo"
                   onSubmit={this.handleSubmit}
              >
                <Col>
                  <Form.Group>
                    <Form.Label>1. Tên phòng</Form.Label>
                    <Form.Control type="text" className="rounded-pill" required
                                  id="details.name"
                                  placeholder=""
                                  value={roomData["details.name"]}
                                  onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>2. Địa chỉ</Form.Label>
                    <InputGroup>
                      <Form.Control as="select" className="rounded-pill" required
                                    id="address.city.code"
                                    value={roomData["address.city.code"]}
                                    onChange={(e) => {
                                      this.handleChange(e);
                                      api.get("/locations/district/"+e.target.value)
                                        .then(data => this.setState(state => {
                                          state.locationList.district = data;
                                          return state;
                                        }));
                                    }}>
                      >
                        <option value="" disabled>City</option>
                        {locationList.city.map(item => <option key={item.code} value={item.code}>{item.name}</option> )}
                      </Form.Control>
                      <Form.Control as="select" className="rounded-pill" required
                                    id="address.district.code"
                                    value={roomData["address.district.code"]}
                                    onChange={(e) => {
                                      this.handleChange(e);
                                      api.get("/locations/ward/"+e.target.value)
                                        .then(data => this.setState(state => {
                                          state.locationList.ward = data;
                                          return state;
                                        }));
                                    }}>
                      >
                        <option value="" disabled>District</option>
                        {locationList.district.map(item => <option key={item.code} value={item.code}>{item.name}</option> )}
                      </Form.Control>
                      <Form.Control as="select" className="rounded-pill" required
                                    id="address.ward.code"
                                    value={roomData["address.ward.code"]}
                                    onChange={this.handleChange}
                      >
                        <option value="" disabled>Ward</option>
                        {locationList.ward.map(item => <option key={item.code} value={item.code}>{item.name}</option> )}
                      </Form.Control>
                    </InputGroup>
                    <InputGroup className="mt-2">
                      <Form.Control type="text" placeholder="Số nhà" className="rounded-pill" required
                                    id="address.houseNumber"
                                    value={roomData["address.houseNumber"]}
                                    onChange={this.handleChange}
                      />
                      <Form.Control type="text" placeholder="Đường" className="rounded-pill" required
                                    id="address.street"
                                    value={roomData["address.street"]}
                                    onChange={this.handleChange}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>3. Thông tin chi tiết</Form.Label>
                    <Row xs={1} md={2}>
                      <Col>
                        <Form.Control as="select" className="rounded-pill" required
                                      id="details.type"
                                      value={roomData["details.type"]}
                                      onChange={this.handleChange}
                        >
                          <option value="Shared">Phòng ở ghép</option>
                          <option value="Unshared">Phòng cho thuê</option>
                          <option value="Apartment">Căn hộ</option>
                          <option value="Dormitory">Kí túc xá / Home Stay</option>
                        </Form.Control>
                        <Form.Text>* Loại phòng</Form.Text>
                      </Col>
                      <Col>
                        <InputGroup>
                          <Form.Control type="number" className="rounded-pill" required
                                        id="details.area"
                                        placeholder="VD: 25"
                                        value={roomData["details.area"]}
                                        onChange={this.handleChange}
                          />
                          <InputGroup.Append>
                            <InputGroup.Text className="rounded-pill">m²</InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                        <Form.Text>* Diện tích</Form.Text>
                      </Col>
                      <Col>
                        <InputGroup>
                          <Form.Control type="number" className="rounded-pill" required
                                        id="details.capacity"
                                        placeholder="VD: 3"
                                        value={roomData["details.capacity"]}
                                        onChange={this.handleChange}
                          />
                          <Form.Control as="select" className="rounded-pill" required
                                        id="details.gender"
                                        value={roomData["details.gender"]}
                                        onChange={this.handleChange}
                          >
                            <option value="any">nam/nữ</option>
                            <option value="male">nam</option>
                            <option value="female">nữ</option>
                          </Form.Control>
                        </InputGroup>
                        <Form.Text>* Sức chứa/Giới tính</Form.Text>
                      </Col>
                      <Col>
                        <Form.Control type="text" className="rounded-pill" required
                                      id="status"
                                      placeholder="VD: Cần 2 người..."
                                      value={roomData["details.status"]}
                                      onChange={this.handleChange}
                        />
                        <Form.Text>* Tình trạng phòng</Form.Text>
                      </Col>
                      <Col md={12}>
                        <Form.Control as="textarea" className="rounded-pill" rows={3} required
                                      id="details.note"
                                      placeholder=""
                                      value={roomData["details.note"]}
                                      onChange={this.handleChange}
                        />
                        <Form.Text>* Mô tả phòng</Form.Text>
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>4. Chi phí</Form.Label>
                    <Row xs={1} md={2}>
                      <Col>
                        <InputGroup>
                          <Form.Control type="number" className="rounded-pill" required
                                        id="details.price.value"
                                        placeholder="VD: 1.2"
                                        value={roomData["details.price.value"]}
                                        onChange={this.handleChange}
                          />
                          <Form.Control as="select" className="rounded-pill"
                                        id="details.price.unit"
                                        value={roomData["details.price.unit"]}
                                        onChange={this.handleChange}
                          >
                            <option value="người">tr/nguời</option>
                            <option value="phòng">tr/phòng</option>
                          </Form.Control>
                        </InputGroup>
                        <Form.Text>* Giá phòng</Form.Text>
                      </Col>
                      <Col>
                        <Form.Control type="text" className="rounded-pill" required
                                      id="details.deposit"
                                      placeholder="VD: 1 tháng"
                                      value={roomData["details.deposit"]}
                                      onChange={this.handleChange}
                        />
                        <Form.Text>* Đặt cọc</Form.Text>
                      </Col>
                      <Col>
                        <InputGroup>
                          <Form.Control type="number" className="rounded-pill" required
                                        id="details.additionalFee.electric.value"
                                        placeholder="VD: 3.5"
                                        value={roomData["details.additionalFee.electric.value"]}
                                        onChange={this.handleChange}
                          />
                          <Form.Control as="select" className="rounded-pill" required
                                        id="details.additionalFee.electric.unit"
                                        value={roomData["details.additionalFee.electric.unit"]}
                                        onChange={this.handleChange}
                          >
                            <option value="số">k/số</option>
                            <option value="người">k/người</option>
                          </Form.Control>
                        </InputGroup>
                        <Form.Text>* Tiền điện</Form.Text>
                      </Col>
                      <Col>
                        <InputGroup>
                          <Form.Control type="number" className="rounded-pill" required
                                        id="details.additionalFee.water.value"
                                        placeholder="VD: 20"
                                        value={roomData["details.additionalFee.water.value"]}
                                        onChange={this.handleChange}
                          />
                          <Form.Control as="select" className="rounded-pill" required
                                        id="details.additionalFee.water.unit"
                                        value={roomData["details.additionalFee.water.unit"]}
                                        onChange={this.handleChange}
                          >
                            <option value="số">k/m³</option>
                            <option value="người">k/người</option>
                          </Form.Control>
                        </InputGroup>
                        <Form.Text>* Tiền nước</Form.Text>
                      </Col>
                      <Col>
                        <Form.Control type="text" className="rounded-pill" required
                                      id="details.additionalFee.other"
                                      placeholder="VD: Wifi: 100k,..."
                                      value={roomData["details.additionalFee.other"]}
                                      onChange={this.handleChange}
                        />
                        <Form.Text>* Chi phí khác</Form.Text>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>5. Tiện ích</Form.Label>
                    <Row xs={4}>
                      <Col>
                        <Form.Check type="checkbox" label="Điều hoà"
                                    id="utils.airConditioner"
                                    checked={roomData["utils.airConditioner"]}
                                    onChange={this.handleChange}
                        />
                      </Col>
                      <Col>
                        <Form.Check type="checkbox" label="Ban công"
                                    id="utils.balcony"
                                    checked={roomData["utils.balcony"]}
                                    onChange={this.handleChange}
                        />
                      </Col>
                      <Col>
                        <Form.Check type="checkbox" label="Tủ đồ"
                                    id="utils.closet"
                                    checked={roomData["utils.closet"]}
                                    onChange={this.handleChange}
                        />
                      </Col>
                      <Col>
                        <Form.Check type="checkbox" label="Giường"
                                    id="utils.bed"
                                    checked={roomData["utils.bed"]}
                                    onChange={this.handleChange}
                        />
                      </Col>
                      <Col>
                        <Form.Check type="checkbox" label="Phòng tắm"
                                    id="utils.bathroom"
                                    checked={roomData["utils.bathroom"]}
                                    onChange={this.handleChange}
                        />
                      </Col>
                      <Col>
                        <Form.Check type="checkbox" label="Nấu ăn"
                                    id="utils.cookingAllowed"
                                    checked={roomData["utils.cookingAllowed"]}
                                    onChange={this.handleChange}
                        />
                      </Col>
                      <Col>
                        <Form.Check type="checkbox" label="Tủ lạnh"
                                    id="utils.fridge"
                                    checked={roomData["utils.fridge"]}
                                    onChange={this.handleChange}
                        />
                      </Col>
                      <Col>
                        <Form.Check type="checkbox" label="Gác xép"
                                    id="utils.garret"
                                    checked={roomData["utils.garret"]}
                                    onChange={this.handleChange}
                        />
                      </Col>
                      <Col>
                        <Form.Check type="checkbox" label="Gửi xe"
                                    id="utils.parkingArea"
                                    checked={roomData["utils.parkingArea"]}
                                    onChange={this.handleChange}
                        />
                      </Col>
                      <Col>
                        <Form.Check type="checkbox" label="Chung chủ"
                                    id="utils.liveWithOwner"
                                    checked={roomData["utils.liveWithOwner"]}
                                    onChange={this.handleChange}
                        />
                      </Col>
                      <Col>
                        <Form.Check type="checkbox" label="Thú cưng"
                                    id="utils.petsAllowed"
                                    checked={roomData["utils.petsAllowed"]}
                                    onChange={this.handleChange}
                        />
                      </Col>
                      <Col>
                        <Form.Check type="checkbox" label="Tivi"
                                    id="utils.television"
                                    checked={roomData["utils.television"]}
                                    onChange={this.handleChange}
                        />
                      </Col>
                      <Col>
                        <Form.Check type="checkbox" label="Máy giặt"
                                    id="utils.washingMachine"
                                    checked={roomData["utils.washingMachine"]}
                                    onChange={this.handleChange}
                        />
                      </Col>
                      <Col>
                        <Form.Check type="checkbox" label="Nóng lạnh"
                                    id="utils.waterHeater"
                                    checked={roomData["utils.wifi"]}
                                    onChange={this.handleChange}
                        />
                      </Col>
                      <Col>
                        <Form.Check type="checkbox" label="Wifi"
                                    id="utils.wifi"
                                    checked={roomData["utils.wifi"]}
                                    onChange={this.handleChange}
                        />
                      </Col>
                      <Col>
                        <Form.Check type="checkbox" label="Cửa sổ"
                                    id="utils.window"
                                    checked={roomData["utils.window"]}
                                    onChange={this.handleChange}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                  {this.props.userInfo.role > 0 &&
                  <Form.Group>
                    <Form.Label>6. Thông tin chủ phòng</Form.Label>
                    <Row xs={2}>
                      <Col>
                        <Form.Control type="text" className="rounded-pill"
                                      id="owner.name"
                                      placeholder="VD: Nguyễn Văn A..."
                                      value={roomData["owner.name"]}
                                      onChange={this.handleChange}
                        />
                        <Form.Text>* Tên chủ phòng</Form.Text>
                      </Col>
                      <Col>
                        <Form.Control type="text" className="rounded-pill"
                                      id="owner.phoneNumber"
                                      placeholder="VD: 09xxxxxxx"
                                      value={roomData["owner.phoneNumber"]}
                                      onChange={this.handleChange}
                        />
                        <Form.Text>* SĐT chủ phòng</Form.Text>
                      </Col>
                    </Row>
                  </Form.Group>
                  }
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Up ảnh phòng</Form.Label>
                    <Form.File label="Chọn ảnh" custom
                               multiple  accept=".jpg, .jpeg, .png"
                               onChange={e => {
                                 this.setState({...this.state, files: [...e.target.files]})
                               }}
                    />
                    <Form.Text>Ảnh đã chọn: {files.map(file => file.name+" ")}</Form.Text>
                    <Button className="rounded-pill btn-light btn-outline-info mt-2"
                            disabled={this.props.ui.loading}
                            onClick={this.handleUploadImage}
                    >
                      Upload images
                    </Button>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  {roomData.images.map(image =>
                    <img className="preview m-2 border border-primary" alt="" src={image} />
                  )}
                </Col>
              </Row>
            </Container>
            <Button type="submit" form="roomInfo" className="float-right rounded-pill ml-3"
                    disabled={this.props.ui.loading}
            >
              Đăng phòng
            </Button>
            <Button className="float-right rounded-pill btn-light btn-outline-warning"
                    onClick={()=>this.setState({...this.state, roomData: {...initialData}})}
            >
              Clear
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddRoomComponent);