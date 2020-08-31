import React, {useEffect, useState} from "react";
import SearchedRoomComponent from "../HomeComponent/components/SearchedRoomComponent";
import InputRange from "react-input-range";
import "react-input-range/src/scss/index.scss"
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

function SearchComponent(props) {
  const [text, setText] = useState(props.match.params.searchText.split("-").join(" "))
  const [price, setPrice] = useState({min: 0, max: 9.9});
  const [type, setType] = useState(["Unshared", "Shared", "Apartment", "Dormitory"]);
  const [gender, setGender] = useState("any");
  const [query, setQuery] = useState({
    text,
    price,
    type,
    gender
  });
  useEffect(() => {
    document.title = "Fogo - Tìm kiếm: " + text
  }, [text]);
  const typeChange = (e) => {
    const { target } = e;
    if(target.checked) {
      setType([...type, target.id])
    } else {
      setType([...type].filter(e => e !== target.id))
    }
  }
  return (
    <React.Fragment>
      <Container fluid={true} className="mt-5 pt-5">
        <Row>
          <Col md={8}>
            <SearchedRoomComponent query={query} tabName="Kết quả tìm kiếm" />
          </Col>
          <Col md={4}>
            <Card>
              <Card.Header>
                <span><i className="fas fa-filter text-fogo mr-1"/>Bộ lọc tìm kiếm</span>
              </Card.Header>
              <Card.Body className="text-icon">
                <Form.Group>
                  <Form.Label>Từ khoá:</Form.Label>
                  <Form.Control className="rounded-pill"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                  />
                </Form.Group>
                <div className="border-top my-3"/>
                <Form.Group>
                  <Form.Label className="mb-4">Khoảng giá (triệu): </Form.Label>
                  <InputRange
                    minValue={0} maxValue={10}
                    value={price} step={0.1}
                    onChange={setPrice}
                    formatLabel={value => value.toFixed(1)}
                  />
                </Form.Group>
                <div className="border-top my-3 mt-4"/>
                <Form.Group>
                  <Form.Label>Loại phòng: </Form.Label>
                  <Form.Check label="Phòng cho thuê" id="Unshared" defaultChecked={true} onChange={typeChange}/>
                  <Form.Check label="Phòng ở ghép" id="Shared" defaultChecked={true} onChange={typeChange}/>
                  <Form.Check label="Căn hộ" id="Apartment" defaultChecked={true} onChange={typeChange}/>
                  <Form.Check label="Kí túc xá/Home Stay" id="Dormitory" defaultChecked={true} onChange={typeChange}/>
                </Form.Group>
                <div className="border-top my-3"/>
                <Form.Group>
                  <Form.Label>Giới tính: </Form.Label>
                  <Form.Control as="select" className="rounded-pill" value={gender} onChange={e => setGender(e.target.value)}>
                    <option value="any">Nam hoặc nữ</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                  </Form.Control>
                </Form.Group>
                <div className="border-top my-3"/>
                <Form.Group className="clearfix mb-0">
                  <Button className="rounded-pill btn-light btn-outline-warning float-right"
                          onClick={() => {
                            setText(props.match.params.searchText.split("-").join(" "));
                            setGender("any");
                            setType(["Unshared", "Shared", "Apartment", "Dormitory"]);
                            setPrice({min: 0, max: 9.9})
                          }}
                  >
                    Clear
                  </Button>
                  <Button className="rounded-pill btn-success float-left"
                          onClick={() => setQuery({ text, price, type, gender })}
                  >
                    <i className="fa fa-search text-white"/>
                  </Button>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default SearchComponent