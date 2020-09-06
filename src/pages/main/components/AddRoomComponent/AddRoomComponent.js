import React, {useEffect, useState} from "react";
import {Container, Card, Row, Col, Form, InputGroup, Button, Breadcrumb} from "react-bootstrap";
import {mapStateToProps, mapDispatchToProps} from "../../../../redux/store";
import { connect } from "react-redux";
import api from "../../../../services/api";
import pushNotify from "../../../../utils/pushNotify";
import {Link} from "react-router-dom";
import { useForm } from "react-hook-form";

function AddRoomComponent(props) {
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("")
  const cityList = [{code: 2, name: "Hà Nội"}];
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const {register, handleSubmit} = useForm();

  useEffect(() => {
    document.title = "Fogo - Đăng phòng mới"
  }, []);
  const handleCreate = (data) => {
    data.address.city.text = city;
    data.address.district.text = district;
    data.address.ward.text = ward;
    data.images = images;
    props.setLoading();
    api.post("/rooms", data)
      .then(data => {
        pushNotify({title: "Thành công", message: "Bạn sẽ được chuyển đến xem phòng"});
        props.history.push("/rooms/"+data.id);
      }).catch(() => {
      pushNotify({title: "Lỗi", message: "Thêm phòng thất bại.\nVui lòng liên hệ quản trị viên", type: "danger"});
    }).finally(()=>{
      props.clearUi();
    })
  }
  const handleUploadImage = () => {
    props.setLoading();
    Promise.allSettled(
      files.map(file => {
        const formData = new FormData();
        formData.append("image", file, file.name);
        return api.uploadFile(formData);
      })
    ).then(data => {
      setImages([...data.map(file => file.value.path)]);
      props.clearUi();
    })
  }
  return (
    <Container className="mt-5 pt-3">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}} >Home</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{to: "#"}} >Đăng phòng</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Card.Body>
          <Container className="text-icon">
            <h1 className="text-fogo font-weight-bold">Đăng phòng</h1>
            <span>* Trước khi duyệt, chúng tôi sẽ liên hệ với bạn để xác nhận cơ sở vật chất</span>
            <Row as={Form}  md={2}  xs={1} className="mt-4 pl-1 pl-md-5"
                 onSubmit={handleSubmit(handleCreate)}
            >
              <Col>
                <Form.Group>
                  <Form.Label>1. Tên phòng</Form.Label>
                  <Form.Control type="text" className="rounded-pill"
                                name="details.name" required
                                placeholder=""
                                ref={register}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>2. Địa chỉ</Form.Label>
                  <InputGroup>
                    <Form.Control as="select" className="rounded-pill"
                                  name="address.city.code" required
                                  ref={register}
                                  onChange={e => {
                                    setCity(e.target.options[e.target.selectedIndex].text);
                                    api.get("/locations/district/"+e.target.value)
                                      .then(data => setDistrictList(data));
                                  }}
                                  defaultValue=""
                    >
                      <option value="" disabled>City</option>
                      {cityList.map(item => <option key={item.code} value={item.code}>{item.name}</option> )}
                    </Form.Control>
                    <Form.Control as="select" className="rounded-pill"
                                  name="address.district.code" required
                                  ref={register}
                                  onChange={e => {
                                    setDistrict(e.target.options[e.target.selectedIndex].text);
                                    api.get("/locations/ward/"+e.target.value)
                                      .then(data => setWardList(data));
                                  }}
                                  defaultValue=""
                    >
                      <option value="" disabled>District</option>
                      {districtList.map(item => <option key={item.code} value={item.code}>{item.name}</option> )}
                    </Form.Control>
                    <Form.Control as="select" className="rounded-pill"
                                  name="address.ward.code" required
                                  ref={register}
                                  defaultValue=""
                                  onChange={e => setWard(e.target.options[e.target.selectedIndex].text)}
                    >
                      <option value="" disabled>Ward</option>
                      {wardList.map(item => <option key={item.code} value={item.code}>{item.name}</option> )}
                    </Form.Control>
                  </InputGroup>
                  <InputGroup className="mt-2">
                    <Form.Control type="text" placeholder="Số nhà" className="rounded-pill"
                                  name="address.houseNumber" required
                                  ref={register}
                    />
                    <Form.Control type="text" placeholder="Đường" className="rounded-pill"
                                  name="address.street" required
                                  ref={register}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Label>3. Thông tin chi tiết</Form.Label>
                  <Row xs={1} md={2}>
                    <Col>
                      <Form.Control as="select" className="rounded-pill"
                                    name="details.type" required
                                    ref={register}
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
                        <Form.Control type="number"  className="rounded-pill"
                                      name="details.area" required
                                      placeholder="VD: 25"
                                      min="1" step="1"
                                      ref={register}
                        />
                        <InputGroup.Append>
                          <InputGroup.Text className="rounded-pill">m²</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                      <Form.Text>* Diện tích</Form.Text>
                    </Col>
                    <Col>
                      <InputGroup>
                        <Form.Control type="number" className="rounded-pill"
                                      name="details.capacity" required
                                      placeholder="VD: 3"
                                      min="1" step="1"
                                      ref={register}
                        />
                        <Form.Control as="select" className="rounded-pill"
                                      name="details.gender" required
                                      ref={register}
                        >
                          <option value="any">nam/nữ</option>
                          <option value="male">nam</option>
                          <option value="female">nữ</option>
                        </Form.Control>
                      </InputGroup>
                      <Form.Text>* Sức chứa/Giới tính</Form.Text>
                    </Col>
                    <Col>
                      <Form.Control type="text" className="rounded-pill"
                                    name="status" required
                                    placeholder="VD: Cần 2 người..."
                                    ref={register}
                      />
                      <Form.Text>* Tình trạng phòng</Form.Text>
                    </Col>
                    <Col md={12}>
                      <Form.Control as="textarea" className="rounded-pill" rows={3}
                                    name="details.note" required
                                    placeholder=""
                                    ref={register}
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
                        <Form.Control type="number"  className="rounded-pill"
                                      name="details.price.value" required
                                      placeholder="VD: 1.2"
                                      min="0" step="0.1"
                                      ref={register}
                        />
                        <Form.Control as="select" className="rounded-pill"
                                      name="details.price.unit" required
                                      ref={register}
                        >
                          <option value="người">tr/nguời</option>
                          <option value="phòng">tr/phòng</option>
                        </Form.Control>
                      </InputGroup>
                      <Form.Text>* Giá phòng</Form.Text>
                    </Col>
                    <Col>
                      <Form.Control type="text" className="rounded-pill"
                                    name="details.deposit" required
                                    placeholder="VD: 1 tháng"
                                    ref={register}
                      />
                      <Form.Text>* Đặt cọc</Form.Text>
                    </Col>
                    <Col>
                      <InputGroup>
                        <Form.Control type="number" className="rounded-pill"
                                      name="details.additionalFee.electric.value" required
                                      placeholder="VD: 3.5"
                                      min="0" step="0.1"
                                      ref={register}
                        />
                        <Form.Control as="select" className="rounded-pill"
                                      name="details.additionalFee.electric.unit" required
                                      ref={register}
                        >
                          <option value="số">k/số</option>
                          <option value="người">k/người</option>
                        </Form.Control>
                      </InputGroup>
                      <Form.Text>* Tiền điện</Form.Text>
                    </Col>
                    <Col>
                      <InputGroup>
                        <Form.Control type="number" className="rounded-pill"
                                      name="details.additionalFee.water.value" required
                                      placeholder="VD: 20"
                                      min="0" step="0.1"
                                      ref={register}
                        />
                        <Form.Control as="select" className="rounded-pill"
                                      name="details.additionalFee.water.unit" required
                                      ref={register}
                        >
                          <option value="số">k/m³</option>
                          <option value="người">k/người</option>
                        </Form.Control>
                      </InputGroup>
                      <Form.Text>* Tiền nước</Form.Text>
                    </Col>
                    <Col>
                      <Form.Control type="text" className="rounded-pill"
                                    name="details.additionalFee.other" required
                                    placeholder="VD: Wifi: 100k,..."
                                    ref={register}
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
                                  name="utils.airConditioner"
                                  ref={register}
                      />
                    </Col>
                    <Col>
                      <Form.Check type="checkbox" label="Ban công"
                                  name="utils.balcony"
                                  ref={register}
                      />
                    </Col>
                    <Col>
                      <Form.Check type="checkbox" label="Tủ đồ"
                                  name="utils.closet"
                                  ref={register}
                      />
                    </Col>
                    <Col>
                      <Form.Check type="checkbox" label="Giường"
                                  name="utils.bed"
                                  ref={register}
                      />
                    </Col>
                    <Col>
                      <Form.Check type="checkbox" label="Phòng tắm"
                                  name="utils.bathroom"
                                  ref={register}
                      />
                    </Col>
                    <Col>
                      <Form.Check type="checkbox" label="Nấu ăn"
                                  name="utils.cookingAllowed"
                                  ref={register}
                      />
                    </Col>
                    <Col>
                      <Form.Check type="checkbox" label="Tủ lạnh"
                                  name="utils.fridge"
                                  ref={register}
                      />
                    </Col>
                    <Col>
                      <Form.Check type="checkbox" label="Gác xép"
                                  name="utils.garret"
                                  ref={register}
                      />
                    </Col>
                    <Col>
                      <Form.Check type="checkbox" label="Gửi xe"
                                  name="utils.parkingArea"
                                  ref={register}
                      />
                    </Col>
                    <Col>
                      <Form.Check type="checkbox" label="Chung chủ"
                                  name="utils.liveWithOwner"
                                  ref={register}
                      />
                    </Col>
                    <Col>
                      <Form.Check type="checkbox" label="Thú cưng"
                                  name="utils.petsAllowed"
                                  ref={register}
                      />
                    </Col>
                    <Col>
                      <Form.Check type="checkbox" label="Tivi"
                                  name="utils.television"
                                  ref={register}
                      />
                    </Col>
                    <Col>
                      <Form.Check type="checkbox" label="Máy giặt"
                                  name="utils.washingMachine"
                                  ref={register}
                      />
                    </Col>
                    <Col>
                      <Form.Check type="checkbox" label="Nóng lạnh"
                                  name="utils.waterHeater"
                                  ref={register}
                      />
                    </Col>
                    <Col>
                      <Form.Check type="checkbox" label="Wifi"
                                  name="utils.wifi"
                                  ref={register}
                      />
                    </Col>
                    <Col>
                      <Form.Check type="checkbox" label="Cửa sổ"
                                  name="utils.window"
                                  ref={register}
                      />
                    </Col>
                  </Row>
                </Form.Group>
                {props.userInfo.role > 0 &&
                <Form.Group>
                  <Form.Label>6. Thông tin chủ phòng</Form.Label>
                  <Row xs={2}>
                    <Col>
                      <Form.Control type="text" className="rounded-pill"
                                    name="owner.name"
                                    placeholder="VD: Nguyễn Văn A..."
                                    ref={register}
                      />
                      <Form.Text>* Tên chủ phòng</Form.Text>
                    </Col>
                    <Col>
                      <Form.Control type="text" className="rounded-pill"
                                    name="owner.phoneNumber"
                                    placeholder="VD: 09xxxxxxx"
                                    ref={register}
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
                               setFiles([...e.target.files])
                             }}
                  />
                  <Form.Text>Ảnh đã chọn: {files.map(file => file.name+" ")}</Form.Text>
                  <Button className="rounded-pill btn-light btn-outline-info mt-2"
                          disabled={props.ui.loading}
                          onClick={handleUploadImage}
                  >
                    Upload images
                  </Button>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                {images.map((image, index) =>
                  <img key={index} className="preview m-2 border border-primary" alt="" src={image} />
                )}
              </Col>
              <Col xs={12} md={12} className="clearfix">
                <Button type="submit" className="float-right rounded-pill ml-3"
                        disabled={props.ui.loading}
                >
                  Đăng phòng
                </Button>
                <Button type="reset" className="float-right rounded-pill btn-light btn-outline-warning">
                  Clear
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
}
export default connect(mapStateToProps,mapDispatchToProps)(AddRoomComponent);